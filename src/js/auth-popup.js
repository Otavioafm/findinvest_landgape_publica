document.addEventListener('DOMContentLoaded', function() {
    const authPopup = document.getElementById('auth-popup');

    // Verificar se o usuário está logado (exemplo simples)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        authPopup.style.display = 'flex';
    } else {
        authPopup.style.display = 'none';
    }
});

// Função de login para definir o status de login
function login() {
    sessionStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'area-investidor.html';
}

// Função de logout para definir o status de logout
function logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}
