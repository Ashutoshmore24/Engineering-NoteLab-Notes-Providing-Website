
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // --- Fade-in Animations ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .card, .section-title').forEach(el => {
        el.classList.add('hidden-element');
        observer.observe(el);
    });

    // --- THEME SWITCHER ---
    const themeOptions = document.querySelectorAll('.theme-option');
    const currentTheme = localStorage.getItem('noteslab-theme') || 'blue';

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            document.documentElement.setAttribute('data-theme', color);
            localStorage.setItem('noteslab-theme', color);
        });
    });

    // --- AUTHENTICATION SYSTEM (Simulation) ---
    checkLoginStatus();

    // Signup Logic
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            if (name && email && password) {
                // Determine if google login or normal
                const user = { name, email, password, type: 'email' };
                localStorage.setItem('noteslab-user', JSON.stringify(user));
                alert('Account created successfully! You are now logged in.');
                window.location.href = 'index.html';
            }
        });
    }

    // Login Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const storedUser = JSON.parse(localStorage.getItem('noteslab-user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert('Login Successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials. Please try again or Sign up.');
            }
        });
    }

    // Logout Logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('noteslab-user');
            alert('Logged out successfully.');
            window.location.reload();
        });
    }

    // --- CONTACT FORM (Simulation) ---
    const contactForm = document.querySelector('.contact-form-real'); // Added class to distinguish if needed, checking standard form in contact section
    // Checking for the form inside the contact section specifically
    const contactSectionForm = document.querySelector('#contact form');

    if (contactSectionForm) {
        contactSectionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactSectionForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Message sent successfully! We will get back to you soon.');
                contactSectionForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});

// Global Function for Google Login
function loginWithGoogle() {
    const btn = document.querySelector('.google-btn');
    if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';

    setTimeout(() => {
        const mockUser = {
            name: 'Google User',
            email: 'user@gmail.com',
            type: 'google'
        };
        localStorage.setItem('noteslab-user', JSON.stringify(mockUser));
        alert('Successfully logged in with Google!');
        window.location.href = 'index.html';
    }, 2000);
}

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('noteslab-user'));
    const navLinksContainer = document.querySelector('.nav-links');

    // Reset standard links first if needed, but we will append/modify
    // Removing existing profile/logout if present to avoid dupes
    const existingProfile = document.getElementById('nav-profile');
    if (existingProfile) existingProfile.remove();

    if (user) {
        // User is logged in
        // Hide Login button
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) loginBtn.style.display = 'none';

        // Add Profile/Logout
        const profileHtml = `
            <a href="profile.html" id="nav-profile" style="color: var(--primary); font-weight: bold;">
                <i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}
            </a>
            <a href="#" id="logout-btn" style="color: var(--accent);">Logout</a>
        `;
        navLinksContainer.insertAdjacentHTML('beforeend', profileHtml);

        // Re-attach listener for new logout button
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('noteslab-user');
            window.location.reload();
        });
    }
}
