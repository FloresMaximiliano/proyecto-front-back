import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.interface';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = "http://localhost:8080/api/producto";

  constructor(private http: HttpClient
  ){}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
  }

  agregarProducto(nuevoProducto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, nuevoProducto);
  }

  eliminarProducto(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`,  {responseType:'text'})
  }

  actualizarProducto(id:number,productoActualizado: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.apiUrl}/${id}`,productoActualizado)
  }
}
