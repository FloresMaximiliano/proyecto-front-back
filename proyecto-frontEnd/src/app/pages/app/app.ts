import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.interface';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
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
  idEditando: number | null =null;


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

  guardarProducto(): void {
    // Preguntamos: ¿Tenemos un ID en la memoria?
    if (this.idEditando !== null) {
      
      // MODO ACTUALIZAR (PUT)
      this.productoService.actualizarProducto(this.idEditando, this.productoFormulario).subscribe({
        next: (productoActualizado) => {
          console.log("¡Producto actualizado en Java!", productoActualizado);
          this.limpiarFormulario();
          this.cargarProductos(); // Recarga la tabla
        },
        error: (error) => console.error("Error al actualizar", error)
      });

    } else {
      
      // MODO CREAR NUEVO (POST) - Lo que ya tenías
      this.productoService.agregarProducto(this.productoFormulario).subscribe({
        next: (productoGuardado) => {
          console.log("¡Producto guardado nuevo en Java!", productoGuardado);
          this.limpiarFormulario();
          this.cargarProductos();
        },
        error: (error) => console.error("Hubo un error al guardar", error)
      });

    }
  }

  // Función de apoyo para dejar todo como nuevo
  limpiarFormulario(): void {
    this.productoFormulario = { nombre: '', descripcion: '', precio: 0, stock: 0, categoria: '' };
    this.idEditando = null; // Borramos la memoria
  }

  eliminarProducto(id: number): void{
    this.productoService.eliminarProducto(id).subscribe({
      next: (respuesta) => {
        console.log("Se elimino en backend java la id : ",`${id}` )
        if (this.idEditando === id) {
          this.limpiarFormulario(); // ¡Reseteamos las cajas y volvemos a "Agregar Nuevo"!
        }

        this.cargarProductos();
      },
      error: (error) =>{
        console.log("Ha ocurtrido un error con el backend : ",error)
      }
    });
  }

  cargarDatosParaEditar(productoSeleccionado: Producto): void {
    // Los 3 puntos (...) se llaman "Spread Operator". Hacen una copia exacta del producto.
    this.productoFormulario = { ...productoSeleccionado }; 
    this.idEditando = productoSeleccionado.id!; // Guardamos el ID en la memoria
  }
}
