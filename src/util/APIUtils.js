import {ACCESS_TOKEN, API_BASE_URL, PROXY_URL} from '../constants';

const request = (headers, options, token = true) => {
  const _headers = new Headers(headers)

  if(token && localStorage.getItem(ACCESS_TOKEN)) {
    let accessToken = parseAccessToken(localStorage.getItem(ACCESS_TOKEN));
    _headers.append('Authorization', 'Bearer ' + (accessToken.token || ''))
  }

  const defaults = {headers: _headers};
  options = Object.assign({}, defaults, options);

  console.debug(options.url, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if(!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    ).catch(error => {
      if (error.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.replace(process.env.PUBLIC_URL + '/');
      }
      throw error;
    });
}

export function makeAccessToken(username, token) {
  return username + '&' + token;
}

export function parseAccessToken(token) {
  if (!token) {
    return { username: '' };
  }
  return {
    username: token.substring(0, token.indexOf('&')),
    token: token.substring(token.indexOf('&')+1)
  };
}

export function apiCallUrl(url, method, headers = {}, body = '') {
  return request(headers, {
    url: url,
    method: method,
    body: (method === 'GET') ? null : body
  }, false);
}

export function getUrl() {
  if (process.env.NODE_ENV === "development") {
    return API_BASE_URL;
  }
  let base = new URL(API_BASE_URL);
  return window.location.protocol + "//" + window.location.host + base.pathname;
}

export function authenticate(loginRequest) {
  return request({
    'Content-Type': 'application/x-www-form-urlencoded'
  }, {
    url: getUrl() + "/authenticate",
    method: 'POST',
    body: Object.keys(loginRequest).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(loginRequest[key])).join('&')
    //body: JSON.stringify(loginRequest)
  }, false);
}

export function getCurrentUser() {
  if(!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({}, {
    url: getUrl() + "/users/me",
    method: 'GET'
  });
}

export function hasRole(user, role) {
    return (user != null && (user.roles || []).indexOf(role) !== -1);
}


export function listUsers(pattern = "", size = 1024) {
  return request({}, {
    url: getUrl() + "/users/clients?pattern=" + encodeURIComponent(pattern) + "&page=0&size=" + size,
    method: 'GET'
  });
}

export function putUser(user) {
  return request({
    'Content-Type': 'application/json'
  }, {
    url: getUrl() + "/users/clients",
    method: 'PUT',
    body: JSON.stringify(user)
  });
}

export function deleteUser(id) {
  return request({}, {
    url: getUrl() + "/users/clients/" + encodeURIComponent(id),
    method: 'DELETE',
  });
}

export function authUser(id) {
  return request({
    'Content-Type': 'application/x-www-form-urlencoded'
  }, {
    url: getUrl() + "/users/authenticate",
    method: 'POST',
    body: "clientId=" + encodeURIComponent(id) + "&secret="
  });
}

export function dictionaryApi(lang, word) {
  return request({
  }, {
    url: PROXY_URL + "https://api.dictionaryapi.dev/api/v2/entries/" + encodeURIComponent(lang) + "/" + encodeURIComponent(word),
    method: 'GET',
  }, false);

}

export function translateApi(from, to, word) {
  return request({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': 'VWeFHcSBRHPp7iRY8fAU',
    'X-Naver-Client-Secret': 'bghRympbEx'
  }, {
    url: PROXY_URL + "https://openapi.naver.com/v1/papago/n2mt",
    method: 'POST',
    body: "source=" + encodeURIComponent(from) + "&target=" + encodeURIComponent(to) + "&text=" + encodeURIComponent(word),
  }, false);
}
