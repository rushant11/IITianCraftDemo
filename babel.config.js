module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        root: ["."],
        alias: {
          "@store": "./src/store/index.ts",
          "@types": "./src/types/index.ts",
          "@types": "./src/utils/index.ts",
          "@screens": "./src/screens/index.ts",
          "@constants": "./src/constants/index.ts",
          "@navigation": "./src/navigation/index.ts",
          "@components": "./src/components/index.ts",
        },
      },
    ],
  ],
};
