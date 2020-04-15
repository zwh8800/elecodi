import { kodiServer, kodiWsServer } from './jsonrpc';

type notifyCb = (params?: any) => any;

export function onScanFinished(cb: notifyCb) {
    kodiWsServer.addMethod('VideoLibrary.OnScanFinished', (params) => {
        cb(params);
    })
}
