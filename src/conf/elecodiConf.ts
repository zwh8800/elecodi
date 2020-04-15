import { plainToClass, classToPlain } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

export class Config {
    playerCmd: string
    kodiHttpUrl: string
    kodiWsUrl: string
}

type onConfigChangeCb = (newConfig: Config) => void;

let cbList: onConfigChangeCb[] = [];

export function getConfig(): Config {
    return plainToClass(Config, JSON.parse(localStorage.getItem(elecodiConfigKey)));
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
