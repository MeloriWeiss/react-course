import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    console.log(isAuth);
    return (isAuth
        ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                        key={route.path}
                    ></Route>
                )};
            </Routes>
        : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                        key={route.path}
                    ></Route>
                )}
            </Routes>
    );
};

export default AppRouter;