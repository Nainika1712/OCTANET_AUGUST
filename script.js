document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    if (email) {
        alert(`Thank you for signing up, ${email}!`);
        document.getElementById('signup-form').reset();
    }
});
