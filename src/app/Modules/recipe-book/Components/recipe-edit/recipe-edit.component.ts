import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/Modules/shared/Models/ingredient.model';
import { Recipe } from '../../Models/recipe.model';
import { RecipeService } from '../../Services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number=-1;
  editMode: boolean = false;
  recipeForm : FormGroup=new FormGroup({});
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'];
      this.initForm();
    });
  }

  private initForm() {
    const recipe = this.recipeService.GetRecipe(this.id);
    let recipeName = '';
    let imagePath = '';
    let description = '';
let ingredients=new FormArray([]);
    if (this.editMode) {
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients)
        {
          ingredients.push(new FormGroup(
            {
              'name': new FormControl(ingredient.name, Validators.required),
              'amount':new FormControl(ingredient.amout, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            }
          ))
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
      ingredients: ingredients
    });
  }

  getIngredients()
  {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  getControl(index : number)
  { 
    return ((this.recipeForm.get('ingredients') as FormArray).controls[index] as FormGroup);
  }
  addIngredient()
  {
    (this.recipeForm.get('ingredients') as FormArray).push
    (
      new FormGroup(
        {
          'name': new FormControl(null, Validators.required),
          'amount':new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        }
      )
    )
  }

  onSubmit(){
    let ingredients : Ingredient[]=[];
    let formArray = this.recipeForm.get('ingredients')  as FormArray;
    for(let item of formArray.controls as FormGroup[] )
    { 
      ingredients.push(new Ingredient(item.get('name')?.value,item.get('amount')?.value))
 
    }
    
     
    const recipe = new Recipe(this.recipeForm.get('name')?.value,
    this.recipeForm.get('description')?.value,
    this.recipeForm.get('imagePath')?.value,
    ingredients); 
    if(this.editMode)
    {
      this.recipeService.EditRecipe(recipe,this.id)
    }else
    {
      this.recipeService.AddRecipe(recipe)
    }
    this.router.navigate(['/recipe'])
  }
  DeleteIngredient(index : number)
  { 
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  cancel()
  {
    this.router.navigate(['/recipe'])
  }
}
