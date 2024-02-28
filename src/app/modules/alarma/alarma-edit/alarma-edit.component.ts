import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { AlarmaService } from '../service/alarma.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alarma-edit',
  templateUrl: './alarma-edit.component.html',
  styleUrls: ['./alarma-edit.component.scss']
})
export class AlarmaEditComponent implements OnInit {

  @Input() ALARMA:any;
  @Output() UserE: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public alarmaService: AlarmaService,
    public modal: NgbActiveModal
  ) { }

  numero: string = '';
  descripcion: string = '';

  ngOnInit(): void {

    this.numero = this.ALARMA.numero;
    this.descripcion = this.ALARMA.descripcion;
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

    // let formData = new FormData();

    // formData.append("_id", this.ALARMA._id);
    // formData.append("numero", this.numero);
    // formData.append("descripcion", this.descripcion);
    const data = {
      _id: this.ALARMA._id,
      numero: this.numero,
      descripcion: this.descripcion
    };
    this.alarmaService.update(data).subscribe((resp:any) => {
      console.log(resp);
      this.UserE.emit(resp.alarma);
      this.modal.close();

      this.toaster.open({
        text: 'Alarma editado',
        caption: 'Editado',
        type: 'primary'
      });
    })


  }

}
