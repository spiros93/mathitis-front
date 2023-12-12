import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post-alt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-alt.component.html',
  styleUrls: ['./post-alt.component.css']
})
export class PostAltComponent {
  @Input() post: Post | undefined
}
