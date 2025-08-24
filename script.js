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
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all pages
            pages.forEach(page => page.style.display = 'none');
            
            // Show target page
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.style.display = 'block';
            }
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize language links
    initLanguageLinks();
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
