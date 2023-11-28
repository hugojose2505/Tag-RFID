import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import CadastarTag from "./pages/CadastarTag";
import VisualizarTag from "./pages/VisualizarTag";
import Registrar from "./pages/Registrar";
import VisualizarReg from "./pages/VisualizarReg";

export default function Rotas () {
    return (
        <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/tag-form" Component={CadastarTag} /> 
            <Route exact path="/tag-view" Component={VisualizarTag} /> 
            <Route exact path="/registrar" Component={Registrar} />     
            <Route exact path="/visualizar" Component={VisualizarReg} /> 
        </Routes>
    );
}