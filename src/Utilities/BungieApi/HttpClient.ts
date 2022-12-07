import { ServerResponse } from 'bungie-api-ts/app';
import { HttpClient, HttpClientConfig } from 'bungie-api-ts/http';
import { EnvironmentVariables } from 'Utilities/EnvironmentVariables';
import { actions } from 'Store/Authorization';

import store, { unwrapResult } from 'Store';

export const createUnauthenticatedHttpClient = () => {
  return createHttpClient(fetch);
};

export const createAuthorizedHttpClient = () => {
  return createHttpClient(fetchWithBungieOAuth);
};

const fetchWithBungieOAuth = async (request: RequestInfo | URL, options?: RequestInit) => {
  if (!(request instanceof Request)) {
    request = new Request(request);
  }

  const result = await store.dispatch(actions.getAccessToken());
  const token = unwrapResult(result);
  request.headers.set('Authorization', `Bearer ${token.value}`);

  return fetch(request, options);
}

const createHttpClient = (fetchFn: typeof fetch) => {
  return (async (config: HttpClientConfig) => {
    let url = config.url;
    const params = {...config.params};
    if (params) {
      // strip out undefined params keys. bungie-api-ts creates them for optional endpoint parameters
      for (const key in params) {
        typeof params[key] === 'undefined' && delete params[key];
      }
      url = `${url}?${new URLSearchParams(params as Record<string, string>)}`;
    }

    const options: RequestInit = {
      method: config.method,
      body: config.body ? JSON.stringify(config.body) : undefined,
      headers: {
        'X-API-Key': EnvironmentVariables.BungieApiKey,
        ...(config.body && { 'Content-Type': 'application/json' }),
      },
      credentials: 'omit',
    };

    const request = new Request(url, options);

    const response = await fetchFn(request);

    let data: ServerResponse<unknown> | undefined;
    let parseError: unknown;
    try {
      data = await response.json();
    }
    catch (e) {
      parseError = e;
    }

    if (parseError) {
      throw parseError;
    }

    return data;
  }) as HttpClient;
};