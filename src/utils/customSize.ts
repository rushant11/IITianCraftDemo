import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const STANDARD_WIDTH = 375;
export const CURRENT_WIDTH = width;
export const CURRENT_HEIGHT = height;
const platformWiseWidth = Platform.OS === "android" ? 400 : 390;
const K = CURRENT_WIDTH / platformWiseWidth;

const USE_FOR_BIGGER_SIZE = true;

export function dynamicSize(size: number) {
  return K * size;
}

export function getFontSize(size: number) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }
  return size;
}

export const ds = (size: number) => dynamicSize(size);
export const fs = (size: number) => getFontSize(size);
