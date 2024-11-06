import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerLateral from "../../bannerLateral";
import { cursoOptions } from "./cursoOptions.js"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Popup from "../../popup"; 

const CadastroForm = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [senha, setSenha] = useState("");
    const [repitaSenha, setRepitaSenha] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (senha !== repitaSenha) {
            setPopupMessage("As senhas não coincidem");
            setPopupType("error");
        } else if (!email.includes("@")) {
            setPopupMessage("Email inválido");
            setPopupType("error");
        } else if (!nome.trim()) {
            setPopupMessage("Nome completo é obrigatório");
            setPopupType("error");
        } else {
            setPopupMessage("Cadastro realizado com sucesso!");
            setPopupType("success");
            // Aqui você pode adicionar a lógica para enviar os dados para o backend
        }

        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false); 
    };

    const handleLoginClick = () => {
        navigate("/");
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out'
        });
    }, []);
    
    return (
        <>
            <div className="hidden lg:block">
                <BannerLateral/>
            </div>
            <div className="absolute right-0 top-0 bg-[#89398A] h-full w-full lg:w-1/3 flex flex-col " data-aos='zoom-in-left'>
                <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-3xl font-bold text-[#FFA31C] mb-4">Cadastrar</p>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full">
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="nome" className="text-white">Nome completo</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite seu nome completo"
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>

                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="curso" className="text-white">Curso</label>
                                <select
                                    id="curso"
                                    value={curso}
                                    onChange={(e) => setCurso(e.target.value)}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    <option value="" disabled>Selecione um curso</option>
                                    {cursoOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                required
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="senha" className="text-white">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="Digite sua senha"
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                                />
                                <i
                                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer`}
                                    onClick={handleShowPassword}
                                ></i>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="repita-senha" className="text-white">Repita a senha</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="repita-senha"
                                value={repitaSenha}
                                onChange={(e) => setRepitaSenha(e.target.value)}
                                placeholder="Repita sua senha"
                                required
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                            />
                        </div>

                        <input
                            type="submit"
                            value="CADASTRAR"
                            className="bg-[#FFA31C] text-white rounded-2xl py-3 w-full mb-4 hover:bg-[#ffa41c8e] transition"
                        />
                    </form>
                    <p className="text-center text-white">Já tem conta?</p>
                    <button
                        className="mt-2 bg-[#1B1F30] text-white rounded-2xl py-2 w-full hover:bg-[#1b1f30b9] transition"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </div>
            </div>
            
            {popupVisible && (
                <Popup
                    message={popupMessage}
                    type={popupType}
                    onClose={handleClosePopup}
                />
            )}
        </>
    );
};

export default CadastroForm;
