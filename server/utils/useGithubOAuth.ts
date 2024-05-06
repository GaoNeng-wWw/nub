export const GithubOAuthBaseUrls = {
  OAUTH_REDIRECT_BASEURL: `https://github.com/login/oauth/authorize`,
  OAUTH_ACCESS_TOKEN: 'https://github.com/login/oauth/access_token',
}

export const errorZH_CN: Record<string, string> = {
  incorrect_client_credentials: '客户端凭据不正确',
  redirect_uri_mismatch: '重定向 URI 不匹配',
  bad_verification_code: '验证码错误',
  unverified_user_email: '未经验证的用户电子邮件',
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

interface ErrorPayload {
  error: string
  error_description: string
  error_uri: string
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
  ): Promise<GetTokenPayload | ErrorPayload> => {
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
