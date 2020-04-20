import iso6393 from 'iso-639-3';

const langMap = new Map<string, string>();
for (let i of iso6393) {
    langMap.set(i.iso6393, i.name);
}

export function iso6393Name(iso6393: string) {
    return langMap.get(iso6393);
}
