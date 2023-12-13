import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
declare let iziToast:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public cliente : any = {};
  public id:any;
  public token:any;
  public nuevaContrasena: string = '';

  constructor(private _clienteService:ClienteService){
    this.id = localStorage.getItem('_id')
    this.token = localStorage.getItem('token')

    if (this.id) {
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe({
        next: response => {
          this.cliente = response.data;
        }
      })
    }
  }

  ngOnInit(): void {
    
  }

  actualizar(actualizarForm: NgForm){
    if (actualizarForm.valid) {

      // Incluimos la nueva contraseña en los datos que se envian al backend
      const datosActualizados = {...this.cliente, password: this.nuevaContrasena}

      // Eliminamos la propiedad 'password' si no hay una nueca contraseña
      if (!this.nuevaContrasena.trim()) {
        delete datosActualizados.password;
      }

      /* if (this.nuevaContrasena.trim() !== '') {
        this.cliente.password = this.nuevaContrasena;
      }else{
        delete this.cliente.password;
      } */

      this._clienteService.actualizar_perfil_cliente_guest(this.id, datosActualizados, this.token).subscribe({
        next: response => {
          
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#10C74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó su perfil correctamente'
          })
        },
        error: error => {
          console.error(error);
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
}
