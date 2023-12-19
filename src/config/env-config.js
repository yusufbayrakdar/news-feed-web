const ENVIRONMENT = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
};
const APP = {
  development: {API_PATH: `http://localhost:5001/development`},
  production: {API_PATH: ""}
};
export const activeEnvironment =
  process.env.NODE_ENV === "development" ? ENVIRONMENT.DEVELOPMENT : ENVIRONMENT.PRODUCTION;

const APP_CONFIG = APP[activeEnvironment];

export default APP_CONFIG;
