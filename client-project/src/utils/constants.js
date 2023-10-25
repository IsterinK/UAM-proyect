const SERVER_IP = 'https://uam-proyect-production.up.railway.app/'
/* const API = 'api/' */
const API_VERSION = 'api/v1/'

export const ENV = {
  BASE_API_URL: SERVER_IP /* + API */ + API_VERSION,
  BASE_URL: SERVER_IP,
  API_ROUTER: {
    REGISTER: "users/signup",
    LOGIN: "users/login",
    USERS: "users/",
    CREATE_USER: "users/new-user",
    GETME: "users/get-me",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh"
  }
}

