import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import CadastarTag from "./pages/CadastarTag";
import VisualizarTag from "./pages/VisualizarTag";
import Registrar from "./pages/Registrar";
import VisualizarReg from "./pages/VisualizarReg";
import CadastarOS from "./pages/CadastrarOS";
import AssociarOS from "./pages/AssociarOS";
import VisualizarOS from "./pages/VisualizarOS";

export default function Rotas () {
    return (
        <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/tag-form" Component={CadastarTag} /> 
            <Route exact path="/tag-view" Component={VisualizarTag} /> 
            <Route exact path="/registrar" Component={Registrar} />     
            <Route exact path="/visualizar" Component={VisualizarReg} /> 
            <Route exact path="/cadastrarOS" Component={CadastarOS} /> 
            <Route exact path="/associarOS" Component={AssociarOS} />
            <Route exact path="/visualizarOS" Component={VisualizarOS} />
        </Routes>
    );
}