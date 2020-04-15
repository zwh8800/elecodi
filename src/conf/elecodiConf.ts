import { plainToClass, classToPlain } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

class config {
    playerCmd?: string
    kodiHttpUrl?: string
    kodiWsUrl?: string
}

export interface Config {
    playerCmd?: string
    kodiHttpUrl?: string
    kodiWsUrl?: string
    [name: string]: any;
}

type onConfigChangeCb = (newConfig: Config) => void;

let cbList: onConfigChangeCb[] = [];

export function getConfig(): Config {
    let ret = plainToClass(config, JSON.parse(localStorage.getItem(elecodiConfigKey)));
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
