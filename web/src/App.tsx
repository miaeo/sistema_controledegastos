import { useState } from "react";
import Pessoas from "./pages/pessoas";
import Transacoes from "./pages/transacoes";
import Totais from "./pages/totais";

import {
    Users,
    Wallet,
    ChartColumn,
    RefreshCw,
    Landmark,
} from "lucide-react";

/*
* ---------------------------------------
*               NAVEGAÇÃO
* ---------------------------------------
*
* Funcionalidades:
* - controla a navegação entre as páginas
* - exibe a sidebar
* - renderiza  a página selecionada
*/

type Pagina =
    | "pessoas"
    | "transacoes"
    | "totais";

function App() {
    const [pagina, setPagina] = useState<Pagina>("pessoas");

    /*
    * recarrega a aplicação se necessário pra
    * atualizar os dados exibidos
    */
    function atualizarDados() {
        window.location.reload();
    }

    return (
        <div className="app">
            <aside className="sidebar">
                <h2><Landmark size={50} strokeWidth={1.3}/></h2>

                <button className={
                        pagina === "pessoas"
                            ? "active"
                            : ""}
                    onClick={() =>
                        setPagina("pessoas")}>
                    <Users size={24}/>
                    Pessoas
                </button>

                <button className={
                        pagina === "transacoes"
                        ? "active"
                        : ""}
                    onClick={() =>
                        setPagina("transacoes")}>
                    <Wallet size={24}/>
                    Transações
                </button>

                <button className={
                        pagina === "totais"
                        ? "active"
                        : ""}
                    onClick={() =>
                        setPagina("totais")}>
                    <ChartColumn size={24}/>
                    Totais
                </button>
            </aside>

            <main className="conteudo">
                <h1>
                    Controle de Gastos
                </h1>
                {pagina === "pessoas" &&
                    <Pessoas/>}
                {pagina === "transacoes" &&
                    <Transacoes/>}
                {pagina === "totais" &&
                    <Totais/>}
            </main>

            <button className="btn-atualizar"
                onClick={atualizarDados}>
                <RefreshCw size={24} strokeWidth={2.2} />
            </button>
        </div>
    );
}

export default App;