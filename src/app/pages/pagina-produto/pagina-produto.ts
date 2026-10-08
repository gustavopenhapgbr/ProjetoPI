import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ProdutoService, Produto } from '../../services/produto/produto';
import { CarrinhoService } from '../../services/carrinho/carrinho';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-pagina-produto',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './pagina-produto.html',
  styleUrl: './pagina-produto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaProduto implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly carrinhoService = inject(CarrinhoService);
  private readonly produtoService = inject(ProdutoService);
  private readonly auth = inject(AuthService);

  produto: Produto | undefined;
  tamanhos = ['S', 'M', 'L', 'XL'];
  tamanhoSelecionado = signal<string>('M');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produto = this.produtoService.buscarPorId(id);
  }

  estoqueDe(item: Produto, tamanho: string): number {
    return this.produtoService.estoqueDe(item, tamanho);
  }

  restante(item: Produto, tamanho: string): number {
    const noCarrinho =
      this.carrinhoService
        .itens()
        .find((i) => i.produto.id === item.id && i.tamanho === tamanho)?.quantidade ?? 0;
    return this.estoqueDe(item, tamanho) - noCarrinho;
  }

  totalEstoque(item: Produto): number {
    return item.estoqueS + item.estoqueM + item.estoqueL + item.estoqueXL;
  }

  tamanhoAtual(item: Produto): string {
    const escolhido = this.tamanhoSelecionado();
    if (this.restante(item, escolhido) > 0) return escolhido;
    if (this.restante(item, 'M') > 0) return 'M';
    return this.tamanhos.find((t) => this.restante(item, t) > 0) ?? '';
  }

  selecionarTamanho(tamanho: string): void {
    this.tamanhoSelecionado.set(tamanho);
  }

  adicionarAoCarrinho(): void {
    if (!this.produto) return;

    if (!this.auth.isLogado()) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }

    const tamanho = this.tamanhoAtual(this.produto);
    if (!tamanho) {
      alert('Produto esgotado.');
      return;
    }

    const noCarrinho =
      this.carrinhoService
        .itens()
        .find((i) => i.produto.id === this.produto!.id && i.tamanho === tamanho)?.quantidade ?? 0;

    if (noCarrinho >= this.estoqueDe(this.produto, tamanho)) {
      alert('Você já colocou no carrinho todas as unidades disponíveis do tamanho ' + tamanho + '.');
      return;
    }

    this.carrinhoService.adicionar(this.produto, tamanho);
    alert('Produto adicionado ao carrinho!');
  }
}