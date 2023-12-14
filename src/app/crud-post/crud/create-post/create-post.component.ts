import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from 'src/app/reactive-form-post/reactive-form-post.component';
import { Post } from 'src/app/interfaces/post';
import { AppService } from 'src/app/app.service';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormComponent, CrudPostFormComponent, MatCardModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter();
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  constructor(
    private appService: AppService = Inject(AppService),
    private _snackBar: MatSnackBar

  ){}

  onPost(post: Post){
    const username = localStorage.getItem('username') ?? '';
    post.username = username;
    console.log(post);
    this.appService.addPost(post).subscribe(post => {
      console.log("success");
      this._snackBar.open('Post Created Successfully',"Ok",{
        verticalPosition : this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      })
      
      this.postCreated.emit();
    }, err => {
      this._snackBar.open(err.error.message,"Ok",{
        verticalPosition : this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      })
    });
  }

      
}
