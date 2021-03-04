import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./Modules/Auth/Services/auth-interceptor.service";
import { RecipeService } from "./Modules/recipe-book/Services/recipe.service"; 
import { ShoppingService } from "./Modules/shopping-list/Services/shopping.service";

@NgModule(
    {
        providers:[
        RecipeService,
    ShoppingService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}]
    }
)
export class CoreModule{

}