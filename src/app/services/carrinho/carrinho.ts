import { Injectable, effect, inject, signal } from '@angular/core';
import { Produto, ProdutoService } from '../produto/produto';
import { AuthService } from '../auth/auth';

export interface ItemCarrinho {
  produto: Produto;
  tamanho: string;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private auth = inject(AuthService);
  private produtoService = inject(ProdutoService);




  
  itens = signal<ItemCarrinho[]>([]);





  constructor() {
    effect(() => this.carregarCarrinho());
  }





  private chave(): string | null {
    const email = this.auth.usuarioLogado();
    return email ? 'fcustom_carrinho_' + email : null;
  }





  private atualizar(lista: ItemCarrinho[]): void {
    this.itens.set(lista);
    const chave = this.chave();
    if (chave) localStorage.setItem(chave, JSON.stringify(lista));
  }





  carregarCarrinho(): void {
    const chave = this.chave();
    const dados = chave ? localStorage.getItem(chave) : null;
    const salvos: ItemCarrinho[] = dados ? JSON.parse(dados) : [];

    const lista = salvos.flatMap((item) => {
      const atual = this.produtoService.buscarPorId(item.produto.id);
      return atual ? [{ ...item, produto: atual }] : [];
    });

    this.atualizar(lista);
  }





  adicionar(produto: Produto, tamanho: string = 'M'): void {
    const lista = this.itens();
    const mesmoItem = (item: ItemCarrinho) =>
      item.produto.id === produto.id && item.tamanho === tamanho;

    this.atualizar(
      lista.some(mesmoItem)
        ? lista.map((item) => (mesmoItem(item) ? { ...item, quantidade: item.quantidade + 1 } : item))
        : [...lista, { produto, tamanho, quantidade: 1 }]
    );
  }





  alterarQuantidade(index: number, delta: number): void {
    this.atualizar(
      this.itens()
        .map((item, i) => (i === index ? { ...item, quantidade: item.quantidade + delta } : item))
        .filter((item) => item.quantidade > 0)   // quantidade 0 remove o item
    );
  }





  remover(index: number): void {
    this.atualizar(this.itens().filter((_, i) => i !== index));
  }





  finalizarCompra(): void {
    this.itens.set([]);
    const chave = this.chave();
    if (chave) localStorage.removeItem(chave);
  }
}