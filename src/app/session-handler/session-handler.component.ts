import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-handler.component.html',
  styleUrls: ['./session-handler.component.css']
})
export class SessionHandlerComponent {

  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router = Inject(Router),
  ) {}

  public onTokenExpared(){
    this.appService.logout();
    alert("Your session has expired, Please login again!");
    this.router.navigate(["/login"])
  }

}
