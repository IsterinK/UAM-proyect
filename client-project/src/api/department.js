import {ENV} from "../utils/constants" 
const { BASE_API_URL, API_ROUTER } = ENV;

export class Department{
    getDepartments = async () => {
        try {
            const response = await fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
    
            const uniqueData = [];
            const departamentoSet = {};
            for (const item of data) {
                const departamento = item.departamento;
                if (!departamentoSet[departamento]) {
                    departamentoSet[departamento] = true;
                    uniqueData.push({ label: departamento, value: departamento });
                }
            }
            uniqueData.sort((a, b) => a.label.localeCompare(b.label));
            return uniqueData;
        } catch (err) {
            console.error(err);
            return []; // Return an empty array in case of an error
        }
    };    
  
    getMunByDepartment = async (department) => {
        try {
            const response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`);
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
    
            const uniqueMunicipios = [];
            const municipioSet = {};
    
            for (const item of data) {
                if (item.departamento === department) {
                    const municipio = item.municipio;
                    if (!municipioSet[municipio]) {
                        municipioSet[municipio] = true;
                        uniqueMunicipios.push({ label: municipio, value: municipio });
                    }
                }
            }
    
            // Ordenar uniqueMunicipios alfabéticamente por la propiedad 'label'
            uniqueMunicipios.sort((a, b) => a.label.localeCompare(b.label));
    
            return uniqueMunicipios;
    
        } catch (error) {
            console.error(error);
            return [{ label: 'Error en el servidor', value: 'Error en el servidor' }];
        }
    }
    
    createAddress = async (data) => {
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.CREATE_ADDRESS}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(data),
        });
        try {
          if (response.status !== 201) {
            console.log(response)
            throw new Error("Error al crear dirección");
          }else{
            const result = await response.json();
            return result._id
          }
        } catch (error) {
          throw error;
        }
    };
    
}