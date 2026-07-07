namespace backend.Models;

/* 
* ---------------------------------------
*         RESUMO FINANCEIRO GERAL
* ---------------------------------------
*
* representa a consolidação financeira de todas as pessoas
* e totais gerais do sistema
*/
public class ResumoGeral
{
    public List<ResumoPessoa> Pessoas { get; set; } = [];

    public decimal TotalReceitas { get; set; }

    public decimal TotalDespesas { get; set; }

    public decimal SaldoLiquido { get; set; }
}