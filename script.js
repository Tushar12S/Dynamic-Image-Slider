document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots-container');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    
    let currentIndex = 0;
    const slideWidth = 100; // as percentage
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Create thumbnails
    slides.forEach((slide, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        
        const img = document.createElement('img');
        // Use the same image source from the main slide
        img.src = slide.querySelector('img').src;
        img.alt = slide.querySelector('img').alt;
        
        thumbnail.appendChild(img);
        thumbnail.addEventListener('click', () => goToSlide(index));
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Function to go to a specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
        
        // Reset auto slide timer
        resetAutoSlide();
    }

    // Previous slide
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Next slide
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            goToSlide(currentIndex + 1); // Swipe left, go next
        } else if (touchEndX > touchStartX + swipeThreshold) {
            goToSlide(currentIndex - 1); // Swipe right, go previous
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        }
    });

    // Start auto slide
    startAutoSlide();
});