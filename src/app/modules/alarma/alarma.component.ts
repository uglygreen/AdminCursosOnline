import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlarmaService } from './service/alarma.service';
import { AlarmaAddComponent } from './alarma-add/alarma-add.component';
import { AlarmaEditComponent } from './alarma-edit/alarma-edit.component';
import { AlarmaDeleteComponent } from './alarma-delete/alarma-delete.component';

@Component({
  selector: 'app-alarma',
  templateUrl: './alarma.component.html',
  styleUrls: ['./alarma.component.scss']
})
export class AlarmaComponent implements OnInit {
  isLoading: any;
  ALARMA: any =  [];
  search: string = '';

  constructor(
    public modalService: NgbModal,
    public alarmaService: AlarmaService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.alarmaService.isLoading$;
    this.listAlarma();
  }


  listAlarma(){

    this.alarmaService.listAlarma(this.search).subscribe((resp:any) => {

      this.ALARMA = resp.alarma;
    })
  }

  registerAlarma(){
    const modalRef = this.modalService.open(AlarmaAddComponent, {centered: true, size: 'md'});

    modalRef.componentInstance.AlarmaC.subscribe((Alarma: any) => {
      console.log(Alarma)
      this.ALARMA.unshift(Alarma);
    })
  }

  editAlarma(alarma: any){
    const modalRef = this.modalService.open(AlarmaEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.ALARMA = alarma;
    modalRef.componentInstance.AlarmaE.subscribe((Alarma: any) => {
      let INDEX = this.ALARMA.findIndex((item:any) => item._id == alarma._id)
      if(INDEX != -1){
        this.ALARMA[INDEX] = Alarma;
      }
    });
  }

  deleteAlarma(alarma: any){
    const modalRef = this.modalService.open(AlarmaDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.ALARMA = alarma;
    modalRef.componentInstance.AlarmaD.subscribe((val: any) => {
      let INDEX = this.ALARMA.findIndex((item:any) => item._id == alarma._id)
      if(INDEX != -1){
        this.ALARMA.splice(INDEX,1);
      }
    });
  }

}
