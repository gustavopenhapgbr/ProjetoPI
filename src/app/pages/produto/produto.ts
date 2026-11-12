import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
  const produtoId = this.route.snapshot.paramMap.get('id');

  if (produtoId) {
    this.produtoService.buscarPorId(produtoId).subscribe({
      next: (produto) => {
        this.produto = produto;

        for (let tamanho of this.tamanhos) {
          if (this.tamanhoSelecionado === '' && this.estoqueDoTamanho(tamanho) > 0) {
            this.tamanhoSelecionado = tamanho;
          }
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar produto', erro);
      }
    });
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

    if (this.auth.adminLogado) {
      alert('Administradores não podem adicionar produtos ao carrinho.');
      return;
    }

    if (!this.auth.usuarioLogado) {
      alert('Você precisa estar logado como cliente para adicionar produtos ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }

    const usuarioId = String(this.auth.usuarioLogado.id);
    const tamanho = this.tamanhoSelecionado;
    const estoqueDisponivel = this.estoqueDoTamanho(tamanho);

    if (estoqueDisponivel <= 0) {
      alert('Este tamanho está esgotado.');
      return;
    }

    this.carrinhoService.listarPorUsuario(usuarioId).subscribe({
      next: (itens) => {
        const itemExistente = itens.find(
          (i) => i.produto.id === this.produto!.id && i.tamanho === tamanho
        );

        if (itemExistente) {
          alert('Este produto já foi adicionado ao carrinho.');
          return;
        }

        const novoItem = {
          usuarioId: usuarioId,
          produto: this.produto!,
          tamanho: tamanho,
          quantidade: 1
        };

        this.carrinhoService.adicionarItem(novoItem).subscribe({
          next: () => alert('Produto adicionado ao carrinho com sucesso!'),
          error: () => alert('Erro ao adicionar produto ao carrinho.')
        });
      },
      error: () => alert('Erro ao consultar carrinho na API.')
    });
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}