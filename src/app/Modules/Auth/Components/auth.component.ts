import { Component, ComponentFactoryResolver, NgModule, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';  
import { AlertComponent } from '../../shared/Components/alert/alert.component';
import { PlaceholderDirective } from '../../shared/Directives/placeholder.directive';
import { AuthService, AuthResponseData } from '../Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
@ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
    constructor(private authService:AuthService,private router : Router,private componentFactoryResolver:ComponentFactoryResolver){}
  isLoginMode = true;
  isLoading=false;
  error!:string;
  private closeSub : Subscription;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm)
  {this.isLoading=true;
      if(!form.valid)
      {this.isLoading=false;
          return;
      }
    const email = form.value.email;
    const password = form.value.password;

    let authObs:Observable<AuthResponseData>;
      if(this.isLoginMode)
     {
        this.isLoading=false;
        authObs=  this.authService.logIn(email,password);
     }else
     {
        authObs=  this.authService.signup(email,password);
     }
     authObs.subscribe(
        data=>{
            this.isLoading=false;
            console.log(data);
            this.router.navigate(['/recipe'])
        },
        errorMessage=>{
            this.error=errorMessage
            this.showErrorAlert(errorMessage);
            this.isLoading=false;
        }
    )
    form.reset();
  }

  onHandleError()
  {
    this.error=null;
  }


  private showErrorAlert(message)
  {
    //const alertCmp = new AlertComponent() error

   const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  const hotsViewContainerRef = this.alertHost.viewContainerRef;
  hotsViewContainerRef.clear();
  const componentRef = hotsViewContainerRef.createComponent(alertCmpFactory);
  componentRef.instance.message=message;
  this.closeSub = componentRef.instance.close.subscribe(()=>
  {
this.closeSub.unsubscribe();
hotsViewContainerRef.clear();
  });
  }

  ngOnDestroy()
  {
    if(this.closeSub)
    {
      this.closeSub.unsubscribe();
    }
  }
}
