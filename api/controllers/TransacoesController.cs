using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

/*
* ---------------------------------------
*      GERENCIAMENTO DE TRANSAÇÕES
* ---------------------------------------
*
* Funcionalidades:
* - criar transações
* - listar transações
*/ 
[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    /*
    * retorna todas transações cadastradas
    */
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
    {
        var transacoes = await _context.Transacoes.ToListAsync();

        return Ok(transacoes);
    }

    /* cria nova transação seguindo as regras de negocio
    */
    [HttpPost]
    public async Task<ActionResult<Transacao>> CriarTransacao(
        Transacao transacao)
    {
        /* VERIFICAÇÃO: se a pessoa existe
        */
        var pessoa = await _context.Pessoas
            .FindAsync(transacao.PessoaId);

        if (pessoa == null)
        {
            return BadRequest(
                "A pessoa informada não existe."
            );
        }

        /* VERIFICAÇÃO: se o tipo é valido
        */
        if (transacao.Tipo != "Receita" &&
            transacao.Tipo != "Despesa")
        {
            return BadRequest(
                "O tipo deve ser Receita ou Despesa."
            );
        }

        /* VERIFICAÇÃO: se o valor é positivo
        */
        if (transacao.Valor <= 0)
        {
            return BadRequest(
                "O valor deve ser maior que zero."
            );
        }

        /* VERIFICAÇÃO: descrição obrigatória
        */
        if (string.IsNullOrWhiteSpace(
                transacao.Descricao))
        {
            return BadRequest(
                "A descrição é obrigatória."
            );
        }

        /* VERIFICAÇÃO: impede cadastro de receita pra menor de idade
        */
        if (pessoa.Idade < 18 &&
            transacao.Tipo == "Receita")
        {
            return BadRequest(
                "Menores de idade só podem possuir transações do tipo despesa."
            );
        }

        _context.Transacoes.Add(transacao);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTransacoes),
            new { id = transacao.Id },
            transacao
        );
    }
}