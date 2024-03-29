// Handle logout button click
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/home');
  } else {
    alert(response.statusText);
  }
};

// Event listener 
document.querySelector('#logout').addEventListener('click', logout);