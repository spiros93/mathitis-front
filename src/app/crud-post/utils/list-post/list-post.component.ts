import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatCardModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostsComponent implements OnInit {
  posts: any;

  constructor(
    private appService: AppService = Inject(AppService),
  ) {}

  ngOnInit(): void {
    this.appService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      if (posts) {
        this.posts = posts;
        console.log('onPostFound', this.posts);
      } else {
        this.posts= [];
      }
    });
  }
}