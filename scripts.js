// Fetching trending repositories for the explore section
fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc')
    .then(response => response.json())
    .then(data => {
        const repositories = data.items;
        displayTrendingRepos(repositories);
    });

// Function to display trending repositories in the explore section
function displayTrendingRepos(repositories) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = ''; // Clear previous content

    repositories.slice(0, 6).forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : 'No description available'}</p>
            <p><strong>Language:</strong> ${repo.language ? repo.language : 'Not specified'}</p>
            <a href="#" onclick="fetchRepoDetails('${repo.owner.login}', '${repo.name}')">View Details</a>
        `;
        repoList.appendChild(repoCard);
    });
}

// Function to fetch repositories from GitHub API
function searchRepositories() {
    const query = document.getElementById('searchInput').value;
    if (query.trim() === '') return;

    fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const repositories = data.items;
            displayRepositories(repositories);
        });
}

// Function to display repository cards
function displayRepositories(repositories) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = ''; // Clear the previous results

    repositories.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : 'No description available'}</p>
            <p><strong>Language:</strong> ${repo.language ? repo.language : 'Not specified'}</p>
            <a href="#" onclick="fetchRepoDetails('${repo.owner.login}', '${repo.name}')">View Details</a>
        `;
        repoList.appendChild(repoCard);
    });
}

// Function to fetch and display repository details
function fetchRepoDetails(owner, repoName) {
    fetch(`https://api.github.com/repos/${owner}/${repoName}`)
        .then(response => response.json())
        .then(data => {
            const repoDetails = document.getElementById('repoDetails');
            repoDetails.style.display = 'block';
            repoDetails.innerHTML = `
                <div class="repo-card">
                    <h3>${data.name}</h3>
                    <p><strong>Description:</strong> ${data.description ? data.description : 'No description available'}</p>
                    <p><strong>Language:</strong> ${data.language ? data.language : 'Not specified'}</p>
                    <p><strong>Forks:</strong> ${data.forks_count}</p>
                    <p><strong>Stars:</strong> ${data.stargazers_count}</p>
                    <p><strong>Open Issues:</strong> ${data.open_issues_count}</p>
                    <p><strong>Created At:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
                    <a href="${data.html_url}" target="_blank">Go to repository</a>
                </div>
            `;
        });
}

// Function to fetch and display user profile details
function fetchUserProfile(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            const userProfile = document.getElementById('userProfile');
            userProfile.style.display = 'block';
            userProfile.innerHTML = `
                <div class="user-profile">
                    <img src="${data.avatar_url}" alt="${data.login}'s Avatar">
                    <h2>${data.login}</h2>
                    <p><strong>Bio:</strong> ${data.bio ? data.bio : 'No bio available'}</p>
                    <p><strong>Location:</strong> ${data.location ? data.location : 'Not specified'}</p>
                    <a href="${data.html_url}" target="_blank">View Profile</a>
                </div>
            `;
        });
}
