import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @Output() eventEmitter = new EventEmitter<String>();
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}
  editSubscription: Subscription;
  editMode = false;
  editeditem: Ingredient;
  editedItemIndex: number;
  @ViewChild('f', { static: true }) ingredientEditForm: NgForm;

  ngOnInit(): void {
    this.editSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editeditem = stateData.editedIngredient;
          this.ingredientEditForm.setValue({
            name: this.editeditem.name,
            amount: this.editeditem.amount,
          });
        } else {
          this.editMode = false;
          this.editeditem = stateData.editedIngredient;
        }
      });
    // this.editSubscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editeditem = this.shoppingListService.getIngredient(index);
    //     this.ingredientEditForm.setValue({
    //       name: this.editeditem.name,
    //       amount: this.editeditem.amount,
    //     });
    //   }
    // );
  }

  //using localreferences on HTML elements

  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;

  // onIngredientAdded() {
  //   const ingerdientName = this.nameInput.nativeElement.value;
  //   const ingredientAmount = this.amountInput.nativeElement.value;
  //   const ingredient = new Ingredient(ingerdientName, ingredientAmount);
  //   this.shoppingListService.addIngredient(ingredient);
  // }

  onSubmit(form: FormControl) {
    const value = form.value;
    const ingredientName = value.name;
    const ingredientAmount = value.amount;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    //-- find Array method to update ingredient --//
    // const ingredients = this.shoppingListService.getIngredients();
    // const filteredIngredient = ingredients.find((ingredient) => {
    //   return ingredient.name === ingredientName;
    // });
    // //console.log(filteredIngredient); -- returns old ingredient data
    // if (filteredIngredient) {
    //   this.shoppingListService.editIngredient(
    //     ingredientName,
    //     ingredientAmount,
    //     this.editedItemIndex
    //   );
    // } else {
    //   const ingredient = new Ingredient(ingredientName, ingredientAmount);
    //   this.shoppingListService.addNewIngredient(ingredient);
    // }
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   ingredient
      // );
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      // this.shoppingListService.addNewIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    form.reset();
    // console.log(form);
    //console.log(filteredIngredient);-- returns new edited ingredient
  }

  onEmit() {
    this.eventEmitter.emit('test');
  }

  onClear() {
    this.ingredientEditForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onRemove() {
    //this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.ingredientEditForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
