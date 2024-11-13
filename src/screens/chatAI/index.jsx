import React from "react";
import ChatMenu from "../../components/chat/chat_menu";
import { useNavigate } from "react-router-dom";
const ChatAI = () => {
    const navigate = useNavigate()
    const handleLoggout = () => {
        localStorage.removeItem("chatToken");
        localStorage.removeItem("userInfo");
        navigate("/");
    };
    return (
        <div>
            <ChatMenu />
            <h1>Bem-vindo ao Chat!</h1>
            <p>Você está autenticado e pode usar o chat.</p>
            <button onClick={handleLoggout}>Logout</button>
        </div>
    );
};

export default ChatAI;