using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

/*
* ---------------------------------------
*          CONSULTA DE TOTAIS
* ---------------------------------------
*
* Funcionalidades:
* - listar totais por pessoa
* - calcular receitas e despesas
* - calcular saldo individual e liquido
* - calcular totais gerais
*/
[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotaisController(AppDbContext context)
    {
        _context = context;
    }

    /* retorna o resumo financeiro individual e geral
    */
    [HttpGet]
    public async Task<ActionResult<ResumoGeral>> GetTotais()
    {
        var pessoas = await _context.Pessoas.ToListAsync();

        var resumoPessoas = new List<ResumoPessoa>();

        /*
        * PROCESSAMENTO: calcula totais individuais de cada pessoa
        */
        foreach (var pessoa in pessoas)
        {
            var transacoes = await _context.Transacoes
                .Where(t => t.PessoaId == pessoa.Id)
                .ToListAsync();

            decimal receitas = transacoes
                .Where(t => t.Tipo == "Receita")
                .Sum(t => t.Valor);

            decimal despesas = transacoes
                .Where(t => t.Tipo == "Despesa")
                .Sum(t => t.Valor);

            resumoPessoas.Add(new ResumoPessoa
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            });
        }
        /*
        * PROCESSAMENTO: consolida valores gerais do sistema
        */
        return Ok(new ResumoGeral
        {
            Pessoas = resumoPessoas,
            TotalReceitas = resumoPessoas.Sum(p => p.TotalReceitas),
            TotalDespesas = resumoPessoas.Sum(p => p.TotalDespesas),
            SaldoLiquido =
                resumoPessoas.Sum(p => p.TotalReceitas)
                - resumoPessoas.Sum(p => p.TotalDespesas)
        });
    }
}