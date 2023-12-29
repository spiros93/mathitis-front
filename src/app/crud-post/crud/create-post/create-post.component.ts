import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from 'src/app/reactive-form-post/reactive-form-post.component';
import { Post } from 'src/app/interfaces/post';
import { AppService } from 'src/app/app.service';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {NotificationHandlerComponent} from '../../../notification-handler/notification-handler.component';
import { SessionHandlerComponent } from 'src/app/session-handler/session-handler.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormComponent, CrudPostFormComponent, MatCardModule, NotificationHandlerComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter();
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  constructor(
    private appService: AppService = Inject(AppService),
    private _snackBar: MatSnackBar,
    private router : Router,
    private notificationHandler : NotificationHandlerComponent,
    private SessionHandlerComponent: SessionHandlerComponent,
  ){}

  onPost(post: Post){
    post.photoURL = post.photoURL?.length ==0 ? undefined : post.photoURL;
    const username = localStorage.getItem('username') ?? '';
    post.username = username;
    console.log(post);
    this.appService.addPost(post).subscribe(post => {
      console.log("success");
      this.notificationHandler.onNotification('Post created successfully!', 'top', 3);
      this.router.navigate(["/crud-post/read-user-posts"])
      this.postCreated.emit();
    }, err => {
      if (err.status == 401) {
        this.SessionHandlerComponent.onTokenExpared()
      }
      this.notificationHandler.onNotification(err.error.message, 'top', 3);
    });
  }      
}
