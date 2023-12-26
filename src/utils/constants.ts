export const TYPOGRAPHY_HEADING = "heading";
export const TYPOGRAPHY_SUBHEADING = "subheading";
export const TYPOGRAPHY_BODYTEXT = "body";
export const TYPOGRAPHY_BODYHEADING = "bodyheading";
export const TYPOGRAPHY_LABELTEXT = "label";

export const TYPOGRAPHY_MAPPING = {
  [TYPOGRAPHY_HEADING]: "h1",
  [TYPOGRAPHY_SUBHEADING]: "h2",
  [TYPOGRAPHY_BODYTEXT]: "p",
  [TYPOGRAPHY_BODYHEADING]: "p",
  [TYPOGRAPHY_LABELTEXT]: "p",
};

export const COLORS = {
  BRAND: {
    FLORAL: "#F7F4EA",
    LAVENDER: "#DED9E2",
    PERIWINKLE: "#C0B9DD",
    VISTA_BLUE: "#80A1D4",
    TIFFANY_BLUE: "#75C9C8",
    JET_DARK: "#2D2E2E",
    JET_MEDIUM: "#323031",
    JET_LIGHT: "#3D3B3C",
    GRAY: "#7F7979",
    SILVER: "#C1BDB3",
    DAVYS_GRAY: "#5F5B6B",
  },
  TEXT: {
    BASE: "#F7F4EA",
    PRIMARY: "#272727",
    SECONDARY: "#F5F5F5",
  },
  UTILS: {
    SUCCESS: "#00C853",
    ERROR: "#D50000",
  },
};

export const CREATE_PASSWORD_HEADING = "Create password";
export const CREATE_PASSWORD_SUBHEADING =
  "This password will unlock your Custom Wallet only on this device. Custom Wallet doesn't store your password.";

export const CREATE_WALLET_STEPS = {
  CREATE: "Create password",
  SECURE: "Secure wallet",
  CONFIRM: "Confirm secret phrase",
} as const;

export const NOTIFICATION_MESSAGES = {
  LOAD_PROFILE: {
    SUCCESS: "Local profile loaded",
    WARN: "No local profile found",
  },
  GENERATE_WALLET: {
    SUCCESS: "Wallet generated successfully",
    ERROR: "Failed to generate wallet",
  },
} as const;

export const SECURE_WALLET_TIPS = [
  "Save in a password manager;",
  "Store in a safe deposit box;",
  "Write down and store in multiple secret places.",
] as const;

export const TAURI_FUNCTIONS = {
  get_local_profile: "get_user_profile",
  create_user_profile: "create_user_profile",
  get_user_profile: "get_user_profile",
  update_last_wallet_index: "update_last_wallet_index",
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: "Required",
  PASSWORD_MIN_LENGTH: "Must be 8 characters or more",
  PASSWORD_MATCH: "Passwords must match",
} as const;

export const MNEMONIC_PLACEHOLDER = Array.from(
  { length: 12 },
  (_, i) => `mnem${i + 1}`,
);

export const ETHERS_ERROR_MESSAGES = {
  "incorrect password": "Incorrect password. Try again.",
  UNEXPECTED_ERROR: "Unexpected error: ",
} as const;
