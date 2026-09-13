export const api = (path: string, init?: RequestInit) =>
  fetch(import.meta.env.BASE_URL + 'api/' + path.replace(/^\/+/, ''), init)
