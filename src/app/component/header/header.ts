import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(protected auth: AuthService, private router: Router) {}

  sair(): void {
    this.auth.sair();
    this.router.navigate(['/']);
  }
}