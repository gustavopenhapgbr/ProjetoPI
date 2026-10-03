import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProdutoService } from '../../services/produto/produto';
import { Card } from '../../component/card/card';

@Component({
  selector: 'app-pesquisa',
  imports: [RouterLink, Card],
  templateUrl: './pesquisa.html',
  styleUrl: './pesquisa.css',
})
export class Pesquisa {
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);

  termo = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('q') ?? '')),
    { initialValue: '' }
  );

  resultados = computed(() => this.produtoService.buscar(this.termo()));
}