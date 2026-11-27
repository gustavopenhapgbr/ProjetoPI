import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from '../../components/banner/banner';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-home',
  imports: [Banner],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  produtosDestaque: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        for (let produto of produtos) {
          if (produto.destaque) {
            this.produtosDestaque.push(produto);
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
