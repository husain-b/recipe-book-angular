import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
export class ShoppingListService {
  ingredientsAdded = new Subject<Ingredient[]>();
  // ingredientsAdded = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 15),
    new Ingredient('Orange', 12),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientsAdded.emit(this.ingredients.slice());
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // this.ingredientsAdded.emit(this.ingredients.slice());
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  // editIngredient(
  //   ingredientName: string,
  //   ingredientAmount: number,
  //   index: number
  // ) {
  //   const editedIngredient = this.ingredients[index];
  //   editedIngredient.name = ingredientName;
  //   editedIngredient.amount = ingredientAmount;
  //   this.ingredientsAdded.next(this.ingredients.slice());
  // }

  updateIngredient(ingredientIndex: number, ingredient: Ingredient) {
    this.ingredients[ingredientIndex] = ingredient;
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  removeIngredient(ingredientIndex: number) {
    this.ingredients.splice(ingredientIndex, 1);
    this.ingredientsAdded.next(this.ingredients.slice());
  }
}
