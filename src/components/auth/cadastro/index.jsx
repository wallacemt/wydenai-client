import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import BannerLateral from "../../bannerLateral";

const cursoOptions = [
    { value: "ADS", label: "Análise e Desenvolvimento de Sistemas" },
    { value: "ENGENHARIA", label: "Engenharia" },
    { value: "ENGENHARIA DE SOFTWARE", label: "Engenharia de Software" },
    { value: "SISTEMAS DE INFORMAÇÃO", label: "Sistemas de Informação" },
];

const CadastroForm = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [senha, setSenha] = useState("");
    const [repitaSenha, setRepitaSenha] = useState("");
    const [erro, setErro] = useState(null); 
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (senha !== repitaSenha) {
            setErro("As senhas não coincidem");
        } else if (!email.includes("@")) {
            setErro("Email inválido");
        } else if (!nome.trim()) {
            setErro("Nome completo é obrigatório");
        } else {
            setErro(null);
        }
    };
    const handleLoginClick = () => {
        navigate("/");
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
                    <p>Cadastro</p>
                    <form onSubmit={handleSubmit}>
                        <div className="nome-container">
                            <label htmlFor="nome">Nome completo</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite seu nome completo"
                                required
                            />
                        </div>

                        <div className="curso-container">
                            <label htmlFor="curso">Curso</label>
                            <select
                                id="curso"
                                value={curso}
                                onChange={(e) => setCurso(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Selecione um curso
                                </option>
                                {cursoOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="email-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                required
                            />
                        </div>

                        <div className="password-container">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                required
                            />
                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={handleShowPassword}></i>
                        </div>

                        <div className="password-container">
                            <label htmlFor="repita-senha">Repita a senha</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="repita-senha"
                                value={repitaSenha}
                                onChange={(e) => setRepitaSenha(e.target.value)}
                                placeholder="Repita sua senha"
                                required
                            />
                        </div>

                        {erro && <p className="erro">{erro}</p>}

                        <input type="submit" value="CADASTRAR" className="submit-btn" />
                    </form>
                    <p>Já tem conta?</p>
                    <button className="cads-btn" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </>
    );
};

export default CadastroForm;

