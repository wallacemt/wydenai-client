import api from "./api";

const apiService = {
    cadastrarUsuario: async (userData) => {
        try {
            const response  = await api.post(`/cadastro.php`, userData,{
                timeout: 10000
            });
            return response;
        }catch(error) {
            console.error("Erro ao cadastrar usuário", error);
            throw error;
        }
    },
    loginUsuario: async (loginData, attempt = 1) => {
        try {
            const response = await api.post(`/login.php`, loginData, {
                timeout: 10000 * attempt
            });
    
            if (response.data && response.data.chatToken) {
                return response;
            } else {
                throw new Error("Email ou senha incorretos");
            }
        } catch (error) {
            console.error(`Erro ao fazer login do usuário (tentativa ${attempt})`, error);
            if (attempt < 3) {
                return apiService.loginUsuario(loginData, attempt + 1);
            } else {
                throw error; 
            }
        }
    },
    getUserInfo: async (userId) => {
      try{
        const response	= await api.get(`/get_user_info.php?user_id=${userId}`, {
            timeout: 10000
        })
        return response.data;
      }catch(error) {
        console.error("Erro ao obter informações do usuário", error);
      } 
    },
    updateUserInfo: async (userId, email, nome) => {
        try {
            const response = await api.post(`/update_user_info.php`, {
                user_id: userId,
                email: email,
                nome: nome
            }, {
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar informações do usuário", error);
            throw error;
        }
    },
    deleteUser: async (user_id) => {
        try {
            const response = await api.delete(`/delete_user.php`, {
                data: {user_id}
            }, {
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
            throw error;
        }
    },
    chatStart: async (userId, attempt = 1) => {
        try {
            const response = await api.post("/chat_start.php", { user_id: userId }, {
                timeout: 10000 * attempt
            });
            return response.data;
        } catch (error) {
            console.error(`Erro ao iniciar o chat (tentativa ${attempt})`, error);
            if (attempt < 3) {
                return apiService.chatStart(userId, attempt + 1);
            } else {
                throw error;
            }
        }
    },
    getMessages: async (chatId, attempt = 1) => {
        try {
            const response = await api.get(`/get_messages.php?chat_id=${chatId}`, {
                timeout: 10000 * attempt
            });
            return response.data;
        }catch(error) {
            console.error(`Erro ao obter mensagens (tentativa ${attempt})`, error);
            if (attempt < 3) {
                return apiService.getMessages(chatId, attempt + 1);
            } else {
                throw error;
            }
        }
    },
    sendMessage: async (chatId, sender, message) => {
        try {
            const response = await api.post(`/send_message.php`,{
                chat_id: chatId,
                message: message, 
                sender: sender
            },
            {
                timeout: 10000
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
            console.error("Erro ao atualizar o título do chat", error);
            throw error;
        }
    },
    getChats: async (user_id, attempt = 1) => {
        try {
            const response = await api.get(`/get_chats.php?user_id=${user_id}`, {
                timeout: 10000 * attempt
            });
            return response.data;
        }catch(error) {
            console.error(`Erro ao obter os chats (tentativa ${attempt})`, error);
            if (attempt < 3) {
                return apiService.getChats(user_id, attempt + 1);
            } else {
                throw error;
            }
        }
    },
    deleteChat: async (chat_id) => {
        try {
            const response = await api.delete(`/delete_chat.php`, {
                data: {chat_id}
            })
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar o chat", error);
            throw error;
        }
    }
}

export default apiService;