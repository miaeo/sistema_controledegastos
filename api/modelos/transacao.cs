using System.Text.Json.Serialization;
namespace backend.Models;

/*
* ---------------------------------------
*              TRANSAÇÃO
* ---------------------------------------
*
* representa uma movimentação financeira vinculada a uma pessoa
* (RECEITA OU DESPESA)
*/
public class Transacao
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public int PessoaId { get; set; }

    [JsonIgnore]
    public Pessoa? Pessoa { get; set; }
}