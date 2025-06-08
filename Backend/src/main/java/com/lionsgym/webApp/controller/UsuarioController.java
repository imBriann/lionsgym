package com.lionsgym.webApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lionsgym.webApp.model.Usuario;
import com.lionsgym.webApp.service.UsuarioService;
import com.lionsgym.webApp.dto.EmailRequest;
import com.lionsgym.webApp.dto.LoginRequest; // Import the LoginRequest DTO
import com.lionsgym.webApp.dto.ResetPasswordRequest;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            // Debug: Imprimir los datos recibidos
            System.out.println("Datos recibidos en el controller:");
            System.out.println("Nombre: " + usuario.getNombre());
            System.out.println("Apellido: " + usuario.getApellido());
            System.out.println("Email: " + usuario.getEmail());
            System.out.println("Teléfono: " + usuario.getTelefono());
            System.out.println("Fecha Nacimiento: " + usuario.getFechaNacimiento());
            System.out.println("Género: " + usuario.getGenero());

            Usuario usuarioRegistrado = usuarioService.registrarUsuario(usuario);

            // Respuesta de éxito
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Usuario registrado exitosamente");
            response.put("usuario", usuarioRegistrado);
            response.put("success", true);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // Error de validación (ej: email ya existe)
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("mensaje", e.getMessage());
            errorResponse.put("success", false);

            return ResponseEntity.badRequest().body(errorResponse);

        } catch (Exception e) {
            // Error interno del servidor
            System.err.println("Error interno al registrar usuario: " + e.getMessage());
            e.printStackTrace();

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("mensaje", "Error interno del servidor: " + e.getMessage());
            errorResponse.put("success", false);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // New Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Intento de login para email: " + loginRequest.getEmail());
            Optional<Usuario> usuarioOptional = usuarioService.loginUsuario(loginRequest.getEmail(),
                    loginRequest.getPassword());

            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                Map<String, Object> response = new HashMap<>();
                response.put("mensaje", "Login exitoso para " + usuario.getNombre());
                response.put("success", true);
                // IMPORTANT: Do NOT send the password back, even if hashed.
                // Send only necessary info, e.g., a token, user ID, name, role.
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", usuario.getId());
                userData.put("nombre", usuario.getNombre());
                userData.put("email", usuario.getEmail());
                // Add role if you implement it later: userData.put("role", usuario.getRole());
                response.put("usuario", userData);

                // response.put("token", "GENERATED_JWT_TOKEN_HERE");

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("mensaje", "Credenciales inválidas o usuario no encontrado.");
                errorResponse.put("success", false);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }
        } catch (Exception e) {
            System.err.println("Error interno durante el login: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("mensaje", "Error interno del servidor durante el login: " + e.getMessage());
            errorResponse.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // ... dentro de la clase UsuarioController

    // ENDPOINT 1: OBTENER TELÉFONO PARA RESTABLECER CONTRASEÑA
    @PostMapping("/get-phone-for-reset")
    public ResponseEntity<?> getPhoneForReset(@RequestBody EmailRequest emailRequest) {
        try {
            String phone = usuarioService.getPhoneByEmail(emailRequest.getEmail());

            // Si se encuentra, devuelve el número de teléfono
            Map<String, Object> response = new HashMap<>();
            response.put("phone", phone);
            response.put("success", true);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            // Si el usuario no se encuentra, devuelve un error 404
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("mensaje", e.getMessage());
            errorResponse.put("success", false);

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    // ENDPOINT 2: RESTABLECER LA CONTRASEÑA
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetRequest) {
        try {
            // Llama al servicio para cambiar la contraseña
            usuarioService.resetPassword(resetRequest.getEmail(), resetRequest.getNewPassword());

            // Devuelve una respuesta de éxito
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Contraseña actualizada exitosamente.");
            response.put("success", true);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            // Si el usuario no se encuentra
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("mensaje", e.getMessage());
            errorResponse.put("success", false);

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);

        } catch (Exception e) {
            // Para cualquier otro error inesperado
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("mensaje", "Error interno al restablecer la contraseña.");
            errorResponse.put("success", false);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}