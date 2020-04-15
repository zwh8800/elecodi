import {
    JSONRPCClient,
    createJSONRPCErrorResponse,
    JSONRPCServerAndClient,
    JSONRPCServer
} from "json-rpc-2.0";
import * as elecodiConf from '@/conf/elecodiConf';

export const kodiServer: JSONRPCClient = new JSONRPCClient(
    (jsonRPCRequest) =>
        fetch(elecodiConf.getConfig().kodiHttpUrl, {
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

let webSocket: WebSocket;

export const kodiWsServer: JSONRPCServerAndClient = new JSONRPCServerAndClient(
    new JSONRPCServer(),
    new JSONRPCClient(request => {
        try {
            if (webSocket) {
                webSocket.send(JSON.stringify(request))
            }
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    })
);

function wsOnMessage(event: any) {
    kodiWsServer.receiveAndSend(JSON.parse(event.data.toString()));
}

// On close, make sure to reject all the pending requests to prevent hanging.
function wsOnClose(event: any) {
    console.warn('websocket unexpected closed:', event);
    // kodiWsServer.rejectAllPendingRequests(`Connection is closed (${event.reason}).`);
    setTimeout(() => {
        setupWs();
    }, 1000);
}

function setupWs() {
    if (webSocket) {
        webSocket.close();
    }

    webSocket = new WebSocket(elecodiConf.getConfig().kodiWsUrl);
    webSocket.onmessage = wsOnMessage;
    webSocket.onclose = wsOnClose
}

setupWs();

elecodiConf.onConfigChange(() => {
    setupWs();
});
