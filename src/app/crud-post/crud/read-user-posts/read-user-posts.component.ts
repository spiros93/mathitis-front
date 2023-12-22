import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService} from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { PostCardComponent } from 'src/app/post-card/post-card.component';
import { CrudPostSearchComponent } from '../../utils/crud-post-search-userid/crud-post-search-userid.component';
import { MatCardModule } from '@angular/material/card';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';

@Component({
  selector: 'app-read-user-posts',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    CrudPostSearchComponent,
    MatCardModule,
    CrudPostFormComponent
  ],
  templateUrl: './read-user-posts.component.html',
  styleUrls: ['./read-user-posts.component.css'],
})
export class ReadUsersPostComponent implements OnInit{
  posts: any;
  foundPost: any;
  postId: any;

  @Output() postFound = new EventEmitter<Post | undefined>();
  
  constructor(
    private appService: AppService = Inject(AppService)) {}

  ngOnInit() {
    const id = localStorage.getItem('user_id') ?? '';
    this.appService.getPostByUserId(id).subscribe((post : any) => {
        if (post) {
          this.posts = post;
          console.log('onPostFound', this.posts);
        } else {
          this.posts= [];
        }
      
    });
}
onDeletePost(id: string){
  var deleteUser = window.confirm('Are you absolutely sure you want to delete?');
  if (deleteUser) {
      this.appService.deletePost(id).subscribe({
        next: (user) => {
          console.log(user);
          window.location.reload() 
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {'Delete Operation Completed'}
      })
    }    
}

onUpdatePost(title : string, id : string){
  console.log("post id " +title);
  const userId = localStorage.getItem('user_id') || '';
  this.appService.getPostByPostTitlerUserId(userId, title).subscribe({
    next: (post) => {
      this.foundPost = post;
      this.postId = id;
      this.postFound.emit(this.foundPost);
    },
    error: (error) => {
      this.foundPost = undefined;
      console.log(this.foundPost);
    },
    complete: () => {
      console.log('Operation Completed');
    },
  });
}

onUpdate(post: Post) {
  console.log('onUpdate', post);
  post.photoURL = post.photoURL?.length ==0 ? undefined : post.photoURL;
  this.appService.updatePost(post, this.postId).subscribe((post) => {
    console.log(post);
    window.location.reload()
    //this.notificationHandler.onNotification('Post updated successfully!', 'top', 3);
  }, err => {
   // this.notificationHandler.onNotification(err.error.message, 'top', 3);
  });
}
}


