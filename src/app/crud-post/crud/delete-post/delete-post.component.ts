import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/interfaces/post';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { CrudPostSearchComponent } from '../../utils/crud-post-search/crud-post-search.component';
import { PostCardComponent } from 'src/app/post-card/post-card.component';
import { DangerAreYouSureComponent } from '../../utils/danger-are-you-sure/danger-are-you-sure.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [CommonModule, CrudPostSearchComponent, PostCardComponent, DangerAreYouSureComponent, MatCardModule],
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {
  @Output() postDeleted = new EventEmitter();
  foundPost: Post | undefined;
  postNotFound = false;
  @ViewChild('postId') postIdInput!: ElementRef<HTMLInputElement>;

  constructor(
    private appService: AppService = Inject(AppService),
    private http: HttpClient = Inject(HttpClient),
    private router: Router = Inject(Router)
  ){}

  onClick(){
    const id = this.postIdInput.nativeElement.value;
    // this.appService.deletePost(parseInt(id)).subscribe({
    //   next: (post) => {
    //     console.log(post);
    //     this.postNotFound = false;
    //     this.postDeleted.emit();
    //   },
    //   error: (error) => {
    //     console.log(error)
    //     this.postNotFound = true;
    //   },
    //   complete: () => {'Delete Operation Completed'}
    // })
    this.http.delete<Post>(`http://localhost:3000/posts/${id}`).subscribe({
        next: (post) => {
          console.log(post);
          this.postNotFound = false;
          this.postDeleted.emit();
        },
        error: (error) => {
          console.log(error);
          this.postNotFound = true;
        },
        complete: () => {'Delete Operation Completed'}
      })
  }

  onPostFound(post: Post | undefined){
    if(post){
      this.foundPost = post;
    }
  }

  onConfirm(iamSure: boolean){
    if(iamSure && this.foundPost){
      const id = this.foundPost._id ?? ''
      this.appService.deletePost(id).subscribe({
        next: (post) => {
          console.log(post);
          this.postNotFound = false;
          this.postDeleted.emit();
        },
        error: (error) => {
          console.log(error)
          this.postNotFound = true;
        },
        complete: () => {'Delete Operation Completed'}
      })
    }else{
      this.foundPost = undefined;
    }
  }

}
