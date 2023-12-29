import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SessionHandlerComponent } from 'src/app/session-handler/session-handler.component';

@Component({
  selector: 'app-crud-post-search-criteria',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './crud-post-search-criteria.component.html',
  styleUrls: ['./crud-post-search-criteria.component.css'],
})
export class CrudPostSearchComponent {
  foundPost: Post | undefined;
  @Output() postFound = new EventEmitter<Post | undefined>();

  form = new FormGroup({
    userId : new FormControl(''),
    searchTitle: new FormControl('', Validators.required)
  });

  constructor(private appService: AppService = Inject(AppService),
  private SessionHandlerComponent: SessionHandlerComponent,
  ) {}

  onSearch() {
    const userId =  this.form.controls.userId.value ? this.form.controls.userId.value : localStorage.getItem('user_id') ?? '';
    const postTitle = this.form.controls.searchTitle.value ?? '';
    console.log("users post " +userId +" " +  postTitle)
    this.appService.getPostByPostTitlerUserId(userId, postTitle).subscribe({
      next: (post) => {
        this.foundPost = post;
        this.postFound.emit(this.foundPost);
      },
      error: (error) => {
        this.foundPost = undefined;
        if (error.status == 401) {
          this.SessionHandlerComponent.onTokenExpared()
        }
        console.log(this.foundPost);
        this.postFound.emit(this.foundPost);
      },
      complete: () => {
        console.log('Operation Completed');
      },
    });
  }
}