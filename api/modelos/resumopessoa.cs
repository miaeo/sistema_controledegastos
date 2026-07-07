namespace backend.Models;

/* 
* ---------------------------------------
*      RESUMO FINANCEIRO INDIVIDUAL
* ---------------------------------------
*
* representa o consolidado financeiro de uma pessoa 
* (receitas, despesas e saldo)
*/
public class ResumoPessoa
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public decimal TotalReceitas { get; set; }

    public decimal TotalDespesas { get; set; }

    public decimal Saldo { get; set; }
}