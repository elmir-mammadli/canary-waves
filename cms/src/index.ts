export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const { seedHomePageIfMissing } = await import('./bootstrap/seed-home-page');
    try {
      await seedHomePageIfMissing(strapi as Parameters<typeof seedHomePageIfMissing>[0]);
    } catch (error) {
      strapi.log.warn(`[seed] Home page seed skipped: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
};
