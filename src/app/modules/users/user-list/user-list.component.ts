import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddComponent } from '../user-add/user-add.component';
import { UsersService } from '../service/users.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isLoading: any;
  USERS: any =  [];

  constructor(
    public modalService: NgbModal,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    this.listarUser();
  }

  listarUser(){
    this.isLoading = this.userService.isLoading$;
    this.userService.listUser().subscribe((resp:any) => {
      
      this.USERS = resp.users;
    })
  }

  registerUser(){
    const modalRef = this.modalService.open(UserAddComponent, {centered: true, size: 'md'});

    modalRef.componentInstance.UserC.subscribe((User: any) => {
      console.log(User)
      this.USERS.unshift(User);
    })
  }

  editUser(user: any){
    const modalRef = this.modalService.open(UserEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.USER = user;

    modalRef.componentInstance.UserE.subscribe((User: any) => {

      let INDEX = this.USERS.findIndex((item:any) => item._id == user._ID)
      if(INDEX != -1){
        this.USERS[INDEX] = User;
      }
      
    })
  }

  deleteUser(user: any){
    const modalRef = this.modalService.open(UserDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.USER = user;

    modalRef.componentInstance.UserD.subscribe((val: any) => {
 
      let INDEX = this.USERS.findIndex((item:any) => item._id == user._ID)
      if(INDEX != -1){
        this.USERS.splice(INDEX,1)
      }
      
    })
  }

}
