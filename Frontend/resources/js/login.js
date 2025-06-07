document.addEventListener('DOMContentLoaded', function () {
    // --- Lógica para Mostrar/Ocultar Contraseña ---
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const eyeOpenIcon = document.getElementById('eyeOpen'); // Path dentro del SVG
    const eyeSlashIcon = document.getElementById('eyeSlash'); // Path dentro del SVG

    if (togglePasswordButton && passwordInput && eyeOpenIcon && eyeSlashIcon) {
        togglePasswordButton.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Cambiar el ícono del ojo
            if (type === 'password') {
                eyeOpenIcon.style.display = 'block';
                eyeSlashIcon.style.display = 'none';
            } else {
                eyeOpenIcon.style.display = 'none';
                eyeSlashIcon.style.display = 'block';
            }
        });
    }

    // --- Lógica para el Formulario de Login ---
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage'); // El div que añadimos en el HTML

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el envío tradicional del formulario

            const emailInput = document.getElementById('email'); // ID corregido en HTML
            // passwordInput ya está definido arriba para el toggle

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validación básica en el frontend
            if (!email && !password) {
                loginMessage.textContent = 'Por favor, ingresa tu correo y contraseña.';
                loginMessage.style.color = 'red';
                return;
            }
            if (!email) {
                loginMessage.textContent = 'Por favor, ingresa tu correo electrónico.';
                loginMessage.style.color = 'red';
                return;
            }
            if (!password) {
                loginMessage.textContent = 'Por favor, ingresa tu contraseña.';
                loginMessage.style.color = 'red';
                return;
            }
            // Validación simple de formato de email (puedes mejorarla si quieres)
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                loginMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
                loginMessage.style.color = 'red';
                return;
            }

            const loginData = {
                email: email,
                password: password
            };

            loginMessage.textContent = 'Iniciando sesión...';
            loginMessage.style.color = 'gray'; // O un color neutral

            fetch('http://localhost:8081/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                if (!response.ok) {
                    // Si la respuesta no es OK (ej. 401, 400, 500),
                    // intentamos leer el cuerpo como JSON para el mensaje de error.
                    return response.json().then(errData => {
                        throw new Error(errData.mensaje || `Error ${response.status}`);
                    });
                }
                return response.json(); // Si es OK, procesamos como JSON.
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                if (data.success) {
                    loginMessage.textContent = data.mensaje + '. Redirigiendo...';
                    loginMessage.style.color = 'green';

                    if (data.usuario) {
                        localStorage.setItem('loggedInUser', JSON.stringify(data.usuario));
                        // Aquí es donde más adelante guardarías el token JWT:
                        // localStorage.setItem('userToken', data.token);
                    }

                    // Redirección (ajusta la URL según necesites)
                    // Podrías chequear data.usuario.role si tuvieras roles
                    setTimeout(() => {
                        window.location.href = 'index.html'; // O a un dashboard específico
                    }, 2000);

                } else {
                    // Este 'else' podría no ser necesario si manejamos errores en el .catch
                    // o si la respuesta !response.ok siempre lanza error.
                    loginMessage.textContent = data.mensaje || 'Error al iniciar sesión.';
                    loginMessage.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error en el fetch de login:', error);
                loginMessage.textContent = error.message || 'Error de conexión o el servidor no responde.';
                loginMessage.style.color = 'red';
            });
        });
    }
});
