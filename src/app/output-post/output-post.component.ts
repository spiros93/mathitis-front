import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-output-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './output-post.component.html',
  styleUrls: ['./output-post.component.css']
})
export class OutputDemoComponent {
  @Input() userData: Post[] = [];
  @Output() sendPost  = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<number>();

  onSendPost(user: Post){
    this.sendPost.emit(user);
  }

  onDeletePost(i: number){
    this.deletePost.emit(i);
  }
}
