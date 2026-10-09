import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho/carrinho';
import { ProdutoService } from '../../services/produto/produto';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  protected carrinhoService = inject(CarrinhoService);
  private produtoService = inject(ProdutoService);






  ngOnInit() {
    this.carrinhoService.carregarCarrinho();
  }






  estoqueDisponivel(item: ItemCarrinho): number {
    const atual = this.produtoService.buscarPorId(item.produto.id);
    return atual ? this.produtoService.estoqueDe(atual, item.tamanho) : 0;
  }






  alterarQtd(index: number, delta: number) {
    const item = this.carrinhoService.itens()[index];
    const disponivel = this.estoqueDisponivel(item);

    if (delta > 0 && item.quantidade + delta > disponivel) {
      alert(`Só há ${disponivel} unidade(s) disponível(is) no tamanho ${item.tamanho}.`);
      return;
    }

    this.carrinhoService.alterarQuantidade(index, delta);
  }






  remover(index: number) {
    this.carrinhoService.remover(index);
  }






  finalizarCompra() {
    const itens = this.carrinhoService.itens();
    if (itens.length === 0) return;

    const semEstoque = itens.find((item) => item.quantidade > this.estoqueDisponivel(item));
    if (semEstoque) {
      alert(
        `Estoque insuficiente para "${semEstoque.produto.nome}" (${semEstoque.tamanho}). ` +
        `Disponível: ${this.estoqueDisponivel(semEstoque)}.`
      );
      return;
    }

    itens.forEach((item) =>
      this.produtoService.baixarEstoque(item.produto.id, item.tamanho, item.quantidade)
    );

    alert('Compra realizada com sucesso!');
    this.carrinhoService.finalizarCompra();
  }






  calcularSubtotal(): number {
    return this.carrinhoService
      .itens()
      .reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  }
}