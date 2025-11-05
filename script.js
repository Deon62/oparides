// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// App Store (iOS) Button Handler - Footer and Hero
const appStoreBtn = document.getElementById('appStoreBtn');
const appStoreHeroBtn = document.getElementById('appStoreHeroBtn');
const iosModal = document.getElementById('iosModal');
const modalClose = document.getElementById('modalClose');
const modalOk = document.getElementById('modalOk');

function showIOSModal(e) {
    if (e) e.preventDefault();
    if (iosModal) {
        iosModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

if (appStoreBtn) {
    appStoreBtn.addEventListener('click', showIOSModal);
}

if (appStoreHeroBtn) {
    appStoreHeroBtn.addEventListener('click', showIOSModal);
}

function closeModal() {
    iosModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOk) {
    modalOk.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (iosModal) {
    iosModal.addEventListener('click', function(e) {
        if (e.target === iosModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && iosModal && iosModal.classList.contains('active')) {
        closeModal();
    }
});

// Play Store (Android) Button - Footer and Hero
const playStoreBtn = document.getElementById('playStoreBtn');
const playStoreHeroBtn = document.getElementById('playStoreHeroBtn');

if (playStoreBtn) {
    playStoreBtn.addEventListener('click', showIOSModal);
}

if (playStoreHeroBtn) {
    playStoreHeroBtn.addEventListener('click', showIOSModal);
}

// Animate elements on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to timeline items and step items
document.querySelectorAll('.timeline-item, .step-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Waitlist Form Handler
const waitlistForm = document.getElementById('waitlistForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn?.querySelector('.btn-text');
const btnLoading = submitBtn?.querySelector('.btn-loading');
const formMessage = document.getElementById('formMessage');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';
        if (submitBtn) submitBtn.disabled = true;
        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }
        
        // Get form data
        const formData = new FormData(waitlistForm);
        
        try {
            const response = await fetch(waitlistForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                if (formMessage) {
                    formMessage.textContent = 'Thank you! We\'ve received your submission. We\'ll notify you when OPA Rides launches!';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                }
                waitlistForm.reset();
            } else {
                // Error from Formspree
                const data = await response.json();
                if (formMessage) {
                    formMessage.textContent = data.error || 'Something went wrong. Please try again.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
            }
        } catch (error) {
            // Network error
            if (formMessage) {
                formMessage.textContent = 'Network error. Please check your connection and try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        } finally {
            // Reset loading state
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}
