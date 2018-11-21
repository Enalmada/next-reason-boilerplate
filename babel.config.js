// babel.config.js (in your Next.js folder)
module.exports = (api) => {
    api.cache(true);

    const presets = [
        "next/babel",
    ];

    return {
        presets,
    };
};
