import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute
  ) {}
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipesUpdated = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Baked chicken with thyme and sage butter',
  //     'Stuffing butter and herbs under the skin of this chicken makes for a very impressive bird - serve it at your next dinner party. ',
  //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
  //     [
  //       new Ingredient('Butter(gms)', 80),
  //       new Ingredient('Radishes', 2),
  //       new Ingredient('Chicken Breats fillets', 4),
  //       new Ingredient('Lebanese Cucumber', 2),
  //       new Ingredient('Green beans(gms)', 100),
  //       new Ingredient('Olive oil', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Pancake recipe for one',
  //     'These easy, fluffy pancakes made with self-raising flour, eggs, milk and baking powder are the perfect single serve breakfast or brunch.',
  //     'https://img.taste.com.au/z2VsFW_5/w643-h428-cfill-q90/taste/2020/09/pancake-recipe-for-one-165241-2.jpg',
  //     [
  //       new Ingredient('Egg', 1),
  //       new Ingredient('Vanilla Yogurt', 2),
  //       new Ingredient('Mixed berries', 25),
  //       new Ingredient('Melted Butter(gms)', 100),
  //     ]
  //   ),
  //   new Recipe(
  //     'Free-form apple treacle tart',
  //     'Treacle tart gets a revamp with this free-form apple galette – the ideal winter dessert.',
  //     'https://img.taste.com.au/I3HSEXUk/w643-h428-cfill-q90/taste/2020/06/free_form_apple_treacle_tart-162706-1.jpg',
  //     [
  //       new Ingredient('Egg', 1),
  //       new Ingredient('Red Apples', 2),
  //       new Ingredient('Golden Syrup(gms)', 250),
  //       new Ingredient('Whipped Cream', 1),
  //     ]
  //   ),
  // ];

  recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  displayRecipe(recipe: Recipe) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].name === recipe.name) {
        return i;
      }
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next(this.recipes.slice());
  }
}
