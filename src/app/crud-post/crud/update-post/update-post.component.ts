import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudPostSearchComponent } from '../../utils/crud-post-search-criteria/crud-post-search-criteria.component';
import { Post } from 'src/app/interfaces/post';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [
    CommonModule,
    CrudPostSearchComponent,
    CrudPostFormComponent,
    MatCardModule,
  ],
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent {
  foundPost: Post | undefined;
  postId: any;

  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router
  ) {}

  onPostFound(post: Post | undefined) {
    if (post) {
      this.foundPost = post;
      this.postId = post._id;
      console.log('onPostFound', this.foundPost);
    } else {
      this.foundPost = undefined;
    }
  }

  onUpdate(post: Post) {
    console.log('onUpdate', post);
    this.appService.updatePost(post, this.postId).subscribe((post) => {
      console.log(post);
      //this.router.navigate(['/crud-demo/list']);
    });
  }
}
