import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appNavbarActive]',
})
export class NavbarActiveDirective {
  @HostBinding('class.active') isActive = false;
  @HostBinding('class.active') recipeActive = false;
  @HostBinding('class.active') shoppingListActive = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onRecipeSelected() {
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'blue');
  }

  // [ngClass]="{ active: isShoppingListActive }"
}
