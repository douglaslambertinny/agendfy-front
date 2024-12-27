import axios from "axios";

import { serialize } from "~/src/lib/querystring";
import { getAuthorization, setAuthorization } from "~/src/lib/session";

/**
 * The back-end only accepts 99 at most. If we need more than that
 * we should consider fetching incrementally on search.
 */
export const maxListLimit = 99;

/**
 * Common options for paginating and sorting resource collections.
 */
export type CommonListParams = {
  limit?: number;
  page?: number;
  sort?: string[];
};

/**
 * Response from the API.
 */
export type Response<T> = {
  data: T;
  total?: number;
  pages?: number;
  datetime: string;
};

/**
 * Unauthorized error.
 */
export class Unauthorized extends Error {
  constructor() {
    super("Unauthorized");
  }
}

/**
 * API constraint violation.
 */
export type Violation = {
  rule: "required" | "unique" | "url" | "length" | "range" | "invalid";
  pointer?: string;
  detail?: Record<string, unknown>;
};

/**
 * Unprocessable entity response data.
 */
export class Unprocessable extends Error {
  violations: Violation[];

  constructor(violations: Violation[] = []) {
    super("Unprocessable");
    this.violations = violations;
  }
}

/**
 * Not Found error.
 */
export class NotFoundError extends Error {}

/**
 * Conflict error.
 */
export class ConflictError extends Error {}

/**
 * Bluy's API (back-end) client.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10),
  paramsSerializer: { serialize },
});

/**
 * Allow a global variable to override the base API URL.
 */
api.interceptors.request.use((config) => {
  const url = globalThis.FORCE_API_URL;
  const timeout = globalThis.FORCE_API_TIMEOUT;

  if (url) {
    config.baseURL = url;
  }

  if (timeout) {
    config.timeout = timeout;
  }

  return config;
});

/**
 * Header that carries the session id. Casing matters!
 */
const sessionIdHeader = "x-bluy-session-id";

/**
 * Authorization request interceptor.
 */
api.interceptors.request.use((config) => {
  if (!config.public) {
    const { sessionId } = getAuthorization();
    if (sessionId) {
      config.headers[sessionIdHeader] = sessionId;
    }
  }
  return config;
});

/**
 * Set language header.
 * @todo In the future we should send the user selected language.
 */
api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = "pt-BR";
  return config;
});

/**
 * Authorization response interceptor.
 **/
api.interceptors.response.use((resp) => {
  /**
   * @todo Right now we are receiving the session ID cookie on every
   * request, but we should only save it on a few endpoints that also
   * carries the session owner ID. Until a back-end solution is
   * implemented here we filter from which URLs we save this information.
   */
  const recruiterAuthorizingUrls = ["/authorization", "/users"];
  const applicantAuthorizingUrls = ["/applicants"];

  if (resp.config.method === "post") {
    let role;

    if (recruiterAuthorizingUrls.includes(resp.config.url)) {
      role = "recruiter";
    } else if (applicantAuthorizingUrls.includes(resp.config.url)) {
      role = "applicant";
    } else {
      return resp;
    }

    const sessionId = resp.headers[sessionIdHeader];
    const userId = resp.data.data.id;

    setAuthorization({ sessionId, userId, role });
  }

  return resp;
});

/**
 * Response interceptor to include the datetime from header in response data.
 **/
api.interceptors.response.use((resp) => {
  const datetime = resp.headers?.date;
  const response = { ...resp, data: { ...resp.data, datetime } };

  return response;
});

/**
 * Error handling;.
 */
api.interceptors.response.use(undefined, async (error) => {
  switch (error.response?.status) {
    case 422:
      throw new Unprocessable(error.response.data);
    case 401:
      throw new Unauthorized();
    case 404:
      throw new NotFoundError();
    case 409:
      throw new ConflictError();
    default:
      throw error;
  }
});
