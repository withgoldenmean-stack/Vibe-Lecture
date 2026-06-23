export const ACCESS_COOKIE_NAME = "vibelecture_access";

export const isAccessGateEnabled = () => process.env.ACCESS_GATE_ENABLED !== "false";

export const getAccessCookieSecret = () => process.env.ACCESS_COOKIE_SECRET?.trim() ?? "";

export const getApprovedAccessCodes = () =>
  (process.env.APPROVED_ACCESS_CODES ?? "")
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);

export const isApprovedAccessCode = (code: string) => {
  const normalizedCode = code.trim();

  if (!normalizedCode) {
    return false;
  }

  return getApprovedAccessCodes().some((approvedCode) => approvedCode === normalizedCode);
};

export const hasValidAccessCookie = (cookieValue: string | undefined) => {
  const secret = getAccessCookieSecret();

  if (!cookieValue) {
    return false;
  }

  if (secret && cookieValue === secret) {
    return true;
  }

  return isApprovedAccessCode(cookieValue);
};
