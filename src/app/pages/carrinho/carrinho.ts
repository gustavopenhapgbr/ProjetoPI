import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho';
import { AuthService } from '../../services/auth';
import { ProdutoService } from '../../services/produto';
import { ProdutoCarrinho } from '../../model/produto-carrinho';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {

  constructor(
    public carrinhoService: CarrinhoService,
    public auth: AuthService,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    if (this.auth.usuarioLogado) {
      const usuarioId = String(this.auth.usuarioLogado.id);
      this.carrinhoService.listarPorUsuario(usuarioId).subscribe({
        next: (itens) => {
          this.carrinhoService.itens = itens;

          for (let item of this.carrinhoService.itens) {
            if (item.produto.id !== undefined) {
              this.produtoService.buscarPorId(item.produto.id).subscribe({
                next: (produtoAtualizado) => {
                  item.produto = produtoAtualizado;

                  const estoqueAtual = this.estoqueDisponivel(item);
                  if (item.quantidade > estoqueAtual && estoqueAtual > 0) {
                    item.quantidade = estoqueAtual;
                    this.carrinhoService.atualizarItem(item).subscribe();
                  }
                }
              });
            }
          }
        },
        error: (erro) => {
          console.error('Erro ao carregar itens do carrinho', erro);
        }
      });
    } else {
      this.carrinhoService.itens = [];
    }
  }

  estoqueDisponivel(item: ProdutoCarrinho): number {
    return this.produtoService.estoqueDoTamanho(item.produto, item.tamanho);
  }

  aumentar(item: ProdutoCarrinho) {
    const limite = this.estoqueDisponivel(item);
    if (item.quantidade < limite) {
      item.quantidade++;
      this.carrinhoService.atualizarItem(item).subscribe({
        error: () => alert('Erro ao atualizar quantidade.')
      });
    }
  }

  diminuir(item: ProdutoCarrinho) {
    if (item.quantidade > 1) {
      item.quantidade--;
      this.carrinhoService.atualizarItem(item).subscribe({
        error: () => alert('Erro ao atualizar quantidade.')
      });
    }
  }

  remover(item: ProdutoCarrinho) {
    if (item.id === undefined) return;
    this.carrinhoService.removerItem(item.id).subscribe({
      next: () => {
        this.carrinhoService.itens = this.carrinhoService.itens.filter((i) => i.id !== item.id);
      },
      error: () => alert('Erro ao remover produto do carrinho.')
    });
  }

  finalizarCompra() {
    if (this.carrinhoService.itens.length === 0) return;

    let confirmou = confirm('Deseja finalizar a compra?');
    if (!confirmou) return;

    const itensParaProcessar = [...this.carrinhoService.itens];

    for (let item of itensParaProcessar) {
      if (item.produto.id !== undefined) {
        this.produtoService.buscarPorId(item.produto.id).subscribe({
          next: (prodAtual) => {
            this.produtoService.baixarEstoque(prodAtual, item.tamanho, item.quantidade);
            this.produtoService.editar(prodAtual).subscribe({
              error: (erro) => console.error('Erro ao atualizar estoque na API', erro)
            });
          }
        });
      }

      if (item.id !== undefined) {
        this.carrinhoService.removerItem(item.id).subscribe({
          error: (erro) => console.error('Erro ao deletar item do carrinho', erro)
        });
      }
    }

    this.carrinhoService.limpar();
    alert('Compra finalizada com sucesso! Obrigado por comprar na F.Company.');
    this.router.navigate(['/']);
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}
