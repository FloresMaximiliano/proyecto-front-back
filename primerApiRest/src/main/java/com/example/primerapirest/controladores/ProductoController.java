package com.example.primerapirest.controladores;


import com.example.primerapirest.modelos.Producto;
import com.example.primerapirest.repositories.productoRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {



    @Autowired
    private productoRepositories repository;

    //(Busca un producto solo por su ID):
    // @PathVariable toma el número que pongas en la URL (ej: /api/productos/1) y lo mete en la variable 'id'
    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> productos = repository.findAll();
        return ResponseEntity.ok(productos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarId(@PathVariable Long id){
        Optional<Producto> producto = repository.findById(id);

        if(producto.isPresent()){
            return  ResponseEntity.ok(producto.get());  // devuelve estado 200 ok y el json
        } else {
            return ResponseEntity.notFound().build(); // devuelve estado 404 not found
        }
    };

    @PostMapping
    public Producto guardar(@RequestBody Producto nuevoProducto){
        return repository.save(nuevoProducto);
    };

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id,@RequestBody Producto productoActualizado ){

        Optional<Producto>  productoExistente= repository.findById(id);

        if (productoExistente.isPresent()) {
            // 1. Sacamos el producto original de la base de datos
            Producto producto = productoExistente.get();

            // 2. Le reemplazamos los datos viejos por los nuevos que llegaron en el JSON
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setStock(productoActualizado.getStock());
            producto.setCategoria(productoActualizado.getCategoria());

            // 3. Guardamos los cambios y devolvemos un 200 OK con el producto actualizado
            Producto productoGuardado = repository.save(producto);
            return ResponseEntity.ok(productoGuardado);
        } else {
            // Si intentas actualizar el ID 99 y no existe, pum: 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        // 1. Primero preguntamos si el ID realmente existe en la base de datos
        if (repository.existsById(id)) {
            // 2. Si existe, lo borramos y enviamos un 200 OK
            repository.deleteById(id);
            return ResponseEntity.ok("Producto eliminado correctamente.");
        } else {
            // 3. Si NO existe, devolvemos un error 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }




}
