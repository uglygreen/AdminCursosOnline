import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../service/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.scss']
})
export class CategorieDeleteComponent implements OnInit {

  @Input() CATEGORIE:any;
  @Output() CatD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public categorieService: CategorieService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.categorieService.remove(this.CATEGORIE._id).subscribe((resp: any) => {
      console.log(resp);
      this.CatD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'Categoria ha sido eliminado',
        caption: 'Eliminado',
        type: 'primary'
      });
    })

  }
}
