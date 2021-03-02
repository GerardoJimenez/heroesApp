import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `
 ]
})
export class HomeComponent implements OnInit {
  // Auth!: Auth;
  get auth() {
    return this.authService.auth
  }

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['./auth']);
  }
}
