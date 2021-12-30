import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isAuthenticated = false;
  // -- Routing using Event
  // isRecipe = true;
  // isShoppingList = true;
  // displaySelected(feature: string) {
  //   if (feature !== 'recipes') {
  //     this.isRecipe = false;
  //     this.isShoppingList = true;
  //   }
  //   if (feature !== 'shoppingList') {
  //     this.isShoppingList = false;
  //     this.isRecipe = true;
  //   }
  // }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
