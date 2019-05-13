// https://github.com/martpie/next-transpile-modules/issues/1#issuecomment-427749256
// babel.config.js (in your Next.js folder)
module.exports = (api) => {
    api.cache(true);

    // adapt this to your setup
    const presets = [
        "next/babel",
    ];

    return {
        presets,
    };
};
