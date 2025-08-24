// Learning Platform - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initNumberSystems();
    initCompiler();
    initChallenges();
    initProgress();
    initAIResponses();
    loadProgress();
    
    // Initialize new enhanced features
    initEnhancedFeatures();
    initEnhancedNavigation();
    
    // Show home page by default
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.classList.add('active');
    }
    
    // Show welcome popup for first-time users
    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', 'true');
        setTimeout(() => {
            showWelcomePopup();
        }, 1000);
    }
});

// Welcome Popup Functions
function showWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    popup.classList.add('show');
}

function closeWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    popup.classList.remove('show');
    
    // Show tutorial notification after closing popup
    setTimeout(() => {
        showNotification('Welcome to GalaxyCode!', 'Click the graduation cap icon to start the tutorial', 'info', 8000);
    }, 500);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show target page
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update active nav link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
        
        // Update horizontal navigation
        const horizontalNavLinks = document.querySelectorAll('.horizontal-nav-link');
        horizontalNavLinks.forEach(link => link.classList.remove('active'));
        const horizontalLink = document.querySelector(`.horizontal-nav-link[data-page="${targetPage}"]`);
        if (horizontalLink) {
            horizontalLink.classList.add('active');
            scrollToActiveLink();
        }
        
        // Close mobile menu if open
        closeMobileMenu();
    });
});
    
    // Initialize language links
    initLanguageLinks();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize horizontal scrolling navigation
    initHorizontalNavigation();
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Initialize language page links
function initLanguageLinks() {
    const languageLinks = document.querySelectorAll('.language-actions a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal navigation for external language pages
            // Don't prevent default for these links
        });
    });
}

// Number Systems Converter
function initNumberSystems() {
    const convertBtn = document.getElementById('convertBtn');
    if (convertBtn) {
        convertBtn.addEventListener('click', convertNumber);
    }
}

function convertNumber() {
    const input = document.getElementById('numberInput').value;
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);
    
    if (!input) {
        alert('Please enter a number');
        return;
    }
    
    try {
        // Convert to decimal first
        const decimal = parseInt(input, fromBase);
        
        // Convert from decimal to target base
        let result;
        switch (toBase) {
            case 2:
                result = decimal.toString(2);
                break;
            case 8:
                result = decimal.toString(8);
                break;
            case 10:
                result = decimal.toString();
                break;
            case 16:
                result = decimal.toString(16).toUpperCase();
                break;
            default:
                result = decimal.toString(toBase);
        }
        
        document.getElementById('result').textContent = result;
    } catch (error) {
        document.getElementById('result').textContent = 'Invalid input';
    }
}

// Format decimal number with commas
function formatDecimal(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Multi-Language Compiler
function initCompiler() {
    const languageSelector = document.getElementById('languageSelector');
    const runBtn = document.getElementById('runBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const formatBtn = document.getElementById('formatBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    if (languageSelector) {
        languageSelector.addEventListener('change', changeLanguage);
    }
    if (runBtn) {
        runBtn.addEventListener('click', compileCode);
    }
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeCode);
    }
    if (formatBtn) {
        formatBtn.addEventListener('click', formatCode);
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCode);
    }
}

// Code templates for different languages
const codeTemplates = {
    'javascript': '// JavaScript Code\nconsole.log("Hello, World!");\n\n// Variables\nlet name = "John";\nconst age = 25;\n\n// Function\nfunction greet(person) {\n    return `Hello, ${person}!`;\n}\n\nconsole.log(greet(name));',
    'python': '# Python Code\nprint("Hello, World!")\n\n# Variables\nname = "John"\nage = 25\n\n# Function\ndef greet(person):\n    return f"Hello, {person}!"\n\nprint(greet(name))',
    'java': '// Java Code\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Variables\n        String name = "John";\n        int age = 25;\n        \n        // Function\n        System.out.println(greet(name));\n    }\n    \n    public static String greet(String person) {\n        return "Hello, " + person + "!";\n    }\n}',
    'cpp': '// C++ Code\n#include <iostream>\n#include <string>\nusing namespace std;\n\nstring greet(string person) {\n    return "Hello, " + person + "!";\n}\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    // Variables\n    string name = "John";\n    int age = 25;\n    \n    cout << greet(name) << endl;\n    return 0;\n}',
    'c': '// C Code\n#include <stdio.h>\n#include <string.h>\n\nvoid greet(char* person) {\n    printf("Hello, %s!\\n", person);\n}\n\nint main() {\n    printf("Hello, World!\\n");\n    \n    // Variables\n    char name[] = "John";\n    int age = 25;\n    \n    greet(name);\n    return 0;\n}',
    'csharp': '// C# Code\nusing System;\n\nclass Program {\n    static string Greet(string person) {\n        return $"Hello, {person}!";\n    }\n    \n    static void Main() {\n        Console.WriteLine("Hello, World!");\n        \n        // Variables\n        string name = "John";\n        int age = 25;\n        \n        Console.WriteLine(Greet(name));\n    }\n}',
    'php': '<?php\n// PHP Code\necho "Hello, World!\\n";\n\n// Variables\n$name = "John";\n$age = 25;\n\n// Function\nfunction greet($person) {\n    return "Hello, " . $person . "!";\n}\n\necho greet($name) . "\\n";\n?>',
    'html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>This is a simple HTML page.</p>\n    <script>\n        console.log("JavaScript in HTML");\n    </script>\n</body>\n</html>',
    'css': '/* CSS Styles */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\np {\n    color: #666;\n    line-height: 1.6;\n}',
    'sql': '-- SQL Code\n-- Create a simple table\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    age INT\n);\n\n-- Insert data\nINSERT INTO users VALUES (1, \'John\', 25);\nINSERT INTO users VALUES (2, \'Jane\', 30);\n\n-- Query data\nSELECT * FROM users WHERE age > 20;',
    'bash': '#!/bin/bash\n# Bash Script\necho "Hello, World!"\n\n# Variables\nname="John"\nage=25\n\necho "Name: $name"\necho "Age: $age"\n\n# Function\ngreet() {\n    echo "Hello, $1!"\n}\n\ngreet "$name"',
    'typescript': '// TypeScript Code\nconsole.log("Hello, World!");\n\n// Variables with types\nlet name: string = "John";\nconst age: number = 25;\n\n// Function with types\nfunction greet(person: string): string {\n    return `Hello, ${person}!`;\n}\n\nconsole.log(greet(name));',
    'kotlin': '// Kotlin Code\nfun main() {\n    println("Hello, World!")\n    \n    // Variables\n    val name = "John"\n    val age = 25\n    \n    // Function\n    println(greet(name))\n}\n\nfun greet(person: String): String {\n    return "Hello, $person!"\n}',
    'go': 'package main\n\nimport "fmt"\n\nfunc greet(person string) string {\n    return "Hello, " + person + "!"\n}\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    \n    // Variables\n    name := "John"\n    age := 25\n    \n    fmt.Println(greet(name))\n}',
    'rust': '// Rust Code\nfn greet(person: &str) -> String {\n    format!("Hello, {}!", person)\n}\n\nfn main() {\n    println!("Hello, World!");\n    \n    // Variables\n    let name = "John";\n    let age = 25;\n    \n    println!("{}", greet(name));\n}',
    'nodejs': '// Node.js Code\nconsole.log("Hello, World!");\n\n// Variables\nconst name = "John";\nconst age = 25;\n\n// Function\nfunction greet(person) {\n    return `Hello, ${person}!`;\n}\n\nconsole.log(greet(name));\n\n// Async function\nasync function fetchData() {\n    // Simulate API call\n    return new Promise(resolve => {\n        setTimeout(() => resolve("Data fetched"), 1000);\n    });\n}\n\nfetchData().then(data => console.log(data));',
    'perl': '# Perl Code\nuse strict;\nuse warnings;\n\nprint "Hello, World!\\n";\n\n# Variables\nmy $name = "John";\nmy $age = 25;\n\n# Function\nsub greet {\n    my ($person) = @_;\n    return "Hello, $person!";\n}\n\nprint greet($name) . "\\n";',
    'ruby': '# Ruby Code\nputs "Hello, World!"\n\n# Variables\nname = "John"\nage = 25\n\n# Function\ndef greet(person)\n  "Hello, #{person}!"\nend\n\nputs greet(name)',
    'r': '# R Code\nprint("Hello, World!")\n\n# Variables\nname <- "John"\nage <- 25\n\n# Function\ngreet <- function(person) {\n  paste("Hello,", person, "!")\n}\n\nprint(greet(name))',
    'scala': '// Scala Code\nobject Main {\n  def greet(person: String): String = {\n    s"Hello, $person!"\n  }\n  \n  def main(args: Array[String]): Unit = {\n    println("Hello, World!")\n    \n    // Variables\n    val name = "John"\n    val age = 25\n    \n    println(greet(name))\n  }\n}',
    'clojure': ';; Clojure Code\n(println "Hello, World!")\n\n;; Variables\n(def name "John")\n(def age 25)\n\n;; Function\n(defn greet [person]\n  (str "Hello, " person "!"))\n\n(println (greet name))',
    'fortran': '! Fortran Code\nprogram hello\n  implicit none\n  character(len=20) :: name\n  integer :: age\n  \n  print *, "Hello, World!"\n  \n  ! Variables\n  name = "John"\n  age = 25\n  \n  print *, "Hello, ", trim(name), "!"\nend program hello',
    'vbnet': '\' VB.NET Code\nModule Program\n    Sub Main()\n        Console.WriteLine("Hello, World!")\n        \n        \' Variables\n        Dim name As String = "John"\n        Dim age As Integer = 25\n        \n        Console.WriteLine(Greet(name))\n    End Sub\n    \n    Function Greet(person As String) As String\n        Return "Hello, " & person & "!"\n    End Function\nEnd Module'
};

function changeLanguage() {
    const language = document.getElementById('languageSelector').value;
    const editor = document.getElementById('codeEditor');
    
    if (codeTemplates[language]) {
        editor.value = codeTemplates[language];
    }
}

function loadTemplate() {
    const language = document.getElementById('languageSelector').value;
    const editor = document.getElementById('codeEditor');
    
    if (codeTemplates[language]) {
        editor.value = codeTemplates[language];
    }
}

function clearCode() {
    document.getElementById('codeEditor').value = '';
    clearResults();
}

function clearResults() {
    document.getElementById('output').textContent = '';
    document.getElementById('errors').textContent = '';
    document.getElementById('analysis').textContent = '';
}

function showTab(tabName) {
    const tabs = ['output', 'errors', 'analysis'];
    tabs.forEach(tab => {
        document.getElementById(tab).style.display = tab === tabName ? 'block' : 'none';
    });
}

function compileCode() {
    const code = document.getElementById('codeEditor').value;
    const language = document.getElementById('languageSelector').value;
    
    if (!code.trim()) {
        alert('Please enter some code to compile');
        return;
    }
    
    // Show loading state
    document.getElementById('output').textContent = 'Compiling and executing...';
    document.getElementById('errors').textContent = '';
    document.getElementById('analysis').textContent = '';
    
    // Simulate compilation delay
    setTimeout(() => {
        executeCode(code, language);
    }, 1000);
}

