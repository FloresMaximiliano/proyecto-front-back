import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.interface';

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
}
