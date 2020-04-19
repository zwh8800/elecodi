import bridge from '@/bridge';
import * as conf from '@/conf/elecodiConf';

export function openPlayer(filepath: string) {
    const config = conf.getConfig();

    filepath = filepath.replace(config.fileReplaceFrom, config.fileReplaceTo);
    if (config.windowsFs) {
        filepath = filepath.replace('/', '\\');
    }
    try {
        bridge.shellOpenItem(filepath);
    } catch (e) {
        console.warn(e);
    }
}
