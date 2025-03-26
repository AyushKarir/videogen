// Set a cookie with an optional expiration (in days)
export const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

// Get a cookie by name
export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
