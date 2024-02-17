import { Component, OnInit } from '@angular/core';
import { CategorieAddComponent } from '../categorie-add/categorie-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieEditComponent } from '../categorie-edit/categorie-edit.component';
import { CategorieDeleteComponent } from '../categorie-delete/categorie-delete.component';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {
  isLoading: any;
  CATEGORIES: any =  [];
  search: string = '';
  state: string='';

  constructor(
    public modalService: NgbModal,
    public categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
    this.listCategoria();
  }


  listCategoria(){

    this.categorieService.listCategories(this.search, this.state).subscribe((resp:any) => {
      
      this.CATEGORIES = resp.categoria;
    })
  }

  registerCategoria(){
    const modalRef = this.modalService.open(CategorieAddComponent, {centered: true, size: 'md'});

    modalRef.componentInstance.UserC.subscribe((User: any) => {
      console.log(User)
      this.CATEGORIES.unshift(User);
    })
  }

  editCategorie(CATEGORIE: any){
    const modalRef = this.modalService.open(CategorieEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.CATEGORIE = CATEGORIE;
    modalRef.componentInstance.UserE.subscribe((User: any) => {
      let INDEX = this.CATEGORIES.findIndex((item:any) => item._id == CATEGORIE._id)
      if(INDEX != -1){
        this.CATEGORIES[INDEX] = User;
      }      
    });
  }

  deleteCategorie(CATEGORIE: any){
    const modalRef = this.modalService.open(CategorieDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.CATEGORIE = CATEGORIE;
    modalRef.componentInstance.UserD.subscribe((val: any) => { 
      let INDEX = this.CATEGORIES.findIndex((item:any) => item._id == CATEGORIE._id)
      if(INDEX != -1){
        this.CATEGORIES.splice(INDEX,1);
      }      
    });
  }

}
