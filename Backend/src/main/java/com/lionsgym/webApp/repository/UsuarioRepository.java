package com.lionsgym.webApp.repository;

import com.lionsgym.webApp.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; // Make sure to import Optional

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email); // Para validación si lo necesitas
    Optional<Usuario> findByEmail(String email); 
}