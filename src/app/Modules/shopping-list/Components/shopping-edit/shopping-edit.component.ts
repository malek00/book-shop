import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs'; 
import { Ingredient } from 'src/app/Modules/shared/Models/ingredient.model';
import { ShoppingService } from '../../Services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  @ViewChild('f') CurrentForm!: NgForm;
  editMode = false;
  currentIndex: number = -1;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (value) => {
        this.currentIndex = value;
        this.editMode = true;
        const ingredient = this.shoppingService.getIngredientByIndex(value);
        this.CurrentForm.setValue({
          name: ingredient.name,
          amount: ingredient.amout,
        });
      }
    );
  }
  onSubmit() {
    const value = this.CurrentForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingService.addToIngredients(newIngredient);
    } else {
      this.shoppingService.EditIngredient(this.currentIndex, newIngredient);
    }

    this.CurrentForm.reset();
    this.editMode = false;
    this.currentIndex = -1;
  }
  clear() {
    this.CurrentForm.reset();
    this.editMode = false;
    this.currentIndex = -1;
  }
  RemoveItem() {
    this.shoppingService.RemoveIngredient(this.currentIndex);
    this.CurrentForm.reset();
    this.editMode = false;
    this.currentIndex = -1;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
