import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly API = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  termoPesquisa: string = '';
  resultadosPesquisa: Produto[] = [];

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  buscarPorId(id?: number | string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${produto.id}`, produto);
  }

  excluir(id?: number | string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  pesquisar(termo: string) {
    this.termoPesquisa = termo;
    this.resultadosPesquisa = [];

    this.listar().subscribe({
      next: (produtos) => {
        const busca = termo.trim().toLowerCase();
        for (let produto of produtos) {
          if (produto.nome.toLowerCase().includes(busca)) {
            this.resultadosPesquisa.push(produto);
          }
        }
      },
      error: (erro) => {
        console.error('Erro ao pesquisar produtos', erro);
      }
    });
  }

  estoqueDoTamanho(produto: Produto, tamanho: string): number {
    switch (tamanho) {
      case 'P': return produto.estoqueP;
      case 'M': return produto.estoqueM;
      case 'G': return produto.estoqueG;
      case 'GG': return produto.estoqueGG;
      default: return 0;
    }
  }

  baixarEstoque(produto: Produto, tamanho: string, quantidade: number) {
    switch (tamanho) {
      case 'P': produto.estoqueP -= quantidade; break;
      case 'M': produto.estoqueM -= quantidade; break;
      case 'G': produto.estoqueG -= quantidade; break;
      case 'GG': produto.estoqueGG -= quantidade; break;
    }
  }

  totalEstoque(produto: Produto): number {
    return produto.estoqueP + produto.estoqueM + produto.estoqueG + produto.estoqueGG;
  }
}
