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
    console.log('\nDecoded info down below\n');
    console.log(decodedInfo);
    const uniqueIds = [...new Set(ids)];
    return uniqueIds;
};

const decoded = decode(encoded, translations);

console.log('\nHot unique ids down below o_O\n');
console.log(decoded);
