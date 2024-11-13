import axios  from "axios";

const Api_Base_Url = 'http://localhost/project/api';

const apiService = {
    cadastrarUsuario: async (userData) => {
        try {
            const response  = await axios.post(`${Api_Base_Url}/cadastro.php`, userData,{
                timeout: 5000
            });
            return response;
        }catch(error) {
            console.error("Erro ao cadastrar usuário", error);
            throw error;
        }
    },
    loginUsuario: async (loginData) => {
        try {
            const response = await axios.post(`${Api_Base_Url}/login.php`, loginData, {
                timeout: 5000
            });

            console.log(response);
    
            if (response.data && response.data.chatToken) {
                return response;
            } else {
                throw new Error("Token não encontrado na resposta");
            }
        } catch (error) {
            console.error("Erro ao fazer login do usuário", error);
            throw error; 
        }
    }
}

export default apiService;