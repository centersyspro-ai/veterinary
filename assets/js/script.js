// assets/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Gallery Carousel
    const galleryCarousel = document.getElementById('galleryCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryIndicators = document.getElementById('galleryIndicators');
    
    if (galleryCarousel && prevBtn && nextBtn && galleryIndicators) {
        const galleryImages = [
            { color: '#e0f2e9', text: 'Clinic Reception Area' },
            { color: '#f0e6d3', text: 'Examination Room' },
            { color: '#e6f3ff', text: 'Surgical Suite' },
            { color: '#f8e6e6', text: 'Pet Recovery Area' },
            { color: '#f0f8e6', text: 'Happy Patient with Dr. Dash' }
        ];
        
        let currentSlide = 0;
        
        // Create gallery items
        galleryImages.forEach((image, index) => {
            // Create gallery item
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.backgroundColor = image.color;
            galleryItem.innerHTML = `<span>${image.text}</span>`;
            galleryCarousel.appendChild(galleryItem);
            
            // Create indicator
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            galleryIndicators.appendChild(indicator);
        });
        
        // Function to update carousel
        function updateCarousel() {
            galleryCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Function to go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            if (currentSlide < 0) currentSlide = galleryImages.length - 1;
            if (currentSlide >= galleryImages.length) currentSlide = 0;
            updateCarousel();
        }
        
        // Next slide
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        
        // Previous slide
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        
        // Auto slide (optional)
        let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        
        // Pause on hover
        galleryCarousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        galleryCarousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        });
    }
    
    // Promotion Popup
    const promotionPopup = document.getElementById('promotionPopup');
    const closePopup = document.getElementById('closePopup');
    const bookNowBtn = document.getElementById('bookNowBtn');
    
    if (promotionPopup && closePopup) {
        // Show popup after 10 seconds
        setTimeout(() => {
            promotionPopup.classList.add('active');
        }, 10000);
        
        // Close popup when clicking close button
        closePopup.addEventListener('click', () => {
            promotionPopup.classList.remove('active');
        });
        
        // Close popup when clicking outside
        promotionPopup.addEventListener('click', (e) => {
            if (e.target === promotionPopup) {
                promotionPopup.classList.remove('active');
            }
        });
        
        // Book Now button action
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', () => {
                promotionPopup.classList.remove('active');
                // Scroll to services section
                document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
});
