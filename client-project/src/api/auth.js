import {ENV} from "../utils/constants" 
const { BASE_API_URL, API_ROUTER } = ENV;
export class Auth{
    //Register
    register = async (data) => {
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.REGISTER}`, {
          mode: 'no-cors',
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
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.LOGIN}`, {
          mode: 'no-cors',
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