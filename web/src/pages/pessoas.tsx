import { useEffect, useState } from "react";
import { API_URL } from "../config";

import {
    Plus,
    Trash2,
    Users
} from "lucide-react";

/*
* ---------------------------------------
*        GERENCIAMENTO DE PESSOAS
* ---------------------------------------
* 
* Tela responsável pelo cadastro, listagem
* e exclusão das pessoas no sistema.
*/

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

export default function Pessoas() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [confirmarExclusao,setConfirmarExclusao] = useState(false);
    const [pessoaExcluir, setPessoaExcluir] = useState<Pessoa | null>(null);

    /*
    * busca todas as pessoas cadastradas na API */
    async function carregarPessoas() {
        const resposta = await fetch(
            `${API_URL}/Pessoas`);
        const dados = await resposta.json();

        setPessoas(dados);
    }

    /*
    * envia uma nova pessoa para a API */
    async function criarPessoa() {
        const resposta = await fetch(
            `${API_URL}/Pessoas`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    nome,
                    idade: Number(idade)})
            });

        if (!resposta.ok) {
            const erro = await resposta.text();
            alert(erro);
            return;
        }

        /* VERIFICAÇÃO: idade deve ser informada
        */
        if (idade === "") {
            alert("A idade é obrigatória.");
            return;
        }
        setNome("");
        setIdade("");
        carregarPessoas();
    }

    /*
    * remove uma pessoa cadastrada */
    async function excluirPessoa(id: number) {
        await fetch(
            `${API_URL}/Pessoas/${id}`,
            {
                method: "DELETE"
            });
        carregarPessoas();
    }

    /*
    * carrega os dados ao abrir a tela */
    useEffect(() => {
        carregarPessoas();
    }, []);

    /*
    * abre o modal de confirmação
    * para exclusão de alguma pessoa */
    function abrirExclusao(pessoa: Pessoa) {
        setPessoaExcluir(pessoa);
        setConfirmarExclusao(true);
    }

    return (
        <section>
            <div className="header">
                <h2>Pessoas</h2>

                <button className="btn-novo"
                    onClick={() =>
                        setModalAberto(true)}>
                    <Plus size={21} strokeWidth={3}/>
                </button>
            </div>

            {modalAberto && (
                <div className="modal-fundo">
                    <div className="modal">
                        <h3>
                            Cadastrar nova pessoa
                        </h3>

                        <div className="modal-linha">
                            <div className="modal-campo nome">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) =>
                                        setNome(e.target.value)}>
                                </input>
                            </div>

                            <div className="modal-campo idade">
                                <label>Idade</label>
                                <input
                                    type="number"
                                    value={idade}
                                    onChange={(e) =>
                                        setIdade(e.target.value)}>
                                </input>
                            </div>
                        </div>

                        <div className="modal-botoes">
                            <button className="btn-secundario"
                                onClick={() =>
                                    setModalAberto(false)}>
                                Cancelar
                            </button>

                            <button className="btn-primario"
                                onClick={async () => {
                                    await criarPessoa();
                                    setModalAberto(false);}}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
                )
            }

            {confirmarExclusao &&
                pessoaExcluir && (
                    <div className="modal-fundo">
                        <div className="modal">
                            <h3>
                                Deseja mesmo excluir
                                <strong>
                                    {" "}{pessoaExcluir.nome}
                                </strong>
                                ?
                            </h3>

                            <p>
                                Todas as transações associadas também serão removidas.
                            </p>

                            <div className="modal-botoes">
                                <button className="btn-secundario"
                                    onClick={() =>
                                        setConfirmarExclusao(false)}>
                                    Cancelar
                                </button>

                                <button className="btn-primario"
                                    onClick={async () => {
                                        await excluirPessoa(pessoaExcluir.id);
                                        setConfirmarExclusao(false);
                                        setPessoaExcluir(null);}}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.length === 0 ? (
                        <tr>
                            <td className="empty-state"
                                colSpan={4}>
                                <div className="empty-icon">
                                    <Users size={30}/>
                                </div>
                                Não há pessoas cadastradas.
                                <br/>
                                <button className="empty-link"
                                    onClick={() =>
                                        setModalAberto(true)}>
                                    Clique aqui para começar.
                                </button>
                            </td>
                        </tr>
                    ) : (
                    pessoas.map((pessoa) => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.id}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.idade}</td>
                            <td>
                                <button className="btn-excluir"
                                    onClick={() =>
                                        abrirExclusao(pessoa)}>
                                    <Trash2 size={21} color="#FF7F7F"/>
                                </button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </section>
    );
}