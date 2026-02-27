package com.example.primerapirest.repositories;

import com.example.primerapirest.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface usuarioRepositories extends JpaRepository<Usuario,Long> {
}
