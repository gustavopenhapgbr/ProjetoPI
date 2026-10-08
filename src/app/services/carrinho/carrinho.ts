import { Injectable, signal } from '@angular/core';
import { Produto } from '../produto/produto';

export interface ItemCarrinho {
  produto: Produto;
  tamanho: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly chave = 'fcustom_carrinho';
  itens = signal<ItemCarrinho[]>([]);

  constructor() {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    const dados = localStorage.getItem(this.chave);
    if (dados) {
      try {
        this.itens.set(JSON.parse(dados));
      } catch (error) {
        console.error('Erro ao carregar o carrinho', error);
        this.itens.set([]);
      }
    }
  }

  adicionar(produto: Produto, tamanho: string = 'M'): void {
    const listaAtual = this.itens();
    
    const indice = listaAtual.findIndex(
      (item) => item.produto.id === produto.id && item.tamanho === tamanho
    );

    let novaLista: ItemCarrinho[];

    if (indice !== -1) {
      novaLista = listaAtual.map((item, index) =>
        index === indice ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    } else {
      novaLista = [...listaAtual, { produto, tamanho, quantidade: 1 }];
    }

    this.itens.set(novaLista);
    this.salvar(novaLista);
  }

  alterarQuantidade(index: number, delta: number): void {
    const listaAtual = [...this.itens()];
    if (index >= 0 && index < listaAtual.length) {
      const novaQtd = listaAtual[index].quantidade + delta;
      
      if (novaQtd <= 0) {
        this.remover(index);
        return;
      }

      listaAtual[index] = { ...listaAtual[index], quantidade: novaQtd };
      this.itens.set(listaAtual);
      this.salvar(listaAtual);
    }
  }

  remover(index: number): void {
    const novaLista = this.itens().filter((_, i) => i !== index);
    this.itens.set(novaLista);
    this.salvar(novaLista);
  }

  finalizarCompra(): void {
    this.itens.set([]);
    localStorage.removeItem(this.chave);
  }

  private salvar(itens: ItemCarrinho[]): void {
    localStorage.setItem(this.chave, JSON.stringify(itens));
  }
}