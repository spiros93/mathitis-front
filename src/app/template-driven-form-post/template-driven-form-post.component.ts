import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-template-driven-form-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-driven-form-post.component.html',
  styleUrls: ['./template-driven-form-post.component.css']
})
export class TemplateDrivenFormComponent {
  @Output() post = new EventEmitter<Post>();

  onSubmit(form:any){
    this.post.emit(form.value as Post);
    form.reset();
  }
}
