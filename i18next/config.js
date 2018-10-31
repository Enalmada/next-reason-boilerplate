module.exports = {
    translation: {
    // default / fallback language
        defaultLanguage: "en",
        // This is relative to the server.js
        localesPath: "./static/locales/",

        // needed for serverside preload
        allLanguages: ["en", "de"],

        // optional settings needed for subpath (/de/page1) handling
        enableSubpaths: false,
        subpathsOnNonDefaultLanguageOnly: false, // only redirect to /lng/ if not default language
    },
};
