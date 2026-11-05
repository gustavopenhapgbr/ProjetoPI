import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho';
import { AuthService } from '../../services/auth';
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

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produto = this.produtoService.buscarPorId(this.produtoService.idSelecionado);

    // Já deixa selecionado o primeiro tamanho que tem estoque
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

  adicionarAoCarrinho() {
    if (!this.produto) {
      return;
    }

    if (!this.auth.estaLogado()) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }

    let noCarrinho = this.carrinhoService.quantidadeNoCarrinho(this.produto, this.tamanhoSelecionado);
    if (noCarrinho >= this.estoqueDoTamanho(this.tamanhoSelecionado)) {
      alert('Você já colocou no carrinho todas as unidades disponíveis do tamanho ' + this.tamanhoSelecionado + '.');
      return;
    }

    this.carrinhoService.adicionar(this.produto, this.tamanhoSelecionado);
    alert('Produto adicionado ao carrinho!');
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}