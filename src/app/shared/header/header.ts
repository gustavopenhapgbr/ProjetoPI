import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(public auth: AuthService, private router: Router){}

  sair(){
    this.auth.sair();
    this.router.navigate(['/']);
  }

}
