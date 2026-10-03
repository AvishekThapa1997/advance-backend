export const AUTH_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export const AUTH_SESSION_COOKIE = 'session_id';

export const AUTH_SESSION_PREFIX = 'auth:session:';

export const REQUIRE_AUTH = Symbol('REQUIRE_AUTH');
export const SESSION_STORE = Symbol('SESSION_STORE');
