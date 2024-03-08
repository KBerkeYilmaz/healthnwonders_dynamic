function getNestedTranslations(baseKey, req) {
    console.log('Current language:', req.language);
    console.log('Available data:', req.i18n.store.data);

    let result = {};
    const languageData = req.i18n.store.data[req.language] || {};
    console.log('Language data:', languageData);

    const keys = Object.keys(languageData).filter(key => key.startsWith(`${baseKey}.`));

    keys.forEach(fullKey => {
        const shortKey = fullKey.replace(`${baseKey}.`, '');
        result[shortKey] = req.t(fullKey);
    });
    console.log('Result:', result);
    return result;
}

module.exports.getNestedTranslations = getNestedTranslations;
