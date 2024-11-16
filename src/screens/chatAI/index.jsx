import React, { useState } from "react";
import ChatMenu from "../../components/chat/chat_menu";
import ChatDisplay from "../../components/chat/chat_display";

const ChatAI = () => {
    const [currentChat, setCurrentChat] = useState(null);

    const handleChatSelect = (chatId) => {
        setCurrentChat(chatId);
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <ChatMenu onChatSelect={handleChatSelect} />
            
            <div className="flex-1 flex justify-center items-center ml-1/4">
                <div className="w-full max-w-3xl h-[90%] bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <ChatDisplay chatId={currentChat} />
                </div>
            </div>
        </div>
    );
};

export default ChatAI;
