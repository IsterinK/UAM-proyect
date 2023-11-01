import {ENV} from "../utils/constants" 
const { BASE_API_URL, API_ROUTER } = ENV;
export class Auth{
    //Register
    register = async (formData) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.REGISTER}`, {
          method: "POST",
          body: formData
      });
      try {
          if (response.status !== 201) {
              throw new Error("Error al crear usuario");
          } else {
              return "Usuario creado con éxito";
          }
      } catch (error) {
          throw error;
      }
    };

    //Login
    login = async (data) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          const { access } = await response.json();
          localStorage.setItem(ENV.JWT.ACCESS, access)
          return true
        }
      } catch (error) {
        throw error;
      }
    };

    //Get Log User
    setAccessToken = (accessToken) => {
      localStorage.setItem("access", accessToken);
    };

    getAccessToken = () => {
      return localStorage.getItem("access");
    };

    async getMe() {
      const accessToken = this.getAccessToken();
      try {
        const url = `${BASE_API_URL}${API_ROUTER.GETME}`
        const params = {
          method: "GET",
          headers:{
            Authorización: `Bearer ${accessToken}`
          },
        };
        const response = await fetch(url, params)
        const result = response.json()

        if(response.status !== 200) throw result

        return result
      } catch (error) {
        throw error
      }
    };

    async createUser(data) {
      const accessToken = this.getAccessToken();
      try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
  
        if (data.fileAvatar) {
          formData.append("avatar", data.fileAvatar);
        }
  
        const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
        const params = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        };
  
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 201){
          throw result
        }
  
        return result;
      } catch (error) {
        throw error;
      }
    }

    getUsers = async () => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.USERS}`, {
        /* mode: 'no-cors', */
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      try {
        if (response.status !== 200) {
          throw new Error("Error al obtener usuarios");
        }else{
          const result = await response.json()
          return result
        }
      } catch (error) {
        throw error;
      }

    };

    async deleteUser(idUser) {
      const accessToken = this.getAccessToken();
      try {
        const response = await fetch(
          `${BASE_API_URL}${API_ROUTER.DELETE_USER}${idUser}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        return true;
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
      }
    }

}