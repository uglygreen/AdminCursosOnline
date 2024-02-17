import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }


   listCategories(search: any = null, state:any = null ){
    this.isLoadingSubject.next(true); 
    let headers = new HttpHeaders({'token': this.authService.token});
    let LINK = "?";
    if(search){
      LINK += "search="+search;
    }
    if(state){
      if(search){
        LINK += "&rol="+state;
      }else{
        LINK += "rol="+state;
      }
      
    }
    let URL = URL_SERVICIOS+"/categorias/list"+LINK;
    console.log(URL)

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   registerCategorie(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authService.token});
    let URL = URL_SERVICIOS+"/categorias/register";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   updateCategorie(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authService.token});
    let URL = URL_SERVICIOS+"/categorias/update";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   removeCategorie(categorie_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authService.token});
    let URL = URL_SERVICIOS+"/categorias/delete/"+categorie_id;

    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }
}
