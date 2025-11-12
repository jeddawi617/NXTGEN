// js/script.js - Fixed hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Scroll Animation Functionality
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            // Skip approach section entirely
            if (element.closest('#approach')) {
                return;
            }
            
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementTop < windowHeight - 100 && elementBottom > 50) {
                const animationType = element.getAttribute('data-animate');
                const delay = element.getAttribute('data-delay') || '0';
                
                // Remove attributes to prevent re-animation
                element.removeAttribute('data-animate');
                element.removeAttribute('data-delay');
                
                // Apply animation with minimal delay
                setTimeout(() => {
                    element.classList.add(`animate-${animationType}`);
                    if (delay !== '0') {
                        element.classList.add(`animate-delay-${delay}`);
                    }
                }, parseInt(delay) * 50);
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
});


// Form submission with Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('There was a problem sending your message. Please try again.');
            }
        } catch (error) {
            alert('There was a problem sending your message. Please try again.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

