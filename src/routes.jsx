import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/auth/login';
import CadastroScreen from './screens/auth/cadastro';
import ChatAI from './screens/chatAI';
const AppRoutes = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/register" element={<CadastroScreen />} />
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
