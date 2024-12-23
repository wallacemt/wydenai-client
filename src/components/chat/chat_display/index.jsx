import React, { useState, useEffect } from "react";
import wydenLogo from "../../../../public/logo-principal.png"; // Importe a logo
import apiService from "../../../services/apiService"; 
import LoadingSpinner from "../loading";
const ChatDisplay = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSendMessageDisabled, setSendMessageDisabled] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await apiService.getMessages(chatId); 
                console.log(response);
                if (response.status === "success") {
                    // Mapeia a resposta para extrair a mensagem e usá-la no estado
                    setMessages(response.messages.map(msg => ({
                        sender: msg.sender,
                        content: msg.message, // Altere 'message' para 'content'
                        timestamp: msg.timestamp
                    })));
                } else {
                    console.error("Erro ao carregar as mensagens:", response.message);
                }
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
            }finally{
                setIsLoading(false);
            }
        };

        if (chatId) {
            fetchMessages(); 
        }
    }, [chatId]); 

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            setSendMessageDisabled(true);
            try {
                const response = await apiService.sendMessage(chatId, "user", newMessage);

                if (response.status === "success") {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { sender: "user", content: newMessage },
                    ]);
                    setNewMessage("");
                }
            } catch (error) {
                console.error("Erro ao enviar a mensagem:", error);
            } finally{
                setSendMessageDisabled(false);
            }

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", content: "Resposta automatica da WydenAI" },
                ]);
            }, 2000);
        }
    };
    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto bg-gray-900 text-white h-full rounded-lg">
            <div className="flex items-center justify-center p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <img src={wydenLogo} alt="WydenAI" className="w-14 h-15" />
                    <h2 className="text-lg font-semibold">WydenAI</h2>
                </div>
            </div>

            <div className="flex flex-col p-4 overflow-y-auto flex-grow space-y-4 overflow-x-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <LoadingSpinner size={50} message="Carregando..."/>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center">
                        <p className="text-center text-gray-400">Nenhuma mensagem ainda.</p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-xs p-6 text-white ${message.sender === "user" ? "bg-blue-900 rounded-lg"  : "bg-gray-800 rounded-lg"}`}
                                style={{ borderRadius: message.sender === "user" ? "10px 0px 10px 10px" : "0px 10px 10px 10px" }}
                            >
                                <p>{message.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
                <textarea
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message WydenAI..."
                    style={{ height: "auto",maxHeight: "250px", overflowY: "auto"  }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                            e.preventDefault();
                        }
                    }}
                    onInput={(e) =>{
                        (e.target.style.height = "auto"),
                        (e.target.style.height = e.target.scrollHeight + "px")
                    }}
                    disabled={isSendMessageDisabled}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-[#FF2A00] text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none"
                    disabled={isSendMessageDisabled}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default ChatDisplay;

