const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    

    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    message.textContent = result.message;

    if (result.success) {
        // ✅ Usuario válido
        message.style.color = 'green';
        // Aquí puedes redirigir a otra página:
        window.location.href = '../index.html';
    } else {
        // ❌ Usuario o contraseña incorrectos
        message.style.color = 'red';
    }

});
