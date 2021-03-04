import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { exhaustMap, map, take, tap } from 'rxjs/operators'; 
import { AuthService } from '../../Auth/Services/auth.service';
import { Recipe } from '../../recipe-book/Models/recipe.model';
import { RecipeService } from '../../recipe-book/Services/recipe.service'; 

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,private authService:AuthService) {}

  saveData() {
    const recipes = this.recipeService.GetRecipes();
    return this.http
      .put(
        'https://book-shop-5ed48-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchData() {

    return this.http
            .get<Recipe[]>(
              'https://book-shop-5ed48-default-rtdb.firebaseio.com/recipes.json' 
            ).pipe( map((recipes) => {
                    return recipes.map((recipe) => {
                      return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : [],
                      };
                    });
                  }),tap(
                      (recipes)=>{
                          this.recipeService.setRecipes(recipes);
                      }
                  )
            ) 
      
 
  }
}
