import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/users/';


@Injectable()
export class UsersService {

    private users: User[] = [];
    filteredUsers: User[];
    usersUpdated = new Subject<User[]>();

    constructor(private http: HttpClient, private router: Router) {

    }

    getUsers() {
        this.http.get<{ message: string, users: any }>(BACKEND_URL)
            .pipe(map((userData) => {
                return userData.users.map(user => {
                    return {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                        id: user._id
                    };
                });
            }))
            .subscribe((transformedUsers) => {
                this.users = transformedUsers;
                this.usersUpdated.next([...this.users]);
            });
    }

    // getUsersUpdateListener() {
    //     return this.usersUpdated.asObservable();
    // }

    addUser(firstName: string, lastName: string, phoneNumber: string) {
        const user: User = { id: null, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber };
        this.http.post<{ message: string, userId: string }>(BACKEND_URL, user)
            .subscribe(responseData => {
                const id = responseData.userId;
                user.id = id;
                this.users.push(user);
                this.usersUpdated.next([...this.users]);
                this.router.navigate(['/']);
            });
    }

    deleteUser(userId: string) {
        this.http.delete(BACKEND_URL + userId)
            .subscribe(() => {
                const updatedUsers = this.users.filter(user => user.id !== userId);
                this.users = updatedUsers;
                this.usersUpdated.next([...this.users]);
            });
    }

    searchUser(lastName: string) {
        this.filteredUsers = this.users.filter(user => user.lastName === lastName);
        this.usersUpdated.next([...this.filteredUsers]);
    }

    getAllUsers() {
        this.filteredUsers = this.users;
        this.usersUpdated.next([...this.filteredUsers]);
    }
}