function executeCode(code, language) {
    try {
        switch (language) {
            case 'javascript':
                executeJavaScript(code);
                break;
            case 'html':
                executeHTML(code);
                break;
            case 'css':
                executeCSS(code);
                break;
            case 'python':
                executePython(code);
                break;
            case 'sql':
                executeSQL(code);
                break;
            case 'bash':
                executeBash(code);
                break;
            default:
                simulateExecution(code, language);
        }
    } catch (error) {
        document.getElementById('errors').textContent = `Execution error: ${error.message}`;
    }
}

function executeJavaScript(code) {
    const originalLog = console.log;
    let output = '';
    
    console.log = function(...args) {
        output += args.join(' ') + '\n';
    };
    
    try {
        eval(code);
        document.getElementById('output').textContent = output || 'Code executed successfully (no output)';
    } catch (error) {
        document.getElementById('errors').textContent = `JavaScript Error: ${error.message}`;
    } finally {
        console.log = originalLog;
    }
}

function executeHTML(code) {
    const iframe = document.getElementById('htmlOutput');
    iframe.srcdoc = code;
    document.getElementById('output').textContent = 'HTML rendered in preview panel';
}

function executeCSS(code) {
    const preview = document.getElementById('cssPreview');
    preview.innerHTML = '<h1>Sample Heading</h1><p>This is a sample paragraph to demonstrate CSS styling.</p>';
    preview.style.cssText = code;
    document.getElementById('output').textContent = 'CSS applied to preview panel';
}

function simulatePythonExecution(code) {
    const lines = code.split('\n');
    let output = '';
    
    for (let line of lines) {
        if (line.trim().startsWith('print(')) {
            const match = line.match(/print\\(["\']([^"\']*)["\']\\)/);
            if (match) {
                output += match[1] + '\n';
            }
        }
    }
    
    document.getElementById('output').textContent = output || 'Python code simulated successfully';
}

function simulateSQLExecution(code) {
    const output = 'SQL Query Results:\n' +
                   'id | name | age\n' +
                   '1  | John | 25\n' +
                   '2  | Jane | 30\n' +
                   '\nQuery executed successfully.';
    document.getElementById('output').textContent = output;
}

function simulateBashExecution(code) {
    const lines = code.split('\n');
    let output = '';
    
    for (let line of lines) {
        if (line.includes('echo')) {
            const match = line.match(/echo\s+["\']([^"\']*)["\']/);
            if (match) {
                output += match[1] + '\n';
            }
        }
    }
    
    document.getElementById('output').textContent = output || 'Bash script simulated successfully';
}

function simulateExecution(code, language) {
    const output = `${language.charAt(0).toUpperCase() + language.slice(1)} code executed successfully.\n\nSimulated output:\nHello, World!\nCode compiled and run without errors.`;
    document.getElementById('output').textContent = output;
}

function analyzeCode() {
    const code = document.getElementById('codeEditor').value;
    const language = document.getElementById('languageSelector').value;
    
    if (!code.trim()) {
        alert('Please enter some code to analyze');
        return;
    }
    
    const analysis = performCodeAnalysis(code, language);
    document.getElementById('analysis').textContent = analysis;
}

function performCodeAnalysis(code, language) {
    const lines = code.split('\n');
    const totalLines = lines.length;
    const nonEmptyLines = lines.filter(line => line.trim() !== '').length;
    const characters = code.length;
    const words = code.split(/\s+/).filter(word => word.length > 0).length;
    
    let analysis = `Code Analysis for ${language.charAt(0).toUpperCase() + language.slice(1)}:\n\n`;
    analysis += `Total lines: ${totalLines}\n`;
    analysis += `Non-empty lines: ${nonEmptyLines}\n`;
    analysis += `Characters: ${characters}\n`;
    analysis += `Words: ${words}\n\n`;
    
    // Language-specific analysis
    switch (language) {
        case 'javascript':
            analysis += 'JavaScript Analysis:\n';
            analysis += `- Functions: ${(code.match(/function\s+\w+/g) || []).length}\n`;
            analysis += `- Variables: ${(code.match(/let|const|var\s+\w+/g) || []).length}\n`;
            analysis += `- Console logs: ${(code.match(/console\.log/g) || []).length}\n`;
            break;
        case 'python':
            analysis += 'Python Analysis:\n';
            analysis += `- Functions: ${(code.match(/def\s+\w+/g) || []).length}\n`;
            analysis += `- Variables: ${(code.match(/^\s*\w+\s*=/gm) || []).length}\n`;
            analysis += `- Print statements: ${(code.match(/print\s*\(/g) || []).length}\n`;
            break;
        case 'java':
            analysis += 'Java Analysis:\n';
            analysis += `- Classes: ${(code.match(/class\s+\w+/g) || []).length}\n`;
            analysis += `- Methods: ${(code.match(/public\s+static\s+\w+/g) || []).length}\n`;
            analysis += `- Variables: ${(code.match(/String|int|double\s+\w+/g) || []).length}\n`;
            break;
        case 'cpp':
            analysis += 'C++ Analysis:\n';
            analysis += `- Functions: ${(code.match(/\w+\s+\w+\s*\(/g) || []).length}\n`;
            analysis += `- Variables: ${(code.match(/int|string|double\s+\w+/g) || []).length}\n`;
            analysis += `- Includes: ${(code.match(/#include/g) || []).length}\n`;
            break;
        default:
            analysis += `${language.charAt(0).toUpperCase() + language.slice(1)} Analysis:\n`;
            analysis += '- Basic code structure analysis completed\n';
    }
    
    return analysis;
}

function formatCode() {
    const code = document.getElementById('codeEditor').value;
    const language = document.getElementById('languageSelector').value;
    
    if (!code.trim()) {
        alert('Please enter some code to format');
        return;
    }
    
    const formatted = formatCodeByLanguage(code, language);
    document.getElementById('codeEditor').value = formatted;
    document.getElementById('output').textContent = 'Code formatted successfully';
}

function formatCodeByLanguage(code, language) {
    switch (language) {
        case 'javascript':
            return formatJavaScript(code);
        case 'python':
            return formatPython(code);
        case 'html':
            return formatHTML(code);
        case 'css':
            return formatCSS(code);
        default:
            return code; // Return as-is for other languages
    }
}

function formatJavaScript(code) {
    // Simple JavaScript formatting
    return code
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/\s*;\s*/g, ';\n    ')
        .replace(/\n\s*\n/g, '\n');
}

function formatPython(code) {
    // Simple Python formatting
    return code
        .replace(/\s*:\s*/g, ':\n    ')
        .replace(/\n\s*\n/g, '\n');
}

function formatHTML(code) {
    // Simple HTML formatting
    return code
        .replace(/>\s*</g, '>\n<')
        .replace(/\n\s*\n/g, '\n');
}

function formatCSS(code) {
    // Simple CSS formatting
    return code
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/\s*;\s*/g, ';\n    ');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Challenges functionality
function initChallenges() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterChallenges(category);
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    challengeCards.forEach(card => {
        const startBtn = card.querySelector('.challenge-actions button');
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                const challengeId = card.dataset.challengeId;
                startChallenge(challengeId);
            });
        }
    });
}

function filterChallenges(category) {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function startChallenge(challengeId) {
    const challengeInfo = getChallengeInfo(challengeId);
    const modal = document.getElementById('challengeModal');
    const modalTitle = document.getElementById('challengeModalTitle');
    const modalDescription = document.getElementById('challengeModalDescription');
    const modalRequirements = document.getElementById('challengeModalRequirements');
    const codeEditor = document.getElementById('challengeCodeEditor');
    
    modalTitle.textContent = challengeInfo.title;
    modalDescription.textContent = challengeInfo.description;
    modalRequirements.textContent = challengeInfo.requirements;
    
    // Load template based on language
    const language = challengeInfo.language;
    if (codeTemplates[language]) {
        codeEditor.value = codeTemplates[language];
    } else {
        codeEditor.value = '// Write your code here';
    }
    
    modal.style.display = 'block';
    
    // Store challenge ID for submission
    modal.dataset.challengeId = challengeId;
}

function submitChallenge() {
    const modal = document.getElementById('challengeModal');
    const challengeId = modal.dataset.challengeId;
    const code = document.getElementById('challengeCodeEditor').value;
    const output = document.getElementById('challengeOutput');
    const result = document.getElementById('challengeResult');
    
    if (!code.trim()) {
        alert('Please write some code before submitting');
        return;
    }
    
    // Show loading
    output.textContent = 'Running your code...';
    result.textContent = '';
    
    // Simulate code execution
    setTimeout(() => {
        const success = simulateChallengeSuccess(code, challengeId);
        
        if (success) {
            output.textContent = 'Code executed successfully!';
            result.textContent = '✅ Challenge completed!';
            result.className = 'challenge-result success';
            
            // Record completion
            recordChallengeCompletion(challengeId, true, 100);
        } else {
            output.textContent = 'Code executed but did not meet requirements.';
            result.textContent = '❌ Challenge failed. Try again!';
            result.className = 'challenge-result error';
            
            // Record attempt
            recordChallengeCompletion(challengeId, false, 0);
        }
    }, 2000);
}

function getChallengeInfo(challengeId) {
    const challenges = {
        'js-basics': {
            title: 'JavaScript Basics',
            description: 'Write a function that returns the sum of two numbers.',
            requirements: 'Create a function called add that takes two parameters and returns their sum.',
            language: 'javascript',
            category: 'javascript'
        },
        'py-basics': {
            title: 'Python Basics',
            description: 'Write a function that calculates the factorial of a number.',
            requirements: 'Create a function called factorial that takes a number and returns its factorial.',
            language: 'python',
            category: 'python'
        },
        'java-basics': {
            title: 'Java Basics',
            description: 'Create a class with a method that prints "Hello, World!".',
            requirements: 'Create a class called HelloWorld with a main method that prints "Hello, World!".',
            language: 'java',
            category: 'java'
        },
        'cpp-basics': {
            title: 'C++ Basics',
            description: 'Write a program that finds the maximum of three numbers.',
            requirements: 'Create a function called findMax that takes three integers and returns the maximum.',
            language: 'cpp',
            category: 'cpp'
        },
        'html-basics': {
            title: 'HTML Basics',
            description: 'Create a simple HTML page with a form.',
            requirements: 'Create an HTML page with a form containing name and email fields.',
            language: 'html',
            category: 'web'
        },
        'css-basics': {
            title: 'CSS Basics',
            description: 'Style a button with hover effects.',
            requirements: 'Create CSS styles for a button with hover and active states.',
            language: 'css',
            category: 'web'
        }
    };
    
    return challenges[challengeId] || {
        title: 'Challenge',
        description: 'Complete the challenge requirements.',
        requirements: 'Follow the instructions provided.',
        language: 'javascript',
        category: 'general'
    };
}

function simulateChallengeSuccess(code, challengeId) {
    // Simple heuristic for challenge success
    const challengeInfo = getChallengeInfo(challengeId);
    const requirements = challengeInfo.requirements.toLowerCase();
    
    if (requirements.includes('function') && code.includes('function')) {
        return true;
    }
    if (requirements.includes('class') && code.includes('class')) {
        return true;
    }
    if (requirements.includes('form') && code.includes('<form')) {
        return true;
    }
    if (requirements.includes('button') && code.includes('button')) {
        return true;
    }
    
    // Default success for demonstration
    return Math.random() > 0.3;
}

function closeChallengeModal() {
    document.getElementById('challengeModal').style.display = 'none';
}

// Progress tracking functionality
function initProgress() {
    const resetBtn = document.getElementById('resetProgress');
    const exportBtn = document.getElementById('exportProgress');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetProgress);
    }
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProgress);
    }
}

