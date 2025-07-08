// GTG Perfumes - Interactive JavaScript

// Global variables
let currentImageIndex = 0;
let currentTestimonialIndex = 0;
let isCountingUp = false;


document.addEventListener('DOMContentLoaded', () => {
  // SEARCH TOGGLE
  const searchBtn = document.getElementById('searchBtn');
  const searchBox = document.getElementById('searchBox');

  if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', () => {
      searchBox.classList.toggle('active');
    });
  }

  // PRODUCT GALLERY
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const dots = document.querySelectorAll('.gallery-dots .dot');

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const imageSrc = thumb.getAttribute('data-image');
      if (mainImage) mainImage.src = imageSrc;

      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    });
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = dot.getAttribute('data-index');
      if (thumbnails[index]) thumbnails[index].click();
    });
  });

  // PRICING & OPTIONS
  const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
  const durationRadios = document.querySelectorAll('input[name="duration"]');
  const addToCartBtn = document.getElementById('addToCart');

  function updatePrice() {
    let fragrance = document.querySelector('input[name="fragrance"]:checked');
    let duration = document.querySelector('input[name="duration"]:checked');

    if (!fragrance || !duration) return;

    let basePrice = parseFloat(fragrance.dataset.price);
    let multiplier = parseFloat(duration.dataset.multiplier);
    let totalPrice = (basePrice * multiplier).toFixed(2);

    if (addToCartBtn) {
      addToCartBtn.textContent = `Add to Cart - $${totalPrice}`;
    }
  }

  fragranceRadios.forEach(radio => radio.addEventListener('change', updatePrice));
  durationRadios.forEach(radio => radio.addEventListener('change', () => {
    updatePrice();
    toggleSections();
  }));

  function toggleSections() {
    const sections = {
      'try-once': document.getElementById('tryOnceSection'),
      'single-subscription': document.getElementById('singleSubscriptionSection'),
      'double-subscription': document.getElementById('doubleSubscriptionSection')
    };

    Object.values(sections).forEach(section => {
      if (section) section.style.display = 'none';
    });

    let selected = document.querySelector('input[name="duration"]:checked');
    if (selected && sections[selected.value]) {
      sections[selected.value].style.display = 'block';
    }
  }

  updatePrice();
  toggleSections();

  // FAQ TOGGLE
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.closest('.faq-item');
      faqItem.classList.toggle('open');
    });
  });

  // TESTIMONIAL NAVIGATION
  const testimonialContainer = document.querySelector('.testimonial-container');
  const testPrev = document.getElementById('testPrev');
  const testNext = document.getElementById('testNext');

  let scrollAmount = 0;
  const scrollStep = 320;

  if (testimonialContainer && testPrev && testNext) {
    testPrev.addEventListener('click', () => {
      scrollAmount -= scrollStep;
      testimonialContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    testNext.addEventListener('click', () => {
      scrollAmount += scrollStep;
      testimonialContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
  }
});


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    initializeEventListeners();
    initializeObserver();
});

// Initialize all components
function initializeComponents() {
    initializeSearch();
    initializeMobileNav();
    initializeProductGallery();
    initializeProductOptions();
    initializeTestimonials();
    initializeFAQ();
    initializeExpandableSections();
}

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }
    
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.add('active');
        });
    }
    
    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    }
    
    // Gallery navigation
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => previousImage());
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => nextImage());
    }
    
    // Testimonial navigation
    const testimonialPrev = document.querySelector('.testimonial-nav .nav-btn:first-child');
    const testimonialNext = document.querySelector('.testimonial-nav .nav-btn:last-child');
    
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => previousTestimonial());
    }
    
    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => nextTestimonial());
    }
    
    // FAQ toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => toggleFAQ(item));
        }
    });
    
    // Product options
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', updateAddToCartLink);
    });
}

// Initialize intersection observer for animations
function initializeObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-section') && !isCountingUp) {
                    startCountingAnimation();
                }
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.hero, .product-section, .premium-section, .stats-section, .testimonials, .faq-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Search functionality
function initializeSearch() {
    const searchForm = document.querySelector('.search-box form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.querySelector('.search-input').value;
            // Handle search functionality here
            console.log('Searching for:', searchTerm);
        });
    }
}

// Mobile navigation
function initializeMobileNav() {
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        const mobileNav = document.querySelector('.mobile-nav');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        }
    });
}

// Product gallery functionality
function initializeProductGallery() {
    const images = [
        'https://via.placeholder.com/500x500/667eea/ffffff?text=GTG+Perfume+1',
        'https://via.placeholder.com/500x500/764ba2/ffffff?text=GTG+Perfume+2',
        'https://via.placeholder.com/500x500/f093fb/ffffff?text=GTG+Perfume+3',
        'https://via.placeholder.com/500x500/4facfe/ffffff?text=GTG+Perfume+4'
    ];
    
    // Initialize thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateThumbnails();
            updateDots();
        });
    });
    
    // Initialize dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateThumbnails();
            updateDots();
        });
    });
    
    // Initialize with first image
    updateMainImage();
    updateThumbnails();
    updateDots();
}

