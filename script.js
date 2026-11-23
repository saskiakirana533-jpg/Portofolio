document.addEventListener('DOMContentLoaded', () => {

    /* 1. NAVIGASI SELULER & PENANDA MENU AKTIF */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Tutup menu mobile saat link diklik
    navLinks.forEach(link => { link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* 2. PENANDA NAVIGASI AKTIF & ANIMASI SCROLL */
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserverOptions = {
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Animasi Smooth Fade-In saat Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hanya jalankan animasi 1 kali
            }
        });
    }, { threshold: 0.15 });

    animateElements.forEach(el => animateObserver.observe(el));

    /* 3. FILTER PROYEK INTERAKTIF */
    const filterButtons = document.querySelectorAll('#projectFilters .filter-btn');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Aktivitas pada Tombol
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* 4. SALIN EMAIL */
    const btnCopyEmail = document.getElementById('btnCopyEmail');
    const toast = document.getElementById('toast');
    const emailAddress = "saskiakirana533@gmail.com";

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (btnCopyEmail) {
        btnCopyEmail.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress)
                .then(() => {
                    showToast('✅ Alamat email berhasil disalin ke clipboard!');
                })
                .catch(() => {
                    showToast('❌ Gagal menyalin email.');
                });
        });
    }

    /* 5. FORMULIR KONTAK & HITUNG KARAKTER */
    const formKontak = document.getElementById('formKontak');
    const inputPesan = document.getElementById('pesan');
    const charCounter = document.getElementById('jumlahKarakter');
    const formFeedback = document.getElementById('pesanForm');

    // Hitung Karakter Real-time
    if (inputPesan && charCounter) {
        const maxChar = 500;
        inputPesan.addEventListener('input', () => {
            const currentLength = inputPesan.value.length;
            charCounter.textContent = `${currentLength} / ${maxChar} karakter`;
            
            if (currentLength > maxChar) {
                charCounter.style.color = '#dc2626';
            } else {
                charCounter.style.color = 'var(--text-muted)';
            }
        });
    }

    // Validasi Form saat Dikirim
    if (formKontak) {
        formKontak.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const subjek = document.getElementById('subjek').value.trim();
            const pesan = inputPesan.value.trim();

            if (!nama || !email || !subjek || !pesan) {
                showFeedback('Harap isi semua kolom wajib (*).', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFeedback('Format alamat email tidak valid.', 'error');
                return;
            }

            // Simulasi Pengiriman Berhasil
            showFeedback('Terima kasih! Pesan Anda berhasil dikirim.', 'success');
            showToast('📩 Pesan Anda telah terkirim!');
            formKontak.reset();
            if (charCounter) charCounter.textContent = '0 / 500 karakter';
        });
    }

    function showFeedback(text, type) {
        if (!formFeedback) return;
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.replace().test(email);
    }

});