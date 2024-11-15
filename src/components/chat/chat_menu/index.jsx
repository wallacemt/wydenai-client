import NewChatButton from "../../../../dist/icons/new_chat.svg";
import SideBarButton from "../../../../dist/icons/sidebar_button.svg";
import React, { useState, useEffect } from "react";
import { FaComment, FaEllipsisV } from "react-icons/fa";
import apiService from "../../../services/apiService";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isOptionsVisible, setIsOptionsVisible] = useState(null);
    const [hoveredChat, setHoveredChat] = useState(null);

    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);

    const [editingChatId, setEditingChatId] = useState(null);
    const [newChatTitle, setNewChatTitle] = useState(""); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const showOptions = (chatId) => {
        setIsOptionsVisible(chatId);
    };

    const hideOptions = () => {
        setIsOptionsVisible(null);
    };

    // Atualizar o chat atualmente selecionado
    const handleSelectChat = (chatId) => {
        setCurrentChat(chatId);
    };

    const handleEditChat = (chatId, currentTitle) => {
        if (editingChatId !== null) {
            setEditingChatId(null); // Limpar a edição de um chat anterior
        }
        setEditingChatId(chatId);
        setNewChatTitle(currentTitle); 
    };
    
    const handleSaveChatTitle = async (chatId) => {
        try {
            const response = await apiService.updateChatTitle(chatId, newChatTitle);
            console.log(response)
            if (response.status === "success") {
                setChats((prevChats) =>
                    prevChats.map((chat) =>
                        chat.id === chatId ? { ...chat, title: newChatTitle } : chat
                    )
                );
                setEditingChatId(null); 
            } else {
                console.error("Erro ao salvar título:", response.message);
            }
        } catch (error) {
            console.error("Erro ao salvar título do chat:", error);
        }
    };
    
    const handleCancelEdit = () => {
        setEditingChatId(null);
        setNewChatTitle("");
    };

    const createNewChat = async () => {
        try {
            console.log("Criar novo chat");

            const newChat = await apiService.chatStart(userId);

            console.log("Novo chat criado:", newChat);

            setChats((prevChats) => [...prevChats, newChat]);

            setCurrentChat(newChat.id);
        } catch (error) {
            console.error("Erro ao criar um novo chat", error);
        }
    };

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const storedUserId = userInfo ? userInfo.id : null;
        if (storedUserId) {
            setUserId(storedUserId);
        }

        if (userId) {
            const fetchChats = async () => {
                try {
                    const response = await apiService.getChats(userId);
                    if (response.status === "success") {
                        setChats(response.chats);
                    } else {
                        console.error(
                            "Erro na resposta do servidor",
                            response.message
                        );
                    }
                } catch (error) {
                    console.error("Erro ao obter chats", error);
                }
            };
            fetchChats();
        }
    }, [userId]);

    return (
        <div className="flex h-screen">
            <div
                className={`${
                    isMenuOpen ? "w-80" : "w-16"
                } bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out`}
            >
                <button className="p-3" onClick={toggleMenu}>
                    <img src={SideBarButton} alt="Menu" className="w-8 h-8" />
                </button>

                <div className="flex flex-col flex-grow">
                    <button
                        onClick={createNewChat}
                        className="flex items-center py-3 px-4 hover:bg-gray-700 mb-2"
                    >
                        <img
                            src={NewChatButton}
                            alt="Novo Chat"
                            className="mr-3 w-6 h-6"
                        />
                        {isMenuOpen && <span>Criar Novo Chat</span>}
                    </button>

                    <div className="flex-grow overflow-y-auto">
                        {chats.length === 0 ? (
                            <p
                                className="text-center py-4 transition-opacity duration-300 ease-in-out"
                                style={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
                            >
                                Nenhum chat encontrado.
                            </p>
                        ) : (
                            chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className="relative flex items-center py-3 px-4 hover:bg-gray-900 mb-2 "
                                    onMouseEnter={() => setHoveredChat(chat.id)}
                                    onMouseLeave={() => setHoveredChat(null)}
                                >
                                    {editingChatId === chat.id ? (
                                        <div className="flex items-center w-full">
                                            <input
                                                type="text"
                                                value={newChatTitle}
                                                onChange={(e) => setNewChatTitle(e.target.value)}
                                                className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-600"
                                            />
                                            <button
                                                className="ml-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                                onClick={() => handleSaveChatTitle(chat.id)}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex items-center w-full cursor-pointer"
                                            onClick={() => handleSelectChat(chat.id)}
                                        >
                                            <FaComment className="mr-3" />
                                            {isMenuOpen && <span>{chat.title}</span>}
                                        </div>
                                    )}

                                    {hoveredChat === chat.id && (
                                        <div
                                            className="absolute right-1 z-10"
                                            onMouseEnter={() => showOptions(chat.id)}
                                            onMouseLeave={() => {
                                                setTimeout(() => {
                                                    if (hoveredChat !== chat.id) {
                                                        hideOptions();
                                                    }
                                                }, 1000);
                                            }}
                                        >
                                            <FaEllipsisV className="text-white text-lg cursor-pointer" />
                                            {isOptionsVisible === chat.id && (
                                                <div className="absolute right-5 mt-2 w-32 bg-gray-950 text-white rounded-md shadow-lg">
                                                    <button
                                                        className="block py-2 px-4 hover:bg-gray-600"
                                                        onClick={() => handleEditChat(chat.id, chat.title)}
                                                    >
                                                        Editar Nome
                                                    </button>
                                                    <button
                                                        className="block py-2 px-4 hover:bg-gray-600"
                                                        onClick={() => console.log(`Deletar chat ${chat.id}`)}
                                                    >
                                                        Deletar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
