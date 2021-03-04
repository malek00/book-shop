import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../../shared/Services/data-storage.service";
import { Recipe } from "../Models/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable(
    {providedIn:'root'}
)
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorageService,private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.GetRecipes();
        if(recipes.length==0)
        return this.dataStorageService.fetchData();
        else
        return recipes;
    }

}