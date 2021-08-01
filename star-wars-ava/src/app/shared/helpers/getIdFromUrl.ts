export function getIdFromUrl(url, type): string {
  return url.replace(`https://swapi.dev/api/${type}/`, '').replace('/', '');
}
