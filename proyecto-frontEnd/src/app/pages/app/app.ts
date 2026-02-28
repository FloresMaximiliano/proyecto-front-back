import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.interface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-app',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  listaProductos: Producto[]= [];
  

  productoFormulario: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
  };


  constructor(private productoService: ProductoService,
    private cdr:ChangeDetectorRef
  ){}


  ngOnInit(): void {
    
    this.cargarProductos();
  }

  
  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (datosQueLlegaron) => {
        this.listaProductos = datosQueLlegaron;
        console.log("Conexion Exitosa", this.listaProductos);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error con la comunicacion con java", error);
      }
    });
  }

  guardarNuevoProducto(): void {

    console.log("Datos listos para enviar:", this.productoFormulario);
    this.productoService.agregarProducto(this.productoFormulario).subscribe({
      next: (productoGuardado) => {
        console.log("¡Producto guardado con éxito en Java!", productoGuardado);
        
        // Limpiamos las cajas de texto
        this.productoFormulario = { nombre: '', descripcion: '', precio: 0, stock: 0, categoria: '' };
        
        // Volvemos a pedir la lista a Java para que la pantalla se actualice sola
        this.cargarProductos();
      },
      error: (error) => {
        console.error("Hubo un error al guardar", error);
      }
    });
  }
}
