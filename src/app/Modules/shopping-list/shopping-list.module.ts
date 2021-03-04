import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { shoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingEditComponent } from './Components/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './Components/shopping-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [FormsModule, RouterModule, shoppingListRoutingModule,SharedModule],
  exports: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
