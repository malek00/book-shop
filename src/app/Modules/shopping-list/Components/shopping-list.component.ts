import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { Ingredient } from '../../shared/Models/ingredient.model';
import { ShoppingService } from '../Services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[]=[];
  private changeSub !:Subscription;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients= this.shoppingService.getIngredients();
  this.changeSub=this.shoppingService.ingredientChange.subscribe(
    (ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    }
  )
  }
  onEdititem(i:number)
  {
this.shoppingService.startedEditing.next(i);
  }
 ngOnDestroy()
 {
   this.changeSub.unsubscribe();
 }
}
