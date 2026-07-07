using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

/*
* ---------------------------------------
*        GERENCIAMENTO DE PESSOAS
* ---------------------------------------
*
* Funcionalidades:
* - criar pessoa
* - listar pessoas
* - excluir pessoa
*/
[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoasController(AppDbContext context)
    {
        _context = context;
    }

    /*
    * retorna todas as pessoas cadastradas
    */
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
    {
        var pessoas = await _context.Pessoas.ToListAsync();

        return Ok(pessoas);
    }

    /* cria uma nova pessoa
    */
    [HttpPost]
    public async Task<ActionResult<Pessoa>>
        CriarPessoa(Pessoa pessoa)
    {
        /* VERIFICAÇÃO: nome deve ser informado
        */
        if (string.IsNullOrWhiteSpace(
                pessoa.Nome))
        {
            return BadRequest(
                "O nome é obrigatório."
            );
        }

        /* VERIFICAÇÃO: idade deve ser válida
        */
        if (pessoa.Idade < 0)
        {
            return BadRequest(
                "A idade não pode ser negativa."
            );
        }

        _context.Pessoas.Add(pessoa);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetPessoas),
            new { id = pessoa.Id },
            pessoa
        );
    }

    /*
    * remove uma pessoa pelo id
    * (transações associadas tambem serão removidas)
    */
    [HttpDelete("{id}")]
    public async Task<IActionResult> ExcluirPessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }

        _context.Pessoas.Remove(pessoa);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}