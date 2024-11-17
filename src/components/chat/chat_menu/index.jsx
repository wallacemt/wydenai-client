import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu"; // Importando o react-burger-menu
import { FaFacebookMessenger, FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
import apiService from "../../../services/apiService";

const Navbar = ({ onChatSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isOptionsVisible, setIsOptionsVisible] = useState(null);
  const [hoveredChat, setHoveredChat] = useState(null);

  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const [editingChatId, setEditingChatId] = useState(null);
  const [newChatTitle, setNewChatTitle] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const showOptions = (chatId) => {
    setIsOptionsVisible(chatId);
  };

  const hideOptions = () => {
    setIsOptionsVisible(null);
  };

  const handleSelectChat = (chatId) => {
    onChatSelect(chatId);
    setCurrentChat(chatId);
    setIsMenuOpen(false);
  };

  const handleEditChat = (chatId, currentTitle) => {
    if (editingChatId !== null) {
      setEditingChatId(null);
    }
    setEditingChatId(chatId);
    setNewChatTitle(currentTitle);
  };

  const handleSaveChatTitle = async (chatId) => {
    try {
      const response = await apiService.updateChatTitle(chatId, newChatTitle);
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

  const handleDeleteChat = async (chatId) => {
    try {
      const response = await apiService.deleteChat(chatId);
      if (response.status === "success") {
        setChats((prevChats) =>
          prevChats.filter((chat) => chat.id !== chatId)
        );
      } else {
        console.error("Erro ao deletar o chat:", response.message);
      }
    } catch (error) {
      console.error("Erro ao deletar o chat:", error);
    }
  };

  const createNewChat = async () => {
    try {
      const newChat = await apiService.chatStart(userId);
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
            console.error("Erro na resposta do servidor", response.message);
          }
        } catch (error) {
          console.error("Erro ao obter chats", error);
        }
      };
      fetchChats();
    }
  }, [userId]);

  return (
    <>
      <div className="flex h-screen">
        <div className="relative">
          <div className="fixed top-0 left-2" style={{ zIndex: 90000 }}>
            <input
              type="checkbox"
              id="checkbox"
              className="hidden"
              checked={isMenuOpen}
              onChange={toggleMenu}
            />
            <label
              htmlFor="checkbox"
              className="toggle cursor-pointer flex flex-col justify-center items-center w-10 h-10 gap-1 transition-transform duration-500"
            >
              <div
                className={`bars w-full h-1 bg-purple-500 rounded-md transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-3" : ""
                }`}
              ></div>
              <div
                className={`bars w-full h-1 bg-purple-500 rounded-md transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`bars w-full h-1 bg-purple-500 rounded-md transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></div>
            </label>
          </div>
          <Menu
            isOpen={isMenuOpen}
            onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
            left
            className="bg-gray-800 text-white h-screen"
            width={370}
            styles={{
              bmMenuWrap: {
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
              },
              bmMenu: {
                background: "#373a47",
                padding: "2.5em 1.5em 0",
                fontSize: "1.15em",
              },
              bmItemList: {
                color: "#b8b7ad",
                listStyleType: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#4f5158",
                },

              },
            }}
          >
            <button
              onClick={createNewChat}
              className="flex items-center py-3 px-4 hover:bg-gray-800 mb-5"
            >
              <span className="text-white font-bold text-lg flex items-center"><FaEdit className="mr-2 w-6 h-6" />Criar Novo Chat</span>
            </button>

            <div className="flex-grow overflow-y-auto h-5/6">
              {chats.length === 0 ? (
                <p className="text-center py-4">Nenhum chat encontrado.</p>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="relative flex items-center py-4 px-4 hover:bg-gray-900 mb-4"
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
                          className="ml-2 bg-green-500 text-white px-3 py-1 rounded-md"
                          onClick={() => handleSaveChatTitle(chat.id)}
                        >
                          Salvar
                        </button>
                        <button
                          className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md"
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div
                        className="flex items-center w-full cursor-pointer border-b border-black-900 pb-2 mb-2 w-full cursor-pointer "
                        onClick={() => handleSelectChat(chat.id)}
                      >
                        <FaFacebookMessenger className="mr-3 w-6 h-6" />
                        <span>{chat.title}</span>
                      </div>
                    )}

                    {hoveredChat === chat.id && (
                      <div className="absolute right-1 z-10">
                        <FaEllipsisV
                          className="text-white text-lg cursor-pointer"
                          onClick={() => {
                            if (isOptionsVisible === chat.id) {
                              hideOptions();
                            } else {
                              showOptions(chat.id);
                            }
                          }}
                        />
                        {isOptionsVisible === chat.id && (
                          <div className="absolute right-5 mt-2 w-32 bg-gray-950 text-white rounded-md shadow-lg">
                            <button
                              className="flex items-center py-1 px-4 w-full hover:bg-gray-800 text-blue-400 text-m"
                              onClick={() => handleEditChat(chat.id, chat.title)}
                            >
                              <FaEdit className="mr-2" />
                              Editar Titulo
                            </button>
                            <button
                              className="flex items-center py-1 px-4 w-full hover:bg-red-200 text-red-600 text-m" 
                              onClick={() => handleDeleteChat(chat.id)}
                            >
                              <FaTrashAlt className="mr-2" />
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
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
