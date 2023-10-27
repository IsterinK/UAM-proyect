/* const SERVER_IP = 'https://uam-proyect-production.up.railway.app/' */
const SERVER_IP = 'http://localhost:3000/'
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
    DELETE_USER: "users/delete/",

    // Address
    CREATE_ADDRESS: "addresses/newaddress"
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh"
  }
}

