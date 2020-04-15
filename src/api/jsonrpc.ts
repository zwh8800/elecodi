import {
    JSONRPCClient,
    createJSONRPCErrorResponse,
    JSONRPCServerAndClient,
    JSONRPCServer
} from "json-rpc-2.0";
import { getElecodiConfig } from '@/conf/elecodiConf';

let config = getElecodiConfig();

export const kodiServer: JSONRPCClient = new JSONRPCClient(
    (jsonRPCRequest) =>
        fetch(config.kodiHttpUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(jsonRPCRequest)
        }).then(response => {
            if (response.status === 200) {
                // Use client.receive when you received a JSON-RPC response.
                return response.json().then(jsonRPCResponse => kodiServer.receive(jsonRPCResponse));
            } else if (jsonRPCRequest.id !== undefined) {
                return Promise.reject(new Error(response.statusText));
            }
        })
);

const webSocket = new WebSocket(config.kodiWsUrl);

export const kodiWsServer: JSONRPCServerAndClient = new JSONRPCServerAndClient(
    new JSONRPCServer(),
    new JSONRPCClient(request => {
        try {
            webSocket.send(JSON.stringify(request))
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    })
);

webSocket.onmessage = (event) => {
    kodiWsServer.receiveAndSend(JSON.parse(event.data.toString()));
}

// On close, make sure to reject all the pending requests to prevent hanging.
webSocket.onclose = (event) => {
    kodiWsServer.rejectAllPendingRequests(`Connection is closed (${event.reason}).`);
}
