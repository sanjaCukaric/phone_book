import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit() {

  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.usersService.addUser(form.value.firstName, form.value.lastName, form.value.phoneNumber);
    form.resetForm();
  }

  onSearch(lastName: string) {
    this.usersService.searchUser(lastName);
  }

  getAllUsers() {
    this.usersService.getAllUsers();
  }


}
