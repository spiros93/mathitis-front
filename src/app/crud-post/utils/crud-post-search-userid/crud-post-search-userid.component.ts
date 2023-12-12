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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-crud-post-search-userid',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './crud-post-search-userid.component.html',
  styleUrls: ['./crud-post-search-userid.component.css'],
})
export class CrudPostSearchComponent {
  foundPost: Post | undefined;
  @Output() postFound = new EventEmitter<Post | undefined>();

  form = new FormGroup({
    postTitle: new FormControl(''),
  });

  constructor(private appService: AppService = Inject(AppService)) {}

  onSearch() {
    const id = localStorage.getItem('user_id') ?? '';
    this.appService.getPostByUserId(id).subscribe({
      next: (post) => {
        console.log(post);
        this.foundPost = post;
        this.postFound.emit(this.foundPost);
      },
      error: (error) => {
        this.foundPost = undefined;
        console.log(this.foundPost);
        this.postFound.emit(this.foundPost);
      },
      complete: () => {
        console.log('Operation Completed');
      },
    });
  }
}