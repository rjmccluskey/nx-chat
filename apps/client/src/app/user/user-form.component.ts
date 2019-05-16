import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rjm-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  username: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  onJoin() {
    if (this.username) {
      this.userService.setUsername(this.username);
      this.router.navigate(['/chat']);
    }
  }
}
