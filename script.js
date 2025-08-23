// Navigation and Page Management
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initProgressChart();
    initAIResponses();
    
    // Show home page by default
    showPage('home');
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show selected page
            showPage(pageId);
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update URL hash
    window.location.hash = pageId;
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
        // Update active navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === hash) {
                link.classList.add('active');
            }
        });
    }
});

// Number System Converters
function convertToBinary() {
    const decimalInput = document.getElementById('decimal-input').value;
    const resultDiv = document.getElementById('binary-result');
    
    if (decimalInput === '') {
        resultDiv.textContent = 'Please enter a decimal number';
        return;
    }
    
    const decimal = parseInt(decimalInput);
    if (isNaN(decimal)) {
        resultDiv.textContent = 'Invalid input';
        return;
    }
    
    const binary = decimal.toString(2);
    resultDiv.textContent = `Binary: ${binary}`;
}

function convertFromHex() {
    const hexInput = document.getElementById('hex-input').value;
    const resultDiv = document.getElementById('hex-result');
    
    if (hexInput === '') {
        resultDiv.textContent = 'Please enter a hexadecimal number';
        return;
    }
    
    const decimal = parseInt(hexInput, 16);
    if (isNaN(decimal)) {
        resultDiv.textContent = 'Invalid hexadecimal input';
        return;
    }
    
    resultDiv.textContent = `Decimal: ${decimal}`;
}

function convertFromOctal() {
    const octalInput = document.getElementById('octal-input').value;
    const resultDiv = document.getElementById('octal-result');
    
    if (octalInput === '') {
        resultDiv.textContent = 'Please enter an octal number';
        return;
    }
    
    const decimal = parseInt(octalInput, 8);
    if (isNaN(decimal)) {
        resultDiv.textContent = 'Invalid octal input';
        return;
    }
    
    resultDiv.textContent = `Decimal: ${decimal}`;
}

// Simple Compiler Demo
function compileCode() {
    const sourceCode = document.getElementById('source-code').value;
    const resultDiv = document.getElementById('compilation-result');
    
    if (sourceCode.trim() === '') {
        resultDiv.textContent = 'Please enter some code to compile';
        return;
    }
    
    try {
        // Simple arithmetic expression evaluator
        const result = evaluateExpression(sourceCode);
        resultDiv.textContent = `Result: ${result}`;
    } catch (error) {
        resultDiv.textContent = `Compilation Error: ${error.message}`;
    }
}

function evaluateExpression(expression) {
    // Remove all whitespace
    expression = expression.replace(/\s/g, '');
    
    // Simple validation - only allow numbers, +, -, *, /, (, )
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error('Invalid characters in expression');
    }
    
    // Use Function constructor for safe evaluation (in real compiler, you'd use a proper parser)
    try {
        return new Function(`return ${expression}`)();
    } catch (error) {
        throw new Error('Invalid expression syntax');
    }
}

// Coding Challenges
function startChallenge(challengeType) {
    let challenge;
    
    switch(challengeType) {
        case 'fizzbuzz':
            challenge = {
                title: 'FizzBuzz Challenge',
                description: 'Print numbers from 1 to n, but for multiples of 3 print "Fizz" and for multiples of 5 print "Buzz". For numbers that are multiples of both 3 and 5, print "FizzBuzz".',
                example: 'Input: 15\nOutput: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz',
                solution: `function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}`
            };
            break;
            
        case 'palindrome':
            challenge = {
                title: 'Palindrome Checker Challenge',
                description: 'Check if a given string is a palindrome (reads the same forwards and backwards). Ignore spaces, punctuation, and case.',
                example: 'Input: "A man, a plan, a canal: Panama"\nOutput: true',
                solution: `function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}`
            };
            break;
            
        case 'binary-tree':
            challenge = {
                title: 'Binary Tree Traversal Challenge',
                description: 'Implement in-order, pre-order, and post-order traversal of a binary tree.',
                example: 'Input: Binary tree with nodes 1, 2, 3\nIn-order: 2, 1, 3\nPre-order: 1, 2, 3\nPost-order: 2, 3, 1',
                solution: `class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function inorderTraversal(root) {
    if (!root) return [];
    return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
}

function preorderTraversal(root) {
    if (!root) return [];
    return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)];
}

function postorderTraversal(root) {
    if (!root) return [];
    return [...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val];
}`
            };
            break;
    }
    
    if (challenge) {
        showChallengeModal(challenge);
    }
}

