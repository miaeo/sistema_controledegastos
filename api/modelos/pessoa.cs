using System.Text.Json.Serialization;
namespace backend.Models;

/*
* ---------------------------------------
*                PESSOA
* ---------------------------------------
* representa uma pessoa cadastrada no sistema
*/
public class Pessoa
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public int Idade { get; set; }

    [JsonIgnore]
    public List<Transacao> Transacoes { get; set; } = [];
}
