export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options }) {
      // You can add headers or other request modifications here
      // For example, if you have authentication:
      // const token = useCookie('token').value;
      // if (token) {
      //   options.headers = options.headers || {};
      //   options.headers.Authorization = `Bearer ${token}`;
      // }
    },
    async onResponseError({ response }) {
      // Handle global error responses
      if (response.status === 401) {
        // Redirect to login or handle unauthorized
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
