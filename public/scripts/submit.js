document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('buildForm');
    const responseEl = document.getElementById('response');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const characterName = formData.get('characterName');
      const buildName = formData.get('buildName');
      const weapon = formData.get('weapon');
      const skills = formData.get('skills').split(',').map(skill => skill.trim());
  
      const build = { characterName, buildName, weapon, skills };
  
      try {
        const res = await fetch('/api/builds', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(build)
        });
  
        const data = await res.json();
  
        if (res.ok) {
          responseEl.textContent = 'Build submitted successfully!';
          form.reset();
        } else {
          responseEl.textContent = `Error: ${data.error}`;
        }
      } catch (err) {
        responseEl.textContent = `Network error: ${err.message}`;
      }
    });
  });
  