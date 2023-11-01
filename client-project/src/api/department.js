import {ENV} from "../utils/constants" 
const { BASE_API_URL, API_ROUTER } = ENV;

export class Department{
    getDepartments = async () => {
        try {

            if(localStorage.getItem("depAndMuns") === null ){
                const response = await fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                let data = await response.json();
                const uniqueData = [];
                const departamentoSet = {};
                for (const item of data) {
                    const departamento = item.departamento;
                    if (!departamentoSet[departamento]) {
                        departamentoSet[departamento] = true;
                        uniqueData.push({ label: departamento, value: departamento });
                    }
                }
                let depAndMun = []
                uniqueData.sort((a, b) => a.label.localeCompare(b.label));
                
                for (let i = 0; i < uniqueData.length; i++) {
                    
                    const response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${uniqueData[i].value}`);
                    const data = await response.json();

                    const municipioSet = {};
                    const uniqueMunicipios = [];
                    for (const item of data) {
                        if (item.departamento === uniqueData[i].value) {
                            const municipio = item.municipio;
                            if (!municipioSet[municipio]) {
                                municipioSet[municipio] = true;
                                uniqueMunicipios.push({ label: municipio, value: municipio });
                            }
                        }
                    }
                    uniqueMunicipios.sort((a, b) => a.label.localeCompare(b.label));
        
                    const auxDep = {
                        department: uniqueData[i],
                        municipios: uniqueMunicipios
                    }
                    depAndMun.push(auxDep)
                }
                
                localStorage.setItem("depAndMuns", JSON.stringify(depAndMun));
                return localStorage.getItem("depAndMuns")
            }else {
                return localStorage.getItem("depAndMuns")
            }
            
        } catch (err) {
            console.error(err);
            return []; // Return an empty array in case of an error
        }
    };    
  
    
    
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