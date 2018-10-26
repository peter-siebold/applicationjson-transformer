import NextTransformer from "../next/Application";
import NuxtTransformer from "../nuxt/Application";
// import ReactNativeTransformer from "../react-native/Application";

export const transformers = {
    next: NextTransformer,
    nuxt: NuxtTransformer,
    // "react-native": ReactNativeTransformer,
};
