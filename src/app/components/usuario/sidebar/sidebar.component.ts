import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public token: any;
  public user : any = undefined;
  public user_lc : any = undefined;
  public id : any;

  constructor(private _clienteService: ClienteService){
    this.token = localStorage.getItem('token');
    this.id = String(localStorage.getItem('_id'));

    if (this.token && this.id) {
      this._clienteService
        .obtener_cliente_guest(this.id, this.token)
        .subscribe({
          next: (response) => {
            this.user = response.data;
            localStorage.setItem('user_data', JSON.stringify(this.user));
            
            const userDataString = localStorage.getItem('user_data');

            if (userDataString) {
              this.user_lc = JSON.parse(userDataString);
            } else {
              this.user_lc = undefined;
            }

            console.log(this.user_lc);
          },
          error: (error) => {
            console.error('Error al obtener cliente:', error);
            this.user = undefined;
          },
        });
    } else {
      console.error('Token o ID en localStorage es nulo.');
    }

  }
}
