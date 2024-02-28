import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../../users/service/users.service';
import { AlarmaService } from '../service/alarma.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alarma-delete',
  templateUrl: './alarma-delete.component.html',
  styleUrls: ['./alarma-delete.component.scss']
})
export class AlarmaDeleteComponent implements OnInit {

  @Input() ALARMA:any;
  @Output() AlarmaD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public alarmaService: AlarmaService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  delete(){

    this.alarmaService.remove(this.ALARMA._id).subscribe((resp: any) => {
      console.log(resp);
      this.AlarmaD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'Alarma ha sido eliminado',
        caption: 'Eliminado',
        type: 'primary'
      });
    },
    (error) => {
      console.error('Error al eliminar la alarma:', error);
      // Mostrar una notificación al usuario sobre el error
      this.toaster.open({
        text: 'Ocurrió un error al eliminar la alarma',
        caption: 'Error',
        type: 'danger'
      });
    });

  }
}
