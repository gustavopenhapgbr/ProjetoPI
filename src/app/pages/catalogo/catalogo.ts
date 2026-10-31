import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  // Textos de cada categoria
  categorias = [
    { chave: 'camisetas', titulo: 'Camisetas', subtitulo: 'Detalhes que completam o seu estilo.' },
    { chave: 'calcas', titulo: 'Calças', subtitulo: 'Conforto e personalidade em todos os momentos.' },
    { chave: 'shorts', titulo: 'Shorts', subtitulo: 'Leveza e estilo para acompanhar sua rotina.' },
    { chave: 'conjuntos', titulo: 'Conjuntos', subtitulo: 'Produções completas para facilitar suas escolhas.' },
    { chave: 'acessorios', titulo: 'Acessórios', subtitulo: 'Detalhes que completam o seu estilo.' }
  ];

  titulo: string = '';
  subtitulo: string = '';
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    
    let categoriaAtual = this.router.url.replace('/', '');

    for (let categoria of this.categorias) {
      if (categoria.chave === categoriaAtual) {
        this.titulo = categoria.titulo;
        this.subtitulo = categoria.subtitulo;
      }
    }

    this.produtos = this.produtoService.listarPorCategoria(categoriaAtual);
  }

  abrirProduto(produto: Produto) {
    this.produtoService.idSelecionado = produto.id;
    this.router.navigate(['/produto']);
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}