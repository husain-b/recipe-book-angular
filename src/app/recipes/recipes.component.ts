import { Component, Input, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  @Input() recipeNameInRecipes: string;

  extractedRecipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.extractedRecipe = recipe;
      // this.dataStorageService.fetchRecipes().subscribe();
    });
  }
}
