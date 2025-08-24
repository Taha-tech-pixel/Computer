// Learning Platform - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting initialization...');
    
    // Initialize authentication
    initAuthentication();
    
    // Initialize all functionality
    initNavigation();
    initNumberSystems();
    initCompiler();
    initChallenges();
    initProgress();
    initAIResponses();
    loadProgress();
    
    // Initialize enhanced navigation
    initEnhancedNavigation();
    
    // Initialize horizontal navigation
    initHorizontalNavigation();
    
    // Initialize real-time collaboration
    initCollaboration();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize advanced enhancements
    if (typeof initAdvancedEnhancementsOnReady === 'function') {
        initAdvancedEnhancementsOnReady();
    }
    
    // Show home page by default
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.classList.add('active');
        console.log('Home page activated');
    } else {
        console.error('Home page element not found!');
    }
    
    // Show welcome popup for first-time users
    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', 'true');
        setTimeout(() => {
            showWelcomePopup();
        }, 1000);
    }
    
    console.log('Initialization complete');
});

// User Authentication System
let currentUser = null;

function initAuthentication() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
    
    // Initialize auth modal
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginForm);
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', showRegisterForm);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

function showLoginForm() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (authModal) {
        authModal.style.display = 'flex';
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
    }
}

function showRegisterForm() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (authModal) {
        authModal.style.display = 'flex';
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
    }
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login (in real app, this would be an API call)
    const user = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        joinDate: new Date().toISOString(),
        preferences: {
            theme: 'auto',
            fontSize: 'medium',
            notifications: true
        }
    };
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    updateUserInterface();
    closeAuthModal();
    showNotification('Welcome back!', 'success');
}

function register(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate registration
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        joinDate: new Date().toISOString(),
        preferences: {
            theme: 'auto',
            fontSize: 'medium',
            notifications: true
        }
    };
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    updateUserInterface();
    closeAuthModal();
    showNotification('Account created successfully!', 'success');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showNotification('Logged out successfully', 'info');
}

function updateUserInterface() {
    const userSection = document.getElementById('userSection');
    const authButtons = document.getElementById('authButtons');
    
    if (currentUser) {
        if (userSection) {
            userSection.innerHTML = `
                <div class="user-info">
                    <span class="user-name">${currentUser.name}</span>
                    <button id="logoutBtn" class="btn btn-secondary">Logout</button>
                </div>
            `;
            userSection.style.display = 'block';
        }
        if (authButtons) {
            authButtons.style.display = 'none';
        }
        
        // Re-attach logout event
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    } else {
        if (userSection) {
            userSection.style.display = 'none';
        }
        if (authButtons) {
            authButtons.style.display = 'flex';
        }
    }
}

function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'none';
    }
}

// Real-time Collaboration Features
function initCollaboration() {
    // Initialize collaborative coding features
    const collaborationBtn = document.getElementById('collaborationBtn');
    if (collaborationBtn) {
        collaborationBtn.addEventListener('click', startCollaboration);
    }
}

function startCollaboration() {
    if (!currentUser) {
        showNotification('Please log in to use collaboration features', 'warning');
        return;
    }
    
    const roomId = generateRoomId();
    const collaborationModal = document.getElementById('collaborationModal');
    
    if (collaborationModal) {
        document.getElementById('roomId').textContent = roomId;
        collaborationModal.style.display = 'flex';
        
        // Simulate real-time updates
        simulateCollaboration(roomId);
    }
}

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function simulateCollaboration(roomId) {
    const messages = [
        `${currentUser.name} joined the room`,
        'Collaborative coding session started',
        'Share this room ID with your teammates'
    ];
    
    const chatContainer = document.getElementById('collaborationChat');
    if (chatContainer) {
        chatContainer.innerHTML = messages.map(msg => 
            `<div class="chat-message"><span class="timestamp">${new Date().toLocaleTimeString()}</span> ${msg}</div>`
        ).join('');
    }
}

