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
    public userService: AlarmaService,
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

    let formData = new FormData();

    formData.append("numero", this.numero);
    formData.append("descripcion", this.descripcion);

    this.userService.register(formData).subscribe((resp:any) => {
      console.log(resp);
      this.AlarmaC.emit(resp.alarma);
      this.modal.close();
      this.toaster.open({
        text: 'Nueva Alarma registrada',
        caption: 'Registro',
        type: 'primary'
      });
    })


  }

}