function nextImage() {
    const totalImages = document.querySelectorAll('.thumbnail').length;
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateMainImage();
    updateThumbnails();
    updateDots();
}

function previousImage() {
    const totalImages = document.querySelectorAll('.thumbnail').length;
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateMainImage();
    updateThumbnails();
    updateDots();
}

function updateMainImage() {
    const mainImage = document.querySelector('.main-image img');
    const images = [
        'https://via.placeholder.com/500x500/667eea/ffffff?text=GTG+Perfume+1',
        'https://via.placeholder.com/500x500/764ba2/ffffff?text=GTG+Perfume+2',
        'https://via.placeholder.com/500x500/f093fb/ffffff?text=GTG+Perfume+3',
        'https://via.placeholder.com/500x500/4facfe/ffffff?text=GTG+Perfume+4'
    ];
    
    if (mainImage && images[currentImageIndex]) {
        mainImage.src = images[currentImageIndex];
    }
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === currentImageIndex);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

// Product options functionality
function initializeProductOptions() {
    updateAddToCartLink();
    updateExpandableSections();
}

function updateAddToCartLink() {
    const fragranceInputs = document.querySelectorAll('input[name="fragrance"]');
    const purchaseInputs = document.querySelectorAll('input[name="purchase"]');
    
    let selectedFragrance = '';
    let selectedPurchase = '';
    
    fragranceInputs.forEach(input => {
        if (input.checked) {
            selectedFragrance = input.value;
        }
    });
    
    purchaseInputs.forEach(input => {
        if (input.checked) {
            selectedPurchase = input.value;
        }
    });
    
    // Generate cart link based on selections
    const cartLink = document.querySelector('.add-to-cart');
    if (cartLink) {
        const baseUrl = 'https://example.com/cart/add';
        const params = new URLSearchParams({
            fragrance: selectedFragrance,
            purchase: selectedPurchase
        });
        cartLink.href = `${baseUrl}?${params.toString()}`;
    }
    
    // Update expandable sections
    updateExpandableSections();
}

function updateExpandableSections() {
    const purchaseInputs = document.querySelectorAll('input[name="purchase"]');
    const sections = document.querySelectorAll('.expandable-section');
    
    // Hide all sections first
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show section based on selected purchase type
    purchaseInputs.forEach(input => {
        if (input.checked) {
            const sectionId = input.value.toLowerCase().replace(' ', '-');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
        }
    });
}

// Initialize expandable sections
function initializeExpandableSections() {
    const purchaseInputs = document.querySelectorAll('input[name="purchase"]');
    purchaseInputs.forEach(input => {
        input.addEventListener('change', updateExpandableSections);
    });
    
    // Initialize with first option selected
    if (purchaseInputs.length > 0) {
        purchaseInputs[0].checked = true;
        updateExpandableSections();
    }
}

// Statistics counter animation
function startCountingAnimation() {
    if (isCountingUp) return;
    isCountingUp = true;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const targetNumbers = [84, 78, 92, 89]; // Target percentages
    
    statNumbers.forEach((statNumber, index) => {
        const target = targetNumbers[index];
        let current = 0;
        const increment = target / 50; // 50 steps for smooth animation
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            statNumber.textContent = Math.floor(current);
        }, 40); // Update every 40ms
    });
}

// Testimonial carousel
function initializeTestimonials() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (!testimonialContainer) return;
    
    // Auto-rotate testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000); // Change every 5 seconds
}

function nextTestimonial() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonialItems.length;
    
    if (totalTestimonials === 0) return;
    
    currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
    updateTestimonialPosition();
}

function previousTestimonial() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonialItems.length;
    
    if (totalTestimonials === 0) return;
    
    currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonialPosition();
}

function updateTestimonialPosition() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        const translateX = -currentTestimonialIndex * 100;
        testimonialContainer.style.transform = `translateX(${translateX}%)`;
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize with first FAQ open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

function toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const debouncedResize = debounce(() => {
    // Handle resize events
    updateTestimonialPosition();
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Handle keyboard navigation
    if (e.key === 'Escape') {
        // Close mobile nav
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
        
        // Close search box
        const searchBox = document.querySelector('.search-box');
        if (searchBox && searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
        }
    }
});

// Smooth scrolling for anchor links
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

// Loading state management
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Newsletter subscription
function subscribeNewsletter(email) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Subscribed successfully!' });
        }, 1000);
    });
}

// Add to cart functionality
function addToCart(productData) {
    // Simulate adding to cart
    console.log('Adding to cart:', productData);
    
    // Show confirmation message
    showNotification('Product added to cart!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Export functions for external use
window.GTGPerfumes = {
    nextImage,
    previousImage,
    nextTestimonial,
    previousTestimonial,
    toggleFAQ,
    addToCart,
    showNotification,
    subscribeNewsletter
};