import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { AlarmaService } from '../service/alarma.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alarma-add',
  templateUrl: './alarma-add.component.html',
  styleUrls: ['./alarma-add.component.scss']
})
export class AlarmaAddComponent implements OnInit {

  @Output() AlarmaC: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public alarmaService: AlarmaService,
    public modal: NgbActiveModal
  ) { }

  numero: string = '';
  descripcion: string = '';

  ngOnInit(): void {
  }



  save(){
    if(!this.numero || !this.descripcion ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    const data = {
      numero: this.numero,
      descripcion: this.descripcion
    };
    console.log(data);

    this.alarmaService.register(data).subscribe(
      (resp:any) => {
        console.log(resp);
        this.AlarmaC.emit(resp.alarma);
        this.modal.close();
        this.toaster.open({
          text: 'Nueva Alarma registrada',
          caption: 'Registro',
          type: 'primary'
        });
      },
      (error) => {
        console.error('Error al registrar la alarma:', error);
        // Manejo de errores: notificación al usuario
        this.toaster.open({
          text: 'Ocurrió un error al registrar la alarma',
          caption: 'Error',
          type: 'danger'
        });
      });


  }

}
