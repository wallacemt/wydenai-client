import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginScreen from './screens/auth/login';
import CadastroScreen from './screens/auth/cadastro';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path='/register' element={<CadastroScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes