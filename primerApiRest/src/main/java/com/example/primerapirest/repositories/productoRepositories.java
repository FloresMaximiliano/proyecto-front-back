package com.example.primerapirest.repositories;

import com.example.primerapirest.modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productoRepositories extends JpaRepository<Producto,Long> {
}
