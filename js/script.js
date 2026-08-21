document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 0. Navbar & Universal Dropdown Click Fix
    // ==========================================
    const dropdownToggleList = document.querySelectorAll('.dropdown-toggle');
    dropdownToggleList.forEach(function (dropdownToggleEl) {
        dropdownToggleEl.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parentDropdown = this.closest('.dropdown');
            const targetMenu = parentDropdown ? parentDropdown.querySelector('.dropdown-menu') : null;
            
            document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                if (menu !== targetMenu) {
                    menu.classList.remove('show');
                }
            });

            if (targetMenu) {
                targetMenu.classList.toggle('show');
            }
        });
    });

    // Global Click Fix: Navbar toggler ya navbar ke andar click hone par dropdown/collapse conflict na ho
    document.addEventListener('click', function (e) {
        // Agar click navbar-toggler ya navbar ke andar hua hai, toh kuch mat karo
        if (e.target.closest('.navbar-toggler') || e.target.closest('.navbar-collapse')) {
            return;
        }

        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                menu.classList.remove('show');
            });
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Ek baar animation chalne ke baad observer hata sakte hain
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    revealElements.forEach(el => observer.observe(el));



    // ==========================================
    // 3. Home Page Enquiry Form - EmailJS Integration
    // ==========================================
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('enquirySubmitBtn');
            const responseMsg = document.getElementById('enquiryResponseMsg');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting Enquiry...';
            }

            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('service_34wkr6h', 'template_p4m412p', this, 'ZL1eCUxGUfkbOclqA')
                    .then(function() {
                        if (responseMsg) responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been sent successfully.</div>';
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Submit Enquiry Now';
                        }
                        enquiryForm.reset();
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        if (responseMsg) responseMsg.innerHTML = '<div class="alert alert-danger mt-3 py-2"><i class="fa-solid fa-triangle-exclamation me-2"></i> Failed. Check Console for details.</div>';
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Submit Enquiry Now';
                        }
                    });
            } else {
                console.warn('EmailJS library not loaded.');
                if (responseMsg) responseMsg.innerHTML = '<div class="alert alert-danger mt-3 py-2">EmailJS library is missing!</div>';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Submit Enquiry Now';
                }
            }
        });
    }

    // ==========================================
    // 4. Contact Us Page Form - EmailJS Integration
    // ==========================================
    const contactForm = document.getElementById('contactPageForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const responseMsg = document.getElementById('formResponseMsg');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending Notification...';
            }

            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('service_34wkr6h', 'template_p4m412p', this, 'ZL1eCUxGUfkbOclqA')
                    .then(function() {
                        if (responseMsg) responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Message sent & email notification delivered directly to your inbox.</div>';
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message';
                        }
                        contactForm.reset();
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        if (responseMsg) responseMsg.innerHTML = '<div class="alert alert-danger mt-3 py-2"><i class="fa-solid fa-triangle-exclamation me-2"></i> Failed to send. Error: ' + JSON.stringify(error) + '</div>';
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message';
                        }
                    });
            } else {
                console.warn('EmailJS library not loaded.');
                if (responseMsg) responseMsg.innerHTML = '<div class="alert alert-danger mt-3 py-2">EmailJS library is missing!</div>';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message';
                }
            }
        });
    }
});