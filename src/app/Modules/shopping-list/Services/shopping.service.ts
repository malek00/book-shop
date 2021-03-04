import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { Ingredient } from '../../shared/Models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  ingredientChange = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Aplle', 5),
    new Ingredient('Banane', 10),
  ];
  startedEditing = new Subject<number>();
  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }
  addToIngredients(element: Ingredient) {
    this.ingredients.push(element);
    this.ingredientChange.next(this.ingredients.slice());
  }
  getIngredientByIndex(index: number) {
    return this.ingredients.slice()[index];
  }
  EditIngredient(index: number, element: Ingredient) {
    this.ingredients[index] = element;
    this.ingredientChange.next(this.ingredients.slice());
  }
  RemoveIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.ingredients.slice());
  }
}
