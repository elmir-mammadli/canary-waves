"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value) {
  return typeof value === "string" ? value.trim() : "";
}

module.exports = createCoreController("api::form-submission.form-submission", ({ strapi }) => ({
  async submit(ctx) {
    const body = ctx.request.body ?? {};
    const name = readString(body.name);
    const email = readString(body.email);
    const company = readString(body.company);
    const message = readString(body.message);
    const source = readString(body.source) || "website-contact";
    const payload = typeof body.payload === "object" && body.payload !== null ? body.payload : {};

    if (!name || !email) {
      return ctx.badRequest("Name and email are required");
    }

    if (!emailRegex.test(email)) {
      return ctx.badRequest("Invalid email address");
    }

    const entry = await strapi.documents("api::form-submission.form-submission").create({
      data: {
        name,
        email,
        company,
        message,
        source,
        payload,
      },
    });

    ctx.body = {
      data: {
        id: entry.documentId,
      },
      message: "Form submitted successfully",
    };
  },
}));
