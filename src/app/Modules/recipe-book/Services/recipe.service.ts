import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../../shared/Models/ingredient.model';
import { ShoppingService } from '../../shopping-list/Services/shopping.service';
import { Recipe } from '../Models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  /* private recipes: Recipe[] = [
    new Recipe(
      'First Book',
      'This my First Book',
      'https://www.mercator-ocean.fr/wp-content/uploads/2019/11/Mock-Up_BlueBookCopernicus_2.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Frensh Fries', 1)]
    ),
    new Recipe(
      'Second Book',
      'This my Second Book',
      'https://dictionary.cambridge.org/fr/images/full/book_noun_001_01679.jpg?version=5.0.151',
      [new Ingredient('Meat', 1), new Ingredient('Frensh Fries', 1)]
    ),
    new Recipe(
      'Third Book',
      'This my Third Book',
      'https://99designs-start-attachments.imgix.net/alchemy-pictures/2017%2F02%2F23%2F05%2F08%2F47%2F760d9696-29c2-429f-ae65-34d2d1b9b31d%2FInterior-book-hero03.png?auto=format&ch=Width%2CDPR&fm=png&w=945&h=550',
      [new Ingredient('Meat', 1), new Ingredient('Frensh Fries', 1)]
    ),
    new Recipe(
      'Fourth Book',
      'This my Fourth Book',
      'https://prettywire.fr/34216-insta/livre-little-book-of-prada-lilas.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Frensh Fries', 1)]
    ),
  ];  */
  private recipes: Recipe[] =[];
  RecipeChange = new Subject<Recipe[]>();
  constructor(private shoppingService: ShoppingService) {}
  GetRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((e) => {
      this.shoppingService.addToIngredients(e);
    });
  }
  GetRecipe(id:number)
  { 
    return this.recipes.slice()[id];
  }

  AddRecipe(item :Recipe)
  {
    this.recipes.push(item);
    this.RecipeChange.next(this.recipes.slice());
  }
  EditRecipe(item:Recipe,index:number)
  {
    this.recipes[index] = item;
    this.RecipeChange.next(this.recipes.slice());
  }
  DeleteRecipe(index:number)
  {
    this.recipes.splice(index,1);
    this.RecipeChange.next(this.recipes.slice());
  }
  setRecipes(recipes:Recipe[])
  {
    this.recipes =recipes
    this.RecipeChange.next(this.recipes.slice());
  }
}
