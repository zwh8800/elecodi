import { plainToClass, classToPlain } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

export class ElecodiConfig {
    playerCmd: string
    kodiHttpUrl: string
    kodiWsUrl: string
}

type onConfigChangeCb = (newConfig: ElecodiConfig) => void;

let cbList: onConfigChangeCb[] = [];

export function getConfig(): ElecodiConfig {
    return plainToClass(ElecodiConfig, localStorage.getItem(elecodiConfigKey));
}

export function setConfig(config: ElecodiConfig) {
    localStorage.setItem(elecodiConfigKey, JSON.stringify(classToPlain(config)));
    for (let cb of cbList) {
        cb(config);
    }
}

export function onConfigChange(cb: onConfigChangeCb) {
    cbList.push(cb);
}
