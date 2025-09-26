/**

 * @author Leonardo Bringas
 * @version 2.0
 */

// Configuration constants
const CONFIG = {
    SCROLL_THRESHOLD: 100,
    SCROLL_OFFSET: 20,
    SECTION_OFFSET: 100,
    DEBOUNCE_DELAY: 16 // ~60fps
};

// DOM elements cache
const elements = {
    hamburgerBtn: null,
    navMenu: null,
    nav: null,
    body: document.body,
    overlay: null,
    navLinks: [],
    sections: []
};

// State management
const state = {
    lastScrollY: 0,
    isMenuOpen: false,
    currentSection: '',
    scrollTimeout: null
};

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    initializeActiveLink();
});

/**
 * Cache DOM elements for performance
 */
function initializeElements() {
    elements.hamburgerBtn = document.getElementById('hamburger-menu');
    elements.navMenu = document.querySelector('.nav-menu');
    elements.nav = document.querySelector('nav');
    elements.navLinks = [...document.querySelectorAll('.nav-menu a')];
    elements.sections = [...document.querySelectorAll('section, header')];

    // Create overlay if it doesn't exist
    elements.overlay = document.querySelector('.overlay');
    if (!elements.overlay) {
        elements.overlay = createOverlay();
    }

    // Validate required elements
    if (!elements.hamburgerBtn || !elements.navMenu || !elements.nav) {
        console.error('Required navigation elements not found');
        return;
    }
}

/**
 * Create overlay element dynamically
 * @returns {HTMLElement} The created overlay element
 */
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.setAttribute('aria-hidden', 'true');
    elements.body.appendChild(overlay);
    return overlay;
}

/**
 * Debounce utility function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle utility function for scroll performance
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Navigation toggle
    elements.hamburgerBtn.addEventListener('click', toggleMenu);
    elements.overlay.addEventListener('click', closeMenu);

    // Navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Keyboard events
    document.addEventListener('keydown', handleKeydown);

    // Scroll events with throttling for better performance
    const throttledScrollHandler = throttle(handleScroll, CONFIG.DEBOUNCE_DELAY);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Prevent menu close when clicking inside menu
    elements.navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Resize event for responsive handling
    window.addEventListener('resize', debounce(handleResize, 250));
}

/**
 * Optimized scroll handler with throttling
 */
function handleScroll() {
    const currentScrollY = window.pageYOffset;

    // Handle navbar visibility
    handleNavbarVisibility(currentScrollY);

    // Update active navigation link
    updateActiveNavLink();

    state.lastScrollY = currentScrollY;
}

/**
 * Toggle mobile menu visibility
 */
function toggleMenu() {
    const isExpanded = elements.hamburgerBtn.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    state.isMenuOpen = newState;

    // Update DOM classes
    elements.hamburgerBtn.classList.toggle('active', newState);
    elements.navMenu.classList.toggle('active', newState);
    elements.overlay.classList.toggle('active', newState);
    elements.body.classList.toggle('menu-open', newState);

    // Update ARIA attributes for accessibility
    elements.hamburgerBtn.setAttribute('aria-expanded', newState.toString());
    elements.hamburgerBtn.setAttribute('aria-label', newState ? 'Cerrar menú' : 'Abrir menú');
    elements.overlay.setAttribute('aria-hidden', (!newState).toString());

    // Focus management for accessibility
    if (newState) {
        elements.navMenu.focus();
        trapFocus(elements.navMenu);
    } else {
        elements.hamburgerBtn.focus();
        removeFocusTrap();
    }
}

/**
 * Close mobile menu
 */
function closeMenu() {
    if (!state.isMenuOpen) return;

    state.isMenuOpen = false;

    elements.hamburgerBtn.classList.remove('active');
    elements.navMenu.classList.remove('active');
    elements.overlay.classList.remove('active');
    elements.body.classList.remove('menu-open');

    elements.hamburgerBtn.setAttribute('aria-expanded', 'false');
    elements.hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
    elements.overlay.setAttribute('aria-hidden', 'true');

    removeFocusTrap();
}

/**
 * Handle keyboard events
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeydown(e) {
    if (e.key === 'Escape' && state.isMenuOpen) {
        closeMenu();
        elements.hamburgerBtn.focus();
    }

    // Handle arrow keys in mobile menu
    if (state.isMenuOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        navigateMenuWithArrows(e.key);
    }
}

/**
 * Navigate menu items with arrow keys
 * @param {string} direction - 'ArrowDown' or 'ArrowUp'
 */
function navigateMenuWithArrows(direction) {
    const focusableElements = elements.navLinks.filter(link =>
        link.offsetParent !== null // Only visible elements
    );

    const currentIndex = focusableElements.indexOf(document.activeElement);
    let nextIndex;

    if (direction === 'ArrowDown') {
        nextIndex = currentIndex + 1 >= focusableElements.length ? 0 : currentIndex + 1;
    } else {
        nextIndex = currentIndex - 1 < 0 ? focusableElements.length - 1 : currentIndex - 1;
    }

    focusableElements[nextIndex]?.focus();
}

/**
 * Handle navigation link clicks
 * @param {Event} e - Click event
 */
function handleNavLinkClick(e) {
    const href = e.currentTarget.getAttribute('href');

    if (href?.startsWith('#')) {
        e.preventDefault();
        handleSmoothScroll(href.slice(1));
        closeMenu();
    }
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Close mobile menu on desktop resize
    if (window.innerWidth >= 1024 && state.isMenuOpen) {
        closeMenu();
    }
}

/**
 * Update navigation link active states
 * @param {string} activeSection - Currently active section ID
 */
function updateNavLinkStates(activeSection) {
    elements.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href && href.slice(1) === activeSection;

        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
}

/**
 * Handle smooth scrolling to target element
 * @param {string} targetId - Target element ID
 */
function handleSmoothScroll(targetId) {
    const target = document.getElementById(targetId);

    if (!target) {
        console.warn(`Target element with ID '${targetId}' not found`);
        return;
    }

    const offsetTop = target.offsetTop - CONFIG.SCROLL_OFFSET;

    // Use native smooth scrolling with fallback
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    } else {
        // Fallback for older browsers
        smoothScrollPolyfill(offsetTop);
    }
}

/**
 * Smooth scroll polyfill for older browsers
 * @param {number} target - Target scroll position
 */
function smoothScrollPolyfill(target) {
    const start = window.pageYOffset;
    const distance = target - start;
    const duration = 800;
    let timeStart = null;

    function animation(timeNow) {
        if (timeStart === null) timeStart = timeNow;
        const timeElapsed = timeNow - timeStart;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * Initialize active link state on page load
 */
function initializeActiveLink() {
    // Small delay to ensure proper layout calculation
    setTimeout(updateActiveNavLink, 100);
}

/**
 * Trap focus within an element for accessibility
 * @param {HTMLElement} element - Element to trap focus within
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * Remove focus trap
 */
function removeFocusTrap() {
    // Implementation would remove the keydown listener added in trapFocus
    // For simplicity, we'll rely on menu closure to handle this
}

/**
 * Error handling wrapper
 * @param {Function} fn - Function to wrap
 * @returns {Function} Wrapped function with error handling
 */
function withErrorHandling(fn) {
    return function (...args) {
        try {
            return fn.apply(this, args);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };
}
