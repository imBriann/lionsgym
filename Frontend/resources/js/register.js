function _0x4d9d(){const _0x254a49=['showPicker','getElementById','7XzDpTT','display','type','password','fecha_nacimiento','1336010iCGQay','function','eyeSlashConfirm','toggleConfirmPassword','click','confirm_password','text','2556228SsIDUv','10712888PIFXsd','eyeOpen','259008gQzTjX','1173309RVIOvr','eyeSlash','style','none','2098544XzINfa','eyeOpenConfirm','624096eQKiYC'];_0x4d9d=function(){return _0x254a49;};return _0x4d9d();}const _0xc47876=_0x5679;(function(_0x334058,_0x426ca1){const _0x26e390=_0x5679,_0x209438=_0x334058();while(!![]){try{const _0x58c74a=parseInt(_0x26e390(0x7e))/0x1+parseInt(_0x26e390(0x85))/0x2+parseInt(_0x26e390(0x7f))/0x3+parseInt(_0x26e390(0x83))/0x4+-parseInt(_0x26e390(0x74))/0x5+parseInt(_0x26e390(0x7b))/0x6+-parseInt(_0x26e390(0x6f))/0x7*(parseInt(_0x26e390(0x7c))/0x8);if(_0x58c74a===_0x426ca1)break;else _0x209438['push'](_0x209438['shift']());}catch(_0x8187ee){_0x209438['push'](_0x209438['shift']());}}}(_0x4d9d,0x4ad58));const passwordInput=document[_0xc47876(0x6e)](_0xc47876(0x72)),togglePassword=document['getElementById']('togglePassword'),eyeOpen=document[_0xc47876(0x6e)](_0xc47876(0x7d)),eyeSlash=document['getElementById'](_0xc47876(0x80));function _0x5679(_0x5e29f1,_0xb64a75){const _0x4d9d5b=_0x4d9d();return _0x5679=function(_0x5679f6,_0x197d67){_0x5679f6=_0x5679f6-0x6e;let _0x1926af=_0x4d9d5b[_0x5679f6];return _0x1926af;},_0x5679(_0x5e29f1,_0xb64a75);}togglePassword['addEventListener'](_0xc47876(0x78),function(){const _0x3bb8e4=_0xc47876,_0x243545=passwordInput[_0x3bb8e4(0x71)]===_0x3bb8e4(0x72);passwordInput[_0x3bb8e4(0x71)]=_0x243545?_0x3bb8e4(0x7a):_0x3bb8e4(0x72),eyeOpen['style'][_0x3bb8e4(0x70)]=_0x243545?_0x3bb8e4(0x82):'',eyeSlash['style'][_0x3bb8e4(0x70)]=_0x243545?'':_0x3bb8e4(0x82);});const confirmPasswordInput=document[_0xc47876(0x6e)](_0xc47876(0x79)),toggleConfirmPassword=document[_0xc47876(0x6e)](_0xc47876(0x77)),eyeOpenConfirm=document[_0xc47876(0x6e)](_0xc47876(0x84)),eyeSlashConfirm=document[_0xc47876(0x6e)](_0xc47876(0x76));toggleConfirmPassword['addEventListener'](_0xc47876(0x78),function(){const _0x572df9=_0xc47876,_0x5c2f92=confirmPasswordInput['type']===_0x572df9(0x72);confirmPasswordInput[_0x572df9(0x71)]=_0x5c2f92?_0x572df9(0x7a):_0x572df9(0x72),eyeOpenConfirm[_0x572df9(0x81)][_0x572df9(0x70)]=_0x5c2f92?_0x572df9(0x82):'',eyeSlashConfirm['style']['display']=_0x5c2f92?'':_0x572df9(0x82);});function openDatePicker(){const _0x50d78a=_0xc47876,_0x46f15c=document[_0x50d78a(0x6e)](_0x50d78a(0x73));typeof _0x46f15c[_0x50d78a(0x86)]===_0x50d78a(0x75)?_0x46f15c[_0x50d78a(0x86)]():_0x46f15c['focus']();}function clearErrors() {
    document.querySelectorAll('.input-error').forEach(e => e.textContent = '');
}

