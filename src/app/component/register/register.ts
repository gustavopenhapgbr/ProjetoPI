import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private auth = inject(AuthService);

  cadastrar(f: NgForm) {
    if (f.invalid) return;
    if (f.value.senha !== f.value.confirmarSenha) return;

    this.auth.cadastrar(f.value.email, f.value.senha);

    alert('Conta criada! Bem-vindo à F.CUSTOM.');
    this.router.navigate(['/']);
  }
}