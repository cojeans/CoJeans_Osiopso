export const API_BASE_URL = 'http://localhost:8080/api';
// export const API_BASE_URL = 'https://www.osiopso.site/api';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
// export const OAUTH2_REDIRECT_URI = 'https://www.osiopso.site/oauth2/redirect' //프런트에서 돌아올 곳

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorize/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;