import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutoCarrinho } from '../model/produto-carrinho';
import { ProdutoService } from './produto';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private readonly API = 'http://localhost:3000/carrinho';
  itens: ProdutoCarrinho[] = [];

  constructor(
    private http: HttpClient,
    private produtoService: ProdutoService
  ) {}

  listarPorUsuario(usuarioId: string): Observable<ProdutoCarrinho[]> {
    return this.http.get<ProdutoCarrinho[]>(`${this.API}?usuarioId=${usuarioId}`);
  }

  adicionarItem(item: ProdutoCarrinho): Observable<ProdutoCarrinho> {
    return this.http.post<ProdutoCarrinho>(this.API, item);
  }

  atualizarItem(item: ProdutoCarrinho): Observable<ProdutoCarrinho> {
    return this.http.put<ProdutoCarrinho>(`${this.API}/${item.id}`, item);
  }

  removerItem(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
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

  limpar() {
    this.itens = [];
  }
}
