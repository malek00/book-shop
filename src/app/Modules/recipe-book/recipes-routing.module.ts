import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';   
import { AuthGuard } from '../Auth/Services/auth.guard';
import { RecipeBookComponent } from './Components/recipe-book.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './Components/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './Components/recipe-start/recipe-start.component';
import { RecipesResolverService } from './Services/recipe-resolver.service';

const routes: Routes = [
 
  {
    path: '',
    component: RecipeBookComponent,
    canActivate: [AuthGuard],
    resolve: [RecipesResolverService],
    children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
