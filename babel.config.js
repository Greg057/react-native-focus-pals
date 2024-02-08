module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    //plugins: ['react-native-reanimated/plugin'], // reanimated plugin has to be listed as last plugin in list!
  };
};
