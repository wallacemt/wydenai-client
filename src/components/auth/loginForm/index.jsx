import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import BannerLateral from "../../bannerLateral";
const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleCadastroClick = () => {
        navigate("/register");
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <BannerLateral />
            <div className="left">
                <div className="logo-container">
                    <div className="logo"></div>
                    <p>A inteligência artificial que transforma sua experiência universitária.</p>
                </div>

                <div className="form-container">
                    <p>Login é Senha</p>
                    <form action="#">
                        <div className="email-container">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Seu email" required />
                        </div>

                        <div className="password-container">
                            <i className="fas fa-lock"></i>
                            <input type={showPassword ? "text" : "password"} placeholder="********" required />
                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={handleShowPassword}></i>
                        </div>
                        <input type="submit" value="ENTRAR" className="submit-btn" />
                    </form>
                    <p>Não tem conta?</p>
                    <button className="cads-btn" onClick={handleCadastroClick}>Cadastrase</button>
                </div>
            </div>
        </>
    );
};

export default LoginForm;

