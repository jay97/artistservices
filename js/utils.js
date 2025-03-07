import {
  LARGE_DESKTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
  SMALL_MOBILE_BREAKPOINT,
} from "./constants/mobile.js";

export function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function uniqueID() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
}

export function shuffleArray(array) {
  const shuffledArray = [...array];

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}

export function isMobileSizedScreen(app) {
  if (!app) {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  return app.screen.width < MOBILE_BREAKPOINT;
}

export function isSmallMobileSizedScreen(app) {
  if (!app) {
    return window.innerWidth < SMALL_MOBILE_BREAKPOINT;
  }

  return app.screen.width < SMALL_MOBILE_BREAKPOINT;
}

export function isLargeSizedScreen(app) {
  if (!app) {
    return window.innerWidth >= LARGE_DESKTOP_BREAKPOINT;
  }

  return app.screen.width >= LARGE_DESKTOP_BREAKPOINT;
}

export function hasSlowConnection() {
  try {
    const connectionEffectiveType = navigator.connection.effectiveType;

    return ["slow-2g", "2g", "3g"].includes(connectionEffectiveType);
  } catch {
    return false;
  }
}
