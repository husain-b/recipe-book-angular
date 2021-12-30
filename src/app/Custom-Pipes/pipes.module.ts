import { NgModule } from '@angular/core';
import { ShortenPipe } from '../Custom-Pipes/shorten.pipe';
import { SortPipe } from '../Custom-Pipes/sort.pipe';

@NgModule({
  declarations: [ShortenPipe, SortPipe],
  imports: [],
  exports: [ShortenPipe, SortPipe],
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
