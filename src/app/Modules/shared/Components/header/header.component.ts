import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';  
import { User } from 'src/app/Modules/Auth/Models/user.model';
import { AuthService } from 'src/app/Modules/Auth/Services/auth.service';
import { DataStorageService } from '../../Services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs!: Subscription;
    user!: User;
  isAuthenticated = false
  constructor(
    private storageService: DataStorageService,
    private authService: AuthService,
private router:Router

  ) {}

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe((data) => {
      this.user = data;
      this.isAuthenticated=!data?false:true;
    });
  }

  SaveData() {
    this.storageService.saveData();
  }
  FetchData() {
    this.storageService.fetchData().subscribe();
  }
  Logout() {


    this.authService.logout();
    this.router.navigate(['/auth'])

  }
  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
