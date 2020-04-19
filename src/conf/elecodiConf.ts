import { plainToClass, classToPlain } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

export class Config {
    playerCmd?: string
    kodiHttpUrl?: string
    kodiWsUrl?: string
    fileReplaceFrom?: string
    fileReplaceTo?: string
    windowsFs?: boolean
    encodeFilename?: boolean
}

type onConfigChangeCb = (newConfig: Config) => void;

let cbList: onConfigChangeCb[] = [];

export function getConfig(): Config {
    let ret = plainToClass(Config, JSON.parse(localStorage.getItem(elecodiConfigKey)));
    if (!ret) {
        return {};
    }
    return ret;
}

export function setConfig(config: Config) {
    localStorage.setItem(elecodiConfigKey, JSON.stringify(classToPlain(config)));
    for (let cb of cbList) {
        cb(config);
    }
}

export function onConfigChange(cb: onConfigChangeCb) {
    cbList.push(cb);
}

export function isValid(config?: Config): boolean {
    if (!config) {
        config = getConfig();
    }
    return !!config.kodiHttpUrl && !!config.kodiWsUrl;
}
