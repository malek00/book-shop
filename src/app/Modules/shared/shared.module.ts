import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './Components/alert/alert.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { appDropDown } from './Directives/dopdown.directive';
import { PlaceholderDirective } from './Directives/placeholder.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    AlertComponent,
    appDropDown,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    AlertComponent,
    appDropDown,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
