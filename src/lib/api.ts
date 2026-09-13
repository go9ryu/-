const API_BASE_URL = 'https://lmscelgj83.onrender.com';

export async function api(endpoint: string, options?: RequestInit) {
  return fetch(`\({API_BASE_URL}/api/\){endpoint}`, options);
}
