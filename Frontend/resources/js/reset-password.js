document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a los elementos del DOM ---
    const requestEmailForm = document.getElementById('requestEmailForm');
    const resetEmailInput = document.getElementById('resetEmail');
    const codeSection = document.getElementById('codeSection');
    const censoredEmailSpan = document.getElementById('censoredEmail');
    const resetCodeInput = document.getElementById('resetCode');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const messageDiv = document.getElementById('resetMessage');

    let codigoEnviado = ''; // Variable para almacenar el código recibido del servicio de WhatsApp
    let numeroRealParaEnviar = ''; // Variable para almacenar el número de teléfono del usuario

    // --- Manejador del Paso 1: Enviar correo para obtener el número y enviar el código ---
    requestEmailForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = resetEmailInput.value.trim();

        if (!email) {
            messageDiv.textContent = 'Por favor, ingresa tu correo electrónico.';
            messageDiv.style.color = 'red';
            return;
        }

        messageDiv.textContent = 'Verificando correo, por favor espera...';
        messageDiv.style.color = 'blue';

        // --- 1. PRIMERA LLAMADA: OBTENER NÚMERO DE TELÉFONO DESDE TU BACKEND ---
        fetch('http://localhost:8081/api/usuarios/get-phone-for-reset', { // NUEVO ENDPOINT que debes crear en tu backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.mensaje || 'Correo no encontrado.'); });
            }
            return response.json(); // Espera una respuesta como { "phone": "3001234567" }
        })
        .then(data => {
            if (!data.phone) {
                throw new Error('No se encontró un número de teléfono para este correo.');
            }
            numeroRealParaEnviar = data.phone;
            messageDiv.textContent = 'Enviando código a tu WhatsApp...';

            // --- 2. SEGUNDA LLAMADA: ENVIAR CÓDIGO USANDO LA API DE WHATSAPP ---
            // Esto es igual a como funciona en verificacion.js
            return fetch("https://whatsappverificacion.onrender.com/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: numeroRealParaEnviar })
            });
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.code) {
                codigoEnviado = data.code.toString(); // Guardamos el código que nos devolvió la API
                messageDiv.textContent = 'Hemos enviado un código a tu WhatsApp.';
                messageDiv.style.color = 'green';

                // Ocultar formulario de email y mostrar sección de código
                requestEmailForm.style.display = 'none';
                codeSection.style.display = 'block';

                const censoredEmail = email.replace(/(.{3}).+(.{1}@.+)/, '$1***$2');
                censoredEmailSpan.textContent = censoredEmail;
            } else {
                throw new Error('No se pudo enviar el código de verificación.');
            }
        })
        .catch(error => {
            messageDiv.textContent = error.message;
            messageDiv.style.color = 'red';
        });
    });

    // --- Manejador del Paso 2: Verificar el código (en el frontend) ---
    verifyCodeBtn.addEventListener('click', () => {
        const codeIngresado = resetCodeInput.value.trim();

        if (!codeIngresado || codeIngresado.length !== 6) {
            messageDiv.textContent = 'Por favor, ingresa el código de 6 dígitos.';
            messageDiv.style.color = 'red';
            return;
        }

        // La comparación se hace aquí mismo, en el frontend
        if (codeIngresado === codigoEnviado) {
            messageDiv.textContent = 'Código verificado correctamente.';
            messageDiv.style.color = 'green';

            // Ocultar sección de código y mostrar formulario de nueva contraseña
            codeSection.style.display = 'none';
            resetPasswordForm.style.display = 'block';
        } else {
            messageDiv.textContent = 'El código ingresado es incorrecto.';
            messageDiv.style.color = 'red';
        }
    });

    // --- Manejador del Paso 3: Establecer la nueva contraseña ---
    resetPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmNewPasswordInput.value;
        const email = resetEmailInput.value.trim(); // Se necesita para identificar al usuario

        if (!newPassword || !confirmPassword) {
            messageDiv.textContent = 'Ambos campos de contraseña son obligatorios.';
            messageDiv.style.color = 'red';
            return;
        }

        if (newPassword !== confirmPassword) {
            messageDiv.textContent = 'Las contraseñas no coinciden.';
            messageDiv.style.color = 'red';
            return;
        }

        messageDiv.textContent = 'Actualizando contraseña...';
        messageDiv.style.color = 'blue';

        // --- 3. TERCERA LLAMADA: ENVIAR LA NUEVA CONTRASEÑA A TU BACKEND ---
        fetch('http://localhost:8081/api/usuarios/reset-password', { // ENDPOINT que debes crear en tu backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                newPassword: newPassword
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.mensaje || 'No se pudo actualizar la contraseña.'); });
            }
            return response.json();
        })
        .then(data => {
            messageDiv.textContent = data.mensaje || '¡Contraseña actualizada con éxito!';
            messageDiv.style.color = 'green';
            setTimeout(() => { window.location.href = 'login.html'; }, 3000);
        })
        .catch(error => {
            messageDiv.textContent = error.message;
            messageDiv.style.color = 'red';
        });
    });
});