// User progress data structure
let userProgress = {
    completedChallenges: {},
    achievements: [],
    streak: 0,
    lastActivity: null
};

function loadProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateProgressDisplay();
}

function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function updateProgressDisplay() {
    updateOverallProgress();
    updateCategoryProgress();
    updateAchievements();
    updateActivityTimeline();
}

function updateOverallProgress() {
    const totalChallenges = Object.keys(getChallengeInfo()).length;
    const completedCount = Object.keys(userProgress.completedChallenges).length;
    const successRate = completedCount > 0 ? 
        Math.round((Object.values(userProgress.completedChallenges).filter(success => success).length / completedCount) * 100) : 0;
    
    document.getElementById('overallProgress').textContent = Math.round((completedCount / totalChallenges) * 100);
    document.getElementById('challengesCompleted').textContent = completedCount;
    document.getElementById('successRate').textContent = successRate;
    document.getElementById('currentStreak').textContent = userProgress.streak;
}

function updateCategoryProgress() {
    const categories = ['javascript', 'python', 'java', 'cpp', 'web', 'general'];
    const categoryGrid = document.getElementById('categoryProgressGrid');
    
    if (!categoryGrid) return;
    
    categoryGrid.innerHTML = '';
    
    categories.forEach(category => {
        const total = getCategoryTotal(category);
        const completed = getCategoryCompleted(category);
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const card = document.createElement('div');
        card.className = 'category-progress-card';
        card.innerHTML = `
            <div class="category-header">
                <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <span class="category-count">${completed}/${total}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="category-stats">
                <div class="stat">
                    <span class="stat-label">Progress</span>
                    <span class="stat-value">${percentage}%</span>
                </div>
            </div>
        `;
        
        categoryGrid.appendChild(card);
    });
}

function getCategoryTotal(category) {
    const challenges = Object.values(getChallengeInfo());
    return challenges.filter(challenge => challenge.category === category).length;
}

function getCategoryCompleted(category) {
    const challenges = Object.values(getChallengeInfo());
    const categoryChallenges = challenges.filter(challenge => challenge.category === category);
    
    return categoryChallenges.filter(challenge => {
        const challengeId = Object.keys(getChallengeInfo()).find(id => getChallengeInfo(id) === challenge);
        return userProgress.completedChallenges[challengeId];
    }).length;
}

function updateAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (!achievementsGrid) return;
    
    const achievements = [
        { id: 'first-challenge', name: 'First Steps', description: 'Complete your first challenge', icon: '🎯' },
        { id: 'perfect-score', name: 'Perfect Score', description: 'Get 100% on a challenge', icon: '⭐' },
        { id: 'streak-3', name: 'On Fire', description: 'Complete 3 challenges in a row', icon: '🔥' },
        { id: 'streak-7', name: 'Week Warrior', description: 'Complete 7 challenges in a row', icon: '🏆' },
        { id: 'all-categories', name: 'Explorer', description: 'Complete challenges in all categories', icon: '🗺️' },
        { id: 'speed-demon', name: 'Speed Demon', description: 'Complete 5 challenges in one day', icon: '⚡' }
    ];
    
    achievementsGrid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const unlocked = userProgress.achievements.includes(achievement.id);
        const card = document.createElement('div');
        card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
            </div>
        `;
        
        achievementsGrid.appendChild(card);
    });
}

function updateActivityTimeline() {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    if (!userProgress.lastActivity) {
        timeline.innerHTML = '<div class="empty-state">No activity yet. Start completing challenges!</div>';
        return;
    }
    
    const activities = [
        {
            type: 'challenge',
            title: 'Completed JavaScript Basics',
            time: userProgress.lastActivity,
            icon: '✅'
        }
    ];
    
    timeline.innerHTML = '';
    
    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <span class="activity-time">${formatDate(activity.time)}</span>
            </div>
        `;
        
        timeline.appendChild(item);
    });
}

function recordChallengeCompletion(challengeId, success, score) {
    userProgress.completedChallenges[challengeId] = success;
    userProgress.lastActivity = new Date().toISOString();
    
    if (success) {
        updateStreak();
        checkAchievements();
    }
    
    saveProgress();
    updateProgressDisplay();
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastActivity = userProgress.lastActivity ? new Date(userProgress.lastActivity).toDateString() : null;
    
    if (lastActivity === today) {
        // Already completed today, don't increment
        return;
    }
    
    if (lastActivity === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
        // Consecutive day
        userProgress.streak++;
    } else {
        // Break in streak
        userProgress.streak = 1;
    }
}

function checkAchievements() {
    const completedCount = Object.keys(userProgress.completedChallenges).length;
    const perfectScores = getPerfectScoreChallenges();
    
    // First challenge
    if (completedCount === 1 && !userProgress.achievements.includes('first-challenge')) {
        userProgress.achievements.push('first-challenge');
    }
    
    // Perfect score
    if (perfectScores.length > 0 && !userProgress.achievements.includes('perfect-score')) {
        userProgress.achievements.push('perfect-score');
    }
    
    // Streak achievements
    if (userProgress.streak >= 3 && !userProgress.achievements.includes('streak-3')) {
        userProgress.achievements.push('streak-3');
    }
    
    if (userProgress.streak >= 7 && !userProgress.achievements.includes('streak-7')) {
        userProgress.achievements.push('streak-7');
    }
}

function getPerfectScoreChallenges() {
    return Object.entries(userProgress.completedChallenges)
        .filter(([id, success]) => success)
        .map(([id]) => id);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Today';
    } else if (diffDays === 2) {
        return 'Yesterday';
    } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        userProgress = {
            completedChallenges: {},
            achievements: [],
            streak: 0,
            lastActivity: null
        };
        saveProgress();
        updateProgressDisplay();
    }
}

function exportProgress() {
    const dataStr = JSON.stringify(userProgress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'learning-progress.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// AI Bot functionality
function initAIResponses() {
    window.aiResponses = {
        'recursion': {
            title: 'Recursion in Programming',
            content: `
                <h3>What is Recursion?</h3>
                <p>Recursion is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.</p>
                
                <h4>Key Concepts:</h4>
                <ul>
                    <li><strong>Base Case:</strong> The stopping condition that prevents infinite recursion</li>
                    <li><strong>Recursive Case:</strong> The part where the function calls itself</li>
                    <li><strong>Call Stack:</strong> How recursive calls are managed in memory</li>
                </ul>
                
                <h4>Example: Factorial Function</h4>
                <pre><code>function factorial(n) {
    // Base case
    if (n <= 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120</code></pre>
                
                <h4>Common Use Cases:</h4>
                <ul>
                    <li>Tree traversal</li>
                    <li>Sorting algorithms (merge sort, quick sort)</li>
                    <li>Dynamic programming</li>
                    <li>File system navigation</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/4CAF50/white?text=Recursion+Diagram'
        },
        'oop': {
            title: 'Object-Oriented Programming (OOP)',
            content: `
                <h3>Object-Oriented Programming Principles</h3>
                <p>OOP is a programming paradigm based on the concept of "objects" that contain data and code.</p>
                
                <h4>Four Pillars of OOP:</h4>
                <ol>
                    <li><strong>Encapsulation:</strong> Bundling data and methods that operate on that data</li>
                    <li><strong>Inheritance:</strong> Creating new classes from existing ones</li>
                    <li><strong>Polymorphism:</strong> Same interface, different implementations</li>
                    <li><strong>Abstraction:</strong> Hiding complex implementation details</li>
                </ol>
                
                <h4>Example: Class Implementation</h4>
                <pre><code>class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return \`\${this.name} makes a sound\`;
    }
}

class Dog extends Animal {
    speak() {
        return \`\${this.name} barks\`;
    }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex barks"</code></pre>
                
                <h4>Benefits:</h4>
                <ul>
                    <li>Code reusability</li>
                    <li>Maintainability</li>
                    <li>Scalability</li>
                    <li>Real-world modeling</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/2196F3/white?text=OOP+Principles'
        },
        'data-structures': {
            title: 'Data Structures Fundamentals',
            content: `
                <h3>Essential Data Structures</h3>
                <p>Data structures are ways of organizing and storing data for efficient access and modification.</p>
                
                <h4>Common Data Structures:</h4>
                <ul>
                    <li><strong>Arrays:</strong> Contiguous memory locations</li>
                    <li><strong>Linked Lists:</strong> Nodes connected by pointers</li>
                    <li><strong>Stacks:</strong> LIFO (Last In, First Out)</li>
                    <li><strong>Queues:</strong> FIFO (First In, First Out)</li>
                    <li><strong>Trees:</strong> Hierarchical structure</li>
                    <li><strong>Graphs:</strong> Nodes connected by edges</li>
                </ul>
                
                <h4>Example: Stack Implementation</h4>
                <pre><code>class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return "Underflow";
        return this.items.pop();
    }
    
    peek() {
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}</code></pre>
                
                <h4>Time Complexity:</h4>
                <ul>
                    <li>Access: O(1) for arrays, O(n) for linked lists</li>
                    <li>Search: O(n) for linear search, O(log n) for binary search</li>
                    <li>Insertion/Deletion: Varies by structure</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/FF9800/white?text=Data+Structures'
        },
        'design-patterns': {
            title: 'Design Patterns',
            content: `
                <h3>Software Design Patterns</h3>
                <p>Design patterns are typical solutions to common problems in software design.</p>
                
                <h4>Creational Patterns:</h4>
                <ul>
                    <li><strong>Singleton:</strong> Ensures only one instance exists</li>
                    <li><strong>Factory:</strong> Creates objects without specifying exact class</li>
                    <li><strong>Builder:</strong> Constructs complex objects step by step</li>
                </ul>
                
                <h4>Structural Patterns:</h4>
                <ul>
                    <li><strong>Adapter:</strong> Allows incompatible interfaces to work together</li>
                    <li><strong>Decorator:</strong> Adds behavior to objects dynamically</li>
                    <li><strong>Facade:</strong> Provides simplified interface to complex subsystem</li>
                </ul>
                
                <h4>Example: Singleton Pattern</h4>
                <pre><code>class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
        this.connection = "Connected to database";
    }
    
    getConnection() {
        return this.connection;
    }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true</code></pre>
                
                <h4>Benefits:</h4>
                <ul>
                    <li>Proven solutions to common problems</li>
                    <li>Code reusability and maintainability</li>
                    <li>Improved communication between developers</li>
                    <li>Best practices implementation</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/9C27B0/white?text=Design+Patterns'
        },
        'async': {
            title: 'Asynchronous Programming',
            content: `
                <h3>Asynchronous Programming Concepts</h3>
                <p>Asynchronous programming allows code to run in the background without blocking the main thread.</p>
                
                <h4>Key Concepts:</h4>
                <ul>
                    <li><strong>Callbacks:</strong> Functions passed as arguments to be executed later</li>
                    <li><strong>Promises:</strong> Objects representing eventual completion of async operation</li>
                    <li><strong>Async/Await:</strong> Syntactic sugar for promises</li>
                    <li><strong>Event Loop:</strong> JavaScript's mechanism for handling async operations</li>
                </ul>
                
                <h4>Example: Async/Await</h4>
                <pre><code>async function fetchUserData(userId) {
    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Usage
fetchUserData(123)
    .then(user => console.log(user))
    .catch(error => console.error(error));</code></pre>
                
                <h4>Common Use Cases:</h4>
                <ul>
                    <li>API calls</li>
                    <li>File operations</li>
                    <li>Database queries</li>
                    <li>Timer operations</li>
                </ul>
                
                <h4>Benefits:</h4>
                <ul>
                    <li>Non-blocking operations</li>
                    <li>Better user experience</li>
                    <li>Improved performance</li>
                    <li>Responsive applications</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/607D8B/white?text=Async+Programming'
        },
        'memory': {
            title: 'Memory Management',
            content: `
                <h3>Memory Management in Programming</h3>
                <p>Memory management is the process of allocating and deallocating memory for programs.</p>
                
                <h4>Memory Types:</h4>
                <ul>
                    <li><strong>Stack:</strong> Automatic memory management, LIFO structure</li>
                    <li><strong>Heap:</strong> Dynamic memory allocation, manual management</li>
                    <li><strong>Static:</strong> Memory allocated at compile time</li>
                </ul>
                
                <h4>Memory Management Strategies:</h4>
                <ul>
                    <li><strong>Garbage Collection:</strong> Automatic memory cleanup (JavaScript, Java)</li>
                    <li><strong>Manual Management:</strong> Developer controls allocation/deallocation (C, C++)</li>
                    <li><strong>Reference Counting:</strong> Tracks references to objects</li>
                </ul>
                
                <h4>Example: Memory Leak Prevention</h4>
                <pre><code>// JavaScript - Proper cleanup
class EventHandler {
    constructor() {
        this.element = document.getElementById('button');
        this.handleClick = this.handleClick.bind(this);
        this.element.addEventListener('click', this.handleClick);
    }
    
    handleClick() {
        console.log('Button clicked');
    }
    
    destroy() {
        // Prevent memory leak
        this.element.removeEventListener('click', this.handleClick);
        this.element = null;
    }
}</code></pre>
                
                <h4>Best Practices:</h4>
                <ul>
                    <li>Always free allocated memory</li>
                    <li>Use appropriate data structures</li>
                    <li>Monitor memory usage</li>
                    <li>Implement proper cleanup in destructors</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/E91E63/white?text=Memory+Management'
        }
    };
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage('user', message);
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage('bot', response);
        }, 1000);
    }
}

function askQuestion(question) {
    const input = document.getElementById('chatInput');
    input.value = question;
    sendMessage();
}

function addMessage(sender, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="sender-name">You</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-content">
                <p>${escapeHtml(content)}</p>
            </div>
        `;
    } else {
        // Bot message with structured content
        if (typeof content === 'object' && content.title) {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender-name">AI Assistant</span>
                    <span class="message-time">${timestamp}</span>
                </div>
                <div class="message-content">
                    <h3>${content.title}</h3>
                    ${content.content}
                    ${content.image ? `<img src="${content.image}" alt="${content.title}" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 8px;">` : ''}
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender-name">AI Assistant</span>
                    <span class="message-time">${timestamp}</span>
                </div>
                <div class="message-content">
                    <p>${content}</p>
                </div>
            `;
        }
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific topics
    if (lowerMessage.includes('recursion') || lowerMessage.includes('recursive')) {
        return window.aiResponses.recursion;
    }
    if (lowerMessage.includes('oop') || lowerMessage.includes('object') || lowerMessage.includes('class')) {
        return window.aiResponses.oop;
    }
    if (lowerMessage.includes('data structure') || lowerMessage.includes('array') || lowerMessage.includes('linked list')) {
        return window.aiResponses['data-structures'];
    }
    if (lowerMessage.includes('design pattern') || lowerMessage.includes('singleton') || lowerMessage.includes('factory')) {
        return window.aiResponses['design-patterns'];
    }
    if (lowerMessage.includes('async') || lowerMessage.includes('promise') || lowerMessage.includes('await')) {
        return window.aiResponses.async;
    }
    if (lowerMessage.includes('memory') || lowerMessage.includes('garbage') || lowerMessage.includes('heap')) {
        return window.aiResponses.memory;
    }
    
    // Default response
    return {
        title: 'Programming Help',
        content: `
            <p>I can help you with various programming topics including:</p>
            <ul>
                <li>Recursion and algorithms</li>
                <li>Object-Oriented Programming (OOP)</li>
                <li>Data structures and algorithms</li>
                <li>Design patterns</li>
                <li>Asynchronous programming</li>
                <li>Memory management</li>
            </ul>
            <p>Try asking about any of these topics or ask a specific programming question!</p>
        `
    };
}

function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    // Add welcome message
    addMessage('bot', {
        title: 'Welcome to AI Programming Assistant!',
        content: `
            <p>Hello! I'm your AI programming assistant. I can help you with:</p>
            <ul>
                <li>Understanding programming concepts</li>
                <li>Code examples and explanations</li>
                <li>Best practices and design patterns</li>
                <li>Debugging and problem-solving</li>
            </ul>
            <p>Feel free to ask any programming-related question!</p>
        `
    });
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Enhanced Features Initialization
function initEnhancedFeatures() {
    initSearch();
    initDarkMode();
    initTutorial();
    initSettings();
    initBreadcrumbs();
    initNotifications();
    initKeyboardShortcuts();
    loadUserSettings();
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', showSearchResults);
        searchInput.addEventListener('blur', hideSearchResults);
    }
    
    if (clearSearch) {
        clearSearch.addEventListener('click', clearSearchInput);
    }
    
    // Search data
    window.searchData = {
        languages: [
            { name: 'JavaScript', category: 'Web Development', url: '#programming-languages' },
            { name: 'Python', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'Java', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'C++', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'HTML', category: 'Web Development', url: '#programming-languages' },
            { name: 'CSS', category: 'Web Development', url: '#programming-languages' },
            { name: 'TypeScript', category: 'Web Development', url: '#programming-languages' },
            { name: 'PHP', category: 'Web Development', url: '#programming-languages' },
            { name: 'Node.js', category: 'Web Development', url: '#programming-languages' },
            { name: 'C#', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'Kotlin', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'Go', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'Rust', category: 'General-Purpose', url: '#programming-languages' },
            { name: 'Bash', category: 'Scripting', url: '#programming-languages' },
            { name: 'SQL', category: 'Query', url: '#programming-languages' },
            { name: 'Perl', category: 'Scripting', url: '#programming-languages' },
            { name: 'Ruby', category: 'Scripting', url: '#programming-languages' },
            { name: 'R', category: 'Data Science', url: '#programming-languages' },
            { name: 'Clojure', category: 'Functional', url: '#programming-languages' },
            { name: 'Scala', category: 'Functional', url: '#programming-languages' },
            { name: 'Fortran', category: 'Legacy', url: '#programming-languages' },
            { name: 'VB.NET', category: 'Legacy', url: '#programming-languages' }
        ],
        concepts: [
            { name: 'ASCII', category: 'Coding Schemes', url: '#coding-schemes' },
            { name: 'Unicode', category: 'Coding Schemes', url: '#coding-schemes' },
            { name: 'Binary', category: 'Number System', url: '#number-system' },
            { name: 'Hexadecimal', category: 'Number System', url: '#number-system' },
            { name: 'Octal', category: 'Number System', url: '#number-system' },
            { name: 'Decimal', category: 'Number System', url: '#number-system' },
            { name: 'Compiler', category: 'Tools', url: '#compiler' },
            { name: 'Challenges', category: 'Practice', url: '#challenges' },
            { name: 'Progress', category: 'Tracking', url: '#progress' },
            { name: 'AI Bot', category: 'Help', url: '#ai-bot' }
        ]
    };
}

function handleSearch() {
    const query = this.value.toLowerCase().trim();
    const clearBtn = document.getElementById('clearSearch');
    
    if (query.length > 0) {
        clearBtn.style.display = 'block';
        const results = performSearch(query);
        displaySearchResults(results);
    } else {
        clearBtn.style.display = 'none';
        hideSearchResults();
    }
}

function performSearch(query) {
    const results = [];
    
    // Search languages
    window.searchData.languages.forEach(lang => {
        if (lang.name.toLowerCase().includes(query) || 
            lang.category.toLowerCase().includes(query)) {
            results.push({
                ...lang,
                type: 'language',
                icon: 'fas fa-laptop-code'
            });
        }
    });
    
    // Search concepts
    window.searchData.concepts.forEach(concept => {
        if (concept.name.toLowerCase().includes(query) || 
            concept.category.toLowerCase().includes(query)) {
            results.push({
                ...concept,
                type: 'concept',
                icon: 'fas fa-lightbulb'
            });
        }
    });
    
    return results.slice(0, 10); // Limit to 10 results
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="navigateToSearchResult('${result.url}')">
                <i class="${result.icon}"></i>
                <div>
                    <div><strong>${result.name}</strong></div>
                    <div style="font-size: 0.8rem; color: #666;">${result.category}</div>
                </div>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function navigateToSearchResult(url) {
    const targetId = url.substring(1);
    const targetPage = document.getElementById(targetId);
    
    if (targetPage) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
        
        // Show target page
        targetPage.style.display = 'block';
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`[href="${url}"]`).classList.add('active');
        
        // Update breadcrumbs
        updateBreadcrumbs(targetId);
        
        // Hide search results
        hideSearchResults();
        clearSearchInput();
    }
}

function showSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults.innerHTML.trim()) {
        searchResults.style.display = 'block';
    }
}

function hideSearchResults() {
    setTimeout(() => {
        document.getElementById('searchResults').style.display = 'none';
    }, 200);
}

function clearSearchInput() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').style.display = 'none';
    hideSearchResults();
}

// Dark Mode Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeSelect = document.getElementById('themeSelect');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (themeSelect) {
        themeSelect.addEventListener('change', changeTheme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button
    const icon = document.querySelector('#darkModeToggle i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    showNotification('Theme changed', `Switched to ${newTheme} mode`, 'info');
}

function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    showNotification('Theme updated', `Theme set to ${theme}`, 'info');
}

function applyTheme(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Tutorial Functionality
function initTutorial() {
    const tutorialBtn = document.getElementById('tutorialBtn');
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    const closeTutorial = document.getElementById('closeTutorial');
    const tutorialSteps = document.querySelectorAll('.tutorial-step');
    const nextBtns = document.querySelectorAll('.tutorial-next');
    const prevBtns = document.querySelectorAll('.tutorial-prev');
    const finishBtn = document.querySelector('.tutorial-finish');
    
    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', startTutorial);
    }
    
    if (closeTutorial) {
        closeTutorial.addEventListener('click', closeTutorialOverlay);
    }
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', nextTutorialStep);
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', prevTutorialStep);
    });
    
    if (finishBtn) {
        finishBtn.addEventListener('click', finishTutorial);
    }
    
    // Close tutorial when clicking outside
    if (tutorialOverlay) {
        tutorialOverlay.addEventListener('click', (e) => {
            if (e.target === tutorialOverlay) {
                closeTutorialOverlay();
            }
        });
    }
}

function startTutorial() {
    document.getElementById('tutorialOverlay').style.display = 'flex';
    showTutorialStep(1);
    localStorage.setItem('tutorialCompleted', 'false');
}

function closeTutorialOverlay() {
    document.getElementById('tutorialOverlay').style.display = 'none';
}

function nextTutorialStep() {
    const currentStep = document.querySelector('.tutorial-step.active');
    const currentStepNum = parseInt(currentStep.dataset.step);
    const nextStepNum = currentStepNum + 1;
    
    if (nextStepNum <= 4) {
        showTutorialStep(nextStepNum);
    }
}

function prevTutorialStep() {
    const currentStep = document.querySelector('.tutorial-step.active');
    const currentStepNum = parseInt(currentStep.dataset.step);
    const prevStepNum = currentStepNum - 1;
    
    if (prevStepNum >= 1) {
        showTutorialStep(prevStepNum);
    }
}

function showTutorialStep(stepNum) {
    document.querySelectorAll('.tutorial-step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.querySelector(`[data-step="${stepNum}"]`).classList.add('active');
}

function finishTutorial() {
    closeTutorialOverlay();
    localStorage.setItem('tutorialCompleted', 'true');
    showNotification('Tutorial completed!', 'You\'re ready to explore the platform', 'success');
}

// Settings Functionality
function initSettings() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const exportSettings = document.getElementById('exportSettings');
    const importSettings = document.getElementById('importSettings');
    const resetSettings = document.getElementById('resetSettings');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }
    
    if (closeSettings) {
        closeSettings.addEventListener('click', closeSettingsModal);
    }
    
    if (exportSettings) {
        exportSettings.addEventListener('click', exportUserSettings);
    }
    
    if (importSettings) {
        importSettings.addEventListener('click', importUserSettings);
    }
    
    if (resetSettings) {
        resetSettings.addEventListener('click', resetUserSettings);
    }
    
    // Close settings when clicking outside
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                closeSettingsModal();
            }
        });
    }
}

function openSettings() {
    document.getElementById('settingsModal').style.display = 'flex';
    loadSettingsValues();
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

function loadSettingsValues() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    if (settings.theme) {
        document.getElementById('themeSelect').value = settings.theme;
    }
    
    if (settings.fontSize) {
        document.getElementById('fontSize').value = settings.fontSize;
    }
    
    document.getElementById('progressNotifications').checked = settings.progressNotifications !== false;
    document.getElementById('challengeReminders').checked = settings.challengeReminders !== false;
}

function exportUserSettings() {
    const settings = {
        theme: document.getElementById('themeSelect').value,
        fontSize: document.getElementById('fontSize').value,
        progressNotifications: document.getElementById('progressNotifications').checked,
        challengeReminders: document.getElementById('challengeReminders').checked
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'learning-platform-settings.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Settings exported', 'Your settings have been saved to a file', 'success');
}

function importUserSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const settings = JSON.parse(e.target.result);
                    localStorage.setItem('userSettings', JSON.stringify(settings));
                    loadUserSettings();
                    showNotification('Settings imported', 'Your settings have been loaded', 'success');
                } catch (error) {
                    showNotification('Import failed', 'Invalid settings file', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

function resetUserSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        localStorage.removeItem('userSettings');
        loadUserSettings();
        showNotification('Settings reset', 'All settings have been reset to default', 'info');
    }
}

// Breadcrumbs Functionality
function initBreadcrumbs() {
    updateBreadcrumbs('home');
}

function updateBreadcrumbs(pageId) {
    const breadcrumbs = document.getElementById('breadcrumbs');
    const pageNames = {
        'home': 'Home',
        'programming-languages': 'Programming Languages',
        'coding-schemes': 'Coding Schemes',
        'number-system': 'Number System',
        'compiler': 'Compiler',
        'challenges': 'Challenges',
        'progress': 'Progress',
        'ai-bot': 'AI Bot'
    };
    
    breadcrumbs.innerHTML = `
        <span class="breadcrumb-item" onclick="navigateToPage('home')">Home</span>
        ${pageId !== 'home' ? `
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">${pageNames[pageId] || pageId}</span>
        ` : ''}
    `;
}

function navigateToPage(pageId) {
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
        targetPage.style.display = 'block';
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`[href="#${pageId}"]`).classList.add('active');
        
        updateBreadcrumbs(pageId);
    }
}

// Notification System
function initNotifications() {
    // Initialize notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

function showNotification(title, message, type = 'info', duration = 5000) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="notification-icon ${icons[type]}"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
    // Ctrl+D: Toggle dark mode
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    // Ctrl+T: Start tutorial
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        startTutorial();
    }
    
    // Ctrl+,: Open settings
    if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        openSettings();
    }
    
    // Ctrl+F: Focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape: Close modals
    if (e.key === 'Escape') {
        const tutorialOverlay = document.getElementById('tutorialOverlay');
        const settingsModal = document.getElementById('settingsModal');
        
        if (tutorialOverlay && tutorialOverlay.style.display === 'flex') {
            closeTutorialOverlay();
        }
        
        if (settingsModal && settingsModal.style.display === 'flex') {
            closeSettingsModal();
        }
    }
}

// User Settings Management
function loadUserSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    // Apply theme
    if (settings.theme) {
        applyTheme(settings.theme);
    }
    
    // Apply font size
    if (settings.fontSize) {
        document.documentElement.style.fontSize = {
            'small': '14px',
            'medium': '16px',
            'large': '18px'
        }[settings.fontSize] || '16px';
    }
    
    // Update settings form
    if (document.getElementById('themeSelect')) {
        document.getElementById('themeSelect').value = settings.theme || 'auto';
    }
    
    if (document.getElementById('fontSize')) {
        document.getElementById('fontSize').value = settings.fontSize || 'medium';
    }
}

// Save settings when changed
function saveUserSettings() {
    const settings = {
        theme: document.getElementById('themeSelect').value,
        fontSize: document.getElementById('fontSize').value,
        progressNotifications: document.getElementById('progressNotifications').checked,
        challengeReminders: document.getElementById('challengeReminders').checked
    };
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
}

// Enhanced Navigation with Breadcrumbs
function initEnhancedNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            
            // Show target page
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Update horizontal navigation
            const horizontalNavLinks = document.querySelectorAll('.horizontal-nav-link');
            horizontalNavLinks.forEach(link => link.classList.remove('active'));
            const horizontalLink = document.querySelector(`.horizontal-nav-link[data-page="${targetId}"]`);
            if (horizontalLink) {
                horizontalLink.classList.add('active');
                scrollToActiveLink();
            }
            
            // Update breadcrumbs
            updateBreadcrumbs(targetId);
            
            // Show welcome notification for first visit
            if (targetId !== 'home' && !localStorage.getItem(`visited_${targetId}`)) {
                localStorage.setItem(`visited_${targetId}`, 'true');
                showNotification('Welcome!', `You're now exploring ${targetId.replace('-', ' ')}`, 'info');
            }
        });
    });
}

