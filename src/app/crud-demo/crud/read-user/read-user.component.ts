import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, RowDetailService } from 'src/app/app.service';
import { Person } from 'src/app/interfaces/person';
import { PersonCardComponent } from 'src/app/person-card/person-card.component';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { MatCardModule } from '@angular/material/card';
//import {LoginFormComponent} from '../../../login-form/login-form.component'

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
  isAdmin$: boolean | undefined;

  constructor(
    private appService: AppService = Inject(AppService),
    private rowDetailService: RowDetailService,
    //private LoginFormComponent: LoginFormComponent = Inject(LoginFormComponent)
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
    this.rowDetailService.rowDetail$.subscribe(row => {
      this.isAdmin$ = row ? row.isAdmin: false;
    });
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
