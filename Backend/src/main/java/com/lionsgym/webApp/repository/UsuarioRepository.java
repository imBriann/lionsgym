package com.lionsgym.webApp.repository;

import com.lionsgym.webApp.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email); // Para validación si lo necesitas
}