export default {
  routes: [
    {
      method: 'GET',
      path: '/landing-page',
      handler: 'landing-page.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
