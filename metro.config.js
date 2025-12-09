// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const { resolver } = config;

// 1. Add 3D file types to assetExts (so they are copied as files, not read as code)
config.resolver.assetExts = [
  ...resolver.assetExts,
  "glb",
  "gltf",
  "bin",
  "png",
  "jpg",
];

// 2. Remove them from sourceExts (so Metro doesn't try to compile them)
config.resolver.sourceExts = resolver.sourceExts.filter(
  (ext) => !["glb", "gltf", "bin", "png", "jpg"].includes(ext)
);

// 3. Export with NativeWind wrapper
module.exports = withNativeWind(config, { input: "./global.css" });