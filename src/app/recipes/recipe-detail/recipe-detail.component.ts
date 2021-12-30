import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  id: number;
  recipeRoute: ActivatedRoute;

  recipes: Recipe[];

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipes = this.recipeService.getRecipes();
      if (+params['id'] >= this.recipes.length) {
        this.router.navigate(['recipes']);
      } else {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    });
  }

  @Input() recipe: Recipe;

  //using shopping list service
  // onAddToList() {
  //   for (let ingredient of this.recipe.ingredients) {
  //     this.shoppingListService.ingredientAdded.emit(ingredient);
  //   }
  // }

  //using Recipe Service
  onAddToList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onRecipeEdit() {
    //this.router.navigate(['recipes', this.id, 'edit']);

    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onRecipeDelete() {
    const userResponse = confirm('Delete this Recipe ?');
    if (userResponse) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['recipes']);
    }
  }

  onCopy() {
    this.recipeService.addRecipe(this.recipeService.getRecipe(this.id));
  }
}