// Accessibility Features
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // High contrast mode
    const highContrastBtn = document.getElementById('highContrastBtn');
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', toggleHighContrast);
    }
    
    // Screen reader support
    initScreenReaderSupport();
}

function handleKeyboardNavigation(e) {
    // Tab navigation for modals
    if (e.key === 'Tab') {
        const activeModal = document.querySelector('.modal[style*="flex"]');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
    showNotification(`High contrast mode ${isHighContrast ? 'enabled' : 'disabled'}`, 'info');
}

function initScreenReaderSupport() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message && currentUser) {
        const chatContainer = document.getElementById('collaborationChat');
        const timestamp = new Date().toLocaleTimeString();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.innerHTML = `<span class="timestamp">${timestamp}</span> <strong>${currentUser.name}:</strong> ${message}`;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        input.value = '';
    }
}

function saveSharedCode() {
    const codeEditor = document.getElementById('sharedCodeEditor');
    const code = codeEditor.value;
    
    if (code.trim()) {
        // Simulate saving shared code
        showNotification('Code saved to collaboration room', 'success');
        
        // In a real implementation, this would sync with other users
        const chatContainer = document.getElementById('collaborationChat');
        const timestamp = new Date().toLocaleTimeString();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.innerHTML = `<span class="timestamp">${timestamp}</span> <strong>System:</strong> Code saved by ${currentUser ? currentUser.name : 'Anonymous'}`;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Enhanced Progress Persistence with Cloud Sync (Simulated)
function syncProgressToCloud() {
    if (!currentUser) {
        showNotification('Please log in to sync your progress', 'warning');
        return;
    }
    
    // Simulate cloud sync
    setTimeout(() => {
        showNotification('Progress synced to cloud successfully', 'success');
    }, 2000);
}

// External Learning Resources Integration
function loadExternalResources() {
    const resourcesContainer = document.getElementById('externalResources');
    if (!resourcesContainer) return;
    
    const topics = ['javascript', 'python', 'java', 'cpp', 'html', 'css'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    displayExternalResources(randomTopic);
}

// Enhanced Challenge System with AI Feedback
function submitChallengeWithAI(challengeId, code) {
    // Simulate AI code review
    const feedback = generateAIFeedback(code, challengeId);
    
    const feedbackModal = document.getElementById('aiFeedbackModal');
    if (feedbackModal) {
        document.getElementById('aiFeedbackContent').innerHTML = feedback;
        feedbackModal.style.display = 'flex';
    }
}

function generateAIFeedback(code, challengeId) {
    const feedback = {
        'js-functions': {
            score: Math.floor(Math.random() * 30) + 70,
            comments: [
                'Good use of recursion!',
                'Consider adding input validation',
                'The function handles edge cases well',
                'Try to optimize for performance'
            ],
            suggestions: [
                'Add JSDoc comments for better documentation',
                'Consider using memoization for better performance',
                'Add error handling for invalid inputs'
            ]
        },
        'py-lists': {
            score: Math.floor(Math.random() * 30) + 70,
            comments: [
                'Excellent list comprehension usage!',
                'Good handling of edge cases',
                'The algorithm is efficient',
                'Consider adding type hints'
            ],
            suggestions: [
                'Add docstring for function documentation',
                'Consider using set() for better performance',
                'Add input validation'
            ]
        }
    };
    
    const challengeFeedback = feedback[challengeId] || feedback['js-functions'];
    
    return `
        <div class="ai-feedback">
            <h3>AI Code Review</h3>
            <div class="score">Score: ${challengeFeedback.score}/100</div>
            <div class="comments">
                <h4>Comments:</h4>
                <ul>
                    ${challengeFeedback.comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
            </div>
            <div class="suggestions">
                <h4>Suggestions:</h4>
                <ul>
                    ${challengeFeedback.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Enhanced Progress Persistence
function saveProgress() {
    if (!currentUser) {
        showNotification('Please log in to save your progress', 'warning');
        return;
    }
    
    const progressData = {
        userId: currentUser.id,
        timestamp: new Date().toISOString(),
        completedChallenges: userProgress.completedChallenges,
        achievements: userProgress.achievements,
        streak: userProgress.streak,
        lastActivity: userProgress.lastActivity,
        preferences: currentUser.preferences
    };
    
    localStorage.setItem(`progress_${currentUser.id}`, JSON.stringify(progressData));
    showNotification('Progress saved successfully', 'success');
}

function loadProgress() {
    if (!currentUser) {
        // Load anonymous progress
        const saved = localStorage.getItem('userProgress');
        if (saved) {
            userProgress = JSON.parse(saved);
        }
    } else {
        // Load user-specific progress
        const saved = localStorage.getItem(`progress_${currentUser.id}`);
        if (saved) {
            const progressData = JSON.parse(saved);
            userProgress = {
                completedChallenges: progressData.completedChallenges || {},
                achievements: progressData.achievements || [],
                streak: progressData.streak || 0,
                lastActivity: progressData.lastActivity || null
            };
        }
    }
    updateProgressDisplay();
}

// Enhanced Challenge System
function createInteractiveChallenge(challengeId) {
    const challenges = {
        'js-functions': {
            title: 'JavaScript Functions',
            description: 'Create a function that calculates the factorial of a number',
            template: `function factorial(n) {
    // Your code here
}`,
            testCases: [
                { input: 5, expected: 120 },
                { input: 0, expected: 1 },
                { input: 3, expected: 6 }
            ],
            hints: [
                'Use recursion or a loop',
                'Remember that 0! = 1',
                'Check for edge cases'
            ]
        },
        'py-lists': {
            title: 'Python Lists',
            description: 'Write a function to find the second largest number in a list',
            template: `def second_largest(numbers):
    # Your code here
    pass`,
            testCases: [
                { input: [1, 2, 3, 4, 5], expected: 4 },
                { input: [5, 5, 5], expected: 5 },
                { input: [1], expected: None }
            ],
            hints: [
                'Sort the list or use max()',
                'Handle duplicate values',
                'Check for lists with less than 2 elements'
            ]
        }
    };
    
    return challenges[challengeId] || null;
}

// External Learning API Integration (Simulated)
function fetchLearningResources(topic) {
    // Simulate API call
    const resources = {
        'javascript': [
            { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'documentation' },
            { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/', type: 'book' },
            { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'tutorial' }
        ],
        'python': [
            { title: 'Python Official Docs', url: 'https://docs.python.org/3/', type: 'documentation' },
            { title: 'Real Python', url: 'https://realpython.com/', type: 'tutorial' },
            { title: 'Python Crash Course', url: 'https://ehmatthes.github.io/pcc/', type: 'book' }
        ]
    };
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resources[topic] || []);
        }, 1000);
    });
}

function displayExternalResources(topic) {
    const resourcesContainer = document.getElementById('externalResources');
    if (!resourcesContainer) return;
    
    resourcesContainer.innerHTML = '<div class="loading">Loading resources...</div>';
    
    fetchLearningResources(topic).then(resources => {
        if (resources.length === 0) {
            resourcesContainer.innerHTML = '<div class="no-resources">No external resources available</div>';
            return;
        }
        
        resourcesContainer.innerHTML = resources.map(resource => `
            <div class="resource-card">
                <h4>${resource.title}</h4>
                <span class="resource-type">${resource.type}</span>
                <a href="${resource.url}" target="_blank" class="btn btn-primary">Visit Resource</a>
            </div>
        `).join('');
    });
}

// Navigation Functions
function initNavigation() {
    console.log('Initializing navigation...');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                navigateToPage(pageId);
            }
        });
    });
    
    // Set home as active by default
    const homeLink = document.querySelector('[data-page="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
}

function initEnhancedNavigation() {
    console.log('Initializing enhanced navigation...');
    // Enhanced navigation features
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initHorizontalNavigation() {
    console.log('Initializing horizontal navigation...');
    const horizontalNav = document.querySelector('.horizontal-nav');
    if (!horizontalNav) return;
    
    const scrollContainer = document.querySelector('.horizontal-nav-scroll');
    if (!scrollContainer) return;
    
    // Add scroll buttons functionality
    const prevBtn = document.getElementById('scrollLeft');
    const nextBtn = document.getElementById('scrollRight');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
    
    // Sync with main navigation
    const navLinks = horizontalNav.querySelectorAll('.horizontal-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                navigateToPage(pageId);
                scrollToActiveLink();
            }
        });
    });
}

function scrollToActiveLink() {
    const horizontalNav = document.querySelector('.horizontal-nav');
    if (!horizontalNav) return;
    
    const activeLink = horizontalNav.querySelector('.horizontal-nav-link.active');
    if (activeLink) {
        const scrollContainer = document.querySelector('.horizontal-nav-scroll');
        if (scrollContainer) {
            const linkRect = activeLink.getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            
            if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
                activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        }
    }
}

// Global navigation function
window.navigateToPage = function(pageId) {
    console.log('Navigating to page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    console.log('Found', pages.length, 'pages');
    pages.forEach(page => {
        page.classList.remove('active');
        console.log('Removed active from:', page.id);
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page activated:', pageId);
        
        // Force a reflow to ensure the page is visible
        targetPage.offsetHeight;
    } else {
        console.error('Page not found:', pageId);
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        console.log('Navigation link activated for:', pageId);
    }
    
    // Update horizontal navigation
    const horizontalNavLinks = document.querySelectorAll('.horizontal-nav .horizontal-nav-link');
    horizontalNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const horizontalActiveLink = document.querySelector(`.horizontal-nav .horizontal-nav-link[data-page="${pageId}"]`);
    if (horizontalActiveLink) {
        horizontalActiveLink.classList.add('active');
    }
    
    // Scroll to active link in horizontal navigation
    setTimeout(() => {
        scrollToActiveLink();
    }, 100);
};

// Local function that calls the global one
function navigateToPage(pageId) {
    window.navigateToPage(pageId);
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
});

// Missing initialization functions
function initNumberSystems() {
    console.log('Initializing number systems...');
    // Number systems functionality will be added here
}

function initCompiler() {
    console.log('Initializing compiler...');
    // Compiler functionality will be added here
}

function initChallenges() {
    console.log('Initializing challenges...');
    // Challenges functionality will be added here
}

function initProgress() {
    console.log('Initializing progress...');
    // Progress functionality will be added here
}

function initAIResponses() {
    console.log('Initializing AI responses...');
    // AI responses functionality will be added here
}

// Missing essential functions
let userProgress = {
    completedChallenges: {},
    achievements: [],
    streak: 0,
    lastActivity: null
};

function showWelcomePopup() {
    const welcomePopup = document.getElementById('welcomePopup');
    if (welcomePopup) {
        welcomePopup.style.display = 'flex';
        setTimeout(() => {
            welcomePopup.style.display = 'none';
        }, 5000);
    }
}

function showNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

function updateProgressDisplay() {
    const progressContainer = document.getElementById('progressContainer');
    if (!progressContainer) return;
    
    const totalChallenges = Object.keys(userProgress.completedChallenges).length;
    const totalAchievements = userProgress.achievements.length;
    
    progressContainer.innerHTML = `
        <div class="progress-stats">
            <div class="stat-card">
                <h3>${totalChallenges}</h3>
                <p>Challenges Completed</p>
            </div>
            <div class="stat-card">
                <h3>${totalAchievements}</h3>
                <p>Achievements Earned</p>
            </div>
            <div class="stat-card">
                <h3>${userProgress.streak}</h3>
                <p>Day Streak</p>
            </div>
        </div>
    `;
}

// Close AI feedback modal
function closeAIFeedbackModal() {
    const feedbackModal = document.getElementById('aiFeedbackModal');
    if (feedbackModal) {
        feedbackModal.style.display = 'none';
    }
}

// Close collaboration modal
function closeCollaborationModal() {
    const collaborationModal = document.getElementById('collaborationModal');
    if (collaborationModal) {
        collaborationModal.style.display = 'none';
    }
}