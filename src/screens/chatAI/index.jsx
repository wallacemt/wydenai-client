import React from "react";
import ChatMenu from "../../components/chat/chat_menu";
import { useNavigate } from "react-router-dom";
const ChatAI = () => {
    // const navigate = useNavigate()
    // const handleLoggout = () => {
    //     localStorage.removeItem("chatToken");
    //     localStorage.removeItem("userInfo");
    //     navigate("/");
    // };
    return (
        <div>
            <ChatMenu/>
        </div>
    );
};

export default ChatAI;