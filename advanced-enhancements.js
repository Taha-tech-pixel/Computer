// Advanced Enhancements for GalaxyCode Learning Platform

// Initialize all advanced features
function initAdvancedEnhancements() {
    // Initialize particle system
    initParticleSystem();
    
    // Initialize theme system
    initThemeSystem();
    
    // Initialize advanced search
    initAdvancedSearch();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize advanced animations
    initAdvancedAnimations();
    
    // Show welcome notification
    setTimeout(() => {
        if (typeof showNotification === 'function') {
            showNotification('Welcome to the enhanced learning platform! Try Ctrl+K for search or Ctrl+/ for themes.', 'info', 8000);
        } else {
            console.log('Welcome to the enhanced learning platform! Try Ctrl+K for search or Ctrl+/ for themes.');
        }
    }, 1000);
}

// Particle System
function initParticleSystem() {
    try {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
    } catch (error) {
        console.warn('Particle system initialization failed:', error);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 10;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle when animation ends
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, duration * 1000);
}

// Theme System
function initThemeSystem() {
    try {
        const themeToggle = document.getElementById('themeToggle');
        const themeOptions = document.getElementById('themeOptions');
        
        if (themeToggle && themeOptions) {
            themeToggle.addEventListener('click', () => {
                themeOptions.classList.toggle('show');
            });
            
            // Theme selection
            document.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', () => {
                    const theme = option.dataset.theme;
                    applyTheme(theme);
                    themeOptions.classList.remove('show');
                });
            });
            
            // Close theme options when clicking outside
            document.addEventListener('click', (e) => {
                if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
                    themeOptions.classList.remove('show');
                }
            });
        } else {
            console.warn('Theme switcher elements not found');
        }
    } catch (error) {
        console.warn('Theme system initialization failed:', error);
    }
}

function applyTheme(themeName) {
    // Remove existing theme classes
    document.body.classList.remove('theme-galaxy', 'theme-ocean', 'theme-forest', 'theme-sunset');
    
    // Add new theme class
    document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('currentTheme', themeName);
    
    // Update CSS custom properties
    const theme = getThemeProperties(themeName);
    Object.entries(theme).forEach(([property, value]) => {
        document.documentElement.style.setProperty(`--${property}`, value);
    });
    
    // Use console.log if showNotification is not available
    if (typeof showNotification === 'function') {
        showNotification(`Theme changed to ${themeName}`, 'info');
    } else {
        console.log(`Theme changed to ${themeName}`);
    }
}

function getThemeProperties(themeName) {
    const themes = {
        galaxy: {
            'primary-color': '#00d4ff',
            'secondary-color': '#531683',
            'accent-color': '#ff6b6b',
            'background': 'linear-gradient(135deg, #0f3460 0%, #531683 50%, #1a1a2e 100%)'
        },
        ocean: {
            'primary-color': '#4facfe',
            'secondary-color': '#00f2fe',
            'accent-color': '#43e97b',
            'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        forest: {
            'primary-color': '#56ab2f',
            'secondary-color': '#a8e6cf',
            'accent-color': '#ffd93d',
            'background': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
        },
        sunset: {
            'primary-color': '#ff6b6b',
            'secondary-color': '#feca57',
            'accent-color': '#ff9ff3',
            'background': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
        }
    };
    
    return themes[themeName] || themes.galaxy;
}

// Advanced Search
function initAdvancedSearch() {
    const searchInput = document.getElementById('advancedSearchInput');
    if (!searchInput) return;
    
    // Search data
    const searchData = [
        { title: 'HTML Basics', category: 'Web Development', url: '#html-language' },
        { title: 'CSS Styling', category: 'Web Development', url: '#css-language' },
        { title: 'JavaScript Functions', category: 'Web Development', url: '#javascript-language' },
        { title: 'Python Data Types', category: 'General Purpose', url: '#python-language' },
        { title: 'Java Classes', category: 'General Purpose', url: '#java-language' },
        { title: 'C++ Pointers', category: 'Systems Programming', url: '#cpp-language' },
        { title: 'SQL Queries', category: 'Database', url: '#sql-language' },
        { title: 'ASCII Encoding', category: 'Coding Schemes', url: '#ascii-scheme' },
        { title: 'Binary Numbers', category: 'Number Systems', url: '#binary-system' },
        { title: 'Compiler Phases', category: 'Compiler', url: '#compiler' },
        { title: 'Programming Challenges', category: 'Challenges', url: '#challenges' },
        { title: 'Progress Tracking', category: 'Progress', url: '#progress' },
        { title: 'AI Bot Help', category: 'AI Bot', url: '#ai-bot' }
    ];
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                hideSearchSuggestions();
                return;
            }
            
            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
            
            displaySearchResults(results);
        }, 300);
    });
    
    // Show/hide advanced search with Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const advancedSearch = document.getElementById('advancedSearch');
            if (advancedSearch) {
                advancedSearch.classList.toggle('show');
                if (advancedSearch.classList.contains('show')) {
                    searchInput.focus();
                }
            }
        }
    });
}

function displaySearchResults(results) {
    const searchContainer = document.getElementById('advancedSearch');
    let suggestionsContainer = searchContainer.querySelector('.search-suggestions');
    
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        searchContainer.appendChild(suggestionsContainer);
    }
    
    if (results.length === 0) {
        suggestionsContainer.innerHTML = '<div class="search-suggestion">No results found</div>';
    } else {
        suggestionsContainer.innerHTML = results.map(result => `
            <div class="search-suggestion" data-url="${result.url}">
                <div class="suggestion-title">${result.title}</div>
                <div class="suggestion-category">${result.category}</div>
            </div>
        `).join('');
        
        // Add click handlers
        suggestionsContainer.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                const url = suggestion.dataset.url;
                if (url) {
                    navigateToPage(url.substring(1));
                    hideSearchSuggestions();
                }
            });
        });
    }
    
    suggestionsContainer.style.display = 'block';
}

function hideSearchSuggestions() {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Advanced Animations
function initAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class based on data attribute
                const animationType = element.dataset.animation || 'fade-up';
                element.classList.add(`animate-${animationType}`);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Helper function for navigation (fallback only)
function navigateToPage(pageId) {
    // Only use this if the main navigation function is not available
    if (typeof window.navigateToPage === 'function') {
        window.navigateToPage(pageId);
        return;
    }
    
    console.log('Using fallback navigation for:', pageId);
    
    // Fallback navigation
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Initialize advanced enhancements when main script is ready
function initAdvancedEnhancementsOnReady() {
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    
    // Initialize advanced enhancements
    initAdvancedEnhancements();
}
