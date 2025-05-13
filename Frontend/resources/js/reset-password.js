document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('requestEmailForm');
    const codeSection = document.getElementById('codeSection');
    const censoredEmail = document.getElementById('censoredEmail');

    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        // Aquí deberías hacer la petición para enviar el código al correo

        // Censura el correo (ejemplo: j***e@gmail.com)
        const censored = email.replace(/(.{3}).+(.{1}@.+)/, (m, a, b) => a + '***' + b);
        censoredEmail.textContent = censored;

        emailForm.style.display = 'none';
        codeSection.style.display = 'block';
    });

    // Aquí puedes agregar el manejo del botón de verificar código
});