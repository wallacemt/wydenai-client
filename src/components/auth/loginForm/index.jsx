import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerLateral from "../../bannerLateral";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Popup from "../../popup"; 
import apiService from "../../../services/apiService";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCadastroClick = () => {
        navigate("/register");
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const loginData = {email, password};
            const response = await apiService.loginUsuario(loginData)
            setPopupType("success");
            setPopupMessage(response.message|| "Login realizado com sucesso!");
            localStorage.setItem("chatToken", response.data.chatToken);
            localStorage.setItem("userInfo", JSON.stringify({
                id: response.data.id,
                nome: response.data.nome,
                curso: response.data.curso
            }))
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }catch(error){
            setPopupMessage(`Error: ${error}`)
            setPopupType("error");
        }
        setLoading(false)
        setPopupVisible(true)
    };


    const handleClosePopup = () => {
        setPopupVisible(false); 
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
                <BannerLateral />
            </div>
            <div className="absolute right-0 top-0 bg-[#89398A] h-full w-full lg:w-1/3 flex flex-col overflow-hidden" data-aos='zoom-in'>
                <div className="h-[300px] flex flex-col items-center justify-center">
                    <div className="bg-[url('/logo.png')] bg-center bg-cover w-[244px] h-[104px]"></div>
                    <p className="text-gray-400 text-center text-lg font-normal">
                        A inteligência artificial que transforma sua experiência universitária.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-white text-lg mb-4">Login e Senha</p>
                    <form className="flex flex-col w-full" onSubmit={handleLogin}>
                        <div className="relative mb-4">
                            <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-[#003D73] text-2xl"></i>
                            <input
                                type="email"
                                placeholder="Seu email"
                                required
                                className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        <div className="relative mb-4">
                            <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-[#003D73] text-2xl"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                required
                                className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer`}
                                onClick={handleShowPassword}
                            ></i>
                        </div>

                        <input
                            type="submit"
                            value={loading? "Entrando..." : "Entrar"}
                            className="bg-[#FFA31C] text-white rounded-2xl py-4 w-full mb-4 hover:bg-[#ffa41c8e] transition"
                        />
                    </form>
                    <p className="text-center text-white">Não tem conta?</p>
                    <button
                        className="cads-btn mt-2 bg-[#1B1F30] text-white text-uppercase rounded-2xl py-4 w-full hover:bg-[#1b1f30b9] transition"
                        onClick={handleCadastroClick}
                    >
                        Cadastre-se
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

export default LoginForm;
