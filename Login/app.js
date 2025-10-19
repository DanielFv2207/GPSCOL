const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    

    const message = document.getElementById('message');
    message.textContent = result.message;
    
    if (result.success) {
        //successful login
        message.style.color = 'green';
        window.location.href = '../index.html';
    } else {
        // login failed
        message.style.color = 'red';
    }
});