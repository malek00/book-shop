import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; 
import {HttpClientModule} from '@angular/common/http' 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HeaderComponent } from './Modules/shared/Components/header/header.component';   
import { SharedModule } from './Modules/shared/shared.module';
import { CoreModule } from './core.module'; 
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,   
    
     
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    HttpClientModule , 
    SharedModule,
    CoreModule 
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
