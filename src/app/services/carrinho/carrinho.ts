import { Injectable, effect, inject, signal } from '@angular/core';
import { Produto, ProdutoService } from '../produto/produto';
import { AuthService } from '../auth/auth';

export interface ItemCarrinho {
  produto: Produto;
  tamanho: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly prefixo = 'fcustom_carrinho_';
  private auth = inject(AuthService);
  private produtoService = inject(ProdutoService);

  itens = signal<ItemCarrinho[]>([]);

  constructor() {
    effect(() => {
      this.carregar(this.auth.usuarioLogado());
    });
  }

  private chaveAtual(): string | null {
    const email = this.auth.usuarioLogado();
    return email ? this.prefixo + email : null;
  }

  private sincronizar(itens: ItemCarrinho[]): ItemCarrinho[] {
    return itens.flatMap((item) => {
      const atual = this.produtoService.buscarPorId(item.produto.id);
      return atual ? [{ ...item, produto: atual }] : [];
    });
  }

  private carregar(email: string): void {
    if (!email) {
      this.itens.set([]);
      return;
    }

    const chave = this.prefixo + email;
    const dados = localStorage.getItem(chave);
    if (!dados) {
      this.itens.set([]);
      return;
    }

    try {
      const salvos: ItemCarrinho[] = JSON.parse(dados);
      const lista = this.sincronizar(salvos);
      this.itens.set(lista);
      localStorage.setItem(chave, JSON.stringify(lista));
    } catch (error) {
      console.error('Erro ao carregar o carrinho', error);
      this.itens.set([]);
    }
  }

  carregarCarrinho(): void {
    this.carregar(this.auth.usuarioLogado());
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
    const chave = this.chaveAtual();
    if (chave) localStorage.removeItem(chave);
  }

  private salvar(itens: ItemCarrinho[]): void {
    const chave = this.chaveAtual();
    if (chave) localStorage.setItem(chave, JSON.stringify(itens));
  }
}