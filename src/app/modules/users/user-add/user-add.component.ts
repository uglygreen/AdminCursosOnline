import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor() { }

  rol: string = 'admin';
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  profession: string = '';
  description: string = '';

  ngOnInit(): void {
  }

}
