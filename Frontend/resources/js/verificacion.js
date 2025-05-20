// Mostrar número censurado
const numeroCensurado = localStorage.getItem('telefono_censurado') || '';
const numeroReal = localStorage.getItem('telefono_real') || '';
document.getElementById('numeroCensurado').innerHTML = `<strong>Número a verificar:</strong><br>${numeroCensurado}`;

let codigoEnviado = '';
let timerInterval = null;
const TIEMPO_ESPERA = 60; // segundos

function centrarInputs() {
    const container = document.getElementById('inputsContainer');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.gap = '0.5em';
}

function iniciarTemporizador() {
    let tiempoRestante = TIEMPO_ESPERA;
    const timer = document.getElementById('timer');
    const reenviarBtn = document.getElementById('reenviarBtn');
    const ayudaSoporte = document.getElementById('ayudaSoporte');
    reenviarBtn.disabled = true;
    ayudaSoporte.style.display = 'none';
    timer.textContent = `Puedes reenviar el código en 01:00`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        tiempoRestante--;
        const min = String(Math.floor(tiempoRestante / 60)).padStart(2, '0');
        const seg = String(tiempoRestante % 60).padStart(2, '0');
        timer.textContent = `Puedes reenviar el código en ${min}:${seg}`;
        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            timer.textContent = '';
            reenviarBtn.disabled = false;
            ayudaSoporte.style.display = 'block';
        }
    }, 1000);
}

function enviarCodigoWhatsApp() {
    document.getElementById('mensaje').textContent = '';
    return fetch("https://whatsappverificacion.onrender.com/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: numeroReal })
    })
    .then(res => res.json())
    .then(data => {
        if (data.code) {
            codigoEnviado = data.code.toString();
        }
        if (data.message) {
            document.getElementById('mensaje').classList.remove('verificado');
        } else if (data.error) {
            document.getElementById('mensaje').textContent = "Error: " + data.error;
            document.getElementById('mensaje').classList.remove('verificado');
        }
        document.getElementById('codigoSection').style.display = '';
        crearInputsCodigo(6);
        document.getElementById('continuarBtn').style.display = 'none';
        iniciarTemporizador();
        centrarInputs();
    })
    .catch(err => {
        document.getElementById('mensaje').textContent = "Error: " + err;
        document.getElementById('mensaje').classList.remove('verificado');
    });
}

document.getElementById('continuarBtn').onclick = function () {
    if (!numeroReal) {
        document.getElementById('mensaje').textContent = 'No hay número para verificar.';
        document.getElementById('mensaje').classList.remove('verificado');
        return;
    }
    enviarCodigoWhatsApp();
};

document.getElementById('reenviarBtn').onclick = function () {
    document.getElementById('mensaje').textContent = '';
    enviarCodigoWhatsApp();
};

function crearInputsCodigo(length) {
    const container = document.getElementById('inputsContainer');
    container.innerHTML = '';
    for (let i = 0; i < length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.inputMode = 'numeric';
        input.pattern = '[0-9]*';
        input.style.textAlign = 'center';
        input.style.fontSize = '1.5em';
        input.style.width = '2.2em';
        input.style.height = '2.2em';
        input.style.borderRadius = '8px';
        input.style.border = '1px solid #ccc';
        input.style.background = '#f8f9fa';
        input.style.transition = 'border-color 0.2s';
        input.addEventListener('input', function () {
            if (this.value.length === 1 && i < length - 1) {
                container.children[i + 1].focus();
            }
        });
        input.addEventListener('keydown', function (e) {
            if (e.key === "Backspace" && this.value === "" && i > 0) {
                container.children[i - 1].focus();
            }
        });
        container.appendChild(input);
    }
    container.children[0].focus();
}

function mostrarModalExito() {
    // Crear modal si no existe
    let modal = document.getElementById('modalExito');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalExito';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.4)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <div style="background:#fff;padding:2.5rem 2rem;border-radius:1.2rem;box-shadow:0 4px 24px 0 rgba(0,0,0,0.15);text-align:center;max-width:350px; color:#22223b;">
                <h3 style="color:#16a34a;margin-bottom:1em;">¡Usuario registrado con éxito!</h3>
                <p style="margin-bottom:2em;">Tu número ha sido verificado correctamente.<br>Ahora puedes iniciar sesión y disfrutar de Lion's Gym.</p>
                <button id="btnModalExitoAceptar" style="background:#fbbf24;color:#22223b;border:none;border-radius:8px;padding:0.7rem 1.5rem;font-size:1rem;font-weight:600;cursor:pointer;">Aceptar</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('btnModalExitoAceptar').onclick = function() {
            window.location.href = "index.html";
        };
    }
    modal.style.display = 'flex';
}

document.getElementById('verificarBtn').onclick = function () {
    const inputs = document.querySelectorAll('#inputsContainer input');
    let codigoIngresado = '';
    inputs.forEach(input => codigoIngresado += input.value);
    if (codigoIngresado.length !== 6 || !/^\d{6}$/.test(codigoIngresado)) {
        document.getElementById('mensaje').textContent = 'Por favor ingresa los 6 dígitos del código.';
        document.getElementById('mensaje').classList.remove('verificado');
        return;
    }
    if (codigoIngresado === codigoEnviado) {
        document.getElementById('mensaje').textContent = '¡Número verificado correctamente!';
        document.getElementById('mensaje').classList.add('verificado');
        setTimeout(mostrarModalExito, 600); // Mostrar modal después de breve confirmación
    } else {
        document.getElementById('mensaje').textContent = 'El código ingresado es incorrecto. Intenta nuevamente.';
        document.getElementById('mensaje').classList.remove('verificado');
    }
};