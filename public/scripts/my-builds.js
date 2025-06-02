document.getElementById('addBuildButton').addEventListener('click', () => {
  document.getElementById('buildFormContainer').style.display = 'block';
});

document.getElementById('buildForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  data.Act = Number(data.Act);
  data.skills = data.skills.split(',').map(skill => skill.trim());

  const res = await fetch('/api/builds/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert('Build added!');
    window.location.reload(); // or dynamically update the list
  } else {
    alert('Failed to add build');
  }
});

async function displayBuilds() {
  const res = await fetch('/api/builds/user', { credentials: 'include' });
  const builds = await res.json();

  const list = document.getElementById('buildList');
  list.innerHTML = '';

  if (builds.length === 0) {
    list.textContent = 'No builds found.';
    return;
  }

  builds.forEach(build => {
    const card = document.createElement('div');
    card.classList.add('build-card');

    card.innerHTML = `
      <h3>${build.buildName}</h3>
      <p><strong>Character:</strong> ${build.characterName}</p>
      <p><strong>Act:</strong> ${build.Act}</p>
      <p><strong>Weapon:</strong> ${build.weapon}</p>
      <p><strong>Skills:</strong> ${build.skills.join(', ')}</p>
      <button data-id="${build._id}" class="deleteBtn">Delete</button>
    `;

    list.appendChild(card);
  });

  // Add event listeners for delete buttons
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const res = await fetch(`/api/builds/user/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        alert('Build deleted');
        displayBuilds();
      } else {
        alert('Failed to delete build');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', displayBuilds);
