import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { Person } from 'src/app/interfaces/person';
import { CrudUserFormComponent } from '../../utils/crud-user-form/crud-user-form.component';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';


@Component({
  selector: 'app-update-user-password',
  standalone: true,
  imports: [
    CommonModule,
    CrudUserSearchComponent,
    CrudUserFormComponent,
    MatCardModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  foundUser: Person | undefined;

  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router,
    private notificationHandler : NotificationHandlerComponent
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id') ?? '';
    console.log(id);
    this.appService.getUserById(id).subscribe((user) => {
      
      if (user) {
        this.foundUser = user;
        console.log('onPostFound', this.foundUser);
      } else {
        this.foundUser= undefined;
      }
    });
  }

  onUpdate(user: Person) {
    console.log('onUpdate', user);
    const id = localStorage.getItem('user_id') ?? '';
    const isAdmin = localStorage.getItem('is_admin');
    user.photoURL = user.photoURL?.length ==0 ? undefined : user.photoURL;
    this.appService.updateUser(user, id).subscribe((user) => {
      if (isAdmin === 'true'){
        console.log("1")
        this.router.navigate(['/crud-demo/list']);
      }else{
        console.log("2")
        this.router.navigate(['/crud-demo/read']);
      }
    }, err =>{
      this.notificationHandler.onNotification(err.error.message, 'top', 3)});
  }
}
