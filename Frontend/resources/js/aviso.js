if (!localStorage.getItem('avisoEducativoMostrado')) {
  const overlay = document.createElement('div');
  overlay.id = 'educationalModal';
  overlay.style = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  overlay.innerHTML = `
    <div style="
      background-color: #fff;
      color: #333;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      max-width: 500px;
      font-family: Arial, sans-serif;
      box-shadow: 0 0 20px rgba(0,0,0,0.4);">
      <h2 style="margin-bottom: 15px;">⚠ Sitio no oficial</h2>
      <p style="font-size: 16px; line-height: 1.5;">
        Este sitio web no representa una entidad oficial.<br>
        Es un proyecto educativo desarrollado con fines académicos.
      </p>
      <button id="cerrarAviso" style="
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #ff9900;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;">
        Entendido
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('cerrarAviso').onclick = function () {
    document.getElementById('educationalModal').remove();
    localStorage.setItem('avisoEducativoMostrado', 'true');
  };
}
