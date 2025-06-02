document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/accounts/check-auth');
      const data = await res.json();
  
      const nav = document.querySelector('.top-nav ul');
  
      if (data.loggedIn) {
        // create logout link
        const logoutItem = document.createElement('li');
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Logout';
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try{ 
                await fetch('/accounts/logout', {
                    method: 'POST',
                    credentials: 'include',
                });
                window.location.href = '/index.html';
            } catch (err) {
                console.error('Logout failed', err);
            }
        });
        logoutItem.appendChild(logoutLink);
        
        // Add My Builds tab
        const myBuildsItem = document.createElement('li');
        const myBuildsLink = document.createElement('a');
        myBuildsLink.href = '/my-builds.html';
        myBuildsLink.textContent = 'My Builds';
        myBuildsItem.appendChild(myBuildsLink);
  
        // Remove "Login"
        const loginItem = nav.querySelector('a[href="/login.html"]')?.parentElement;
        if (loginItem) nav.removeChild(loginItem);
  
        nav.appendChild(myBuildsItem);
        nav.appendChild(logoutItem);
      }
    } catch (err) {
      console.error('Auth check failed', err);
    }
  });
  
  