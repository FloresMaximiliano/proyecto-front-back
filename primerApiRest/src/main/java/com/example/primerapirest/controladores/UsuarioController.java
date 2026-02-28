package com.example.primerapirest.controladores;

import com.example.primerapirest.modelos.Usuario;
import com.example.primerapirest.repositories.usuarioRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/Usuario")
public class UsuarioController {

    @Autowired
    private usuarioRepositories repository;

    @GetMapping
    public List<Usuario>listarTodos(){
        return repository.findAll();
    };

    @PostMapping
    public Usuario guardar(@RequestBody Usuario nuevoUsuario){
        return repository.save(nuevoUsuario);
    }
}
