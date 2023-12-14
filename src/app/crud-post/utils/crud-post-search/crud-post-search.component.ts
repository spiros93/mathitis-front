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

@Component({
  selector: 'app-crud-post-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './crud-post-search.component.html',
  styleUrls: ['./crud-post-search.component.css'],
})
export class CrudPostSearchComponent {
  foundPost: Post | undefined;
  @Output() postFound = new EventEmitter<Post | undefined>();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(private appService: AppService = Inject(AppService)) {}

  onSearch() {
    const title = this.form.controls.title.value ?? '';
    this.appService.getPostByTitle(title).subscribe({
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