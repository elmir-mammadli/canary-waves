type StrapiInstance = {
  query: (uid: string) => {
    findOne: (params: Record<string, unknown>) => Promise<{ id: number } | null>;
  };
  db: {
    query: (uid: string) => {
      findOne: (params: Record<string, unknown>) => Promise<{ id: number } | null>;
      create: (params: Record<string, unknown>) => Promise<unknown>;
    };
  };
};

const FORM_SUBMISSION_CREATE_ACTION = "api::form-submission.form-submission.create";

export async function ensureFormSubmissionPermissions(strapi: StrapiInstance) {
  const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
    where: { type: "public" },
  });

  if (!publicRole) {
    return;
  }

  const existingPermission = await strapi.db.query("plugin::users-permissions.permission").findOne({
    where: {
      action: FORM_SUBMISSION_CREATE_ACTION,
      role: publicRole.id,
    },
  });

  if (existingPermission) {
    return;
  }

  await strapi.db.query("plugin::users-permissions.permission").create({
    data: {
      action: FORM_SUBMISSION_CREATE_ACTION,
      role: publicRole.id,
    },
  });
}
