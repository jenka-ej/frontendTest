import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

const decode = (encoded, translations) => {
    const exceptions = ['groupId', 'service', 'formatSize', 'ca'];
    const ids = [];
    const decodedInfo = encoded.map((item) => {
        const keys = Object.keys(item);
        const newItem = keys.reduce((acc, key) => {
            const value = item[key];
            if (key.includes('Id') && !exceptions.includes(key)) {
                ids.push(value);
                const translate = translations[value];
                if (!translate && translate !== '') {
                    acc[key] = value;
                    return acc;
                }
                acc[key] = translate;
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        return newItem;
    });
    console.log(decodedInfo);
    const decodedKeys = Object.keys(translations);
    const uniqueIds = ids.filter((id) => !decodedKeys.includes(id));
    return [...new Set(uniqueIds)];
};

const decoded = decode(encoded, translations);

console.log(decoded);
