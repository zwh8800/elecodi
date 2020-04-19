import bridge from '@/bridge';
import * as conf from '@/conf/elecodiConf';

export function openPlayer(filepath: string) {
    const config = conf.getConfig();
    if (config.encodeFilename) {
        filepath = filepath.replace(config.fileReplaceFrom, "MYREPLAYCEFROM1234567890")
        filepath = encodeURIComponent(filepath);
        filepath = filepath.replace("MYREPLAYCEFROM1234567890", config.fileReplaceFrom)
    }

    filepath = filepath.replace(config.fileReplaceFrom, config.fileReplaceTo);
    if (config.windowsFs) {
        filepath = filepath.replace('/', '\\');
    }
    if (bridge) {
        try {
            bridge.shellOpenItem(filepath);
        } catch (e) {
            console.warn(e);
        }
    } else {
        window.open(filepath);
    }
}
