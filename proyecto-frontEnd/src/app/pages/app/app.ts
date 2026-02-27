import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-app',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  listaProductos: Producto[]= [];

  constructor(private productoService: ProductoService){}


  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next:(datosQueLlegaron) =>{
        this.listaProductos=datosQueLlegaron;
        console.log("Conexion Exitosa",this.listaProductos)
      },
      error: (error) => {
        console.error("Error con la comunicacion con java",error)
      }
    });
  }
}
