import { kodiWsServer } from './jsonrpc';

type notifyCb = (params?: any) => any;

export async function onScanFinished(cb: notifyCb) {
    await kodiWsServer.request('JSONRPC.SetConfiguration', {
        notifications: {
            Application: false,
            AudioLibrary: false,
            GUI: false,
            Input: false,
            Other: false,
            PVR: false,
            Player: false,
            Playlist: false,
            System: false,
            VideoLibrary: true,
        }
    })

    kodiWsServer.addMethod('VideoLibrary.OnScanFinished', (params) => {
        cb(params);
    })
}
