import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { Produto, ProdutoService } from '../../services/produto/produto';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private produtoService = inject(ProdutoService);

  constructor(protected auth: AuthService, private router: Router) {}

  termo = signal('');
  aberto = signal(false);

  sugestoes = computed(() =>
    this.termo().trim().length >= 2
      ? this.produtoService.buscar(this.termo(), 5)
      : []
  );

  digitar(valor: string): void {
    this.termo.set(valor);
    this.aberto.set(true);
  }

  pesquisar(): void {
    const t = this.termo().trim();
    if (!t) return;
    this.aberto.set(false);
   this.router.navigate(['/pesquisa'], { queryParams: { q: t } });
  }

  escolher(p: Produto): void {
    this.termo.set(p.nome);
    this.pesquisar();
  }

  sair(): void {
  auth = inject(AuthService);
  private router = inject(Router);

  sair() {
    this.auth.sair();
    this.router.navigate(['/']);
  }
}