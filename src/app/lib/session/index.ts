import Cookies from "js-cookie";

/**
 * Cookie names.
 */
export enum CookieName {
  DeviceId = "deviceId",
  SessionId = "sessionId",
  UserId = "userId",
  UserRole = "userRole",
  Timers = "timers",
}

/**
 * Set or clear a cookie.
 */
const setCookie = (name: CookieName, value: string | null) => {
  if (value === null) {
    Cookies.remove(name);
  } else {
    Cookies.set(name, value);
  }
};

/**
 * Get cookie.
 */
export const getCookie = (name: CookieName) => {
  return Cookies.get(name);
};

/**
 * Get timer saved to cookie.
 */
export const getTimer = (id: string) => {
  const registeredTimers = JSON.parse(getCookie(CookieName.Timers) ?? "{}");
  return registeredTimers[id] ?? { startingTime: 0, duration: 0 };
};

/**
 * Register timer.
 */
export const setTimer = (id: string, duration: number) => {
  const registeredTimers = JSON.parse(getCookie(CookieName.Timers) ?? "{}");
  setCookie(
    CookieName.Timers,
    JSON.stringify({
      ...registeredTimers,
      [id]: { startingTime: Date.now(), duration },
    }),
  );
};

/**
 * Authorization data type.
 */
type Authorization = {
  userId: number | undefined;
  sessionId: string | undefined;
  role: string | undefined;
};

/**
 * Set session authorization data.
 */
export const setAuthorization = ({
  userId,
  sessionId,
  role,
}: Authorization) => {
  setCookie(CookieName.SessionId, sessionId);
  setCookie(CookieName.UserId, String(userId));
  setCookie(CookieName.UserRole, role);
};

/**
 * Get current session authorization data.
 */
export const getAuthorization = () => {
  const sessionId = getCookie(CookieName.SessionId);
  const userId = getCookie(CookieName.UserId);
  const role = getCookie(CookieName.UserRole);

  return {
    sessionId,
    userId: userId ? parseInt(userId, 10) : undefined,
    role,
  } as Authorization;
};

/**
 * Clear current session authorization data.
 */
export const clearAuthorization = () => {
  setCookie(CookieName.SessionId, null);
  setCookie(CookieName.UserId, null);
  setCookie(CookieName.UserRole, null);
};

/**
 * Read saved device ID.
 */
export const getDeviceId = () => {
  return getCookie(CookieName.DeviceId);
};

/**
 * Save device ID, if not already set.
 */
export const setDeviceId = (value: string) => {
  if (!getDeviceId()) {
    setCookie(CookieName.DeviceId, value);
  }
};
