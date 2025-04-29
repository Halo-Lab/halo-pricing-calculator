import { useRef } from "react";

export const enum Platform {
  IOS,
  MacOS,
  Linux,
  Windows,
  Android,
  Unknown,
}

/**
 * Detects the current OS on which the current
 * browser is running on.
 */
export function usePlatform(): Platform {
  const platformRef = useRef(Platform.Unknown);

  if (platformRef.current === Platform.Unknown) {
    platformRef.current = checkCurrentPlatform();
  }

  return platformRef.current;
}

function checkCurrentPlatform(): Platform {
  if (navigator.userAgent.includes("Win")) {
    return Platform.Windows;
  } else if (navigator.userAgent.includes("Mac")) {
    return Platform.MacOS;
  } else if (navigator.userAgent.includes("iP")) {
    return Platform.IOS;
  } else if (navigator.userAgent.includes("Android")) {
    return Platform.Android;
  } else if (navigator.userAgent.includes("Linux")) {
    return Platform.Linux;
  } else {
    return Platform.Unknown;
  }
}

// Keep the values of the record in sync with the Tailwind plugin variants.
export const platformModifiers: Record<Platform, `_${string}`> = {
  [Platform.IOS]: "_i",
  [Platform.MacOS]: "_m",
  [Platform.Linux]: "_l",
  [Platform.Android]: "_a",
  [Platform.Windows]: "_w",
  [Platform.Unknown]: "_u",
};
