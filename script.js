// ===== Configuration =====
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz1-az50nu-9BzkItFilLRIuxCtUrI5SXW37_FqDPy9z1_UkKrmewzF588x-WbjkiZCbQ/exec'; // Replace with your deployed Google Apps Script Web App URL

// ===== State =====
const submissions = [];

// ===== DOM References =====
const form = document.getElementById('bmiForm');
const formError = document.getElementById('formError');
const resultCard = document.getElementById('resultCard');
const resultTitle = document.getElementById('resultTitle');
const resultBmi = document.getElementById('resultBmi');
const resultMessage = document.getElementById('resultMessage');
const historyList = document.getElementById('historyList');

// Fields required for validation (used with a loop below)
const requiredFields = [
  { id: 'name', label: 'Full Name' },
  { id: 'age', label: 'Age' },
  { id: 'sex', label: 'Sex' },
  { id: 'weight', label: 'Weight' },
  { id: 'height', label: 'Height' }
];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formError.classList.add('hidden');

  // ----- LOOP: validate every required field in one pass -----
  let missingField = null;
  for (const field of requiredFields) {
    const el = document.getElementById(field.id);
    if (!el.value || el.value.trim() === '') {
      missingField = field.label;
      break; // stop at the first missing field
    }
  }

  const name = document.getElementById('name').value.trim();
  const age = parseFloat(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const heightCm = parseFloat(document.getElementById('height').value);

  // ----- IF-ELSE: validate input before processing -----
  if (missingField) {
    showError(`Please fill out the "${missingField}" field.`);
    return;
  } else if (isNaN(age) || age <= 0 || age > 120) {
    showError('Please enter a valid age between 1 and 120.');
    return;
  } else if (isNaN(weight) || weight <= 0) {
    showError('Please enter a valid weight greater than 0.');
    return;
  } else if (isNaN(heightCm) || heightCm <= 0) {
    showError('Please enter a valid height greater than 0.');
    return;
  } else {
    formError.classList.add('hidden');
  }

  // ----- Compute BMI -----
  const heightM = heightCm / 100;
  const bmi = +(weight / (heightM * heightM)).toFixed(1);

  let category, message, color;

  // ----- SWITCH-CASE: classify BMI category -----
  switch (true) {
    case bmi < 18.5:
      category = 'Underweight';
      color = '#5DADE2';
      message = 'Consider a balanced, calorie-sufficient diet and consult a nutritionist if needed.';
      break;
    case bmi < 25:
      category = 'Normal';
      color = '#58D68D';
      message = 'Great! Keep up your healthy eating and exercise habits.';
      break;
    case bmi < 30:
      category = 'Overweight';
      color = '#F5B041';
      message = 'Consider more physical activity and mindful eating.';
      break;
    default:
      category = 'Obese';
      color = '#EC7063';
      message = 'We recommend consulting a healthcare provider for guidance.';
  }

  showResult(name, bmi, category, message, color);

  const record = { name, age, sex, weight, heightCm, bmi, category };
  submissions.unshift(record);
  renderHistory();
  recordSubmission(record);

  form.reset();
});

function showError(msg) {
  formError.textContent = msg;
  formError.classList.remove('hidden');
}

function showResult(name, bmi, category, message, color) {
  resultTitle.textContent = `${name}, your BMI category: ${category}`;
  resultBmi.textContent = `BMI: ${bmi}`;
  resultMessage.textContent = message;
  resultCard.style.borderLeftColor = color;
  resultCard.classList.remove('hidden');
}

// ----- LOOP (forEach): render the list of recent submissions -----
function renderHistory() {
  historyList.innerHTML = '';
  submissions.forEach(function (record) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${record.name} (${record.age}, ${record.sex})</span><span>BMI ${record.bmi} — ${record.category}</span>`;
    historyList.appendChild(li);
  });
}

// ----- Send data to Google Apps Script Web App -----
function recordSubmission(record) {
  fetch("https://script.google.com/macros/s/AKfycbz1-az50nu-9BzkItFilLRIuxCtUrI5SXW37_FqDPy9z1_UkKrmewzF588x-WbjkiZCbQ/exec", {
    method: 'POST',
    body: JSON.stringify(record)
  }).catch(err => console.error('Could not record submission:', err));
}
