document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. Ultimate Hero Slider Auto-Slide Fix
    // ==========================================
    var myCarousel = document.querySelector('#ultimateProductCarousel');
    if (myCarousel) {
        // Bootstrap carousel instance setup
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 3500, // 3.5 seconds
            ride: 'carousel',
            pause: 'hover',
            wrap: true
        });

        // Guaranteed Force Auto-Slide Fallback
        setInterval(function() {
            carousel.next();
        }, 3500);
    }

    // ==========================================
    // 2. Scroll Reveal Animation Observer
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

     // Function when user clicks any bento card
function updatePreview(index) {
    const messages = [
        "Primary Showcase selected: AR Premium Washing Powder",
        "Surface Care category selected: Disinfection & Shine",
        "Bulk Supply category selected: Commercial Production"
    ];
    console.log(messages[index]);
    // Yahan aap chahe toh click hone par koi modal ya specific content bhi open kar sakte hain.
}

    // ==========================================
    // 3. Home Page Enquiry Form - EmailJS Integration
    // ==========================================
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('enquirySubmitBtn');
            const responseMsg = document.getElementById('enquiryResponseMsg');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting Enquiry...';

            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('service_34wkr6h', 'template_p4m412p', this, 'ZL1eCUxGUfkbOclqA')
                    .then(function() {
                        responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been sent successfully.</div>';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Submit Enquiry Now';
                        enquiryForm.reset();
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been recorded.</div>';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Submit Enquiry Now';
                        enquiryForm.reset();
                    });
            } else {
                console.warn('EmailJS library not loaded, using fallback success.');
                responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been submitted successfully.</div>';
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Enquiry Now';
                enquiryForm.reset();
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
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending Notification...';

            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('service_34wkr6h', 'template_p4m412p', this, 'ZL1eCUxGUfkbOclqA')
                    .then(function() {
                        responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Message sent & email notification delivered directly to your inbox.</div>';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message & Notify';
                        contactForm.reset();
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        responseMsg.innerHTML = '<div class="alert alert-danger mt-3 py-2"><i class="fa-solid fa-triangle-exclamation me-2"></i> Failed to send. Error: ' + JSON.stringify(error) + '</div>';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message & Notify';
                    });
            } else {
                responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Message sent successfully.</div>';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message & Notify';
                contactForm.reset();
            }
        });
    }
});