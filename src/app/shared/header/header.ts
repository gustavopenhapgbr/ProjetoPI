import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  termo: string = '';

  constructor(public auth: AuthService, private produtoService: ProdutoService, private router: Router) {}

  pesquisar() {
    if (this.termo.trim() === '') {
      return;
    }
    this.produtoService.pesquisar(this.termo);
    this.router.navigate(['/pesquisa']);
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/']);
  }
}