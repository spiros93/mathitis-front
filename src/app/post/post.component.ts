import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post = {
    givenName: "The post's First Name",
    surName: "The post's Last Name",
    age: 0,
    email: "The post's Email",
    address: "The post's Address",
    password: "The post's Password",
    username: "The post's Username"

  }
}
