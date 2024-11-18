import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/auth/login';
import CadastroScreen from './screens/auth/cadastro';
import ChatAI from './screens/chatAI';
const AppRoutes = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route
                path="/"
                element={
                    localStorage.getItem('chatToken')
                    ? <Navigate to="/chat" />
                    : <LoginScreen />
                }/>
                <Route
                path="/register"
                element={
                    localStorage.getItem('chatToken')
                    ? <Navigate to="/chat" />
                    : <CadastroScreen />
                }/>
                <Route
                path='/chat'
                element={
                    localStorage.getItem('chatToken')
                    ? <ChatAI />
                    : <Navigate to="/" />
                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
