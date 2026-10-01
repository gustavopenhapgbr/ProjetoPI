import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../services/produto/produto';

@Component({
  selector: 'app-pagina-produto',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './pagina-produto.html',
  styleUrl: './pagina-produto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaProduto {
  private readonly route = inject(ActivatedRoute);
  produto: Produto | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const dados = localStorage.getItem('fcustom_produtos');

    if (!id || !dados) {
      return;
    }

    try {
      const produtos = JSON.parse(dados) as Produto[];
      this.produto = produtos.find((item) => String(item.id) === id);
    } catch (error) {
      console.error('Não foi possível carregar os produtos salvos.', error);
      this.produto = undefined;
    }
  }

}