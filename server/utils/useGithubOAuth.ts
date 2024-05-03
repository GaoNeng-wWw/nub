export const GithubOAuthBaseUrls = {
  OAUTH_REDIRECT_BASEURL: `https://github.com/login/oauth/authorize`,
  OAUTH_ACCESS_TOKEN: 'https://github.com/login/oauth/access_token',
}

interface AuthOptions {
  client_id: string
  redirect_uri: string
  scope?: string
  state?: string
  allow_signup?: string
}

interface GetTokenPayload {
  access_token: string
  token_type: string
  scope: string
}

export const useGithubOAuth = () => {
  const createURL = <T extends Record<string, any>>(baseUrl: string, data: T) => {
    const urlObj = new URL(baseUrl);
    for (const [key, value] of Object.entries(data)) {
      urlObj.searchParams.set(key, value);
    }
    return urlObj;
  }
  const auth = (options: AuthOptions) => {
    const url = createURL(GithubOAuthBaseUrls.OAUTH_REDIRECT_BASEURL, options);
    return url.toString();
  }
  const getToken = (
    code: string,
    client_id: string,
    client_secret: string,
  ): Promise<GetTokenPayload> => {
    const url = createURL(GithubOAuthBaseUrls.OAUTH_ACCESS_TOKEN, {});
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({ code, client_id, client_secret }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .catch(reason => reason);
  }
  return { auth, getToken }
}
