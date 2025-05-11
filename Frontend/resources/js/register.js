// Mostrar/ocultar contraseña principal
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeOpen');
const eyeSlash = document.getElementById('eyeSlash');
togglePassword.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeOpen.style.display = isPassword ? 'none' : '';
    eyeSlash.style.display = isPassword ? '' : 'none';
});

// Mostrar/ocultar confirmación de contraseña
const confirmPasswordInput = document.getElementById('confirm_password');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const eyeOpenConfirm = document.getElementById('eyeOpenConfirm');
const eyeSlashConfirm = document.getElementById('eyeSlashConfirm');
toggleConfirmPassword.addEventListener('click', function () {
    const isPassword = confirmPasswordInput.type === 'password';
    confirmPasswordInput.type = isPassword ? 'text' : 'password';
    eyeOpenConfirm.style.display = isPassword ? 'none' : '';
    eyeSlashConfirm.style.display = isPassword ? '' : 'none';
});