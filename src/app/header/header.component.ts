import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();

  isRecipesActive: boolean;
  isShoppingListActive: boolean;
  authMode = false;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.authMode = !!user;
    });
  }

  //-- ngClass Active config

  // RecipeSelected() {
  //   this.isRecipesActive = true;
  //   this.isShoppingListActive = false;
  // }

  // ShoppingListSelected() {
  // this.isRecipesActive = false;
  // this.isShoppingListActive = true;
  // }

  RecipeSelected() {
    this.router.navigate(['recipes']);
    this.isRecipesActive = true;
    this.isShoppingListActive = false;
  }

  ShoppingListSelected() {
    this.router.navigate(['shoppingList']);
    this.isRecipesActive = false;
    this.isShoppingListActive = true;
  }

  // -- Routing using event

  // onSelect(feature) {
  //   this.featureSelected.emit(feature);
  // }

  onSaveRecipes() {
    // const recipes = this.recipeService.getRecipes();
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onClickLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
