import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../../services/apiService";
const UserEdit = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const openModal = () => {
    setDropdownOpen(false);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo")).id;
        const response = await apiService.getUserInfo(userId);
        setNome(response.user.nome);
        setEmail(response.user.email);
      } catch (error) {
        console.error("Erro ao obter informações do usuário", error);
      }
    };
    fetchUserInfo();
  }, []);
  
  const updateUserInfo = async (email, nome) => {
    try{
        console.log(email, nome)
        const userId = JSON.parse(localStorage.getItem("userInfo")).id
        const response = await apiService.updateUserInfo(userId, email, nome)
        if(response.status === "success") {
            alert("Informações atualizadas com sucesso!")
        }
    }catch(error) {
      console.error("Erro ao atualizar informações do usuário", error);
    } 
  }

  const deleteUser = async () => {
    if(window.confirm("Deseja deletar sua conta?")){
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo")).id;
        const response = await apiService.deleteUser(userId);
        console.log(userId)
        console.log(response)
        if (response.status === "success") {
          alert("Usuário deletado com sucesso!");
          localStorage.removeItem("chatToken");
          localStorage.removeItem("userInfo");
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao deletar usuário", error);
      }
    }
  }
  const handleLogout = () => {
    if (window.confirm("Você deseja mesmo sair?")) {
      localStorage.removeItem("chatToken");
      localStorage.removeItem("userInfo");
      navigate("/");
    }
  }
  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full bg-[#FF2A00] flex items-center justify-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <i className="fas fa-user text-xl text-[#FFF]"></i>
      </div>

      {dropdownOpen && (
        <div className="absolute top-12 right-0 w-40 bg-[#89398A] rounded shadow-lg z-10">
          <ul>
            <li
              className="px-4 py-2 hover:bg-[#121212] cursor-pointer border-b border-[#FFF] text-[#FFF] text-blue-200 flex items-center"
              onClick={openModal}
            >
              <i className="fas fa-cog mr-2"></i> Opções
            </li>
            <li
              className="px-4 py-2 hover:bg-[#121212] cursor-pointer text-red-500 flex items-center"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </li>
          </ul>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          style={{ zIndex: 99999 }}
          onClick={closeModal}
        >
          <div
            className="bg-[#89398A] rounded-lg w-96 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center ">Editar Informações</h2>
            <form onSubmit={(e) => {e.preventDefault(); updateUserInfo(email, nome)}}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Nome:
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-black"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Email:
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col-reverse justify-end items-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                  onClick={deleteUser}
                >
                  Deletar Conta
                </button>
                <div>
                  <button
                    type="button"
                    className="mr-2 bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEdit;
