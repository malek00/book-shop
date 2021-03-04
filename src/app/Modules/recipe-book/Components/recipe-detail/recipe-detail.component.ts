import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../Models/recipe.model';
import { RecipeService } from '../../Services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  element!: Recipe;
  id!:number;
  constructor(private recipeService:RecipeService,
    private router : Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
     
    this.route.params.subscribe(
      (data)=>{
         this.id =  +data['id'];
        this.element=this.recipeService.GetRecipe(this.id)
       
      }
    )
   
  }
  onAddToShoppingList()
  {
    
this.recipeService.addIngredientToShoppingList(this.element.ingredients);

  }

  Edit()
  {
this.router.navigate(['edit'],{relativeTo:this.route})
//this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }

  Delete()
  {
    this.recipeService.DeleteRecipe(this.id)
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