function showChallengeModal(challenge) {
    // Create modal HTML
    const modalHTML = `
        <div id="challenge-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${challenge.title}</h2>
                <p><strong>Description:</strong></p>
                <p>${challenge.description}</p>
                <p><strong>Example:</strong></p>
                <pre>${challenge.example}</pre>
                <p><strong>Solution:</strong></p>
                <pre><code>${challenge.solution}</code></pre>
                <button onclick="closeChallengeModal()" class="btn btn-primary">Close</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('challenge-modal');
    modal.style.display = 'block';
    
    // Close button functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = closeChallengeModal;
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            closeChallengeModal();
        }
    };
}

function closeChallengeModal() {
    const modal = document.getElementById('challenge-modal');
    if (modal) {
        modal.remove();
    }
}

// Progress Chart
function initProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Sample data - in a real app, this would come from user's actual progress
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Study Hours',
            data: [2, 3, 1, 4, 2, 5, 3],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    // Create simple bar chart
    ctx.fillStyle = '#667eea';
    const maxValue = Math.max(...data.datasets[0].data);
    const barWidth = canvas.width / data.labels.length - 10;
    
    data.datasets[0].data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 40);
        const x = index * (canvas.width / data.labels.length) + 5;
        const y = canvas.height - barHeight - 20;
        
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(data.labels[index], x + barWidth/2 - 10, canvas.height - 5);
        ctx.fillText(value, x + barWidth/2 - 10, y - 5);
        ctx.fillStyle = '#667eea';
    });
}

// AI Bot Functionality
function initAIResponses() {
    // Pre-defined responses for common programming questions
    window.aiResponses = {
        'What is recursion?': 'Recursion is a programming concept where a function calls itself to solve a problem. It consists of a base case (stopping condition) and a recursive case (function calling itself). Example: calculating factorial, where n! = n × (n-1)!',
        'Explain OOP concepts': 'Object-Oriented Programming has four main concepts:\n1. Encapsulation: Bundling data and methods together\n2. Inheritance: Creating new classes from existing ones\n3. Polymorphism: Same interface, different implementations\n4. Abstraction: Hiding complex implementation details',
        'How do arrays work?': 'Arrays are data structures that store multiple values in a single variable. They use zero-based indexing, meaning the first element is at index 0. Arrays can be dynamic (grow/shrink) or fixed-size, and support operations like push, pop, shift, and unshift.'
    };
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function askQuestion(question) {
    addMessage(question, 'user');
    
    setTimeout(() => {
        const response = generateAIResponse(question);
        addMessage(response, 'bot');
    }, 1000);
}

function generateAIResponse(message) {
    // Check for pre-defined responses
    for (const [key, value] of Object.entries(window.aiResponses)) {
        if (message.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
            return value;
        }
    }
    
    // Generate generic response
    const responses = [
        "That's a great question! In programming, this concept is fundamental to understanding how computers process information.",
        "This is an important topic in computer science. The key is to understand the underlying principles before diving into implementation.",
        "Great question! This concept is often misunderstood. Let me break it down for you step by step.",
        "This is a common area where beginners struggle. The best approach is to practice with simple examples first.",
        "Excellent question! This concept builds upon several fundamental programming principles. Let me explain..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function addMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Utility Functions
function updateProgress(percentage) {
    const progressCircle = document.querySelector('.progress-circle circle:last-child');
    const progressText = document.querySelector('.progress-text');
    
    if (progressCircle && progressText) {
        const circumference = 2 * Math.PI * 50; // r = 50
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${percentage}%`;
    }
}

// Add some sample data updates
function simulateProgress() {
    let currentProgress = 60;
    const interval = setInterval(() => {
        currentProgress += Math.random() * 5;
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
        }
        updateProgress(Math.round(currentProgress));
    }, 3000);
}

// Initialize progress simulation after a delay
setTimeout(simulateProgress, 2000);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to send message in AI chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const chatInput = document.getElementById('chat-input');
        if (chatInput === document.activeElement) {
            sendMessage();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.getElementById('challenge-modal');
        if (modal && modal.style.display === 'block') {
            closeChallengeModal();
        }
    }
});

// Add smooth scrolling for better UX
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

// Add loading states for better UX
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
}

function hideLoading(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
    }
}

// Add CSS for modal and loading states
const additionalCSS = `
    .modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 2rem;
        border-radius: 15px;
        width: 80%;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 1rem;
    }
    
    .close:hover {
        color: #000;
    }
    
    .loading {
        text-align: center;
        padding: 2rem;
        color: #666;
        font-style: italic;
    }
    
    .modal-content pre {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1rem 0;
    }
    
    .modal-content code {
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.4;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