// Enhanced AI Bot Features
function analyzeCodeSnippet() {
    document.getElementById('codeInputSection').style.display = 'block';
    document.getElementById('codeInput').placeholder = 'Paste your code here for analysis...';
    document.getElementById('codeInput').focus();
}

function optimizeCode() {
    document.getElementById('codeInputSection').style.display = 'block';
    document.getElementById('codeInput').placeholder = 'Paste your code here for optimization...';
    document.getElementById('codeInput').focus();
}

function debugCode() {
    document.getElementById('codeInputSection').style.display = 'block';
    document.getElementById('codeInput').placeholder = 'Paste your code here for debugging...';
    document.getElementById('codeInput').focus();
}

function submitCodeForAnalysis() {
    const code = document.getElementById('codeInput').value.trim();
    if (!code) {
        showNotification('Please enter some code to analyze', 'error');
        return;
    }
    
    // Simulate code analysis
    const analysis = performCodeAnalysis(code);
    addMessage('AI Tutor', analysis, 'bot');
    closeCodeInput();
}

function performCodeAnalysis(code) {
    const lines = code.split('\n').length;
    const chars = code.length;
    const words = code.split(/\s+/).filter(word => word.length > 0).length;
    
    let analysis = `📊 **Code Analysis Results:**\n\n`;
    analysis += `**Basic Metrics:**\n`;
    analysis += `• Lines of Code: ${lines}\n`;
    analysis += `• Characters: ${chars}\n`;
    analysis += `• Words: ${words}\n\n`;
    
    // Language detection
    const language = detectLanguage(code);
    analysis += `**Language Detected:** ${language}\n\n`;
    
    // Code quality analysis
    const quality = analyzeCodeQuality(code);
    analysis += `**Code Quality:**\n`;
    analysis += `• Complexity: ${quality.complexity}\n`;
    analysis += `• Readability: ${quality.readability}\n`;
    analysis += `• Best Practices: ${quality.bestPractices}\n\n`;
    
    // Suggestions
    analysis += `**Suggestions:**\n`;
    analysis += `• Consider adding comments for complex logic\n`;
    analysis += `• Break down large functions into smaller ones\n`;
    analysis += `• Use meaningful variable names\n`;
    analysis += `• Add error handling where appropriate\n`;
    
    return analysis;
}

function detectLanguage(code) {
    if (code.includes('function') && code.includes('var') || code.includes('const') || code.includes('let')) return 'JavaScript';
    if (code.includes('def ') || code.includes('import ') || code.includes('print(')) return 'Python';
    if (code.includes('public class') || code.includes('public static void')) return 'Java';
    if (code.includes('#include') || code.includes('int main()')) return 'C/C++';
    if (code.includes('<?php') || code.includes('$')) return 'PHP';
    if (code.includes('class ') && code.includes('def ')) return 'Ruby';
    return 'Unknown';
}

