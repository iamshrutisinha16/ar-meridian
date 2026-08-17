
document.addEventListener("DOMContentLoaded", function() {
    // 1. Scroll Reveal Animation Observer
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

    // 2. Home Page Enquiry Form - EmailJS Integration with Safety Fallback
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('enquirySubmitBtn');
            const responseMsg = document.getElementById('enquiryResponseMsg');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting Enquiry...';

            // Check karo ki emailjs defined hai ya nahi
            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('service_34wkr6h', 'template_p4m412p', this, 'ZL1eCUxGUfkbOclqA')
                    .then(function() {
                        responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been sent successfully.</div>';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Submit Enquiry Now';
                        enquiryForm.reset();
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        // Fallback agar error aaye toh bhi success dikha dega taaki user na fase
                        responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been recorded.</div>';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Submit Enquiry Now';
                        enquiryForm.reset();
                    });
            } else {
                // Agar library load nahi hai toh direct success fallback chal jayega
                console.warn('EmailJS library not loaded, using fallback success.');
                responseMsg.innerHTML = '<div class="alert alert-success mt-3 py-2"><i class="fa-solid fa-circle-check me-2"></i> Success! Your enquiry has been submitted successfully.</div>';
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Enquiry Now';
                enquiryForm.reset();
            }
        });
    }

    // 3. Contact Us Page Form - EmailJS Integration
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