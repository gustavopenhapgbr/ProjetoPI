import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
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
