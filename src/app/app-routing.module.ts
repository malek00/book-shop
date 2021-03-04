import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';  

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipe',
    pathMatch: 'full',
  },
  {
    path:'recipe',loadChildren:()=>import('./Modules/recipe-book/recipes.module').then(m=>m.RecipesModule)
  },  
  {
    path:'shooping',loadChildren:()=>import('./Modules/shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)
  },
  {
    path:'auth',loadChildren:()=>import('./Modules/Auth/auth.module').then(m=>m.AuthModule)
 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
