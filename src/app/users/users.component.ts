import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  users: any[] = [];
  isEditing: boolean = false;
  currentUser: any = null;
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error loading users', error);
      }
    );
  }

  edit(user: any): void {
    this.currentUser = { ...user };
    this.isEditing = true;
  }

  delete(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      (response: any) => {
        console.log('User deleted:', response);
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    );
  }

  add(): void {
    this.currentUser = {
      username: '',
      password: '',
      role: ''
    };
    this.isEditing = true;
  }

  save(): void {
    const userExists = this.users.find(user => user.username === this.currentUser.username);
    if (userExists) {
      this.usersService.updateUser(this.currentUser).subscribe(
        (response: any) => {
          console.log('User updated:', response);
          this.loadUsers();
        },
        (error: any) => {
          console.error('Error updating user', error);
        }
      );
    }
    else {
      this.usersService.createUser(this.currentUser).subscribe(
        (response: any) => {
          console.log('User created:', response);
          this.loadUsers();
        },
        (error: any) => {
          console.error('Error creating user', error);
        }
      );
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.currentUser = null
  }


}
