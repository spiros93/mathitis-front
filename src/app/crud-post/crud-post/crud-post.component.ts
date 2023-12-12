import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from '../crud/create-post/create-post.component';
import { ReadPostComponent } from '../crud/read-post/read-post.component';
import { UpdatePostComponent } from '../crud/update-post/update-post.component';
import { DeletePostComponent } from '../crud/delete-post/delete-post.component';
import { ListPostsComponent } from '../utils/list-post/list-post.component';

@Component({
  selector: 'app-crud-demo',
  standalone: true,
  imports: [
    CommonModule, 
    CreatePostComponent, 
    ReadPostComponent, 
    UpdatePostComponent, 
    DeletePostComponent, 
    ListPostsComponent
  ],
  templateUrl: './crud-post.component.html',
  styleUrls: ['./crud-post.component.css']
})
export class CrudDemoComponent {
  crudOperation: string | undefined

  onSelection(operation: string){
    this.crudOperation = operation;
  }

  listPosts(){
    this.crudOperation = 'list'
  }
}
