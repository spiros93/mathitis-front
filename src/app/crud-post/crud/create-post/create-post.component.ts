import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from 'src/app/reactive-form-post/reactive-form-post.component';
import { Post } from 'src/app/interfaces/post';
import { AppService } from 'src/app/app.service';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormComponent, CrudPostFormComponent, MatCardModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter();
  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router
  ){}

  onPost(post: Post){
    this.appService.addPost(post).subscribe(post => {
      console.log(post);
      this.postCreated.emit();
    });
  }
}
