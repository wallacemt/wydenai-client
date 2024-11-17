import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerLateral from "../../bannerLateral";
import { cursoOptions } from "./cursoOptions.js"; 
import Aos from 'aos';
import 'aos/dist/aos.css';
import Popup from "../../popup"; 
import apiService from "../../../services/apiService.js";
const CadastroForm = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [password, setPassword] = useState("");
    const [repitaPassword, setRepitaPassword] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [popupType, setPopupType] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(password !== repitaPassword) {
            setPopupMessage("As passwords não coicidem");
            setPopupType("error");
            setLoading(false);
        }else if(!email.includes("@")){
            setPopupMessage("Email Inválido")
            setPopupType("error");
            setLoading(false);
        }else if(!nome.trim()){
            setPopupMessage("Nome completo é obrigatório")
            setPopupType("error");
            setLoading(false);
        }else {
            const userData = {
                nome,
                email,
                curso,
                password
            }
            try {
                const response = await apiService.cadastrarUsuario(userData);
                if(response.data.message === "Usuario cadastrado com sucesso") {
                    setPopupMessage(response.data.message);
                    setPopupType("success");
                    setLoading(false);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            }catch (error) {
                setPopupMessage(`Error: ${error}`)
                setPopupType("error");
            }finally{
                setLoading(false);
            }
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
        Aos.init({
            duration: 2000,
            easing: 'ease-in-out'
        });
    }, []);
    
    return (
        <>
            <div className="hidden lg:block">
                <BannerLateral/>
            </div>
            <div className="absolute right-0 top-0 bg-[#89398A] h-full w-full lg:w-1/3 flex flex-col overflow-hidden" data-aos='zoom-in-left'>
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
                            <label htmlFor="password" className="text-white">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua password"
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
                            <label htmlFor="repita-password" className="text-white">Repita a Senha</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="repita-password"
                                value={repitaPassword}
                                onChange={(e) => setRepitaPassword(e.target.value)}
                                placeholder="Repita sua password"
                                required
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                            />
                        </div>

                        <input
                            type="submit"
                            value={loading? "Carregando...":"CADASTRAR"}
                            className={`${
                                loading ? "bg-gray-400" : "bg-[#FFA31C]"
                            } text-white rounded-2xl py-3 w-full mb-4 hover:bg-[#ffa41c8e] transition flex items-center justify-center`}
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
