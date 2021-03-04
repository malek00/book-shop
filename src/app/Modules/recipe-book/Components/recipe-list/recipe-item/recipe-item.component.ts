import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Recipe } from '../../../Models/recipe.model';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input()recipe:Recipe=new Recipe("","","",[]);
  index!: number;
  constructor(private recipeService: RecipeService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.index = this.recipeService.GetRecipes().indexOf(this.recipe)
  }
 
}
