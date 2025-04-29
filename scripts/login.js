let isLoggedIn = false;
let currentUser = '';

const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentUser = usernameInput.value.trim();
  if (currentUser) {
    isLoggedIn = true;
    updateNavbarLoginState();
    loginForm.reset();
    loginModal.hide();
  }
});

function updateNavbarLoginState() {
  if (isLoggedIn) {
    loginBtn.textContent = `Logout (${currentUser})`;
    loginBtn.classList.remove('btn-outline-primary');
    loginBtn.classList.add('btn-danger');
    loginBtn.removeAttribute('data-bs-toggle');
    loginBtn.removeAttribute('data-bs-target');
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.classList.remove('btn-danger');
    loginBtn.classList.add('btn-outline-primary');
    loginBtn.setAttribute('data-bs-toggle', 'modal');
    loginBtn.setAttribute('data-bs-target', '#loginModal');
  }
}

loginBtn.addEventListener('click', () => {
  if (isLoggedIn) {
    // Logout flow
    isLoggedIn = false;
    currentUser = '';
    updateNavbarLoginState();
  }
});
