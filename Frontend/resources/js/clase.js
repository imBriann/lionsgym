const botones = document.querySelectorAll('.card button');
const modales = [
  'modalFuncional',
  'modalSpinning',
  'modalCrossFit',
  'modalZumba',
  'modalYoga',
  'modalHIIT'
];

botones.forEach((btn, i) => {
  btn.setAttribute('data-bs-toggle', 'modal');
  btn.setAttribute('data-bs-target', `#${modales[i]}`);
});