function analyzeCodeQuality(code) {
    const complexity = code.split('if').length + code.split('for').length + code.split('while').length;
    const readability = code.length < 1000 ? 'Good' : code.length < 3000 ? 'Moderate' : 'Needs Improvement';
    const bestPractices = code.includes('//') || code.includes('/*') ? 'Good' : 'Could be better';
    
    return {
        complexity: complexity < 5 ? 'Low' : complexity < 10 ? 'Medium' : 'High',
        readability,
        bestPractices
    };
}

function closeCodeInput() {
    document.getElementById('codeInputSection').style.display = 'none';
    document.getElementById('codeInput').value = '';
}

// Learning Paths
function generateLearningPath(level) {
    const paths = {
        beginner: {
            title: 'Beginner Programming Path',
            steps: [
                {
                    title: 'Learn Basic Syntax',
                    description: 'Start with variables, data types, and basic operations in your chosen language.',
                    resources: ['Tutorials', 'Practice Exercises', 'Documentation']
                },
                {
                    title: 'Control Structures',
                    description: 'Master if/else statements, loops, and conditional logic.',
                    resources: ['Interactive Lessons', 'Code Examples', 'Quizzes']
                },
                {
                    title: 'Functions and Methods',
                    description: 'Learn to create reusable code blocks and organize your programs.',
                    resources: ['Function Tutorials', 'Practice Projects', 'Code Reviews']
                },
                {
                    title: 'Data Structures',
                    description: 'Understand arrays, lists, and basic data organization.',
                    resources: ['Data Structure Guides', 'Visual Learning', 'Hands-on Practice']
                },
                {
                    title: 'Simple Projects',
                    description: 'Build small applications to apply your knowledge.',
                    resources: ['Project Ideas', 'Step-by-step Guides', 'Community Support']
                }
            ]
        },
        intermediate: {
            title: 'Intermediate Programming Path',
            steps: [
                {
                    title: 'Object-Oriented Programming',
                    description: 'Learn classes, objects, inheritance, and polymorphism.',
                    resources: ['OOP Concepts', 'Design Patterns', 'Real-world Examples']
                },
                {
                    title: 'Advanced Data Structures',
                    description: 'Master trees, graphs, hash tables, and complex algorithms.',
                    resources: ['Algorithm Books', 'Visualization Tools', 'Competitive Programming']
                },
                {
                    title: 'Error Handling and Debugging',
                    description: 'Learn to write robust code and troubleshoot effectively.',
                    resources: ['Debugging Tools', 'Error Handling Patterns', 'Testing Frameworks']
                },
                {
                    title: 'File I/O and APIs',
                    description: 'Work with external data sources and web services.',
                    resources: ['API Documentation', 'HTTP Tutorials', 'JSON/XML Handling']
                },
                {
                    title: 'Database Integration',
                    description: 'Learn to store and retrieve data from databases.',
                    resources: ['SQL Tutorials', 'ORM Frameworks', 'Database Design']
                }
            ]
        },
        advanced: {
            title: 'Advanced Programming Path',
            steps: [
                {
                    title: 'System Design',
                    description: 'Learn to design scalable and maintainable systems.',
                    resources: ['Architecture Patterns', 'System Design Books', 'Case Studies']
                },
                {
                    title: 'Concurrency and Parallelism',
                    description: 'Master multi-threading, async programming, and distributed systems.',
                    resources: ['Concurrency Models', 'Threading Libraries', 'Performance Optimization']
                },
                {
                    title: 'Security Best Practices',
                    description: 'Learn to write secure code and protect against vulnerabilities.',
                    resources: ['Security Guidelines', 'Penetration Testing', 'Secure Coding Standards']
                },
                {
                    title: 'Performance Optimization',
                    description: 'Optimize code for speed, memory usage, and efficiency.',
                    resources: ['Profiling Tools', 'Optimization Techniques', 'Benchmarking']
                },
                {
                    title: 'Contributing to Open Source',
                    description: 'Join the developer community and contribute to real projects.',
                    resources: ['Git Workflow', 'Code Review Process', 'Community Guidelines']
                }
            ]
        }
    };
    
    const path = paths[level];
    document.getElementById('learningPathTitle').textContent = path.title;
    
    const content = document.getElementById('learningPathContent');
    content.innerHTML = `
        <div class="learning-path">
            ${path.steps.map((step, index) => `
                <div class="path-step">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">
                        <h5>${step.title}</h5>
                        <p>${step.description}</p>
                        <div class="step-resources">
                            ${step.resources.map(resource => `<span class="resource-tag">${resource}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('learningPathModal').style.display = 'flex';
}

function closeLearningPathModal() {
    document.getElementById('learningPathModal').style.display = 'none';
}

// Code Generator
function openCodeGenerator() {
    document.getElementById('codeGeneratorModal').style.display = 'flex';
}

function closeCodeGeneratorModal() {
    document.getElementById('codeGeneratorModal').style.display = 'none';
    document.getElementById('generatedCode').innerHTML = '';
}

function generateCode() {
    const type = document.getElementById('generatorType').value;
    const language = document.getElementById('generatorLanguage').value;
    const description = document.getElementById('generatorDescription').value;
    
    if (!description.trim()) {
        showNotification('Please provide a description for code generation', 'error');
        return;
    }
    
    const generatedCode = generateCodeByType(type, language, description);
    document.getElementById('generatedCode').innerHTML = `<pre><code>${generatedCode}</code></pre>`;
}

function generateCodeByType(type, language, description) {
    const templates = {
        function: {
            javascript: `/**
 * ${description}
 * @param {any} params - Description of parameters
 * @returns {any} Description of return value
 */
function ${description.toLowerCase().replace(/\s+/g, '_')}(params) {
    // TODO: Implement function logic
    try {
        // Your code here
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Example usage
const result = ${description.toLowerCase().replace(/\s+/g, '_')}('example');
console.log(result);`,
            
            python: `def ${description.toLowerCase().replace(/\s+/g, '_')}(params):
    """
    ${description}
    
    Args:
        params: Description of parameters
        
    Returns:
        Description of return value
    """
    try:
        # Your code here
        result = None
        return result
    except Exception as e:
        print(f"Error: {e}")
        raise e

# Example usage
result = ${description.toLowerCase().replace(/\s+/g, '_')}('example')
print(result)`,
            
            java: `/**
 * ${description}
 * @param params Description of parameters
 * @return Description of return value
 */
public static Object ${description.toLowerCase().replace(/\s+/g, '_')}(Object params) {
    try {
        // Your code here
        Object result = null;
        return result;
    } catch (Exception e) {
        System.err.println("Error: " + e.getMessage());
        throw e;
    }
}

// Example usage
Object result = ${description.toLowerCase().replace(/\s+/g, '_')}("example");
System.out.println(result);`
        },
        
        class: {
            javascript: `/**
 * ${description}
 */
class ${description.replace(/\s+/g, '')} {
    constructor(params) {
        this.params = params;
        // Initialize properties
    }
    
    /**
     * Method description
     * @param {any} param - Parameter description
     * @returns {any} Return description
     */
    method(param) {
        try {
            // Method implementation
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    /**
     * Getter method
     * @returns {any} Property value
     */
    get property() {
        return this._property;
    }
    
    /**
     * Setter method
     * @param {any} value - New value
     */
    set property(value) {
        this._property = value;
    }
}

// Example usage
const instance = new ${description.replace(/\s+/g, '')}('example');
const result = instance.method('test');`,
            
            python: `class ${description.replace(/\s+/g, '')}:
    """
    ${description}
    """
    
    def __init__(self, params):
        """
        Initialize the class
        
        Args:
            params: Description of parameters
        """
        self.params = params
        # Initialize properties
    
    def method(self, param):
        """
        Method description
        
        Args:
            param: Parameter description
            
        Returns:
            Description of return value
        """
        try:
            # Method implementation
            result = None
            return result
        except Exception as e:
            print(f"Error: {e}")
            raise e
    
    @property
    def property(self):
        """Getter method"""
        return self._property
    
    @property.setter
    def property(self, value):
        """Setter method"""
        self._property = value

# Example usage
instance = ${description.replace(/\s+/g, '')}('example')
result = instance.method('test')`,
            
            java: `/**
 * ${description}
 */
public class ${description.replace(/\s+/g, '')} {
    private Object params;
    
    /**
     * Constructor
     * @param params Description of parameters
     */
    public ${description.replace(/\s+/g, '')}(Object params) {
        this.params = params;
        // Initialize properties
    }
    
    /**
     * Method description
     * @param param Parameter description
     * @return Description of return value
     */
    public Object method(Object param) {
        try {
            // Method implementation
            Object result = null;
            return result;
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Getter method
     * @return Property value
     */
    public Object getProperty() {
        return this.property;
    }
    
    /**
     * Setter method
     * @param value New value
     */
    public void setProperty(Object value) {
        this.property = value;
    }
}

// Example usage
${description.replace(/\s+/g, '')} instance = new ${description.replace(/\s+/g, '')}("example");
Object result = instance.method("test");`
        }
    };
    
    return templates[type]?.[language] || `// ${description}\n// Code generation for ${type} in ${language} is not available yet.`;
}

// Algorithm Visualizer
function openAlgorithmVisualizer() {
    document.getElementById('algorithmModal').style.display = 'flex';
}

function closeAlgorithmModal() {
    document.getElementById('algorithmModal').style.display = 'none';
    document.getElementById('algorithmVisualization').innerHTML = '';
}

function visualizeAlgorithm() {
    const algorithm = document.getElementById('algorithmType').value;
    const input = document.getElementById('algorithmInput').value;
    
    if (!input.trim()) {
        showNotification('Please provide input data for visualization', 'error');
        return;
    }
    
    const numbers = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (numbers.length === 0) {
        showNotification('Please provide valid numbers separated by commas', 'error');
        return;
    }
    
    const visualization = createAlgorithmVisualization(algorithm, numbers);
    document.getElementById('algorithmVisualization').innerHTML = visualization;
}

function createAlgorithmVisualization(algorithm, numbers) {
    switch (algorithm) {
        case 'bubble-sort':
            return visualizeBubbleSort(numbers);
        case 'quick-sort':
            return visualizeQuickSort(numbers);
        case 'binary-search':
            return visualizeBinarySearch(numbers);
        default:
            return `<div class="algorithm-step">Visualization for ${algorithm} is not available yet.</div>`;
    }
}

function visualizeBubbleSort(numbers) {
    let html = '<h4>Bubble Sort Visualization</h4>';
    html += '<div class="array-visualization">';
    numbers.forEach(num => {
        html += `<div class="array-element">${num}</div>`;
    });
    html += '</div>';
    
    html += '<div class="algorithm-steps">';
    html += '<div class="algorithm-step current">';
    html += '<strong>Step 1:</strong> Compare adjacent elements and swap if needed';
    html += '</div>';
    
    // Simulate sorting steps
    const sorted = [...numbers].sort((a, b) => a - b);
    html += '<div class="algorithm-step completed">';
    html += '<strong>Step 2:</strong> Array after sorting: [' + sorted.join(', ') + ']';
    html += '</div>';
    html += '</div>';
    
    return html;
}

function visualizeQuickSort(numbers) {
    let html = '<h4>Quick Sort Visualization</h4>';
    html += '<div class="array-visualization">';
    numbers.forEach(num => {
        html += `<div class="array-element">${num}</div>`;
    });
    html += '</div>';
    
    html += '<div class="algorithm-steps">';
    html += '<div class="algorithm-step current">';
    html += '<strong>Step 1:</strong> Choose pivot element (first element)';
    html += '</div>';
    
    html += '<div class="algorithm-step">';
    html += '<strong>Step 2:</strong> Partition array around pivot';
    html += '</div>';
    
    const sorted = [...numbers].sort((a, b) => a - b);
    html += '<div class="algorithm-step completed">';
    html += '<strong>Step 3:</strong> Sorted array: [' + sorted.join(', ') + ']';
    html += '</div>';
    html += '</div>';
    
    return html;
}

function visualizeBinarySearch(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const target = sorted[Math.floor(sorted.length / 2)];
    
    let html = '<h4>Binary Search Visualization</h4>';
    html += '<div class="array-visualization">';
    sorted.forEach(num => {
        const isTarget = num === target;
        html += `<div class="array-element ${isTarget ? 'comparing' : ''}">${num}</div>`;
    });
    html += '</div>';
    
    html += '<div class="algorithm-steps">';
    html += '<div class="algorithm-step current">';
    html += `<strong>Step 1:</strong> Searching for target value: ${target}`;
    html += '</div>';
    
    html += '<div class="algorithm-step">';
    html += '<strong>Step 2:</strong> Compare with middle element';
    html += '</div>';
    
    html += '<div class="algorithm-step completed">';
    html += `<strong>Step 3:</strong> Target ${target} found at position ${sorted.indexOf(target) + 1}`;
    html += '</div>';
    html += '</div>';
    
    return html;
}

// Regex Tester
function openRegexTester() {
    document.getElementById('regexModal').style.display = 'flex';
}

function closeRegexModal() {
    document.getElementById('regexModal').style.display = 'none';
    document.getElementById('regexResults').innerHTML = '';
}

function testRegex() {
    const pattern = document.getElementById('regexPattern').value;
    const testText = document.getElementById('regexTestText').value;
    
    if (!pattern.trim()) {
        showNotification('Please enter a regex pattern', 'error');
        return;
    }
    
    if (!testText.trim()) {
        showNotification('Please enter test text', 'error');
        return;
    }
    
    const results = performRegexTest(pattern, testText);
    document.getElementById('regexResults').innerHTML = results;
}

function performRegexTest(pattern, testText) {
    try {
        const regex = new RegExp(pattern, 'g');
        const matches = [...testText.matchAll(regex)];
        
        if (matches.length === 0) {
            return '<div class="regex-no-match">No matches found</div>';
        }
        
        let html = '<h4>Regex Matches:</h4>';
        matches.forEach((match, index) => {
            html += '<div class="regex-match">';
            html += `<div class="match-text">Match ${index + 1}: "${match[0]}"</div>`;
            html += `<div class="match-position">Position: ${match.index}</div>`;
            if (match.groups) {
                html += '<div class="match-groups">Groups: ' + JSON.stringify(match.groups) + '</div>';
            }
            html += '</div>';
        });
        
        return html;
    } catch (error) {
        return `<div class="regex-no-match">Invalid regex pattern: ${error.message}</div>`;
    }
}

// Enhanced AI Responses with more detailed content
function initEnhancedAIResponses() {
    window.aiResponses = {
        'recursion': {
            title: 'Understanding Recursion',
            content: `
                <h3>What is Recursion?</h3>
                <p>Recursion is a programming concept where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.</p>
                
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>Base Case:</strong> The stopping condition that prevents infinite recursion</li>
                    <li><strong>Recursive Case:</strong> The part where the function calls itself</li>
                    <li><strong>Call Stack:</strong> How recursive calls are managed in memory</li>
                </ul>
                
                <h3>Example: Factorial Function</h3>
                <div class="code-block">
function factorial(n) {
    // Base case
    if (n <= 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120
                </div>
                
                <h3>Visual Representation:</h3>
                <p>factorial(5) → 5 × factorial(4) → 5 × 4 × factorial(3) → 5 × 4 × 3 × factorial(2) → 5 × 4 × 3 × 2 × factorial(1) → 5 × 4 × 3 × 2 × 1 = 120</p>
                
                <h3>When to Use Recursion:</h3>
                <ul>
                    <li>Tree/graph traversal</li>
                    <li>Divide and conquer algorithms</li>
                    <li>Mathematical calculations</li>
                    <li>File system navigation</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/400x200/667eea/ffffff?text=Recursion+Visualization'
        },
        
        'oop': {
            title: 'Object-Oriented Programming',
            content: `
                <h3>OOP Fundamentals</h3>
                <p>Object-Oriented Programming is a programming paradigm based on the concept of "objects" that contain data and code.</p>
                
                <h3>Four Pillars of OOP:</h3>
                
                <h4>1. Encapsulation</h4>
                <p>Bundling data and methods that operate on that data within a single unit (class).</p>
                <div class="code-block">
class BankAccount {
    constructor(balance) {
        this._balance = balance; // Private variable
    }
    
    getBalance() {
        return this._balance;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
        }
    }
}
                </div>
                
                <h4>2. Inheritance</h4>
                <p>Creating new classes that are built upon existing classes.</p>
                <div class="code-block">
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log('Some sound');
    }
}

class Dog extends Animal {
    speak() {
        console.log('Woof!');
    }
}
                </div>
                
                <h4>3. Polymorphism</h4>
                <p>The ability to present the same interface for different underlying forms (data types or classes).</p>
                
                <h4>4. Abstraction</h4>
                <p>Hiding complex implementation details and showing only necessary features.</p>
            `,
            image: 'https://via.placeholder.com/400x200/764ba2/ffffff?text=OOP+Concepts'
        }
    };
}

// Initialize enhanced AI responses
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize enhanced AI responses
    initEnhancedAIResponses();
});

// Advanced AI Bot Features
let voiceRecognition = null;
let isListening = false;
let collaborationSession = null;

// Voice Commands
function toggleVoiceCommands() {
    const voiceInterface = document.getElementById('voiceInterface');
    const isVisible = voiceInterface.style.display !== 'none';
    
    if (isVisible) {
        voiceInterface.style.display = 'none';
        if (isListening) {
            stopVoiceRecognition();
        }
    } else {
        voiceInterface.style.display = 'block';
        showNotification('Voice commands activated! Click "Start Listening" to begin.', 'info');
    }
}

function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showNotification('Speech recognition is not supported in this browser.', 'error');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceRecognition = new SpeechRecognition();
    
    voiceRecognition.continuous = true;
    voiceRecognition.interimResults = true;
    voiceRecognition.lang = 'en-US';
    
    voiceRecognition.onstart = () => {
        isListening = true;
        updateVoiceUI(true);
        showNotification('Listening... Speak now!', 'info');
    };
    
    voiceRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        
        document.getElementById('voiceTranscript').textContent = transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            processVoiceCommand(transcript);
        }
    };
    
    voiceRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        showNotification('Voice recognition error: ' + event.error, 'error');
        stopVoiceRecognition();
    };
    
    voiceRecognition.onend = () => {
        stopVoiceRecognition();
    };
    
    voiceRecognition.start();
}

function stopVoiceRecognition() {
    if (voiceRecognition) {
        voiceRecognition.stop();
    }
    isListening = false;
    updateVoiceUI(false);
}

function updateVoiceUI(listening) {
    const startBtn = document.getElementById('startVoiceBtn');
    const stopBtn = document.getElementById('stopVoiceBtn');
    const status = document.getElementById('voiceStatus');
    
    if (listening) {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
        startBtn.classList.add('listening');
        status.textContent = 'Listening...';
    } else {
        startBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        startBtn.classList.remove('listening');
        status.textContent = 'Click to start listening';
    }
}

function processVoiceCommand(transcript) {
    const command = transcript.toLowerCase();
    
    if (command.includes('analyze') && command.includes('code')) {
        analyzeCodeSnippet();
        showNotification('Opening code analysis...', 'info');
    } else if (command.includes('generate') && command.includes('function')) {
        openCodeGenerator();
        showNotification('Opening code generator...', 'info');
    } else if (command.includes('explain') && command.includes('recursion')) {
        askQuestion('What is recursion and how does it work?');
        showNotification('Generating explanation for recursion...', 'info');
    } else if (command.includes('debug') && command.includes('code')) {
        debugCode();
        showNotification('Opening code debugger...', 'info');
    } else if (command.includes('show') && command.includes('example')) {
        askQuestion('Show me code examples for ' + command.split('example of')[1]?.trim() || 'programming');
        showNotification('Generating code examples...', 'info');
    } else {
        // Default: treat as a general question
        askQuestion(transcript);
        showNotification('Processing your question...', 'info');
    }
}

// AI Code Review
function startCodeReview() {
    document.getElementById('codeInputSection').style.display = 'block';
    document.getElementById('codeInput').placeholder = 'Paste your code here for AI code review...';
    document.getElementById('codeInput').focus();
    
    showNotification('AI Code Review activated! Paste your code and click Analyze.', 'info');
}

// Auto Documentation
function generateDocumentation() {
    document.getElementById('codeInputSection').style.display = 'block';
    document.getElementById('codeInput').placeholder = 'Paste your code here to generate documentation...';
    document.getElementById('codeInput').focus();
    
    showNotification('Documentation generator activated! Paste your code and click Analyze.', 'info');
}

// Collaboration Features
function createCodeSession() {
    const sessionId = generateSessionId();
    collaborationSession = {
        id: sessionId,
        participants: ['You'],
        code: '',
        createdAt: new Date()
    };
    
    document.getElementById('sessionId').value = sessionId;
    document.getElementById('collaborationModal').style.display = 'block';
    
    showNotification('Live code session created! Share the session ID with others.', 'success');
}

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
}

function copySessionId() {
    const sessionId = document.getElementById('sessionId');
    sessionId.select();
    document.execCommand('copy');
    showNotification('Session ID copied to clipboard!', 'success');
}

function inviteParticipant() {
    const email = prompt('Enter participant email:');
    if (email) {
        if (collaborationSession) {
            collaborationSession.participants.push(email);
            updateParticipantsList();
            showNotification('Invitation sent to ' + email, 'success');
        }
    }
}

function updateParticipantsList() {
    if (collaborationSession) {
        const participantsList = document.getElementById('participantsList');
        participantsList.innerHTML = collaborationSession.participants.join(', ');
    }
}

function startScreenShare() {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then(stream => {
                showNotification('Screen sharing started!', 'success');
            })
            .catch(err => {
                showNotification('Screen sharing failed: ' + err.message, 'error');
            });
    } else {
        showNotification('Screen sharing not supported in this browser.', 'error');
    }
}

function recordSession() {
    showNotification('Session recording started!', 'success');
}

function saveSharedCode() {
    const sharedCode = document.getElementById('sharedCode').value;
    if (collaborationSession) {
        collaborationSession.code = sharedCode;
        localStorage.setItem('sharedCode_' + collaborationSession.id, sharedCode);
        showNotification('Code saved successfully!', 'success');
    }
}

function exportSharedCode() {
    const sharedCode = document.getElementById('sharedCode').value;
    const blob = new Blob([sharedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shared_code.txt';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Code exported successfully!', 'success');
}

function shareCode() {
    const code = document.getElementById('codeInput')?.value || 'No code to share';
    const shareData = {
        title: 'Shared Code from Learning Platform',
        text: 'Check out this code!',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            showNotification('Code copied to clipboard!', 'success');
        });
    }
}

function exportToGitHub() {
    showNotification('GitHub export feature coming soon!', 'info');
}

// Analytics Features
function showCodeMetrics() {
    document.getElementById('analyticsModal').style.display = 'block';
    updateAnalyticsMetrics();
}

function updateAnalyticsMetrics() {
    // Simulate real-time metrics
    const metrics = {
        quality: Math.floor(Math.random() * 20) + 80,
        performance: Math.floor(Math.random() * 15) + 85,
        security: Math.floor(Math.random() * 25) + 70,
        maintainability: Math.floor(Math.random() * 20) + 80
    };
    
    document.getElementById('qualityScore').textContent = metrics.quality + '%';
    document.getElementById('performanceScore').textContent = metrics.performance + '%';
    document.getElementById('securityScore').textContent = metrics.security + '%';
    document.getElementById('maintainabilityScore').textContent = metrics.maintainability + '%';
    
    // Update progress bars
    document.querySelectorAll('.metric-fill').forEach((fill, index) => {
        const values = [metrics.quality, metrics.performance, metrics.security, metrics.maintainability];
        fill.style.width = values[index] + '%';
    });
}

function performanceAnalysis() {
    showNotification('Performance analysis started...', 'info');
    
    // Simulate performance analysis
    setTimeout(() => {
        const analysis = {
            'Execution Time': '2.3ms',
            'Memory Usage': '1.2MB',
            'CPU Usage': '15%',
            'Network Requests': '3',
            'Bundle Size': '45KB'
        };
        
        let result = 'Performance Analysis Results:\n\n';
        Object.entries(analysis).forEach(([key, value]) => {
            result += `${key}: ${value}\n`;
        });
        
        addMessage('user', 'Run performance analysis');
        addMessage('bot', result);
        showNotification('Performance analysis completed!', 'success');
    }, 2000);
}

function securityScan() {
    showNotification('Security scan started...', 'info');
    
    // Simulate security scan
    setTimeout(() => {
        const securityIssues = [
            { level: 'Low', issue: 'Unused variable detected', line: 15 },
            { level: 'Medium', issue: 'Potential SQL injection vulnerability', line: 42 },
            { level: 'High', issue: 'Hardcoded API key found', line: 8 }
        ];
        
        let result = 'Security Scan Results:\n\n';
        securityIssues.forEach(issue => {
            result += `[${issue.level.toUpperCase()}] Line ${issue.line}: ${issue.issue}\n`;
        });
        
        addMessage('user', 'Run security scan');
        addMessage('bot', result);
        showNotification('Security scan completed!', 'success');
    }, 3000);
}

// Modal Management
function closeCollaborationModal() {
    document.getElementById('collaborationModal').style.display = 'none';
}

function closeAnalyticsModal() {
    document.getElementById('analyticsModal').style.display = 'none';
}

// Enhanced Code Analysis
function submitCodeForAnalysis() {
    const code = document.getElementById('codeInput').value;
    if (!code.trim()) {
        showNotification('Please paste some code first!', 'error');
        return;
    }
    
    showNotification('Analyzing code...', 'info');
    
    // Simulate analysis
    setTimeout(() => {
        const analysis = performAdvancedCodeAnalysis(code);
        addMessage('user', 'Analyze this code: ' + code.substring(0, 100) + '...');
        addMessage('bot', analysis);
        closeCodeInput();
        showNotification('Code analysis completed!', 'success');
    }, 2000);
}

function performAdvancedCodeAnalysis(code) {
    const lines = code.split('\n').length;
    const chars = code.length;
    const words = code.split(/\s+/).length;
    
    // Detect language
    const language = detectLanguage(code);
    
    // Calculate complexity
    const complexity = calculateComplexity(code);
    
    // Find potential issues
    const issues = findCodeIssues(code);
    
    let analysis = `📊 **Code Analysis Results**\n\n`;
    analysis += `**Language Detected:** ${language}\n`;
    analysis += `**Lines of Code:** ${lines}\n`;
    analysis += `**Characters:** ${chars}\n`;
    analysis += `**Words:** ${words}\n`;
    analysis += `**Complexity:** ${complexity}\n\n`;
    
    if (issues.length > 0) {
        analysis += `**Potential Issues:**\n`;
        issues.forEach(issue => {
            analysis += `• ${issue}\n`;
        });
    } else {
        analysis += `**No major issues detected!** ✅\n`;
    }
    
    analysis += `\n**Recommendations:**\n`;
    analysis += `• Consider adding comments for complex logic\n`;
    analysis += `• Break down large functions into smaller ones\n`;
    analysis += `• Add error handling where appropriate\n`;
    
    return analysis;
}

function detectLanguage(code) {
    if (code.includes('function') && code.includes('var') || code.includes('const')) return 'JavaScript';
    if (code.includes('def ') && code.includes('import ')) return 'Python';
    if (code.includes('public class') && code.includes('public static')) return 'Java';
    if (code.includes('#include') && code.includes('int main')) return 'C/C++';
    if (code.includes('<?php')) return 'PHP';
    if (code.includes('SELECT') && code.includes('FROM')) return 'SQL';
    return 'Unknown';
}

function calculateComplexity(code) {
    const complexity = code.split(/\b(if|for|while|switch|case|catch)\b/).length;
    if (complexity < 5) return 'Low';
    if (complexity < 10) return 'Medium';
    return 'High';
}

function findCodeIssues(code) {
    const issues = [];
    
    if (code.includes('TODO') || code.includes('FIXME')) {
        issues.push('Contains TODO/FIXME comments');
    }
    
    if (code.includes('console.log') && !code.includes('// debug')) {
        issues.push('Contains console.log statements (consider removing for production)');
    }
    
    if (code.includes('password') && code.includes('=')) {
        issues.push('Potential hardcoded password detected');
    }
    
    if (code.includes('eval(')) {
        issues.push('Use of eval() detected (security risk)');
    }
    
    return issues;
}

// Initialize advanced features
function initAdvancedFeatures() {
    // Check for speech recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.disabled = true;
            voiceBtn.title = 'Speech recognition not supported';
        }
    }
    
    // Load saved collaboration sessions
    loadCollaborationSessions();
}

function loadCollaborationSessions() {
    const savedSessions = Object.keys(localStorage).filter(key => key.startsWith('sharedCode_'));
    if (savedSessions.length > 0) {
        console.log('Found saved collaboration sessions:', savedSessions.length);
    }
}

// Enhanced AI Responses with new features
function initEnhancedAIResponses() {
    // Add new AI response patterns
    window.aiResponses = {
        ...window.aiResponses,
        'voice': {
            'analyze': 'I\'ll analyze your code for you. Please paste the code you\'d like me to review.',
            'generate': 'I\'ll help you generate code. What type of function or code would you like me to create?',
            'explain': 'I\'d be happy to explain that concept. Let me provide a detailed explanation with examples.',
            'debug': 'I\'ll help you debug your code. Please share the code and any error messages you\'re seeing.',
            'example': 'Here are some practical examples to help you understand this concept better.'
        },
        'collaboration': {
            'session': 'I\'ve created a live coding session for you. Share the session ID with your team members to start collaborating!',
            'share': 'Your code has been shared successfully. Others can now view and edit the code in real-time.',
            'export': 'Code exported successfully! You can now import it into your preferred development environment.'
        },
        'analytics': {
            'metrics': 'Here are the detailed metrics for your code. I\'ve analyzed quality, performance, security, and maintainability.',
            'performance': 'Performance analysis complete! Here are the key metrics and optimization suggestions.',
            'security': 'Security scan finished! I\'ve identified potential vulnerabilities and provided recommendations.'
        }
    };
}

// Horizontal Scrolling Navigation
function initHorizontalNavigation() {
    const horizontalNav = document.getElementById('horizontalNav');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const scrollContainer = document.querySelector('.horizontal-nav-scroll');
    
    if (!horizontalNav || !scrollLeftBtn || !scrollRightBtn || !scrollContainer) {
        return;
    }
    
    // Add click event listeners to horizontal nav links
    const horizontalNavLinks = horizontalNav.querySelectorAll('.horizontal-nav-link');
    horizontalNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            horizontalNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Navigate to the page
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
            
            // Update breadcrumbs
            updateBreadcrumbs(targetPage);
        });
    });
    
    // Scroll left button
    scrollLeftBtn.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });
    
    // Scroll right button
    scrollRightBtn.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });
    
    // Update scroll button states based on scroll position
    scrollContainer.addEventListener('scroll', function() {
        updateScrollButtonStates();
    });
    
    // Initial button state update
    updateScrollButtonStates();
    
    // Auto-scroll to active link
    scrollToActiveLink();
}

function updateScrollButtonStates() {
    const scrollContainer = document.querySelector('.horizontal-nav-scroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) {
        return;
    }
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    
    // Enable/disable left button
    scrollLeftBtn.disabled = scrollLeft <= 0;
    
    // Enable/disable right button
    scrollRightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
}

function scrollToActiveLink() {
    const activeLink = document.querySelector('.horizontal-nav-link.active');
    const scrollContainer = document.querySelector('.horizontal-nav-scroll');
    
    if (activeLink && scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        const scrollLeft = activeLink.offsetLeft - (containerRect.width / 2) + (linkRect.width / 2);
        
        scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Close mobile menu if open
    closeMobileMenu();
}

function updateBreadcrumbs(pageName) {
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (!breadcrumbs) return;
    
    const pageTitles = {
        'home': 'Home',
        'programming-languages': 'Programming Languages',
        'coding-schemes': 'Coding Schemes',
        'number-systems': 'Number Systems',
        'compiler': 'Compiler',
        'challenges': 'Challenges',
        'progress': 'Progress',
        'gamification': 'Achievements',
        'ai-tutor': 'AI Tutor',
        'ai-bot': 'AI Bot',
        'playground': 'Interactive Playground',
        'projects': 'Projects'
    };
    
    const title = pageTitles[pageName] || pageName;
    
    breadcrumbs.innerHTML = `
        <span class="breadcrumb-item">Home</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">${title}</span>
    `;
}










