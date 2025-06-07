package com.lionsgym.webApp.service;

import com.lionsgym.webApp.model.Usuario;
import com.lionsgym.webApp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
//import com.lionsgym.webApp.dto.LoginRequest; // Import the new DTO
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Usuario registrarUsuario(Usuario usuario) {

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            // Puedes lanzar una excepción personalizada que se maneje con @ControllerAdvice
            // o devolver null/una entidad con un error para que el controller lo
            // interprete.
            // Por simplicidad, aquí un ejemplo lanzando una excepción que deberías manejar:
            throw new IllegalArgumentException("El correo electrónico ya está registrado.");
        }
        // Aquí podrías hacer validaciones extra si quieres
        // Encriptar la contraseña antes de guardar
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }
       
     // New Login Method
    public Optional<Usuario> loginUsuario(String email, String password) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (passwordEncoder.matches(password, usuario.getPassword())) {
                return usuarioOptional; // Passwords match
            }
        }
        return Optional.empty(); // User not found or password doesn't match
    }
}