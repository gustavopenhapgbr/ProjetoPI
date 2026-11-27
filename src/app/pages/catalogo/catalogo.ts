import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
})
export class Catalogo implements OnInit {

  categorias = [
    { chave: 'camisetas', titulo: 'Camisetas' },
    { chave: 'calcas', titulo: 'Calças' },
    { chave: 'shorts', titulo: 'Shorts' },
    { chave: 'conjuntos', titulo: 'Conjuntos' },
    { chave: 'acessorios', titulo: 'Acessórios' }
  ];

  titulo: string = '';
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    let categoriaAtual = this.router.url.replace('/', '');

    for (let categoria of this.categorias) {
      if (categoria.chave === categoriaAtual) {
        this.titulo = categoria.titulo;
      }
    }

    this.produtoService.listar().subscribe({
      next: (produtos) => {
        for (let produto of produtos) {
          if (produto.categoria === categoriaAtual) {
            this.produtos.push(produto);
          }
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos', erro);
      }
    });
  }

  abrirProduto(produto: Produto) {
    this.produtoService.idSelecionado = produto.id;
    this.router.navigate(['/produto']);
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}
