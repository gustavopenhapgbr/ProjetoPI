import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoCarrinho } from '../model/produto-carrinho';
import { ProdutoService } from './produto';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  itens: ProdutoCarrinho[] = [];

  constructor(private produtoService: ProdutoService) {}

  // Quantas unidades desse produto/tamanho já estão no carrinho
  quantidadeNoCarrinho(produto: Produto, tamanho: string): number {
    for (let item of this.itens) {
      if (item.produto.id === produto.id && item.tamanho === tamanho) {
        return item.quantidade;
      }
    }
    return 0;
  }

  adicionar(produto: Produto, tamanho: string) {
    // Se o produto já está no carrinho nesse tamanho, só aumenta a quantidade
    for (let item of this.itens) {
      if (item.produto.id === produto.id && item.tamanho === tamanho) {
        item.quantidade++;
        return;
      }
    }
    // Se não está, entra como uma linha nova
    this.itens.push({ produto: produto, tamanho: tamanho, quantidade: 1 });
  }

  aumentar(item: ProdutoCarrinho) {
    let estoque = this.produtoService.estoqueDoTamanho(item.produto, item.tamanho);
    if (item.quantidade < estoque) {
      item.quantidade++;
    }
  }

  diminuir(item: ProdutoCarrinho) {
    if (item.quantidade > 1) {
      item.quantidade--;
    }
  }

  remover(item: ProdutoCarrinho) {
    let listaNova: ProdutoCarrinho[] = [];
    for (let outro of this.itens) {
      if (outro.produto.id !== item.produto.id || outro.tamanho !== item.tamanho) {
        listaNova.push(outro);
      }
    }
    this.itens = listaNova;
  }

  subtotal(item: ProdutoCarrinho): number {
    return item.produto.preco * item.quantidade;
  }

  total(): number {
    let soma = 0;
    for (let item of this.itens) {
      soma += this.subtotal(item);
    }
    return soma;
  }

  finalizarCompra() {
    for (let item of this.itens) {
      this.produtoService.baixarEstoque(item.produto, item.tamanho, item.quantidade);
    }
    this.limpar();
  }

  limpar() {
    this.itens = [];
  }
}