document.addEventListener('DOMContentLoaded', initBuildPage);

function initBuildPage() {
    const applyBtn = document.getElementById('apply-filters');
    applyBtn.addEventListener('click', applyFilters);
}

async function applyFilters() {
    const query = getQueryParams();
    const builds = await fetchBuilds(query);
    displayBuilds(builds);
}

function getQueryParams() {
    const character = document.getElementById('character-dropdown').value;
    const act = document.getElementById('act-dropdown').value;

    const params = new URLSearchParams();
    if(character) params.append('characterName', character);
    if(act) params.append('act', act);

    return params;
}

async function fetchBuilds(params) {
    try{
        const response = await fetch(`/api/builds?${params.toString()}`);
        return await response.json();
    } catch (err) {
        console.error('error fetching builds:', err);
        return [];
    }
}

function displayBuilds(builds) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';
  
    if (builds.length === 0) {
      resultsSection.textContent = 'No builds found.';
      return;
    }
  
    builds.forEach(build => {
      const card = document.createElement('div');
      card.classList.add('build-card');
      card.innerHTML = `
        <h3>${build.buildName}</h3>
        <p><strong>Character:</strong> ${build.characterName}</p>
        <p><strong>Weapon:</strong> ${build.weapon}</p>
        <p><strong>Skills:</strong> ${build.skills.join(', ')}</p>
      `;
      resultsSection.appendChild(card);
    });
}