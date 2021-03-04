import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../Models/recipe.model';
import { RecipeService } from '../../Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes:Recipe[]=[];
private changeSub !:Subscription;
  constructor(private recipeService:RecipeService,private router : Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.GetRecipes();
    this.changeSub=this.recipeService.RecipeChange.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    ) 
  }
  addNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
