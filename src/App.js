import './styles/App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import ErrorPage from "./pages/ErrorPage";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import {useState} from "react";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Navbar></Navbar>
                <AppRouter></AppRouter>
                {/*<Navigate to="/error" replace={true}></Navigate>*/}
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
