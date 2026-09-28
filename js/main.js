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
