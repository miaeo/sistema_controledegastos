import { useEffect, useState } from "react";
import { API_URL } from "../config";

import {
    Plus,
    Wallet
} from "lucide-react";

/*
* ---------------------------------------
*       GERENCIAMENTO DE TRANSAÇÕES
* ---------------------------------------
*
* Tela responsável pela interface de
* cadastro e listagem de transações.
*/

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    pessoaId: number;
}

export default function Transacoes() {

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("Receita");
    const [pessoaId, setPessoaId] = useState("");

    const [modalAberto, setModalAberto] = useState(false);


    /*
    * busca todas as pessoas cadastradas na API
    * para preencher a seleção de responsáveis */
    async function carregarPessoas() {
        const resposta = await fetch(
            `${API_URL}/Pessoas`);
        const dados = await resposta.json();

        setPessoas(dados);
    }

    /*
    * busca todas as transações cadastradas na API */
    async function carregarTransacoes() {
        const resposta = await fetch(
            `${API_URL}/Transacoes`);
        const dados = await resposta.json();

        setTransacoes(dados);
    }

    /*
    *envia uma nova transação para a API */
    async function criarTransacao() {
        const resposta = await fetch(
            `${API_URL}/Transacoes`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    descricao,
                    valor: Number(valor),
                    tipo,
                    pessoaId: Number(pessoaId)})
            });
        if (!resposta.ok) {
            const erro = await resposta.text();
            alert(erro);
            return;
        }
        setDescricao("");
        setValor("");
        setTipo("Receita");
        setPessoaId("");
        carregarTransacoes();
    }

    /*
    * carrega os dados ao abrir a tela */
    useEffect(() => {
        carregarPessoas();
        carregarTransacoes();
    }, []);

    return (
        <section>
            <div className="header">
                <h2>Transações</h2>

                <button className="btn-novo"
                    onClick={() => {
                        /* impede o cadastro de novas transações
                        * enquanto não houver pessoas cadastradas */
                        if (pessoas.length === 0) {
                            alert("Cadastre uma pessoa antes de criar transações.");
                            return;
                        }
                        setModalAberto(true);}}>
                    <Plus size={21} strokeWidth={3}/>
                </button>
            </div>

            {modalAberto && (
                <div className="modal-fundo">
                    <div className="modal">
                        <h3>Adicionar nova transação</h3>

                        <div className="modal-campo">
                            <label>Descrição</label>
                            <input
                                type="text"
                                value={descricao}
                                onChange={(e) =>
                                    setDescricao(e.target.value)}>
                            </input>
                        </div>

                        <div className="modal-linha">
                            <div className="modal-campo nome">
                                <label>Valor</label>
                                <input
                                    type="number"
                                    value={valor}
                                    onChange={(e) =>
                                        setValor(e.target.value)}>
                                </input>
                            </div>

                            <div className="modal-campo idade">
                                <label>Tipo</label>
                                <select
                                    value={tipo}
                                    onChange={(e) =>
                                        setTipo(e.target.value)}>
                                    <option value="Receita">
                                        Receita
                                    </option>
                                    <option value="Despesa">
                                        Despesa
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-campo">
                            <label>Pessoa</label>
                            <select
                                value={pessoaId}
                                onChange={(e) =>
                                    setPessoaId(e.target.value)}>
                                <option value="">
                                    Selecione uma pessoa
                                </option>
                                {pessoas.map((p) => (
                                    <option
                                        key={p.id}
                                        value={p.id}>
                                        {p.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-botoes">
                            <button className="btn-secundario"
                                onClick={() =>
                                    setModalAberto(false)}>
                                Cancelar
                            </button>

                            <button className="btn-primario"
                                onClick={async () => {
                                    await criarTransacao();
                                    setModalAberto(false);
                                    setDescricao("");
                                    setValor("");
                                    setTipo("Receita");
                                    setPessoaId("");}}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Responsável</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.length === 0 ? (
                        <tr>
                            <td className="empty-state"
                                colSpan={5}>
                                <div className="empty-icon">
                                    <Wallet size={30}/>
                                </div>
                                Nenhuma transação adicionada.
                                <br/>
                                <button className="empty-link"
                                    onClick={() => {
                                        /* impede o cadastro de novas transações
                                        * enquanto não houver pessoas cadastradas */
                                        if (pessoas.length === 0) {
                                            alert("Cadastre uma pessoa antes de criar transações.");
                                            return;
                                        }
                                        setModalAberto(true);}}>
                                    Registre sua primeira transação aqui.
                                </button>
                            </td>
                        </tr>
                    ) : (
                    transacoes.map((transacao) => {
                        /* localiza o responsável pela transação
                        * para exibir seu nome na tabela */
                        const pessoa = pessoas.find(p => p.id === transacao.pessoaId);
                        return (
                            <tr key={transacao.id}
                                className={
                                    transacao.tipo === "Receita"
                                        ? "linha-receita"
                                        : "linha-despesa"}>
                                <td>{transacao.id}</td>
                                <td>{transacao.descricao}</td>
                                <td>{transacao.valor}</td>
                                <td>{transacao.tipo}</td>
                                <td>{pessoa?.nome} <small>(#{transacao.pessoaId})</small></td>
                            </tr>
                        );
                    }))}
                </tbody>
            </table>
        </section>
    );
}