 
import { NgModule } from '@angular/core'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';   
import { SharedModule } from '../shared/shared.module';
import { RecipeBookComponent } from './Components/recipe-book.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './Components/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './Components/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './Components/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './Components/recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';
 

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports:[ 
    ReactiveFormsModule,
    RouterModule,
    RecipesRoutingModule,
    SharedModule
  ],
  exports:[
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent 
  ]
})
export class RecipesModule {}
