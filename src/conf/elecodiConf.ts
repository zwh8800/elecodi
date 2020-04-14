import { plainToClass, classToPlain } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

export class ElecodiConfig {
    playerCmd: string
}

export function getElecodiConfig() {
    return plainToClass(ElecodiConfig, localStorage.getItem(elecodiConfigKey));
}

export function setElecodiConfig(config: ElecodiConfig) {
    localStorage.setItem(elecodiConfigKey, JSON.stringify(classToPlain(config)));
}
