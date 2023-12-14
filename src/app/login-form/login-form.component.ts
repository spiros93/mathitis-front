import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../app.service';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private appService: AppService = Inject(AppService),
    private jwtHelperService: JwtHelperService = Inject(JwtHelperService),
    private router: Router = Inject(Router)
    ){}

  onSubmit(){
    this.appService.login(this.form.value as Credentials).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('access_token', response.access_token);
        const decoded_token = this.jwtHelperService.decodeToken(
          response.access_token
        );
        localStorage.setItem('user_id', decoded_token.userId);
        localStorage.setItem('is_admin', decoded_token.isAdmin);
        localStorage.setItem('username', decoded_token.username);
        this.appService.isLoggedIn.next(true);
        this.appService.fullname.next(decoded_token.fullname);
        console.log('DECODED TOKEN', decoded_token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('ERROR:', error)
      }
    })
    console.log(this.form.value)
  }
}
