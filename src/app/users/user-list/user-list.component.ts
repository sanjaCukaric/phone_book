import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Subscription, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  private usersUpdated: Subscription;
  searchStream = new Subject<string>();


  constructor(public usersService: UsersService) { }

  ngOnInit() {

    this.usersService.getUsers();
    this.usersUpdated = this.usersService.usersUpdated
      .subscribe((users: User[]) => this.users = users);

    this.searchStream
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(lastName => this.usersService.searchUser(lastName))
      )
      .subscribe(data => this.users = data);
  }

  ngOnDestroy() {
    this.usersUpdated.unsubscribe();
  }

  onDelete(userId: string) {
    this.usersService.deleteUser(userId);
  }
}
