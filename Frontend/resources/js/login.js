// Mostrar/ocultar contraseña
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOpen = document.getElementById('eyeOpen');
const eyeSlash = document.getElementById('eyeSlash');

togglePassword.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeOpen.style.display = isPassword ? 'none' : '';
    eyeSlash.style.display = isPassword ? '' : 'none';
});