import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-reactive-form-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form-post.component.html',
  styleUrls: ['./reactive-form-post.component.css']
})
export class ReactiveFormComponent {
  @Output() person = new EventEmitter<Post>();
  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    age: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(120)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    photoURL: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl<string>('', { validators: [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]
    }),

  })

  onSubmit(){
    this.person.emit(this.form.value as Post);
    this.form.reset();
  }
}
