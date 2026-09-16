export const productScreenshotPairs = {
  wallet: {
    light: "/media/screenshots/wallet.webp",
    dark: "/media/screenshots/wallet-dark.webp",
  },
  details: {
    light: "/media/screenshots/details.webp",
    dark: "/media/screenshots/details-dark.webp",
  },
  barcode: {
    light: "/media/screenshots/barcode.webp",
    dark: "/media/screenshots/barcode-dark.webp",
  },
  family: {
    light: "/media/screenshots/family.webp",
    dark: "/media/screenshots/family-dark.webp",
  },
  sharing: {
    light: "/media/screenshots/sharing.webp",
    dark: "/media/screenshots/sharing-dark.webp",
  },
  settings: {
    light: "/media/screenshots/settings.webp",
    dark: "/media/screenshots/settings-dark.webp",
  },
  pin: {
    light: "/media/screenshots/pin.webp",
    dark: "/media/screenshots/pin-dark.webp",
  },
  "add-menu": {
    light: "/media/screenshots/add-menu.webp",
    dark: "/media/screenshots/add-menu-dark.webp",
  },
} as const;

export type ProductScreenshotName = keyof typeof productScreenshotPairs;
