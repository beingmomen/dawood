export function useAPI(url, opts = {}) {
  const { api } = useNuxtApp();

  return useFetch(url, {
    ...opts,
    $fetch: api
  });
}