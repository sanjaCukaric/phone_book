import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  private usersUpdated: Subscription;


  constructor(public usersService: UsersService) { }

  ngOnInit() {

    this.usersService.getUsers();
    this.usersUpdated = this.usersService.usersUpdated
      .subscribe((users: User[]) => this.users = users);
  }

  ngOnDestroy() {
    this.usersUpdated.unsubscribe();
  }

  onDelete(userId: string) {
    this.usersService.deleteUser(userId);
  }

  onSearch(lastName) {
    this.usersService.searchUser(lastName);
  }

  getAllUsers() {
    this.usersService.getAllUsers();
  }



}
