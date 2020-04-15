import { plainToClass, classToPlain } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

export class ElecodiConfig {
    playerCmd: string
    kodiHttpUrl: string
    kodiWsUrl: string
}

export function getElecodiConfig(): ElecodiConfig {
    return plainToClass(ElecodiConfig, localStorage.getItem(elecodiConfigKey));
}

export function setElecodiConfig(config: ElecodiConfig) {
    localStorage.setItem(elecodiConfigKey, JSON.stringify(classToPlain(config)));
}
