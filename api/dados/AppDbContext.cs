using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

/* 
* ---------------------------------------
*        CONTEXTO PRINCIPAL DO BD
* ---------------------------------------
* responsavel pelo acesso às tabelas
* e configuração dos relacionamentos
*/
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas => Set<Pessoa>();

    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /* pra que quando uma pessoa for deletada,
        *  todas as suas transações também sejam deletadas
        */
        modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}