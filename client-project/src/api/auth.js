import {ENV} from "../utils/constants" 
const { SERVER_IP, API_ROUTES } = ENV;

export class Auth{
    //Register
    signup = async (data) => {
        const response = await fetch(`${SERVER_IP}${API_ROUTES.AUTH}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        try {
          if (response.status !== 201) {
            throw new Error("Error al crear usuario");
          }
        } catch (error) {
          throw error;
        }
    };
    //Login
    login = async (data) => {
        const response = await fetch(`${SERVER_IP}${API_ROUTES.LOGIN}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        try {
          if (response.status !== 200) {
            throw new Error("Error al crear usuario");
          }else{
            const { token } = await response.json();
            console.log(token);
            localStorage.setItem(ENV.JWT.ACCESS, token)
          }
        } catch (error) {
          throw error;
        }
      };
    //Get Log User

}