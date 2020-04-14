import { plainToClass } from 'class-transformer';

const elecodiConfigKey = "elecodiConfig"

export class ElecodiConfig {

}

export function getElecodiConfig() {
    return plainToClass(ElecodiConfig, localStorage.getItem(elecodiConfigKey))
}

export function setElecodiConfig(config: ElecodiConfig) {

}
