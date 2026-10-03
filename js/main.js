(function () {
    const end = new Date('2026-09-25T18:30:00+05:30').getTime();
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');

    function applyTheme() {
        const currentTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
        root.dataset.theme = currentTheme;
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        try {
            localStorage.setItem('gc26theme', currentTheme);
        } catch (error) { }
    }

    try {
        const savedTheme = localStorage.getItem('gc26theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            root.dataset.theme = savedTheme;
        }
    } catch (error) { }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
            applyTheme();
        });
    }

    applyTheme();

    function tick() {
        const s = end - Date.now();
        const c = document.getElementById('cl');
        const d = document.getElementById('d');
        const h = document.getElementById('h');
        const m = document.getElementById('m');

        if (s <= 0) {
            c.textContent = 'Anant Chaturdashi has arrived. Ganpati Bappa Morya, pudhchya varshi laukar ya!';
            document.getElementById('count').style.display = 'none';
            return;
        }

        c.textContent = 'Until the Anant Chaturdashi visarjan';
        d.textContent = Math.floor(s / 864e5);
        h.textContent = Math.floor((s % 864e5) / 36e5);
        m.textContent = Math.floor((s % 36e5) / 6e4);
    }

    tick();
    setInterval(tick, 30000);

    const githubUsername = 'shivendracode2003';
    const repoList = document.getElementById('repo-list');
    const repoStatus = document.getElementById('repo-status');

    function addRepository(repo) {
        const article = document.createElement('article');
        article.className = 'repo-card';

        const heading = document.createElement('h3');
        heading.textContent = repo.name;
        article.appendChild(heading);

        const description = document.createElement('p');
        description.textContent = repo.description || 'A published GitHub Pages project.';
        article.appendChild(description);

        if (repo.language) {
            const language = document.createElement('span');
            language.className = 'repo-language';
            language.textContent = repo.language;
            article.appendChild(language);
        }

        const actions = document.createElement('div');
        actions.className = 'repo-actions';

        if (repo.has_pages) {
            const liveLink = document.createElement('a');
            liveLink.className = 'btn';
            liveLink.href = repo.homepage || (repo.name.toLowerCase() === githubUsername + '.github.io'
                ? 'https://' + githubUsername + '.github.io/'
                : 'https://' + githubUsername + '.github.io/' + encodeURIComponent(repo.name) + '/');
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            liveLink.textContent = 'Live site';
            actions.appendChild(liveLink);
        } else {
            const pagesStatus = document.createElement('span');
            pagesStatus.className = 'repo-language';
            pagesStatus.textContent = 'GitHub Pages not enabled';
            actions.appendChild(pagesStatus);
        }

        const sourceLink = document.createElement('a');
        sourceLink.className = 'btn g';
        sourceLink.href = repo.html_url;
        sourceLink.target = '_blank';
        sourceLink.rel = 'noopener noreferrer';
        sourceLink.textContent = 'Source code';
        actions.appendChild(sourceLink);

        article.appendChild(actions);
        repoList.appendChild(article);
    }

    async function loadPagesRepositories() {
        if (!repoList || !repoStatus) return;

        try {
            const repositories = [];
            let page = 1;
            let batch;

            do {
                const response = await fetch('https://api.github.com/users/' + githubUsername +
                    '/repos?per_page=100&page=' + page);
                if (!response.ok) throw new Error('GitHub API returned ' + response.status);
                batch = await response.json();
                repositories.push(...batch);
                page += 1;
            } while (batch.length === 100);

            const publicRepositories = repositories
                .sort(function (a, b) { return a.name.localeCompare(b.name); });

            if (publicRepositories.length === 0) {
                repoStatus.textContent = 'No public repositories found. Browse github.com/' + githubUsername + ' for more.';
                return;
            }

            publicRepositories.forEach(addRepository);
            repoStatus.textContent = publicRepositories.length + ' public ' +
                (publicRepositories.length === 1 ? 'repository' : 'repositories');
        } catch (error) {
            repoStatus.textContent = 'Could not load repositories right now. Visit github.com/' +
                githubUsername + ' to browse the projects.';
        }
    }

    loadPagesRepositories();

    const dlg = document.getElementById('dlg');
    const big = document.getElementById('big');

    document.querySelectorAll('.card').forEach(function (button) {
        button.addEventListener('click', function () {
            const img = button.querySelector('img');
            big.src = img.src;
            big.alt = img.alt;
            dlg.showModal();
        });
    });

    dlg.addEventListener('click', function (event) {
        if (event.target === dlg) {
            dlg.close();
        }
    });

    const wl = document.getElementById('wl');
    const wishlistKey = 'gc26wishes';

    function addWish(name, text) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        li.appendChild(document.createElement('br'));
        const small = document.createElement('small');
        small.textContent = name;
        li.appendChild(small);
        wl.insertBefore(li, wl.firstChild);
    }

    try {
        const saved = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
        saved.forEach(function (wish) {
            addWish(wish[0], wish[1]);
        });
    } catch (error) { }

    const emailAddress = 'shivendrashinde2003@gmail.com';
    const sendBtn = document.getElementById('send');
    const wishStatus = document.getElementById('wish-status');

    sendBtn.addEventListener('click', function () {
        const name = document.getElementById('n').value.trim() || 'A devotee';
        const text = document.getElementById('t').value.trim();

        if (!text) {
            if (wishStatus) {
                wishStatus.textContent = 'Please write a message before sending.';
            }
            return;
        }

        addWish(name, text);

        const subject = encodeURIComponent('Ganpati Bappa Morya wishes from ' + name);
        const body = encodeURIComponent('Message:\n\n' + text + '\n\nFrom: ' + name + '\nDate: ' + new Date().toLocaleString());
        window.location.href = 'mailto:' + emailAddress + '?subject=' + subject + '&body=' + body;

        if (wishStatus) {
            wishStatus.textContent = 'Your message has been prepared to send to shivendrashinde2003@gmail.com.';
        }

        try {
            const saved = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
            saved.push([name, text]);
            localStorage.setItem(wishlistKey, JSON.stringify(saved));
        } catch (error) { }

        document.getElementById('t').value = '';
    });
})();