function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

document.addEventListener('DOMContentLoaded', function () {
    // Limitar fecha de nacimiento en el input date (18-99 años)
    const inputFecha = document.getElementById('fecha_nacimiento');
    if (inputFecha) {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const max = new Date(yyyy - 18, hoy.getMonth(), hoy.getDate());
        const min = new Date(yyyy - 99, hoy.getMonth(), hoy.getDate());
        inputFecha.max = max.toISOString().split('T')[0];
        inputFecha.min = min.toISOString().split('T')[0];
    }

    // Solo letras en nombre y apellido (sin tildes ni caracteres especiales)
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    if (nombreInput) {
        nombreInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^A-Za-z]/g, '');
            setError('error-nombre', '');
        });
    }
    if (apellidoInput) {
        apellidoInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^A-Za-z]/g, '');
            setError('error-apellido', '');
        });
    }

    // Validación en vivo para nombre
    if (nombreInput) {
        nombreInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^A-Za-z]/g, '');
            if (!this.value) {
                setError('error-nombre', 'El nombre es obligatorio.');
            } else if (!/^[A-Za-z]+$/.test(this.value)) {
                setError('error-nombre', 'El nombre solo debe contener letras (sin tildes ni caracteres especiales).');
            } else {
                setError('error-nombre', '');
            }
        });
    }

    // Validación en vivo para apellido
    if (apellidoInput) {
        apellidoInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^A-Za-z]/g, '');
            if (!this.value) {
                setError('error-apellido', 'El apellido es obligatorio.');
            } else if (!/^[A-Za-z]+$/.test(this.value)) {
                setError('error-apellido', 'El apellido solo debe contener letras (sin tildes ni caracteres especiales).');
            } else {
                setError('error-apellido', '');
            }
        });
    }

    // Validación en vivo para email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            if (!this.value) {
                setError('error-email', 'El correo es obligatorio.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
                setError('error-email', 'El correo no es válido.');
            } else {
                setError('error-email', '');
            }
        });
    }

    // Validación en vivo para teléfono
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (!this.value) {
                setError('error-telefono', 'El teléfono es obligatorio.');
            } else if (!/^\d{10}$/.test(this.value)) {
                setError('error-telefono', 'El teléfono debe tener 10 dígitos numéricos.');
            } else {
                setError('error-telefono', '');
            }
        });
    }

    // Validación en vivo para fecha de nacimiento
    if (inputFecha) {
        inputFecha.addEventListener('input', function () {
            if (!this.value) {
                setError('error-fecha_nacimiento', 'Por favor selecciona tu fecha de nacimiento.');
            } else {
                const hoy = new Date();
                const fechaNac = new Date(this.value);
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const m = hoy.getMonth() - fechaNac.getMonth();
                if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                if (edad < 18 || edad > 99) {
                    setError('error-fecha_nacimiento', 'Debes tener entre 18 y 99 años para registrarte.');
                } else {
                    setError('error-fecha_nacimiento', '');
                }
            }
        });
    }

    // Validación en vivo para género
    const generoInput = document.getElementById('genero');
    if (generoInput) {
        generoInput.addEventListener('change', function () {
            if (!this.value) {
                setError('error-genero', 'Por favor selecciona tu género.');
            } else {
                setError('error-genero', '');
            }
        });
    }

    // Validación en vivo para contraseña
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            if (!this.value) {
                setError('error-password', 'La contraseña es obligatoria.');
            } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.value)) {
                setError('error-password', 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y una minúscula.');
            } else {
                setError('error-password', '');
            }
        });
    }

    // Validación en vivo para confirmar contraseña
    const confirmPasswordInput = document.getElementById('confirm_password');
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function () {
            if (!this.value) {
                setError('error-confirm_password', 'Debes confirmar la contraseña.');
            } else if (this.value !== passwordInput.value) {
                setError('error-confirm_password', 'Las contraseñas no coinciden.');
            } else {
                setError('error-confirm_password', '');
            }
        });
        passwordInput.addEventListener('input', function () {
            if (confirmPasswordInput.value && confirmPasswordInput.value !== this.value) {
                setError('error-confirm_password', 'Las contraseñas no coinciden.');
            } else if (confirmPasswordInput.value) {
                setError('error-confirm_password', '');
            }
        });
    }

    // Desactivar validación HTML5 por defecto para mostrar solo mensajes personalizados
    const form = document.getElementById('registerForm');
    if (form) {
        // Desactivar validación nativa
        form.setAttribute('novalidate', 'novalidate');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();
            let hasError = false;

            const nombre = nombreInput ? nombreInput.value.trim() : '';
            const apellido = apellidoInput ? apellidoInput.value.trim() : '';
            const email = document.getElementById('email')?.value.trim() || '';
            const telefono = document.getElementById('telefono')?.value.trim() || '';
            const fechaNacimiento = inputFecha ? inputFecha.value : '';
            const genero = document.getElementById('genero')?.value || '';
            const password = document.getElementById('password')?.value || '';
            const confirmPassword = document.getElementById('confirm_password')?.value || '';

            // Nombre
            if (!nombre) {
                setError('error-nombre', 'El nombre es obligatorio.');
                hasError = true;
            } else if (!/^[A-Za-z]+$/.test(nombre)) {
                setError('error-nombre', 'El nombre solo debe contener letras (sin tildes ni caracteres especiales).');
                hasError = true;
            }

            // Apellido
            if (!apellido) {
                setError('error-apellido', 'El apellido es obligatorio.');
                hasError = true;
            } else if (!/^[A-Za-z]+$/.test(apellido)) {
                setError('error-apellido', 'El apellido solo debe contener letras (sin tildes ni caracteres especiales).');
                hasError = true;
            }

            // Email
            if (!email) {
                setError('error-email', 'El correo es obligatorio.');
                hasError = true;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError('error-email', 'El correo no es válido.');
                hasError = true;
            }

            // Teléfono
            if (!telefono) {
                setError('error-telefono', 'El teléfono es obligatorio.');
                hasError = true;
            } else if (!/^\d{10}$/.test(telefono)) {
                setError('error-telefono', 'El teléfono debe tener 10 dígitos numéricos.');
                hasError = true;
            }

            // Fecha de nacimiento
            if (!fechaNacimiento) {
                setError('error-fecha_nacimiento', 'Por favor selecciona tu fecha de nacimiento.');
                hasError = true;
            } else {
                const hoy = new Date();
                const fechaNac = new Date(fechaNacimiento);
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const m = hoy.getMonth() - fechaNac.getMonth();
                if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                if (edad < 18 || edad > 99) {
                    setError('error-fecha_nacimiento', 'Debes tener entre 18 y 99 años para registrarte.');
                    hasError = true;
                }
            }

            // Género
            if (!genero) {
                setError('error-genero', 'Por favor selecciona tu género.');
                hasError = true;
            }

            // Contraseña
            if (!password) {
                setError('error-password', 'La contraseña es obligatoria.');
                hasError = true;
            } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                setError('error-password', 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y una minúscula.');
                hasError = true;
            }

            // Confirmar contraseña
            if (!confirmPassword) {
                setError('error-confirm_password', 'Debes confirmar la contraseña.');
                hasError = true;
            } else if (password !== confirmPassword) {
                setError('error-confirm_password', 'Las contraseñas no coinciden.');
                hasError = true;
            }

            if (hasError) return;

            // Censura: muestra solo los 4 últimos dígitos
            const censurado = telefono.length > 4 ? telefono.slice(0, -4).replace(/[0-9]/g, '*') + telefono.slice(-4) : telefono;
            // Guarda el número real y censurado en localStorage
            localStorage.setItem('telefono_real', telefono);
            localStorage.setItem('telefono_censurado', censurado);
            // Redirige a la página de verificación
            window.location.href = 'verificacion.html';
        });
    }
});