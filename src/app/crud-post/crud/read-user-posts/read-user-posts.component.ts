import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { PostCardComponent } from 'src/app/post-card/post-card.component';
import { CrudPostSearchComponent } from '../../utils/crud-post-search-userid/crud-post-search-userid.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-read-user-posts',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    CrudPostSearchComponent,
    MatCardModule,
  ],
  templateUrl: './read-user-posts.component.html',
  styleUrls: ['./read-user-posts.component.css'],
})
export class ReadUsersPostComponent implements OnInit{
  posts: any;
  
  constructor(private appService: AppService = Inject(AppService)) {}

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
}


