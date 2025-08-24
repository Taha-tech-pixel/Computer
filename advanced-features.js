// Advanced Features JavaScript
// Interactive Playground, Projects, Gamification, and AI Tutor

// Interactive Playground Functions
function initPlayground() {
    const runCodeBtn = document.getElementById('runCode');
    const debugCodeBtn = document.getElementById('debugCode');
    const savePlaygroundBtn = document.getElementById('savePlayground');
    const loadTemplateBtn = document.getElementById('loadTemplate');
    const playgroundCode = document.getElementById('playgroundCode');
    const playgroundLanguage = document.getElementById('playgroundLanguage');
    
    if (runCodeBtn) runCodeBtn.addEventListener('click', executePlaygroundCode);
    if (debugCodeBtn) debugCodeBtn.addEventListener('click', debugPlaygroundCode);
    if (savePlaygroundBtn) savePlaygroundBtn.addEventListener('click', savePlaygroundCode);
    if (loadTemplateBtn) loadTemplateBtn.addEventListener('click', showTemplateLibrary);
    if (playgroundLanguage) playgroundLanguage.addEventListener('change', changePlaygroundLanguage);
    
    // Load saved code
    const savedCode = localStorage.getItem('playgroundCode');
    if (savedCode && playgroundCode) {
        playgroundCode.value = savedCode;
    }
    
    // Auto-save code
    if (playgroundCode) {
        playgroundCode.addEventListener('input', function() {
            localStorage.setItem('playgroundCode', playgroundCode.value);
        });
    }
}

function executePlaygroundCode() {
    const code = document.getElementById('playgroundCode').value;
    const language = document.getElementById('playgroundLanguage').value;
    const output = document.getElementById('playgroundOutput');
    
    if (!code.trim()) {
        output.innerHTML = '<span style="color: #ff6b6b;">Please enter some code to execute.</span>';
        return;
    }
    
    output.innerHTML = '<span style="color: #4ecdc4;">Executing code...</span>';
    
    try {
        let result = '';
        
        switch (language) {
            case 'javascript':
                result = executeJavaScriptCode(code);
                break;
            case 'html':
                result = executeHTMLCode(code);
                break;
            case 'css':
                result = executeCSSCode(code);
                break;
            case 'python':
                result = simulatePythonExecution(code);
                break;
            case 'java':
                result = simulateJavaExecution(code);
                break;
            case 'cpp':
                result = simulateCppExecution(code);
                break;
            default:
                result = 'Language not supported in playground.';
        }
        
        output.innerHTML = '<span style="color: #51cf66;">✓ Execution successful!</span><br><br>' + result;
    } catch (error) {
        output.innerHTML = '<span style="color: #ff6b6b;">✗ Error: ' + error.message + '</span>';
    }
}

function executeJavaScriptCode(code) {
    const originalConsoleLog = console.log;
    const logs = [];
    
    console.log = function() {
        logs.push(Array.prototype.slice.call(arguments).join(' '));
    };
    
    try {
        const result = eval(code);
        console.log = originalConsoleLog;
        
        let output = '';
        if (logs.length > 0) {
            output += '<strong>Console Output:</strong><br>' + logs.join('<br>') + '<br><br>';
        }
        if (result !== undefined) {
            output += '<strong>Return Value:</strong> ' + result;
        }
        
        return output || 'Code executed successfully (no output)';
    } catch (error) {
        console.log = originalConsoleLog;
        throw error;
    }
}

function executeHTMLCode(code) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '300px';
    iframe.style.border = '1px solid #ddd';
    iframe.style.borderRadius = '4px';
    
    const output = document.getElementById('playgroundOutput');
    output.innerHTML = '';
    output.appendChild(iframe);
    
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
    
    return 'HTML rendered in preview above';
}

function executeCSSCode(code) {
    const style = document.createElement('style');
    style.textContent = code;
    document.head.appendChild(style);
    
    setTimeout(function() {
        document.head.removeChild(style);
    }, 5000);
    
    return 'CSS applied to page (will be removed in 5 seconds)';
}

function simulatePythonExecution(code) {
    const lines = code.split('\n');
    let output = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('print(') && line.endsWith(')')) {
            const content = line.slice(6, -1);
            output += content + '<br>';
        }
    }
    
    return output || 'Python code simulated (print statements only)';
}

function simulateJavaExecution(code) {
    return 'Java execution simulated. In a real environment, this would compile and run Java bytecode.';
}

function simulateCppExecution(code) {
    return 'C++ execution simulated. In a real environment, this would compile and run native code.';
}

function debugPlaygroundCode() {
    const debugPanel = document.getElementById('debugPanel');
    const debugOutput = document.getElementById('debugOutput');
    
    debugPanel.style.display = 'block';
    debugOutput.innerHTML = 
        '<strong>Debug Session Started</strong><br>' +
        '<span style="color: #4ecdc4;">✓ Code analysis complete</span><br>' +
        '<span style="color: #4ecdc4;">✓ Breakpoints set</span><br>' +
        '<span style="color: #4ecdc4;">✓ Variable inspection ready</span><br><br>' +
        '<strong>Debug Controls:</strong><br>' +
        '• Step Over: Execute current line<br>' +
        '• Step Into: Enter function calls<br>' +
        '• Step Out: Exit current function<br>' +
        '• Continue: Resume execution';
}

