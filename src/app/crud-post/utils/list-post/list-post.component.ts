import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, RowDetailService } from 'src/app/app.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {  MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { CrudPostSearchComponent } from '../../utils/crud-post-search/crud-post-search.component';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatCardModule,CrudPostSearchComponent],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostsComponent implements OnInit {
  posts: any;
  foundPost: Post | any;

  constructor(
    private appService: AppService = Inject(AppService),
    private rowDetailService: RowDetailService
  ) {}

  ngOnInit(): void {
    this.rowDetailService.setRowDetail({fromUserPost:false});
    this.appService.getAllPosts().subscribe({
      next: (posts) => {
      this.posts = posts;
      if (posts) {
        this.posts = posts;
        console.log('onInitPostFound', this.posts);
      } else {
        this.posts= [];
      }
    },
    error: (error) => {
      console.log(error)
    },
    complete: () => {'Delete Operation Completed'}

    });
  }

  onPostFound(post: Post | undefined) {
    if (post) {
      this.foundPost = post;
      console.log('onPostFound', this.foundPost);
    } else {
      this.foundPost = undefined;
    }
  }
}