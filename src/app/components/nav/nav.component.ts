import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit{

  public user_lc: any = {};

  constructor(private _clienteService: ClienteService,
    private _router: Router
    ) {}

  ngOnInit(): void {
    // Obtenemos el usuario solo si hay un token almacenado
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('_id');

    if (token && id) {
      this._clienteService.obtener_cliente_guest(id, token).subscribe({
        next: (response) => {
          this.user_lc = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.user_lc));
        },
        error: (error) => {
          console.error('Error al obtener cliente:', error);
          console.error('Detalles del error:', error.error);
          
          this.user_lc = undefined;
        },
      });
    }
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/'])
  }

  /* public token: any;
  public id: any;
  public user: any = undefined;
  public user_lc: any = {};

  constructor(private _clienteService: ClienteService) {
    
  }
  ngOnInit(): void {
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

            console.log('user_lc después de la inicialización:', this.user_lc);
          },
          error: (error) => {
            console.error('Error al obtener cliente:', error);
            this.user = undefined;
          },
        });
    } else {
      console.error('Token o ID en localStorage es nulo.');
    }
  } */
}

  /*
  constructor( private _clienteService:ClienteService){
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id')

    this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe({
      next: response => {
        console.log(response);
        
      },
      error: error => {
        console.error('Error al obtener cliente:', error);
        
      }
    })
  } */

 
