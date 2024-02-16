import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  @Input() USER:any;
  @Output() UserD: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public toaster: Toaster,
    public userService: UsersService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.userService.remove(this.USER._id).subscribe((resp: any) => {
      console.log(resp);
      this.UserD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'Usuario ha sido eliminado',
        caption: 'Eliminado',
        type: 'primary'
      });
    })

  }
}
