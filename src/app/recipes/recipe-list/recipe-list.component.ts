import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Input() recipeName: String;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesUpdated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  recipes: Recipe[];

  onNewRecipeClicked() {
    if (this.router.url === '/recipes/new') {
      const userResponse = confirm(
        'Leave this page ?, the Details entered will be discarded'
      );
      if (userResponse) {
        this.router.navigate(['recipes', 'new']);
      }
    } else {
      this.router.navigate(['recipes', 'new']);
    }
  }
}
