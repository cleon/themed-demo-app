import { ApiClient, FeatureFlagsApi } from 'launchdarkly-api/dist/index.js'

ApiClient.instance.authentications['ApiKey'].apiKey = process.env.REACT_APP_LD_API_KEY;
ApiClient.instance.defaultHeaders = {}; //for Firefox and Chrome CORS warnings in console

const LD = new FeatureFlagsApi();
const ENV = process.env.REACT_APP_LD_PROJECT_ENV_KEY;
const PROJ = process.env.REACT_APP_LD_PROJECT_KEY;

let themes = [];
let cards = [];

const FF = {
    getGuessableCardVariations: function () {
        return new Promise((resolve, reject) => {
            if (cards.length > 0) resolve(cards);
            LD.getFeatureFlag(PROJ,
                'demoGuess',
                { 'env': ENV },
                (err, data, response) => {
                    if (err) { console.error('Error fetching card list', err); reject(); }
                    cards = (data) ? data.variations : [];
                    resolve(cards);
                });
        });
    },
    setGuessedCardVariation: function (card) {
        return new Promise((resolve, reject) => {
            const index = cards.findIndex(c => c.name === card);
            if (index > -1) {
                LD.patchFeatureFlag(PROJ,
                    'demoGuess',
                    {
                        patch: [{
                            op: 'replace',
                            path: `/environments/${ENV}/fallthrough`,
                            value: {
                                variation: index
                            }
                        }]
                    },
                    (error, data, response) => {
                        if (error) { console.error('Error updating demoGuess fallthrough', error); reject(); }
                        resolve();
                    });
            }
        });
    },
    getDemoThemeVariations: function () {
        return new Promise((resolve, reject) => {
            if (themes.length > 0) resolve(themes);
            LD.getFeatureFlag(PROJ,
                'demoTheme',
                { 'env': ENV },
                (err, data, response) => {
                    if (err) { console.error('Error fetching theme list', err); reject(); }
                    themes = (data) ? data.variations : [];
                    resolve(themes);
                });
        });
    },
    updateDemoThemeFallthrough: function (theme) {
        return new Promise((resolve, reject) => {
            const index = themes.findIndex(e => e.name === theme);
            if (index > -1) {
                LD.patchFeatureFlag(PROJ,
                    'demoTheme',
                    {
                        patch: [{
                            op: 'replace',
                            path: `/environments/${ENV}/fallthrough`,
                            value: {
                                variation: index
                            }
                        }]
                    },
                    (error, data, response) => {
                        if (error) { console.error('Error updating demoTheme flag fallthrough', error); reject(); }
                        resolve();
                    }
                );
            }
        });
    },
    toggleDemoThemeFlag: function (enabled) {
        return new Promise((resolve, reject) => {
            LD.patchFeatureFlag(PROJ,
                'demoTheme',
                {
                    patch: [
                        {
                            op: 'replace',
                            path: `/environments/${ENV}/on`,
                            value: enabled
                        }
                    ]
                }, (error, data, response) => {
                    if (error) { console.error('Error toggling demoTheme flag', error); reject(); }
                    resolve();
                }
            );
        });
    },
    getDemoSoundFlag: function () {
        return new Promise((resolve, reject) => {
            LD.getFeatureFlag(PROJ,
                'demoSoundEnabled',
                { 'env': ENV },
                (err, data, response) => {
                    if (err) { console.error('error getting demoSoundEnabled flag', err); reject(); }
                    resolve(data);
                });
        });
    },
    toggleDemoSoundFlag: function (enabled) {
        return new Promise((resolve, reject) => {
            LD.patchFeatureFlag(PROJ,
                'demoSoundEnabled',
                {
                    patch: [
                        {
                            op: 'replace',
                            path: `/environments/${ENV}/on`,
                            value: enabled
                        }
                    ]
                }, (error, data, response) => {
                    if (error) { console.error('Error toggling demoSoundEnabled flag', error); reject(); }
                    resolve();
                }
            );
        });
    },
    setSoundFlagSelectionTarget: function (selection) {
        return new Promise((resolve, reject) => {
            LD.patchFeatureFlag(PROJ,
                'demoSoundEnabled',
                {
                    patch: [{
                        op: 'replace',
                        path: `/environments/${ENV}/rules/0/clauses/0/values`,
                        value: [selection]
                    }]
                },
                (error, data, response) => {
                    if (error) { console.error('Error updating demoSoundEnabled flag card targeting', error); reject(); }
                    resolve();
                }
            );
        });
    },
    setSoundFlagSuitTarget: function (suit) {
        return new Promise((resolve, reject) => {
            LD.patchFeatureFlag(PROJ,
                'demoSoundEnabled',
                {
                    patch: [{
                        op: 'replace',
                        path: `/environments/${ENV}/rules/1/clauses/0/values`,
                        value: [suit]
                    }]
                },
                (error, data, response) => {
                    if (error) { console.error('Error updating demoSoundEnabled flag suit targeting', error); reject(); }
                    resolve();
                }
            );
        });
    },
    toggleDemoFeatureEnabled: function (enabled) {
        return new Promise((resolve, reject) => {
            LD.patchFeatureFlag(PROJ,
                'enableDemoFeature',
                {
                    patch: [
                        {
                            op: 'replace',
                            path: `/environments/${ENV}/on`,
                            value: enabled
                        }
                    ]
                }, (error, data, response) => {
                    if (error) { console.error('Error toggling enableDemoFeature flag', error); reject(); }
                    resolve();
                }
            );
        });
    },
}
export default FF;
