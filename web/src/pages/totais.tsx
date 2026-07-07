import { useEffect, useState } from "react";
import { API_URL } from "../config";

import {
    ChartColumn,
    TrendingUp,
    TrendingDown,
    DollarSign
} from "lucide-react";

/*
* ---------------------------------------
*          CONSULTA DE TOTAIS
* ---------------------------------------
*
* Tela responsável pela visualização do
* resumo financeiro individual e geral.
*/

interface ResumoPessoa {
    id: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

interface ResumoGeral {
    pessoas: ResumoPessoa[];
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
}

export default function Totais() {
    const [totais, setTotais] = useState<ResumoGeral | null>(null);

    /*
    * busca o resumo financeiro
    * disponibilizado pela API */
    async function carregarTotais() {
        const resposta = await fetch(
            `${API_URL}/Totais`);
        const dados = await resposta.json();

        setTotais(dados);
    }

    /*
    * formata os valores monetarios
    * e grandes valores sao abreviados 
    * pra nao ultrapassar o limite visual */
    function formatarValor(valor: number) {
        const abs = Math.abs(valor);
        if (abs >= 1_000_000) {
            return `${(valor / 1_000_000).toFixed(1)} mi`;
        }
        if (abs >= 1_000) {
            return `${(valor / 1_000).toFixed(1)} mil`;
        }
        return valor.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    /*
    * carrega os dados ao abrir a tela */
    useEffect(() => {
        carregarTotais();
    }, []);

    /*
    * exibe um estado inicial enquanto
    * os dados ainda estão sendo carregados */
    if (!totais) {
        return (
            <section>
                <div className="header">
                    <h2 style={{marginTop:'6px'}}>Resumo financeiro</h2>
                </div>
            </section>
        );
    }

    /*
    * exibe um estado vazio quando
    * não existem dados financeiros */
    if (totais && totais.pessoas.length === 0) {
        return (
            <section>
                <div className="header">
                    <h2 style={{marginTop:'6px'}}>Resumo financeiro</h2>
                </div>

                <div className="empty-dashboard">
                    <div className="empty-icon">
                        <ChartColumn size={30}/>
                    </div>

                    <p>Sem dados disponíveis.</p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="header">
                <h2 style={{marginTop:'6px'}}>Resumo financeiro</h2>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Responsável</th>
                        <th>Receitas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>

                <tbody>
                    {totais.pessoas.map((pessoa) => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.totalReceitas}</td>
                            <td>{pessoa.totalDespesas}</td>
                            <td>
                                <span className={
                                        pessoa.saldo >= 0
                                            ? "saldo-positivo"
                                            : "saldo-negativo"}>
                                    {pessoa.saldo}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="header">
                <h3 style={{marginTop:'45px', marginBottom:'12px'}}>Total</h3>
            </div>

            <div className="cards">
                <div className="card receita">
                    <div className="card-conteudo">
                        <div className="card-texto">
                            <span>Receitas</span>
                            <strong title={totais.totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                                <small>R$</small>
                                {formatarValor(totais.totalReceitas)}
                            </strong>
                        </div>
                        <div className="card-icone">
                            <TrendingUp size={24}/>
                        </div>
                    </div>
                </div>

                <div className="card despesa">
                    <div className="card-conteudo">
                        <div className="card-texto">
                            <span>Despesas</span>
                            <strong title={totais.totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                                <small>R$</small>
                                {formatarValor(totais.totalDespesas)}
                            </strong>
                        </div>
                        <div className="card-icone">
                            <TrendingDown size={24}/>
                        </div>
                    </div>
                </div>

                <div className="card saldo">
                    <div className="card-conteudo">
                        <div className="card-texto">
                            <span>Saldo líquido</span>
                            <strong title={totais.saldoLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                                <small>R$</small>
                                {formatarValor(totais.saldoLiquido)}
                            </strong>
                        </div>
                        <div className="card-icone">
                            <DollarSign size={24}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
