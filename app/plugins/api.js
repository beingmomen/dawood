export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  const api = $fetch.create({
    baseURL,
    onRequest({ options }) {
      // Future: Add authentication headers here if needed
      // const session = useAuth(); // example
      // if (session.value?.token) {
      //   options.headers = options.headers || {};
      //   options.headers.Authorization = `Bearer ${session.value.token}`;
      // }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await navigateTo("/login");
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
