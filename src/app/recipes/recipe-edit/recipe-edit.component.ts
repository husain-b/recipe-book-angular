import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  addIngredientClicked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // if (this.id) {
      //   this.editMode = true;
      // }
      if (params['id'] != null) {
        this.editMode = true;
        this.addIngredientClicked = true;
      }
      // this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onAddIngredient() {
    this.addIngredientClicked = true;
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imgPath;
      recipeDescription = recipe.description;
      if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients']
      );
      // const newRecipe = this.recipeForm.value;
      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      alert('Please provide valid details to create a Recipe');
    }

    // else {
    //   if (!this.recipeForm.get('name').valid) {
    //     alert('Please provide a Recipe Name');
    //   } else if (!this.recipeForm.get('imagePath').valid) {
    //     alert('Please provide a valid image Url');
    //   } else if (!this.recipeForm.get('description').valid) {
    //     alert('Please fill in Recipe Description');
    //   } else {
    //     alert('Please provide valid details to create a Recipe');
    //   }
    // }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
