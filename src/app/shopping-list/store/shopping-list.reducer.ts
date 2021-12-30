import { ActivationEnd } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apple', 15), new Ingredient('Orange', 12)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = { ...ingredient, ...action.payload };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      // const updatedIngredients = [...state.ingredients];
      // updatedIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, igIndex) => igIndex != state.editedIngredientIndex
        ),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    case ShoppingListActions.START_EDIT: {
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    default:
      return state;
  }
}
