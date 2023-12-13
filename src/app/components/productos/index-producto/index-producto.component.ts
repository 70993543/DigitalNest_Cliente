import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css'],
})
export class IndexProductoComponent {
  public config_global : any = {};
  public filter_categoria = '';

  constructor(private _clienteService: ClienteService) {
    this._clienteService.obtener_config_publico().subscribe({
      next: response => {

      }
    })
  }

  public sliderConfig: any = {
    start: [0, 1000],
    connect: true,
    decimals: false,
    range: {
      min: 0,
      max: 1000,
    },
    tooltips: [true, true],
    pips: {
      mode: 'count',
      values: 5,
    },
  };

  public sliderValues: number[] = [0, 1000];

  public form = new FormGroup({
    priceRange: new FormControl([0, 100]),
  });


  onSliderChange(values: number[]) {
    this.sliderValues = values;
    this.form.controls['priceRange'].setValue(values);
  }
}



