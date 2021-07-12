const withTM = require("next-transpile-modules")(["three"]);
module.exports = withTM();

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? "./" : "",
};
