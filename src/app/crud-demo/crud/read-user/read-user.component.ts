import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/interfaces/person';
import { PersonCardComponent } from 'src/app/person-card/person-card.component';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { MatCardModule } from '@angular/material/card';
import {LoginFormComponent} from '../../../login-form/login-form.component'

@Component({
  selector: 'app-read-user',
  standalone: true,
  imports: [
    CommonModule,
    PersonCardComponent,
    CrudUserSearchComponent,
    MatCardModule,
  ],
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css'],
})
export class ReadUserComponent {
  foundUser: Person | undefined;
  isAdmin$ = this.LoginFormComponent.isAdmin;

  constructor(
    private appService: AppService = Inject(AppService),
    private LoginFormComponent: LoginFormComponent = Inject(LoginFormComponent)
  ) {}

  onUserFound(user: Person | undefined) {
    if (user) {
      this.foundUser = user;
      console.log('onUserFound', this.foundUser);
    } else {
      this.foundUser = undefined;
    }
  }

  ngOnInit(): void {
    const id = localStorage.getItem('user_id') ?? '';
    this.appService.getUserById(id).subscribe((user) => {
      if (user) {
        this.foundUser = user;
        console.log('onPostFound', this.foundUser);
      } else {
        this.foundUser= undefined;
      }
    });
  }
}
