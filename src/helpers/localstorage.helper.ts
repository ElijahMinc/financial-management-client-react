type ACCESS_TOKEN_KEY_TYPE = 'ACCESS_TOKEN';

export const getTokenFromLocalStorage = (): string => {
  const data = localStorage.getItem('ACCESS_TOKEN');

  const token = data ? JSON.parse(data) : '';

  return token;
};

export const setTokenToLocalStorage = (
  key: ACCESS_TOKEN_KEY_TYPE,
  token: string,
): void => {
  localStorage.setItem(key, JSON.stringify(token));
};

export const removeTokenFromLocalStorage = (
  key: ACCESS_TOKEN_KEY_TYPE,
): void => {
  localStorage.removeItem(key);
};
