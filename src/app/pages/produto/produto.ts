import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-pagina-produto',
  imports: [RouterLink],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class PaginaProduto implements OnInit {
  produto: Produto | undefined;
  tamanhos: string[] = ['P', 'M', 'G', 'GG'];
  tamanhoSelecionado: string = '';

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produto = this.produtoService.buscarPorId(this.produtoService.idSelecionado);

    if (this.produto) {
      for (let tamanho of this.tamanhos) {
        if (this.tamanhoSelecionado === '' && this.estoqueDoTamanho(tamanho) > 0) {
          this.tamanhoSelecionado = tamanho;
        }
      }
    }
  }

  estoqueDoTamanho(tamanho: string): number {
    if (this.produto) {
      return this.produtoService.estoqueDoTamanho(this.produto, tamanho);
    }
    return 0;
  }

  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}