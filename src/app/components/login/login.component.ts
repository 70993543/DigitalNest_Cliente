import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare let iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user : any = {};
  public usuario : any = {};
  public token : any;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ){
    this.token = localStorage.getItem('token');
    if (this.token) {
      this._router.navigate(['/'])
    }
  }

  login(loginForm: NgForm){
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe({
        next: response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF0000',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            })
          }else{
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            

            this._router.navigate(['/'])
          }
        },
        error: error => {
          console.log(error);
        }
      })
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      })
    }
  }

  /* login(loginForm: NgForm) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      };

      this._clienteService.login_cliente(data).subscribe({
        next: response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF0000',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
          } else {
            this.usuario = response.data;

            if (response.token) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('_id', response.data._id);

              this._router.navigate(['/']);
            } else {
              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF0000',
                class: 'text-danger',
                position: 'topRight',
                message: 'El servicio no proporcionó un token válido.'
              });
            }
          }
        },
        error: error => {
          console.error('Error al iniciar sesión:', error);

          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.'
          });
        }
      });

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      });
    }
  } */
}
