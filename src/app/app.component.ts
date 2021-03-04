import { Component, OnInit } from '@angular/core';  
import { AuthService } from './Modules/Auth/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  recipeVisible:boolean =true
  shoppingListVisible: boolean=false;
  constructor(private authService:AuthService){}
   ngOnInit()
   {
this.authService.autoLogin();
   }
  onNavigate(menu: string){
    if(menu==="recipe")
    {
      this.recipeVisible=true;
    this.shoppingListVisible= false;
    }
    if(menu==="shooping-list")
    {
      this.recipeVisible=false;
    this.shoppingListVisible= true;
    }
  } 
}
