import api from "./api";

const apiService = {
    cadastrarUsuario: async (userData) => {
        try {
            const response  = await api.post(`/cadastro.php`, userData,{
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
            const response = await api.post(`/login.php`, loginData, {
                timeout: 5000
            });
    
            if (response.data && response.data.chatToken) {
                return response;
            } else {
                throw new Error("Email ou senha incorretos");
            }
        } catch (error) {
            console.error("Erro ao fazer login do usuário", error);
            throw error; 
        }
    },
    chatStart: async (userId) => {
        try {
            const response = await api.post("/chat_start.php", {user_id: userId}, {
                timeout: 5000
            });
            return response.data;
        }catch(error) {
            console.error("Erro ao iniciar o chat", error);
            throw error;
        }
    },
    getMessages: async(chatId) => {
        try {
            const response = await api.post(`/get_messages.php?chatId=${chatId}`);
            return response.data;
        }catch(error) {
            console.error("Erro ao obter mensagens", error);
            throw error;
        }
    },
    sendMessage: async (chatId, sender, message) => {
        try {
            const response = await api.post(`/send_message.php`,{
                chat_id: chatId,
                message: message, 
                sender: sender
            });
            return response.data;
        }catch(error) {
            console.error("Erro ao enviar mensagem", error);
            throw error;
        }
    },
    updateChatTitle: async (chatId, title) => {
        try {
            const response = await api.put(`/update_chat_title.php`, {
                chat_id: chatId,
                title
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar o t tulo do chat", error);
            throw error;
        }
    },
    getChats: async (user_id) => {
        try {
            const response = await api.get(`/get_chats.php?user_id=${user_id}`, {
                timeout: 5000
            });
            return response.data;
        }catch(error) {
            console.error("Erro ao obter os chats", error);
            throw error;
        }
    }

}

export default apiService;