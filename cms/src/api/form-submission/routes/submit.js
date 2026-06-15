"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/form-submissions/submit",
      handler: "form-submission.submit",
      config: {
        auth: false,
      },
    },
  ],
};