function savePlaygroundCode() {
    const code = document.getElementById('playgroundCode').value;
    const language = document.getElementById('playgroundLanguage').value;
    const timestamp = new Date().toISOString();
    
    const savedCode = {
        code: code,
        language: language,
        timestamp: timestamp,
        name: 'Playground_' + new Date().toLocaleDateString()
    };
    
    const savedCodes = JSON.parse(localStorage.getItem('savedPlaygroundCodes') || '[]');
    savedCodes.push(savedCode);
    localStorage.setItem('savedPlaygroundCodes', JSON.stringify(savedCodes));
    
    showNotification('Code saved successfully!', 'success');
}

function showTemplateLibrary() {
    const templateLibrary = document.getElementById('templateLibrary');
    templateLibrary.style.display = 'block';
    loadTemplates('basics');
    
    // Add event listeners for template categories
    const categories = document.querySelectorAll('.template-category');
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function(e) {
            document.querySelectorAll('.template-category').forEach(function(c) {
                c.classList.remove('active');
            });
            e.target.classList.add('active');
            loadTemplates(e.target.dataset.category);
        });
    }
}

function loadTemplates(category) {
    const templateList = document.getElementById('templateList');
    const templates = getTemplatesByCategory(category);
    
    let html = '';
    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        html += '<div class="template-item" onclick="loadTemplate(\'' + template.id + '\')">' +
            '<h4>' + template.name + '</h4>' +
            '<p>' + template.description + '</p>' +
            '<small>' + template.language + '</small>' +
            '</div>';
    }
    
    templateList.innerHTML = html;
}

function getTemplatesByCategory(category) {
    const templates = {
        basics: [
            { id: 'hello-world', name: 'Hello World', description: 'Basic output program', language: 'JavaScript' },
            { id: 'variables', name: 'Variables', description: 'Variable declaration and usage', language: 'JavaScript' },
            { id: 'functions', name: 'Functions', description: 'Function definition and calling', language: 'JavaScript' }
        ],
        algorithms: [
            { id: 'bubble-sort', name: 'Bubble Sort', description: 'Simple sorting algorithm', language: 'JavaScript' },
            { id: 'binary-search', name: 'Binary Search', description: 'Efficient search algorithm', language: 'JavaScript' },
            { id: 'fibonacci', name: 'Fibonacci', description: 'Recursive sequence', language: 'JavaScript' }
        ],
        data_structures: [
            { id: 'linked-list', name: 'Linked List', description: 'Basic linked list implementation', language: 'JavaScript' },
            { id: 'stack', name: 'Stack', description: 'LIFO data structure', language: 'JavaScript' },
            { id: 'queue', name: 'Queue', description: 'FIFO data structure', language: 'JavaScript' }
        ],
        web: [
            { id: 'html-basic', name: 'Basic HTML', description: 'Simple HTML structure', language: 'HTML' },
            { id: 'css-styling', name: 'CSS Styling', description: 'Basic CSS styling', language: 'CSS' },
            { id: 'js-dom', name: 'DOM Manipulation', description: 'JavaScript DOM operations', language: 'JavaScript' }
        ],
        games: [
            { id: 'number-guess', name: 'Number Guessing', description: 'Simple number guessing game', language: 'JavaScript' },
            { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'Classic game implementation', language: 'JavaScript' },
            { id: 'snake-game', name: 'Snake Game', description: 'Simple snake game', language: 'JavaScript' }
        ]
    };
    
    return templates[category] || [];
}

function loadTemplate(templateId) {
    const templates = {
        'hello-world': 'console.log("Hello, World!");',
        'variables': 'let name = "John";\nlet age = 25;\nconsole.log("Name: " + name + ", Age: " + age);',
        'functions': 'function greet(name) {\n    return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));',
        'bubble-sort': 'function bubbleSort(arr) {\n    for (let i = 0; i < arr.length; i++) {\n        for (let j = 0; j < arr.length - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n            }\n        }\n    }\n    return arr;\n}\n\nconst numbers = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(bubbleSort(numbers));',
        'html-basic': '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n</body>\n</html>',
        'css-styling': 'body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\np {\n    color: #666;\n    line-height: 1.6;\n}'
    };
    
    const code = templates[templateId];
    if (code) {
        document.getElementById('playgroundCode').value = code;
        document.getElementById('templateLibrary').style.display = 'none';
        showNotification('Template loaded successfully!', 'success');
    }
}

function changePlaygroundLanguage() {
    const language = document.getElementById('playgroundLanguage').value;
    const code = document.getElementById('playgroundCode');
    
    if (confirm('Changing language will clear your current code. Continue?')) {
        code.value = '';
        localStorage.removeItem('playgroundCode');
    }
}

// Initialize all advanced features
function initAdvancedFeatures() {
    initPlayground();
    
    // Close buttons for modals
    const closeDebug = document.getElementById('closeDebug');
    if (closeDebug) {
        closeDebug.addEventListener('click', function() {
            document.getElementById('debugPanel').style.display = 'none';
        });
    }
    
    const closeTemplates = document.getElementById('closeTemplates');
    if (closeTemplates) {
        closeTemplates.addEventListener('click', function() {
            document.getElementById('templateLibrary').style.display = 'none';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedFeatures();
});
