import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from 'src/app/interfaces/person';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { PersonCardComponent } from 'src/app/person-card/person-card.component';
import { DangerAreYouSureComponent } from '../../utils/danger-are-you-sure/danger-are-you-sure.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, CrudUserSearchComponent, PersonCardComponent, DangerAreYouSureComponent, MatCardModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  @Output() userDeleted = new EventEmitter();
  foundUser: Person | undefined;
  userNotFound = false;
  @ViewChild('userId') userIdInput!: ElementRef<HTMLInputElement>;

  constructor(
    private appService: AppService = Inject(AppService),
    private http: HttpClient = Inject(HttpClient),
    private router: Router = Inject(Router),
    private notificationHandler : NotificationHandlerComponent
  ){}

  onClick(){
    const id = this.userIdInput.nativeElement.value;
    // this.appService.deleteUser(parseInt(id)).subscribe({
    //   next: (user) => {
    //     console.log(user);
    //     this.userNotFound = false;
    //     this.userDeleted.emit();
    //   },
    //   error: (error) => {
    //     console.log(error)
    //     this.userNotFound = true;
    //   },
    //   complete: () => {'Delete Operation Completed'}
    // })
    this.http.delete<Person>(`http://localhost:3000/users/${id}`).subscribe({
        next: (user) => {
          console.log(user);
          this.userNotFound = false;
          this.userDeleted.emit();
        },
        error: (error) => {
          console.log(error);
          this.userNotFound = true;
        },
        complete: () => {'Delete Operation Completed'}
      })
  }

  onUserFound(user: Person | undefined){
    if(user){
      this.foundUser = user;
    }
  }

  onConfirm(iamSure: boolean){
    if(iamSure && this.foundUser){
      const id = this.foundUser._id ?? ''
      const isAdmin=localStorage.getItem('is_admin');
      this.appService.deleteUser(id).subscribe({
        next: (user) => {
          console.log(user);
          this.userNotFound = false;
          this.notificationHandler.onNotification("Success Delete User", 'top', 3);
          this.userDeleted.emit();
          if(isAdmin === 'true'){
            this.router.navigate(['/crud-demo/list']);
          }else{
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.log(error)
          this.notificationHandler.onNotification(error.error.message, 'top', 3);
          this.userNotFound = true;
        },
        complete: () => {'Delete Operation Completed'}
      })
    }else{
      this.foundUser = undefined;
    }
  }

}
