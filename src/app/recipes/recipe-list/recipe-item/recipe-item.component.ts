import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit, AfterContentInit {
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild('paragraphElement') paragraphElement: ElementRef;
  paragraphElementValue: string;
  recipeDescription: String;

  ngOnInit(): void {
    // this.recipeDescription = this.recipe.description;
    // this.recipeDescription = this.recipeDescription.substr(0, 65) + '...';
  }

  ngAfterContentInit(): void {}

  @Input() recipe: Recipe;
  @Input() index: number;

  isItemActive = false;

  recipeId: number;

  onRecipeSelect() {
    //this.recipeService.recipeSelected.emit(this.recipe);
    this.recipeId = this.recipeService.displayRecipe(this.recipe);
    //this.router.navigate(['recipes', this.recipeId]);
  }
}
