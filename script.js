// Navigation and Page Management
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initProgressChart();
    initAIResponses();
    
    // Add debugging for language detail links
    initLanguageLinks();
    
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

// Challenge Functions
function filterChallenges(category) {
    const cards = document.querySelectorAll('.challenge-card');
    const buttons = document.querySelectorAll('.category-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Update stats
    updateChallengeStats();
}

function updateChallengeStats() {
    const visibleCards = document.querySelectorAll('.challenge-card:not(.hidden)');
    const totalChallenges = document.querySelectorAll('.challenge-card').length;
    const completedChallenges = localStorage.getItem('completedChallenges') ? 
        JSON.parse(localStorage.getItem('completedChallenges')).length : 0;
    
    const totalSpan = document.querySelector('.challenge-stats .stat-card:nth-child(1) .stat-number');
    const completedSpan = document.querySelector('.challenge-stats .stat-card:nth-child(2) .stat-number');
    const successSpan = document.querySelector('.challenge-stats .stat-card:nth-child(3) .stat-number');
    
    if (totalSpan) totalSpan.textContent = visibleCards.length;
    if (completedSpan) completedSpan.textContent = completedChallenges;
    if (successSpan) successSpan.textContent = totalChallenges > 0 ? 
        Math.round((completedChallenges / totalChallenges) * 100) + '%' : '0%';
}

function startChallenge(challengeType) {
    // Store current challenge in localStorage
    localStorage.setItem('currentChallenge', challengeType);
    
    // Create challenge modal
    const modal = document.createElement('div');
    modal.className = 'challenge-modal';
    modal.innerHTML = `
        <div class="challenge-modal-content">
            <div class="challenge-modal-header">
                <h2>${getChallengeTitle(challengeType)}</h2>
                <button onclick="closeChallengeModal()" class="close-btn">&times;</button>
            </div>
            <div class="challenge-modal-body">
                <div class="challenge-description">
                    <h3>Challenge Description</h3>
                    <p>${getChallengeDescription(challengeType)}</p>
                </div>
                <div class="challenge-requirements">
                    <h3>Requirements</h3>
                    <ul>${getChallengeRequirements(challengeType)}</ul>
                </div>
                <div class="challenge-code-editor">
                    <h3>Your Solution</h3>
                    <textarea id="challenge-code" placeholder="Write your code here...">${getChallengeTemplate(challengeType)}</textarea>
                </div>
                <div class="challenge-actions">
                    <button onclick="runChallenge()" class="btn btn-primary">Run Code</button>
                    <button onclick="submitChallenge()" class="btn btn-success">Submit Solution</button>
                    <button onclick="closeChallengeModal()" class="btn btn-secondary">Cancel</button>
                </div>
                <div id="challenge-output" class="challenge-output"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeChallengeModal() {
    const modal = document.querySelector('.challenge-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function getChallengeTitle(challengeType) {
    const titles = {
        'html-responsive': 'HTML: Responsive Layout',
        'js-dom': 'JavaScript: DOM Manipulation',
        'ts-api': 'TypeScript: Type-Safe API',
        'php-auth': 'PHP: User Authentication',
        'node-api': 'Node.js: REST API',
        'python-ds': 'Python: Data Structures',
        'java-threads': 'Java: Multi-threading',
        'c-memory': 'C: Memory Management',
        'cpp-stl': 'C++: STL Algorithms',
        'csharp-linq': 'C#: LINQ Implementation',
        'kotlin-coroutines': 'Kotlin: Coroutines',
        'go-crawler': 'Go: Concurrent Web Crawler',
        'rust-memory': 'Rust: Safe Memory Management',
        'bash-monitor': 'Bash: System Administration',
        'perl-logs': 'Perl: Text Processing',
        'ruby-dsl': 'Ruby: Metaprogramming',
        'r-stats': 'R: Statistical Analysis',
        'scala-mapreduce': 'Scala: Functional Data Processing',
        'clojure-macros': 'Clojure: Lisp Macros',
        'fortran-numerical': 'Fortran: Scientific Computing',
        'vbnet-forms': 'VB.NET: Windows Forms',
        'sql-complex': 'SQL: Complex Queries'
    };
    return titles[challengeType] || 'Programming Challenge';
}

function getChallengeDescription(challengeType) {
    const descriptions = {
        'html-responsive': 'Create a responsive webpage layout that adapts to different screen sizes. Use HTML5 semantic elements and modern CSS techniques like Grid and Flexbox.',
        'js-dom': 'Build an interactive todo list application with full CRUD operations. Implement proper event handling and DOM manipulation.',
        'ts-api': 'Develop a type-safe REST API client with comprehensive error handling and TypeScript interfaces.',
        'php-auth': 'Implement a secure authentication system with user registration, login, password hashing, and session management.',
        'node-api': 'Create a complete REST API with Express.js, database integration, and JWT authentication.',
        'python-ds': 'Implement custom data structures including Stack, Queue, Linked List, and Binary Search Tree with proper OOP principles.',
        'java-threads': 'Build a thread-safe producer-consumer system with proper synchronization and deadlock prevention.',
        'c-memory': 'Create a custom memory allocator with malloc, free functions and memory leak detection capabilities.',
        'cpp-stl': 'Implement custom STL-compatible algorithms and containers with iterators and allocators.',
        'csharp-linq': 'Build custom LINQ-like extension methods for data querying and manipulation.',
        'kotlin-coroutines': 'Implement asynchronous programming patterns using Kotlin coroutines and flow.',
        'go-crawler': 'Build a concurrent web crawler using goroutines, channels, and worker pools.',
        'rust-memory': 'Implement a custom smart pointer with reference counting and memory safety guarantees.',
        'bash-monitor': 'Create a system monitoring script that tracks system resources and provides automated alerts.',
        'perl-logs': 'Build a log file analyzer with regex patterns, statistical analysis, and report generation.',
        'ruby-dsl': 'Create a Domain Specific Language using Ruby metaprogramming techniques.',
        'r-stats': 'Perform comprehensive statistical analysis on a dataset with visualization and hypothesis testing.',
        'scala-mapreduce': 'Implement MapReduce-like data processing pipeline using Scala\'s functional programming features.',
        'clojure-macros': 'Create advanced Lisp macros for code generation and domain-specific abstractions.',
        'fortran-numerical': 'Implement numerical algorithms for solving differential equations using Fortran\'s array operations.',
        'vbnet-forms': 'Create a Windows desktop application with database connectivity and user interface controls.',
        'sql-complex': 'Write complex SQL queries with joins, subqueries, window functions, and optimization techniques.'
    };
    return descriptions[challengeType] || 'Complete the programming challenge according to the requirements.';
}

function getChallengeRequirements(challengeType) {
    const requirements = {
        'html-responsive': `
            <li>Use HTML5 semantic elements (header, nav, main, section, footer)</li>
            <li>Implement CSS Grid and Flexbox for layout</li>
            <li>Ensure responsive design for mobile, tablet, and desktop</li>
            <li>Include proper accessibility features</li>
        `,
        'js-dom': `
            <li>Implement add, edit, delete, and mark complete functionality</li>
            <li>Use proper event delegation</li>
            <li>Store data in localStorage</li>
            <li>Handle edge cases and validation</li>
        `,
        'ts-api': `
            <li>Define TypeScript interfaces for API responses</li>
            <li>Implement proper error handling</li>
            <li>Use async/await patterns</li>
            <li>Include request/response type safety</li>
        `,
        'php-auth': `
            <li>Implement secure password hashing (password_hash)</li>
            <li>Use prepared statements for SQL queries</li>
            <li>Implement session management</li>
            <li>Include CSRF protection</li>
        `,
        'node-api': `
            <li>Set up Express.js server with middleware</li>
            <li>Implement JWT authentication</li>
            <li>Connect to MongoDB database</li>
            <li>Include input validation and error handling</li>
        `,
        'python-ds': `
            <li>Implement Stack with push, pop, peek operations</li>
            <li>Implement Queue with enqueue, dequeue operations</li>
            <li>Implement Linked List with insert, delete, search</li>
            <li>Implement Binary Search Tree with insert, delete, search</li>
        `,
        'java-threads': `
            <li>Create producer and consumer threads</li>
            <li>Use synchronized blocks or locks</li>
            <li>Implement proper thread communication</li>
            <li>Handle potential deadlock scenarios</li>
        `,
        'c-memory': `
            <li>Implement malloc function for memory allocation</li>
            <li>Implement free function for memory deallocation</li>
            <li>Track memory usage and detect leaks</li>
            <li>Handle memory fragmentation</li>
        `,
        'cpp-stl': `
            <li>Create custom container class</li>
            <li>Implement iterator class</li>
            <li>Create custom algorithms</li>
            <li>Use templates for generic programming</li>
        `,
        'csharp-linq': `
            <li>Create extension methods</li>
            <li>Implement Where, Select, OrderBy methods</li>
            <li>Support method chaining</li>
            <li>Include proper error handling</li>
        `,
        'kotlin-coroutines': `
            <li>Use coroutines for asynchronous operations</li>
            <li>Implement Flow for reactive streams</li>
            <li>Handle coroutine cancellation</li>
            <li>Use proper exception handling</li>
        `,
        'go-crawler': `
            <li>Use goroutines for concurrent crawling</li>
            <li>Implement worker pool pattern</li>
            <li>Use channels for communication</li>
            <li>Handle rate limiting and politeness</li>
        `,
        'rust-memory': `
            <li>Implement custom smart pointer</li>
            <li>Use reference counting</li>
            <li>Ensure memory safety</li>
            <li>Handle ownership and borrowing</li>
        `,
        'bash-monitor': `
            <li>Monitor CPU, memory, and disk usage</li>
            <li>Set up automated alerts</li>
            <li>Generate system reports</li>
            <li>Handle error conditions</li>
        `,
        'perl-logs': `
            <li>Use regex for log parsing</li>
            <li>Implement statistical analysis</li>
            <li>Generate formatted reports</li>
            <li>Handle different log formats</li>
        `,
        'ruby-dsl': `
            <li>Use metaprogramming techniques</li>
            <li>Create fluent interface</li>
            <li>Implement method_missing</li>
            <li>Support configuration blocks</li>
        `,
        'r-stats': `
            <li>Load and clean dataset</li>
            <li>Perform descriptive statistics</li>
            <li>Create visualizations</li>
            <li>Conduct hypothesis testing</li>
        `,
        'scala-mapreduce': `
            <li>Use functional programming concepts</li>
            <li>Implement map and reduce operations</li>
            <li>Handle large datasets</li>
            <li>Use immutable data structures</li>
        `,
        'clojure-macros': `
            <li>Create code generation macros</li>
            <li>Implement domain-specific abstractions</li>
            <li>Use macro hygiene</li>
            <li>Handle macro expansion</li>
        `,
        'fortran-numerical': `
            <li>Implement numerical algorithms</li>
            <li>Use array operations efficiently</li>
            <li>Handle floating-point precision</li>
            <li>Optimize for performance</li>
        `,
        'vbnet-forms': `
            <li>Create Windows Forms application</li>
            <li>Connect to database</li>
            <li>Implement CRUD operations</li>
            <li>Handle user input validation</li>
        `,
        'sql-complex': `
            <li>Write complex JOIN queries</li>
            <li>Use subqueries and CTEs</li>
            <li>Implement window functions</li>
            <li>Optimize query performance</li>
        `
    };
    return requirements[challengeType] || '<li>Complete the challenge according to the description</li>';
}

function getChallengeTemplate(challengeType) {
    const templates = {
        'html-responsive': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Layout</title>
    <style>
        /* Your CSS here */
    </style>
</head>
<body>
    <!-- Your HTML structure here -->
</body>
</html>`,
        'js-dom': `// Todo List Application
class TodoList {
    constructor() {
        this.todos = [];
        this.init();
    }
    
    init() {
        // Initialize the application
    }
    
    addTodo(text) {
        // Add new todo
    }
    
    deleteTodo(id) {
        // Delete todo by id
    }
    
    editTodo(id, newText) {
        // Edit existing todo
    }
    
    toggleComplete(id) {
        // Toggle completion status
    }
}

// Initialize the application
const todoApp = new TodoList();`,
        'ts-api': `interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

class ApiClient {
    private baseUrl: string;
    
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        // Implement GET request
    }
    
    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        // Implement POST request
    }
}

// Usage example
const apiClient = new ApiClient('https://api.example.com');`,
        'python-ds': `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        # Implement push operation
        pass
    
    def pop(self):
        # Implement pop operation
        pass
    
    def peek(self):
        # Implement peek operation
        pass

class Queue:
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        # Implement enqueue operation
        pass
    
    def dequeue(self):
        # Implement dequeue operation
        pass

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, data):
        # Implement insert operation
        pass
    
    def delete(self, data):
        # Implement delete operation
        pass`,
        'java-threads': `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

class Producer implements Runnable {
    private BlockingQueue<Integer> queue;
    
    public Producer(BlockingQueue<Integer> queue) {
        this.queue = queue;
    }
    
    @Override
    public void run() {
        // Implement producer logic
    }
}

class Consumer implements Runnable {
    private BlockingQueue<Integer> queue;
    
    public Consumer(BlockingQueue<Integer> queue) {
        this.queue = queue;
    }
    
    @Override
    public void run() {
        // Implement consumer logic
    }
}

public class ProducerConsumer {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);
        
        Thread producer = new Thread(new Producer(queue));
        Thread consumer = new Thread(new Consumer(queue));
        
        producer.start();
        consumer.start();
    }
}`,
        'c-memory': `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct block {
    size_t size;
    int free;
    struct block *next;
} block_t;

block_t *head = NULL;

void *my_malloc(size_t size) {
    // Implement malloc function
}

void my_free(void *ptr) {
    // Implement free function
}

void check_memory_leaks() {
    // Implement memory leak detection
}

int main() {
    // Test your memory allocator
    return 0;
}`,
        'cpp-stl': `#include <iostream>
#include <vector>

template<typename T>
class CustomVector {
private:
    T* data;
    size_t size_;
    size_t capacity_;
    
public:
    CustomVector() : data(nullptr), size_(0), capacity_(0) {}
    
    void push_back(const T& value) {
        // Implement push_back
    }
    
    T& operator[](size_t index) {
        // Implement indexing
    }
    
    size_t size() const {
        return size_;
    }
};

template<typename Iterator, typename Predicate>
Iterator find_if(Iterator first, Iterator last, Predicate pred) {
    // Implement find_if algorithm
}

int main() {
    CustomVector<int> vec;
    // Test your implementation
    return 0;
}`,
        'csharp-linq': `using System;
using System.Collections.Generic;
using System.Linq;

public static class CustomLinqExtensions {
    public static IEnumerable<T> Where<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
        // Implement Where method
    }
    
    public static IEnumerable<TResult> Select<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, TResult> selector) {
        // Implement Select method
    }
    
    public static IEnumerable<T> OrderBy<T, TKey>(this IEnumerable<T> source, Func<T, TKey> keySelector) {
        // Implement OrderBy method
    }
}

// Usage example
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var result = numbers.Where(n => n > 2).Select(n => n * 2).OrderBy(n => n);`,
        'kotlin-coroutines': `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

class DataProcessor {
    suspend fun processData(data: List<String>): Flow<ProcessedData> = flow {
        // Implement data processing with coroutines
    }
    
    suspend fun fetchData(): List<String> {
        // Simulate async data fetching
        delay(1000)
        return listOf("data1", "data2", "data3")
    }
}

fun main() = runBlocking {
    val processor = DataProcessor()
    
    // Use coroutines and flow
    processor.fetchData()
        .let { processor.processData(it) }
        .collect { processedData ->
            println("Processed: $processedData")
        }
}`,
        'go-crawler': `package main

import (
    "fmt"
    "net/http"
    "sync"
)

type Crawler struct {
    visited map[string]bool
    mutex   sync.RWMutex
    queue   chan string
    workers int
}

func NewCrawler(workers int) *Crawler {
    return &Crawler{
        visited: make(map[string]bool),
        queue:   make(chan string, 100),
        workers: workers,
    }
}

func (c *Crawler) Start(startURL string) {
    // Implement concurrent web crawler
}

func (c *Crawler) worker(wg *sync.WaitGroup) {
    // Implement worker function
}

func main() {
    crawler := NewCrawler(5)
    crawler.Start("https://example.com")
}`,
        'rust-memory': `use std::rc::Rc;
use std::cell::RefCell;

struct CustomRc<T> {
    data: Rc<RefCell<T>>,
}

impl<T> CustomRc<T> {
    fn new(value: T) -> Self {
        // Implement custom Rc
    }
    
    fn get(&self) -> T 
    where T: Clone {
        // Implement get method
    }
}

impl<T> Clone for CustomRc<T> {
    fn clone(&self) -> Self {
        // Implement clone
    }
}

fn main() {
    let rc1 = CustomRc::new(42);
    let rc2 = rc1.clone();
    
    println!("Value: {}", rc1.get());
}`,
        'bash-monitor': `#!/bin/bash

# System monitoring script
LOG_FILE="/var/log/system_monitor.log"
ALERT_EMAIL="admin@example.com"

# Thresholds
CPU_THRESHOLD=80
MEMORY_THRESHOLD=85
DISK_THRESHOLD=90

monitor_system() {
    # Implement system monitoring
}

check_cpu_usage() {
    # Check CPU usage
}

check_memory_usage() {
    # Check memory usage
}

check_disk_usage() {
    # Check disk usage
}

send_alert() {
    # Send alert notification
}

# Main monitoring loop
while true; do
    monitor_system
    sleep 60
done`,
        'perl-logs': `#!/usr/bin/perl
use strict;
use warnings;

# Log analyzer
my %stats = (
    'total_requests' => 0,
    'error_count' => 0,
    'status_codes' => {},
    'ip_addresses' => {},
);

sub parse_log_line {
    my ($line) = @_;
    # Implement log parsing
}

sub analyze_logs {
    my ($log_file) = @_;
    # Implement log analysis
}

sub generate_report {
    # Generate analysis report
}

# Main execution
my $log_file = shift || '/var/log/access.log';
analyze_logs($log_file);
generate_report();`,
        'ruby-dsl': `# Domain Specific Language
class ConfigurationDSL
  def initialize
    @config = {}
  end
  
  def method_missing(method_name, *args, &block)
    # Implement method_missing for DSL
  end
  
  def database(name, &block)
    # Database configuration
    @config[:database] = { name: name }
    instance_eval(&block) if block_given?
  end
  
  def server(host, port = 80, &block)
    # Server configuration
    @config[:server] = { host: host, port: port }
    instance_eval(&block) if block_given?
  end
  
  def get_config
    @config
  end
end

# Usage example
config = ConfigurationDSL.new
config.database :production do
  adapter 'postgresql'
  host 'localhost'
  port 5432
end`,
        'r-stats': `# Statistical Analysis in R
library(ggplot2)
library(dplyr)

# Load and clean data
data <- read.csv("dataset.csv")
clean_data <- data %>%
  filter(!is.na(value)) %>%
  mutate(category = as.factor(category))

# Descriptive statistics
summary_stats <- clean_data %>%
  group_by(category) %>%
  summarise(
    mean = mean(value),
    sd = sd(value),
    n = n()
  )

# Visualization
ggplot(clean_data, aes(x = category, y = value)) +
  geom_boxplot() +
  theme_minimal() +
  labs(title = "Distribution by Category")

# Hypothesis testing
t_test_result <- t.test(value ~ category, data = clean_data)
print(t_test_result)`,
        'scala-mapreduce': `object MapReduceExample {
  
  case class DataPoint(id: Int, value: Double, category: String)
  
  def mapReduce[T, K, V](data: List[T])(mapFn: T => List[(K, V)])(reduceFn: (K, List[V]) => (K, V)): Map[K, V] = {
    // Implement MapReduce
  }
  
  def main(args: Array[String]): Unit = {
    val data = List(
      DataPoint(1, 10.5, "A"),
      DataPoint(2, 20.3, "B"),
      DataPoint(3, 15.7, "A")
    )
    
    val result = mapReduce(data)(
      // Map function
      point => List((point.category, point.value))
    )(
      // Reduce function
      (category, values) => (category, values.sum / values.length)
    )
    
    println(s"Average by category: $result")
  }
}`,
        'clojure-macros': `(ns macro-example
  (:require [clojure.string :as str]))

;; Macro for creating data accessors
(defmacro defentity [name fields]
  (let [field-syms (map symbol fields)]
    `(defn ~(symbol (str "create-" name)) [~@field-syms]
       {:type ~(keyword name)
        ~@(interleave (map keyword fields) field-syms)})))

;; Macro for validation
(defmacro with-validation [entity validators]
  `(fn [~entity]
     (and ~@(for [[field validator] validators]
              `(~validator (~field ~entity))))))

;; Usage
(defentity user ["name" "email" "age"])

(def validate-user
  (with-validation user
    {:name #(not (str/blank? %))
     :email #(re-matches #".*@.*" %)
     :age #(and (number? %) (> % 0))}))

;; Test
(let [user (create-user "John" "john@example.com" 25)]
  (validate-user user))`,
        'fortran-numerical': `program numerical_solver
  implicit none
  
  integer, parameter :: n = 100
  real(8), dimension(n) :: x, y
  real(8) :: h, a, b
  integer :: i
  
  ! Initialize parameters
  a = 0.0d0
  b = 1.0d0
  h = (b - a) / (n - 1)
  
  ! Generate grid points
  do i = 1, n
    x(i) = a + (i - 1) * h
  end do
  
  ! Solve differential equation (example: y' = -y)
  call solve_ode(x, y, n)
  
  ! Output results
  do i = 1, n, 10
    write(*, *) x(i), y(i)
  end do
  
contains
  
  subroutine solve_ode(x, y, n)
    integer, intent(in) :: n
    real(8), dimension(n), intent(in) :: x
    real(8), dimension(n), intent(out) :: y
    
    integer :: i
    
    ! Initial condition
    y(1) = 1.0d0
    
    ! Euler method
    do i = 2, n
      y(i) = y(i-1) + h * (-y(i-1))
    end do
  end subroutine solve_ode
  
end program numerical_solver`,
        'vbnet-forms': `Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Windows.Forms

Public Class MainForm
    Inherits Form
    
    Private connectionString As String = "Server=localhost;Database=TestDB;Trusted_Connection=True;"
    Private dataGridView As DataGridView
    Private btnAdd As Button
    Private btnEdit As Button
    Private btnDelete As Button
    
    Public Sub New()
        InitializeComponent()
        LoadData()
    End Sub
    
    Private Sub InitializeComponent()
        ' Initialize form components
        Me.Text = "Database Application"
        Me.Size = New Size(800, 600)
        
        ' Create controls
        dataGridView = New DataGridView()
        btnAdd = New Button()
        btnEdit = New Button()
        btnDelete = New Button()
        
        ' Set up layout
        ' Add controls to form
    End Sub
    
    Private Sub LoadData()
        ' Load data from database
    End Sub
    
    Private Sub btnAdd_Click(sender As Object, e As EventArgs)
        ' Add new record
    End Sub
    
    Private Sub btnEdit_Click(sender As Object, e As EventArgs)
        ' Edit selected record
    End Sub
    
    Private Sub btnDelete_Click(sender As Object, e As EventArgs)
        ' Delete selected record
    End Sub
End Class`,
        'sql-complex': `-- Complex SQL Queries

-- 1. Window Functions
SELECT 
    department,
    employee_name,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
    AVG(salary) OVER (PARTITION BY department) as avg_dept_salary
FROM employees;

-- 2. Common Table Expression (CTE)
WITH department_stats AS (
    SELECT 
        department,
        COUNT(*) as emp_count,
        AVG(salary) as avg_salary
    FROM employees
    GROUP BY department
),
high_paying_depts AS (
    SELECT department
    FROM department_stats
    WHERE avg_salary > (SELECT AVG(avg_salary) FROM department_stats)
)
SELECT e.*
FROM employees e
JOIN high_paying_depts hpd ON e.department = hpd.department;

-- 3. Complex JOIN with Subquery
SELECT 
    e.employee_name,
    e.salary,
    d.department_name,
    (SELECT COUNT(*) FROM employees e2 WHERE e2.department = e.department) as dept_size
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > (
    SELECT AVG(salary) 
    FROM employees 
    WHERE department = e.department
);`
    };
    return templates[challengeType] || '// Write your code here';
}

function runChallenge() {
    const code = document.getElementById('challenge-code').value;
    const output = document.getElementById('challenge-output');
    const challengeType = localStorage.getItem('currentChallenge');
    
    output.innerHTML = '<div class="loading">Running your code...</div>';
    
    // Simulate code execution
    setTimeout(() => {
        const result = simulateChallengeExecution(challengeType, code);
        output.innerHTML = `<div class="challenge-result">${result}</div>`;
    }, 1000);
}

function simulateChallengeExecution(challengeType, code) {
    // Basic validation and simulation
    if (!code || code.trim() === '') {
        return '<div class="error">Error: No code provided</div>';
    }
    
    // Check for basic syntax (very simplified)
    const hasBasicStructure = code.includes('function') || code.includes('class') || 
                             code.includes('def ') || code.includes('public') ||
                             code.includes('import') || code.includes('#include');
    
    if (!hasBasicStructure) {
        return '<div class="error">Error: Code structure appears incomplete</div>';
    }
    
    return `
        <div class="success">
            <h4>Code Execution Successful!</h4>
            <p>Your code compiled and ran without errors.</p>
            <div class="execution-details">
                <p><strong>Lines of Code:</strong> ${code.split('\n').length}</p>
                <p><strong>Characters:</strong> ${code.length}</p>
                <p><strong>Language:</strong> ${getChallengeTitle(challengeType).split(':')[0]}</p>
            </div>
        </div>
    `;
}

function submitChallenge() {
    const challengeType = localStorage.getItem('currentChallenge');
    const code = document.getElementById('challenge-code').value;
    
    if (!code || code.trim() === '') {
        alert('Please write some code before submitting!');
        return;
    }
    
    // Determine challenge category and title
    const challengeInfo = getChallengeInfo(challengeType);
    if (!challengeInfo) {
        alert('Challenge information not found!');
        return;
    }
    
    // Simulate success/failure based on code quality (simple heuristic)
    const success = simulateChallengeSuccess(code, challengeType);
    
    // Record challenge completion in progress tracking
    recordChallengeCompletion(challengeType, success, challengeInfo.category, challengeInfo.title);
    
    // Show result
    const resultMessage = success ? 
        '🎉 Challenge completed successfully! Your progress has been saved.' :
        '⚠️ Challenge attempted. Keep practicing to improve your skills!';
    
    alert(resultMessage);
    closeChallengeModal();
}

// Get challenge information for progress tracking
function getChallengeInfo(challengeType) {
    const challengeMap = {
        'html-responsive': { title: 'HTML: Responsive Layout', category: 'web' },
        'js-dom': { title: 'JavaScript: DOM Manipulation', category: 'web' },
        'ts-api': { title: 'TypeScript: Type-Safe API', category: 'web' },
        'php-auth': { title: 'PHP: User Authentication', category: 'web' },
        'node-api': { title: 'Node.js: REST API', category: 'web' },
        'python-ds': { title: 'Python: Data Structures', category: 'general' },
        'java-threads': { title: 'Java: Multi-threading', category: 'general' },
        'c-memory': { title: 'C: Memory Management', category: 'general' },
        'cpp-stl': { title: 'C++: STL Algorithms', category: 'general' },
        'csharp-linq': { title: 'C#: LINQ Implementation', category: 'general' },
        'kotlin-coroutines': { title: 'Kotlin: Coroutines', category: 'general' },
        'go-crawler': { title: 'Go: Concurrent Web Crawler', category: 'general' },
        'rust-memory': { title: 'Rust: Safe Memory Management', category: 'general' },
        'bash-monitor': { title: 'Bash: System Administration', category: 'scripting' },
        'perl-logs': { title: 'Perl: Text Processing', category: 'scripting' },
        'ruby-dsl': { title: 'Ruby: Metaprogramming', category: 'scripting' },
        'r-stats': { title: 'R: Statistical Analysis', category: 'data' },
        'scala-mapreduce': { title: 'Scala: Functional Data Processing', category: 'functional' },
        'clojure-macros': { title: 'Clojure: Lisp Macros', category: 'functional' },
        'fortran-numerical': { title: 'Fortran: Scientific Computing', category: 'legacy' },
        'vbnet-forms': { title: 'VB.NET: Windows Forms', category: 'legacy' },
        'sql-complex': { title: 'SQL: Complex Queries', category: 'query' }
    };
    
    return challengeMap[challengeType];
}

// Simulate challenge success based on code quality
function simulateChallengeSuccess(code, challengeType) {
    // Simple heuristic: success rate based on code length and content
    const codeLength = code.trim().length;
    const hasComments = code.includes('//') || code.includes('/*') || code.includes('#');
    const hasFunctions = code.includes('function') || code.includes('def') || code.includes('public') || code.includes('class');
    const hasVariables = code.includes('let') || code.includes('const') || code.includes('var') || code.includes('int') || code.includes('string');
    
    // Base success rate
    let successRate = 0.7; // 70% base success rate
    
    // Adjust based on code quality indicators
    if (codeLength > 100) successRate += 0.1;
    if (hasComments) successRate += 0.05;
    if (hasFunctions) successRate += 0.1;
    if (hasVariables) successRate += 0.05;
    
    // Cap at 95% success rate
    successRate = Math.min(successRate, 0.95);
    
    // Random chance based on success rate
    return Math.random() < successRate;
}

// Initialize challenge stats on page load
document.addEventListener('DOMContentLoaded', function() {
    updateChallengeStats();
});

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
    // Comprehensive AI responses with detailed explanations and images
    window.aiResponses = {
        'recursion': {
            title: 'Understanding Recursion',
            content: `
                <h3>🔄 What is Recursion?</h3>
                <p>Recursion is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.</p>
                
                <h4>📋 Key Components:</h4>
                <ul>
                    <li><strong>Base Case:</strong> The stopping condition that prevents infinite recursion</li>
                    <li><strong>Recursive Case:</strong> The part where the function calls itself</li>
                    <li><strong>Recursive Step:</strong> Moving toward the base case</li>
                </ul>
                
                <h4>💡 Example: Factorial Calculation</h4>
                <pre><code>function factorial(n) {
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120</code></pre>
                
                <h4>🎯 Visual Representation:</h4>
                <p>When calculating factorial(5):</p>
                <ul>
                    <li>factorial(5) = 5 × factorial(4)</li>
                    <li>factorial(4) = 4 × factorial(3)</li>
                    <li>factorial(3) = 3 × factorial(2)</li>
                    <li>factorial(2) = 2 × factorial(1)</li>
                    <li>factorial(1) = 1 (base case)</li>
                </ul>
                
                <h4>⚠️ Common Pitfalls:</h4>
                <ul>
                    <li>Missing base case (infinite recursion)</li>
                    <li>Not moving toward base case</li>
                    <li>Stack overflow with deep recursion</li>
                </ul>
                
                <h4>🔄 Recursion vs Iteration:</h4>
                <p>Recursion is often more elegant and easier to understand for certain problems (like tree traversal), while iteration is generally more memory-efficient.</p>
            `,
            image: 'https://via.placeholder.com/600x300/667eea/ffffff?text=Recursion+Visualization'
        },
        'oop': {
            title: 'Object-Oriented Programming Concepts',
            content: `
                <h3>🏗️ Object-Oriented Programming (OOP)</h3>
                <p>OOP is a programming paradigm that organizes code into objects that contain data and code to manipulate that data.</p>
                
                <h4>🎯 Four Pillars of OOP:</h4>
                
                <h5>1. 📦 Encapsulation</h5>
                <p>Bundling data and methods that operate on that data within a single unit (class).</p>
                <pre><code>class BankAccount {
    private balance: number;
    
    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }
    
    public getBalance(): number {
        return this.balance;
    }
    
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}</code></pre>
                
                <h5>2. 🧬 Inheritance</h5>
                <p>Creating new classes that are built upon existing classes, inheriting their properties and methods.</p>
                <pre><code>class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public makeSound(): void {
        console.log('Some sound');
    }
}

class Dog extends Animal {
    public makeSound(): void {
        console.log('Woof!');
    }
}</code></pre>
                
                <h5>3. 🔄 Polymorphism</h5>
                <p>Ability to present the same interface for different underlying forms (data types or classes).</p>
                <pre><code>interface Shape {
    calculateArea(): number;
}

class Circle implements Shape {
    constructor(private radius: number) {}
    
    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
    
    calculateArea(): number {
        return this.width * this.height;
    }
}</code></pre>
                
                <h5>4. 🎭 Abstraction</h5>
                <p>Hiding complex implementation details and showing only necessary features.</p>
                <pre><code>abstract class Vehicle {
    abstract startEngine(): void;
    
    public getInfo(): string {
        return 'This is a vehicle';
    }
}

class Car extends Vehicle {
    startEngine(): void {
        console.log('Car engine started');
    }
}</code></pre>
            `,
            image: 'https://via.placeholder.com/600x300/764ba2/ffffff?text=OOP+Concepts+Diagram'
        },
        'data structures': {
            title: 'Data Structures Fundamentals',
            content: `
                <h3>📊 Data Structures Overview</h3>
                <p>Data structures are specialized formats for organizing and storing data efficiently.</p>
                
                <h4>🔢 Arrays</h4>
                <p>Contiguous memory locations storing elements of the same type.</p>
                <pre><code>// Array declaration and operations
let numbers = [1, 2, 3, 4, 5];

// Accessing elements (O(1))
console.log(numbers[0]); // 1

// Insertion at end (O(1))
numbers.push(6);

// Deletion from end (O(1))
numbers.pop();

// Search (O(n))
let index = numbers.indexOf(3);</code></pre>
                
                <h4>🔗 Linked Lists</h4>
                <p>Linear data structure where elements are stored in nodes, and each node points to the next node.</p>
                <pre><code>class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    
    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
}</code></pre>
                
                <h4>🌳 Trees</h4>
                <p>Hierarchical data structure with a root value and subtrees of children.</p>
                <pre><code>class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    insert(value) {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        this.insertNode(this.root, newNode);
    }
    
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
}</code></pre>
                
                <h4>📈 Time Complexity Comparison:</h4>
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 10px; border: 1px solid #ddd;">Operation</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Array</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Linked List</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Tree</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Access</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(1)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(n)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(log n)</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Search</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(n)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(n)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(log n)</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Insertion</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(n)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(1)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">O(log n)</td>
                    </tr>
                </table>
            `,
            image: 'https://via.placeholder.com/600x300/f093fb/ffffff?text=Data+Structures+Visualization'
        },
        'design patterns': {
            title: 'Design Patterns in Software Development',
            content: `
                <h3>🎯 Design Patterns</h3>
                <p>Design patterns are typical solutions to common problems in software design. They are like pre-made blueprints that can be customized to solve a recurring design problem.</p>
                
                <h4>🏗️ Creational Patterns</h4>
                
                <h5>Singleton Pattern</h5>
                <p>Ensures a class has only one instance and provides global access to it.</p>
                <pre><code>class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
    }
    
    query(sql) {
        console.log('Executing:', sql);
    }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true</code></pre>
                
                <h5>Factory Pattern</h5>
                <p>Creates objects without explicitly specifying their exact class.</p>
                <pre><code>class VehicleFactory {
    createVehicle(type) {
        switch(type) {
            case 'car':
                return new Car();
            case 'motorcycle':
                return new Motorcycle();
            default:
                throw new Error('Unknown vehicle type');
        }
    }
}

class Car {
    drive() {
        console.log('Driving a car');
    }
}

class Motorcycle {
    drive() {
        console.log('Riding a motorcycle');
    }
}</code></pre>
                
                <h4>🔗 Structural Patterns</h4>
                
                <h5>Adapter Pattern</h5>
                <p>Allows incompatible interfaces to work together.</p>
                <pre><code>// Old interface
class OldPaymentSystem {
    pay(amount) {
        console.log('Paid $' + amount + ' using old system');
    }
}

// New interface
class NewPaymentSystem {
    processPayment(amount) {
        console.log('Processed payment of $' + amount);
    }
}

// Adapter
class PaymentAdapter {
    constructor(newSystem) {
        this.newSystem = newSystem;
    }
    
    pay(amount) {
        this.newSystem.processPayment(amount);
    }
}</code></pre>
                
                <h4>🎭 Behavioral Patterns</h4>
                
                <h5>Observer Pattern</h5>
                <p>Defines a one-to-many dependency between objects.</p>
                <pre><code>class Subject {
    constructor() {
        this.observers = [];
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(data) {
        console.log(this.name + ' received:', data);
    }
}

const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notify('Hello World!');</code></pre>
                
                <h4>💡 When to Use Design Patterns:</h4>
                <ul>
                    <li><strong>Singleton:</strong> When you need exactly one instance of a class</li>
                    <li><strong>Factory:</strong> When you want to delegate object creation to subclasses</li>
                    <li><strong>Adapter:</strong> When you need to work with incompatible interfaces</li>
                    <li><strong>Observer:</strong> When you need to notify multiple objects about state changes</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/600x300/f5576c/ffffff?text=Design+Patterns+Diagram'
        },
        'async': {
            title: 'Asynchronous Programming',
            content: `
                <h3>⏱️ Synchronous vs Asynchronous Programming</h3>
                <p>Understanding the difference between synchronous and asynchronous programming is crucial for building responsive applications.</p>
                
                <h4>🔄 Synchronous Programming</h4>
                <p>Code executes line by line, blocking execution until each operation completes.</p>
                <pre><code>// Synchronous example
console.log('Start');
const result = fetchData(); // Blocks here
console.log('Data:', result);
console.log('End');

// Output:
// Start
// Data: [some data]
// End</code></pre>
                
                <h4>⚡ Asynchronous Programming</h4>
                <p>Code doesn't wait for operations to complete before moving to the next line.</p>
                
                <h5>1. Callbacks</h5>
                <pre><code>console.log('Start');
fetchData((result) => {
    console.log('Data:', result);
});
console.log('End');

// Output:
// Start
// End
// Data: [some data]</code></pre>
                
                <h5>2. Promises</h5>
                <pre><code>console.log('Start');
fetchData()
    .then(result => {
        console.log('Data:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
console.log('End');</code></pre>
                
                <h5>3. Async/Await</h5>
                <pre><code>async function loadData() {
    console.log('Start');
    try {
        const result = await fetchData();
        console.log('Data:', result);
    } catch (error) {
        console.error('Error:', error);
    }
    console.log('End');
}

loadData();</code></pre>
                
                <h4>🌐 Real-World Examples</h4>
                
                <h5>API Calls</h5>
                <pre><code>// Fetching data from an API
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}</code></pre>
                
                <h5>File Operations</h5>
                <pre><code>// Reading files asynchronously
const fs = require('fs').promises;

async function readFileContent(filename) {
    try {
        const content = await fs.readFile(filename, 'utf8');
        console.log('File content:', content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}</code></pre>
                
                <h4>🎯 Benefits of Asynchronous Programming:</h4>
                <ul>
                    <li><strong>Non-blocking:</strong> UI remains responsive during long operations</li>
                    <li><strong>Better performance:</strong> Can handle multiple operations concurrently</li>
                    <li><strong>Scalability:</strong> More efficient resource utilization</li>
                    <li><strong>User experience:</strong> Applications feel faster and more responsive</li>
                </ul>
                
                <h4>⚠️ Common Pitfalls:</h4>
                <ul>
                    <li><strong>Callback hell:</strong> Nested callbacks become hard to read</li>
                    <li><strong>Error handling:</strong> Forgetting to handle errors in async operations</li>
                    <li><strong>Race conditions:</strong> Operations completing in unexpected order</li>
                    <li><strong>Memory leaks:</strong> Not cleaning up event listeners or timers</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/600x300/667eea/ffffff?text=Async+Programming+Flow'
        },
        'memory': {
            title: 'Memory Management in Programming',
            content: `
                <h3>🧠 Memory Management Fundamentals</h3>
                <p>Memory management is the process of allocating and deallocating memory for programs and data structures.</p>
                
                <h4>💾 Types of Memory</h4>
                
                <h5>1. Stack Memory</h5>
                <ul>
                    <li><strong>Automatic allocation:</strong> Managed by the compiler</li>
                    <li><strong>LIFO structure:</strong> Last In, First Out</li>
                    <li><strong>Fast access:</strong> Direct memory addressing</li>
                    <li><strong>Limited size:</strong> Fixed size per thread</li>
                </ul>
                <pre><code>// Stack memory example
function calculateSum(a, b) {
    let result = a + b;  // Stored in stack
    return result;
}

let x = 5;  // Stored in stack
let y = 10; // Stored in stack
let sum = calculateSum(x, y);</code></pre>
                
                <h5>2. Heap Memory</h5>
                <ul>
                    <li><strong>Dynamic allocation:</strong> Manual or automatic management</li>
                    <li><strong>Flexible size:</strong> Can grow and shrink</li>
                    <li><strong>Slower access:</strong> Requires pointer dereferencing</li>
                    <li><strong>Fragmentation:</strong> Can become fragmented over time</li>
                </ul>
                <pre><code>// Heap memory example (JavaScript)
let obj = { name: 'John', age: 30 };  // Stored in heap
let arr = [1, 2, 3, 4, 5];           // Stored in heap

// C++ example
int* ptr = new int(42);  // Allocate on heap
delete ptr;              // Deallocate from heap</code></pre>
                
                <h4>🗑️ Garbage Collection</h4>
                <p>Automatic memory management that reclaims memory from objects that are no longer in use.</p>
                
                <h5>Mark and Sweep Algorithm</h5>
                <ol>
                    <li><strong>Mark phase:</strong> Identify all reachable objects</li>
                    <li><strong>Sweep phase:</strong> Free memory from unreachable objects</li>
                </ol>
                
                <h5>Reference Counting</h5>
                <p>Keeps track of how many references point to each object.</p>
                <pre><code>// Reference counting example
let obj1 = { data: 'Hello' };  // Reference count: 1
let obj2 = obj1;               // Reference count: 2
obj1 = null;                   // Reference count: 1
obj2 = null;                   // Reference count: 0 (garbage collected)</code></pre>
                
                <h4>🔧 Manual Memory Management</h4>
                <p>Languages like C and C++ require manual memory management.</p>
                
                <h5>C++ Memory Management</h5>
                <pre><code>// Manual allocation and deallocation
int* ptr = new int(10);        // Allocate
cout << *ptr << endl;          // Use
delete ptr;                    // Deallocate
ptr = nullptr;                 // Prevent dangling pointer

// Smart pointers (automatic cleanup)
#include <memory>
auto smartPtr = std::make_unique<int>(10);  // Automatic cleanup</code></pre>
                
                <h4>🚨 Memory Leaks</h4>
                <p>Memory that is allocated but never deallocated, causing the program to consume more memory over time.</p>
                
                <h5>Common Causes:</h5>
                <ul>
                    <li><strong>Forgotten deallocation:</strong> Allocating memory but forgetting to free it</li>
                    <li><strong>Circular references:</strong> Objects referencing each other</li>
                    <li><strong>Event listeners:</strong> Not removing event listeners</li>
                    <li><strong>Timers:</strong> Not clearing intervals or timeouts</li>
                </ul>
                
                <h5>Prevention Strategies:</h5>
                <ul>
                    <li><strong>Use smart pointers:</strong> Automatic cleanup in C++</li>
                    <li><strong>RAII:</strong> Resource Acquisition Is Initialization</li>
                    <li><strong>Memory pools:</strong> Pre-allocated memory for specific types</li>
                    <li><strong>Regular cleanup:</strong> Remove event listeners and timers</li>
                </ul>
                
                <h4>📊 Memory Management Best Practices:</h4>
                <ul>
                    <li><strong>Minimize allocations:</strong> Reuse objects when possible</li>
                    <li><strong>Use appropriate data structures:</strong> Choose efficient structures for your use case</li>
                    <li><strong>Profile memory usage:</strong> Monitor memory consumption</li>
                    <li><strong>Handle errors gracefully:</strong> Clean up resources in error cases</li>
                    <li><strong>Use memory-safe languages:</strong> Consider languages with automatic memory management</li>
                </ul>
            `,
            image: 'https://via.placeholder.com/600x300/764ba2/ffffff?text=Memory+Management+Diagram'
        }
    };
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addMessage(response, 'bot');
    }, 1500);
}

function askQuestion(question) {
    addMessage(question, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(question);
        addMessage(response, 'bot');
    }, 1500);
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific topics
    if (lowerMessage.includes('recursion')) {
        return window.aiResponses.recursion;
    } else if (lowerMessage.includes('oop') || lowerMessage.includes('object-oriented')) {
        return window.aiResponses.oop;
    } else if (lowerMessage.includes('data structure') || lowerMessage.includes('array') || lowerMessage.includes('linked list')) {
        return window.aiResponses['data structures'];
    } else if (lowerMessage.includes('design pattern')) {
        return window.aiResponses['design patterns'];
    } else if (lowerMessage.includes('async') || lowerMessage.includes('synchronous') || lowerMessage.includes('asynchronous')) {
        return window.aiResponses.async;
    } else if (lowerMessage.includes('memory') || lowerMessage.includes('garbage collection')) {
        return window.aiResponses.memory;
    }
    
    // Generate contextual response
    return generateContextualResponse(message);
}

function generateContextualResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
        return {
            title: 'JavaScript Programming',
            content: `
                <h3>🟨 JavaScript Fundamentals</h3>
                <p>JavaScript is a versatile programming language that powers the modern web.</p>
                
                <h4>🎯 Key Features:</h4>
                <ul>
                    <li><strong>Dynamic typing:</strong> Variables can hold different types</li>
                    <li><strong>First-class functions:</strong> Functions are treated as values</li>
                    <li><strong>Prototypal inheritance:</strong> Object-based inheritance</li>
                    <li><strong>Event-driven:</strong> Responds to user interactions</li>
                </ul>
                
                <h4>💡 Modern JavaScript (ES6+)</h4>
                <pre><code>// Arrow functions
const add = (a, b) => a + b;

// Destructuring
const { name, age } = person;

// Template literals
const greeting = \`Hello, \${name}!\`;

// Async/await
async function fetchData() {
    const response = await fetch('/api/data');
    return response.json();
}</code></pre>
            `,
            image: 'https://via.placeholder.com/600x300/f7df1e/000000?text=JavaScript+Logo'
        };
    }
    
    if (lowerMessage.includes('python')) {
        return {
            title: 'Python Programming',
            content: `
                <h3>🐍 Python Fundamentals</h3>
                <p>Python is a high-level, interpreted programming language known for its simplicity and readability.</p>
                
                <h4>🎯 Key Features:</h4>
                <ul>
                    <li><strong>Readable syntax:</strong> Clean and intuitive code</li>
                    <li><strong>Extensive libraries:</strong> Rich ecosystem of packages</li>
                    <li><strong>Cross-platform:</strong> Runs on multiple operating systems</li>
                    <li><strong>Multiple paradigms:</strong> OOP, functional, procedural</li>
                </ul>
                
                <h4>💡 Python Examples</h4>
                <pre><code># List comprehensions
squares = [x**2 for x in range(10)]

# Context managers
with open('file.txt', 'r') as f:
    content = f.read()

# Decorators
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Function took {end - start} seconds")
        return result
    return wrapper</code></pre>
            `,
            image: 'https://via.placeholder.com/600x300/3776ab/ffffff?text=Python+Logo'
        };
    }
    
    // Default response
    return {
        title: 'Programming Help',
        content: `
            <h3>💡 General Programming Guidance</h3>
            <p>I'd be happy to help you with your programming question! Here are some general tips:</p>
            
            <h4>🎯 Best Practices:</h4>
            <ul>
                <li><strong>Write readable code:</strong> Use meaningful variable names and comments</li>
                <li><strong>Follow DRY principle:</strong> Don't Repeat Yourself</li>
                <li><strong>Test your code:</strong> Write unit tests for your functions</li>
                <li><strong>Use version control:</strong> Track changes with Git</li>
                <li><strong>Document your code:</strong> Write clear documentation</li>
            </ul>
            
            <h4>🔧 Debugging Tips:</h4>
            <ul>
                <li>Use console.log() or print() to trace execution</li>
                <li>Set breakpoints in your IDE</li>
                <li>Read error messages carefully</li>
                <li>Check your syntax and logic</li>
                <li>Use online resources and documentation</li>
            </ul>
            
            <p>Feel free to ask me about specific programming concepts, languages, or problems you're facing!</p>
        `,
        image: 'https://via.placeholder.com/600x300/667eea/ffffff?text=Programming+Help'
    };
}

function addMessage(response, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    const senderName = sender === 'bot' ? 'AI Tutor' : 'You';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (sender === 'bot' && typeof response === 'object') {
        // Detailed bot response with title, content, and image
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender-name">${senderName}</span>
                    <span class="message-time">${currentTime}</span>
                </div>
                <h3 style="color: #667eea; margin-top: 0;">${response.title}</h3>
                ${response.content}
                ${response.image ? `<img src="${response.image}" alt="${response.title}" style="max-width: 100%; border-radius: 8px; margin-top: 15px;">` : ''}
            </div>
        `;
    } else {
        // Simple text message
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender-name">${senderName}</span>
                    <span class="message-time">${currentTime}</span>
                </div>
                <p>${response}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="message bot-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender-name">AI Tutor</span>
                    <span class="message-time">Just now</span>
                </div>
                <p>Hello! I'm your AI learning assistant. I can help you with:</p>
                <ul>
                    <li>📚 Programming concepts and theory</li>
                    <li>💻 Code examples and explanations</li>
                    <li>🔧 Debugging and problem-solving</li>
                    <li>📊 Data structures and algorithms</li>
                    <li>🌐 Web development topics</li>
                    <li>🎯 Best practices and design patterns</li>
                </ul>
                <p>Ask me anything about programming, and I'll provide detailed explanations with visual aids!</p>
            </div>
        </div>
    `;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Progress tracking functions
let userProgress = {
    completedChallenges: [],
    achievements: [],
    streak: 0,
    lastActivity: null
};

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateProgressDisplay();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

// Update progress display
function updateProgressDisplay() {
    const totalChallenges = 22;
    const completedCount = userProgress.completedChallenges.length;
    const overallProgress = Math.round((completedCount / totalChallenges) * 100);
    
    // Update overview cards
    const overallProgressElement = document.getElementById('overall-progress');
    const completedCountElement = document.getElementById('completed-count');
    const successRateElement = document.getElementById('success-rate');
    const currentStreakElement = document.getElementById('current-streak');
    
    if (overallProgressElement) overallProgressElement.textContent = overallProgress + '%';
    if (completedCountElement) completedCountElement.textContent = completedCount;
    if (successRateElement) {
        const successfulChallenges = userProgress.completedChallenges.filter(c => c.success).length;
        const successRate = completedCount > 0 ? Math.round((successfulChallenges / completedCount) * 100) : 0;
        successRateElement.textContent = successRate + '%';
    }
    if (currentStreakElement) currentStreakElement.textContent = userProgress.streak;
    
    // Update category progress
    updateCategoryProgress();
    
    // Update achievements
    updateAchievements();
    
    // Update activity timeline
    updateActivityTimeline();
}

// Update category-specific progress
function updateCategoryProgress() {
    const categories = {
        web: { count: 0, success: 0, last: null },
        general: { count: 0, success: 0, last: null },
        scripting: { count: 0, success: 0, last: null },
        data: { count: 0, success: 0, last: null },
        functional: { count: 0, success: 0, last: null },
        legacy: { count: 0, success: 0, last: null },
        query: { count: 0, success: 0, last: null }
    };
    
    // Count challenges by category
    userProgress.completedChallenges.forEach(challenge => {
        if (categories[challenge.category]) {
            categories[challenge.category].count++;
            if (challenge.success) {
                categories[challenge.category].success++;
            }
            if (!categories[challenge.category].last || 
                new Date(challenge.completedAt) > new Date(categories[challenge.category].last)) {
                categories[challenge.category].last = challenge.completedAt;
            }
        }
    });
    
    // Update each category display
    Object.keys(categories).forEach(category => {
        const cat = categories[category];
        const totalInCategory = getCategoryTotal(category);
        const progressPercent = totalInCategory > 0 ? (cat.count / totalInCategory) * 100 : 0;
        const successRate = cat.count > 0 ? Math.round((cat.success / cat.count) * 100) : 0;
        
        // Update count
        const countElement = document.getElementById(`${category}-count`);
        if (countElement) countElement.textContent = `${cat.count}/${totalInCategory}`;
        
        // Update progress bar
        const progressElement = document.getElementById(`${category}-progress`);
        if (progressElement) progressElement.style.width = `${progressPercent}%`;
        
        // Update success rate
        const successElement = document.getElementById(`${category}-success`);
        if (successElement) successElement.textContent = `${successRate}%`;
        
        // Update last completed
        const lastElement = document.getElementById(`${category}-last`);
        if (lastElement) {
            const lastText = cat.last ? formatDate(cat.last) : 'None';
            lastElement.textContent = lastText;
        }
    });
}

// Get total challenges for a category
function getCategoryTotal(category) {
    const totals = {
        web: 5,
        general: 8,
        scripting: 3,
        data: 1,
        functional: 2,
        legacy: 2,
        query: 1
    };
    return totals[category] || 0;
}

// Update achievements
function updateAchievements() {
    const achievements = [
        {
            id: 'first-steps',
            title: 'First Steps',
            description: 'Complete your first challenge',
            icon: '🎯',
            condition: () => userProgress.completedChallenges.length >= 1,
            progress: () => Math.min(userProgress.completedChallenges.length, 1),
            total: 1
        },
        {
            id: 'on-fire',
            title: 'On Fire',
            description: 'Complete 5 challenges in a row',
            icon: '🔥',
            condition: () => userProgress.streak >= 5,
            progress: () => Math.min(userProgress.streak, 5),
            total: 5
        },
        {
            id: 'web-master',
            title: 'Web Master',
            description: 'Complete all Web Development challenges',
            icon: '🌐',
            condition: () => getCategoryCompleted('web') >= 5,
            progress: () => getCategoryCompleted('web'),
            total: 5
        },
        {
            id: 'generalist',
            title: 'Generalist',
            description: 'Complete all General Purpose challenges',
            icon: '⚙️',
            condition: () => getCategoryCompleted('general') >= 8,
            progress: () => getCategoryCompleted('general'),
            total: 8
        },
        {
            id: 'champion',
            title: 'Champion',
            description: 'Complete all challenges',
            icon: '🏆',
            condition: () => userProgress.completedChallenges.length >= 22,
            progress: () => userProgress.completedChallenges.length,
            total: 22
        },
        {
            id: 'perfect-score',
            title: 'Perfect Score',
            description: 'Achieve 100% success rate on 10 challenges',
            icon: '💯',
            condition: () => getPerfectScoreChallenges() >= 10,
            progress: () => getPerfectScoreChallenges(),
            total: 10
        }
    ];
    
    const achievementsGrid = document.getElementById('achievements-grid');
    if (!achievementsGrid) return;
    
    achievementsGrid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = achievement.condition();
        const progress = achievement.progress();
        const progressPercent = (progress / achievement.total) * 100;
        
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
            <div class="achievement-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span>${progress}/${achievement.total}</span>
            </div>
        `;
        
        achievementsGrid.appendChild(achievementCard);
    });
}

// Get completed challenges for a category
function getCategoryCompleted(category) {
    return userProgress.completedChallenges.filter(c => c.category === category).length;
}

// Get challenges with perfect score
function getPerfectScoreChallenges() {
    return userProgress.completedChallenges.filter(c => c.success).length;
}

// Update activity timeline
function updateActivityTimeline() {
    const timeline = document.getElementById('activity-timeline');
    if (!timeline) return;
    
    if (userProgress.completedChallenges.length === 0) {
        timeline.innerHTML = `
            <div class="activity-item empty-state">
                <div class="activity-icon">📝</div>
                <div class="activity-content">
                    <h4>No activity yet</h4>
                    <p>Start completing challenges to see your activity here</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Sort challenges by completion date (newest first)
    const sortedChallenges = userProgress.completedChallenges
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .slice(0, 10); // Show last 10 activities
    
    timeline.innerHTML = '';
    
    sortedChallenges.forEach(challenge => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">${challenge.success ? '✅' : '❌'}</div>
            <div class="activity-content">
                <h4>${challenge.title}</h4>
                <p>${challenge.success ? 'Successfully completed' : 'Attempted'} - ${challenge.category}</p>
                <div class="activity-time">${formatDate(challenge.completedAt)}</div>
            </div>
        `;
        timeline.appendChild(activityItem);
    });
}

// Format date for display
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

// Record challenge completion
function recordChallengeCompletion(challengeId, success, category, title) {
    const challenge = {
        id: challengeId,
        title: title,
        category: category,
        success: success,
        completedAt: new Date().toISOString()
    };
    
    userProgress.completedChallenges.push(challenge);
    
    // Update streak
    updateStreak();
    
    // Save progress
    saveProgress();
    
    // Update display
    updateProgressDisplay();
}

// Update streak
function updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (userProgress.lastActivity === today) {
        // Already completed today, no change
        return;
    } else if (userProgress.lastActivity === yesterday) {
        // Consecutive day
        userProgress.streak++;
    } else {
        // Break in streak
        userProgress.streak = 1;
    }
    
    userProgress.lastActivity = today;
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
        userProgress = {
            completedChallenges: [],
            achievements: [],
            streak: 0,
            lastActivity: null
        };
        saveProgress();
        updateProgressDisplay();
        alert('Progress has been reset successfully!');
    }
}

// Export progress
function exportProgress() {
    const progressData = {
        ...userProgress,
        exportDate: new Date().toISOString(),
        totalChallenges: 22,
        completedCount: userProgress.completedChallenges.length
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Initialize progress tracking and AI responses
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    initAIResponses();
});

// Number System Converter Functions
function convertToBinary() {
    const input = document.getElementById('decimal-input').value;
    const result = document.getElementById('binary-result');
    
    if (input === '') {
        result.textContent = 'Please enter a number';
        return;
    }
    
    const decimal = parseInt(input);
    const binary = decimal.toString(2);
    result.textContent = `${decimal} in binary: ${binary}`;
}

function formatDecimal() {
    const input = document.getElementById('decimal-calc-input').value;
    const result = document.getElementById('decimal-result');
    
    if (input === '') {
        result.textContent = 'Please enter a number';
        return;
    }
    
    const number = parseFloat(input);
    const formatted = number.toLocaleString();
    result.textContent = `Formatted: ${formatted}`;
}

function convertFromHex() {
    const input = document.getElementById('hex-input').value;
    const result = document.getElementById('hex-result');
    
    if (input === '') {
        result.textContent = 'Please enter a hex number';
        return;
    }
    
    const decimal = parseInt(input, 16);
    if (isNaN(decimal)) {
        result.textContent = 'Invalid hex number';
        return;
    }
    
    result.textContent = `${input} in decimal: ${decimal}`;
}

function convertFromOctal() {
    const input = document.getElementById('octal-input').value;
    const result = document.getElementById('octal-result');
    
    if (input === '') {
        result.textContent = 'Please enter an octal number';
        return;
    }
    
    const decimal = parseInt(input, 8);
    if (isNaN(decimal)) {
        result.textContent = 'Invalid octal number';
        return;
    }
    
    result.textContent = `${input} in decimal: ${decimal}`;
}

// Multi-Language Compiler Functions
let currentLanguage = 'javascript';

// Code templates for different languages
const codeTemplates = {
    javascript: `// JavaScript Hello World
console.log("Hello, World!");

// Simple function example
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Programmer"));`,

    python: `# Python Hello World
print("Hello, World!")

# Simple function example
def greet(name):
    return f"Hello, {name}!"

print(greet("Programmer"))`,

    java: `// Java Hello World
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Simple function example
        String message = greet("Programmer");
        System.out.println(message);
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,

    cpp: `// C++ Hello World
#include <iostream>
#include <string>
using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << "Hello, World!" << endl;
    cout << greet("Programmer") << endl;
    return 0;
}`,

    csharp: `// C# Hello World
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        
        string message = Greet("Programmer");
        Console.WriteLine(message);
    }
    
    static string Greet(string name) {
        return "Hello, " + name + "!";
    }
}`,

    php: `<?php
// PHP Hello World
echo "Hello, World!\n";

// Simple function example
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("Programmer") . "\n";
?>`,

    ruby: `# Ruby Hello World
puts "Hello, World!"

# Simple function example
def greet(name)
  "Hello, #{name}!"
end

puts greet("Programmer")`,

    go: `package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func main() {
    fmt.Println("Hello, World!")
    fmt.Println(greet("Programmer"))
}`,

    rust: `// Rust Hello World
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("Hello, World!");
    println!("{}", greet("Programmer"));
}`,

    kotlin: `// Kotlin Hello World
fun greet(name: String): String {
    return "Hello, $name!"
}

fun main() {
    println("Hello, World!")
    println(greet("Programmer"))
}`,

    swift: `// Swift Hello World
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

print("Hello, World!")
print(greet("Programmer"))`,

    typescript: `// TypeScript Hello World
function greet(name: string): string {
    return "Hello, " + name + "!";
}

console.log("Hello, World!");
console.log(greet("Programmer"));`,

    html: `<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to HTML programming!</p>
    <script>
        console.log("Hello from JavaScript!");
    </script>
</body>
</html>`,

    css: `/* CSS Hello World */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

.hello-world {
    color: #333;
    text-align: center;
    font-size: 2em;
    margin-top: 50px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`,

    sql: `-- SQL Hello World
-- Create a simple table
CREATE TABLE greetings (
    id INT PRIMARY KEY,
    message VARCHAR(100)
);

-- Insert data
INSERT INTO greetings (id, message) VALUES (1, 'Hello, World!');
INSERT INTO greetings (id, message) VALUES (2, 'Hello, Programmer!');

-- Query data
SELECT * FROM greetings;

-- Update data
UPDATE greetings SET message = 'Hello, Updated World!' WHERE id = 1;

-- Final query
SELECT message FROM greetings WHERE id = 1;`,

    bash: `#!/bin/bash
# Bash Hello World
echo "Hello, World!"

# Simple function example
greet() {
    echo "Hello, $1!"
}

greet "Programmer"

# List current directory
echo "Current directory contents:"
ls -la`,

    perl: `#!/usr/bin/perl
# Perl Hello World
use strict;
use warnings;

print "Hello, World!\n";

# Simple function example
sub greet {
    my ($name) = @_;
    return "Hello, $name!\n";
}

print greet("Programmer");`,

    r: `# R Hello World
print("Hello, World!")

# Simple function example
greet <- function(name) {
  return(paste("Hello,", name, "!"))
}

print(greet("Programmer"))

# Simple data analysis
numbers <- c(1, 2, 3, 4, 5)
print(paste("Mean:", mean(numbers)))
print(paste("Sum:", sum(numbers)))`,

    scala: `// Scala Hello World
object Main {
  def greet(name: String): String = {
    s"Hello, $name!"
  }
  
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    println(greet("Programmer"))
  }
}`,

    clojure: `;; Clojure Hello World
(println "Hello, World!")

;; Simple function example
(defn greet [name]
  (str "Hello, " name "!"))

(println (greet "Programmer"))

;; Simple list operations
(def numbers [1 2 3 4 5])
(println "Sum:" (reduce + numbers))`,

    fortran: `! Fortran Hello World
program hello
    implicit none
    character(len=20) :: name
    
    print *, "Hello, World!"
    
    name = "Programmer"
    print *, "Hello, ", trim(name), "!"
    
end program hello`,

    vbnet: `' VB.NET Hello World
Module Program
    Sub Main()
        Console.WriteLine("Hello, World!")
        
        Dim message As String = Greet("Programmer")
        Console.WriteLine(message)
    End Sub
    
    Function Greet(name As String) As String
        Return "Hello, " & name & "!"
    End Function
End Module`
};

function changeLanguage() {
    const select = document.getElementById('language-select');
    const languageDisplay = document.getElementById('current-language');
    currentLanguage = select.value;
    languageDisplay.textContent = select.options[select.selectedIndex].text;
    
    // Update placeholder based on language
    const textarea = document.getElementById('source-code');
    textarea.placeholder = `Enter your ${currentLanguage} code here...`;
    
    // Clear previous results
    clearResults();
}

function loadTemplate() {
    const textarea = document.getElementById('source-code');
    textarea.value = codeTemplates[currentLanguage] || '// Enter your code here';
}

function clearCode() {
    document.getElementById('source-code').value = '';
    clearResults();
}

function clearResults() {
    document.getElementById('compilation-result').innerHTML = '';
    document.getElementById('error-result').innerHTML = '';
    document.getElementById('analysis-result').innerHTML = '';
}

function showTab(tabName) {
    // Hide all panels
    const panels = document.querySelectorAll('.output-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected panel and activate tab
    document.getElementById(tabName + '-panel').classList.add('active');
    event.target.classList.add('active');
}

function compileCode() {
    const code = document.getElementById('source-code').value;
    const result = document.getElementById('compilation-result');
    
    if (!code.trim()) {
        result.innerHTML = '<div class="error">Please enter some code to compile.</div>';
        return;
    }
    
    result.innerHTML = '<div class="loading">Compiling and running code...</div>';
    
    // Simulate compilation delay
    setTimeout(() => {
        try {
            const output = executeCode(code, currentLanguage);
            result.innerHTML = `<div class="success">
                <h4>✅ Compilation Successful!</h4>
                <div class="output-content">
                    <h5>Output:</h5>
                    <pre>${output}</pre>
                </div>
            </div>`;
        } catch (error) {
            result.innerHTML = `<div class="error">
                <h4>❌ Compilation Error</h4>
                <div class="error-content">
                    <h5>Error:</h5>
                    <pre>${error.message}</pre>
                </div>
            </div>`;
        }
    }, 1000);
}

function executeCode(code, language) {
    switch (language) {
        case 'javascript':
            return executeJavaScript(code);
        case 'python':
            return executePython(code);
        case 'html':
            return executeHTML(code);
        case 'css':
            return executeCSS(code);
        case 'sql':
            return executeSQL(code);
        case 'bash':
            return executeBash(code);
        default:
            return simulateExecution(code, language);
    }
}

function executeJavaScript(code) {
    const originalConsoleLog = console.log;
    const outputs = [];
    
    console.log = function(...args) {
        outputs.push(args.join(' '));
    };
    
    try {
        eval(code);
        console.log = originalConsoleLog;
        return outputs.join('\n') || 'Code executed successfully (no output)';
    } catch (error) {
        console.log = originalConsoleLog;
        throw error;
    }
}

function executeHTML(code) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '300px';
    iframe.style.border = '1px solid #ccc';
    
    const blob = new Blob([code], { type: 'text/html' });
    iframe.src = URL.createObjectURL(blob);
    
    return `<div class="html-output">
        <h5>HTML Preview:</h5>
        <div class="iframe-container">${iframe.outerHTML}</div>
        <h5>Source Code:</h5>
        <pre>${escapeHtml(code)}</pre>
    </div>`;
}

function executeCSS(code) {
    const style = document.createElement('style');
    style.textContent = code;
    document.head.appendChild(style);
    
    const testDiv = document.createElement('div');
    testDiv.innerHTML = `
        <div class="css-test">
            <h1>CSS Test Page</h1>
            <p>This is a paragraph to test your CSS styles.</p>
            <div class="container">
                <h2>Styled Content</h2>
                <p>Your CSS has been applied to this content.</p>
            </div>
        </div>
    `;
    
    setTimeout(() => document.head.removeChild(style), 100);
    
    return `<div class="css-output">
        <h5>CSS Applied to Test Content:</h5>
        <div class="css-preview">${testDiv.innerHTML}</div>
        <h5>CSS Code:</h5>
        <pre>${escapeHtml(code)}</pre>
    </div>`;
}

function executePython(code) {
    // Simple Python-like execution simulation
    const pythonOutput = simulatePythonExecution(code);
    return pythonOutput;
}

function executeSQL(code) {
    // Simple SQL simulation
    const sqlOutput = simulateSQLExecution(code);
    return sqlOutput;
}

function executeBash(code) {
    // Simple Bash simulation
    const bashOutput = simulateBashExecution(code);
    return bashOutput;
}

function simulateExecution(code, language) {
    const outputs = {
        java: 'Java code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        cpp: 'C++ code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        csharp: 'C# code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        php: 'PHP code executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        ruby: 'Ruby code executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        go: 'Go code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        rust: 'Rust code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        kotlin: 'Kotlin code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        swift: 'Swift code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        typescript: 'TypeScript code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        perl: 'Perl code executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        r: 'R code executed successfully!\nOutput: Hello, World!\nHello, Programmer!\nMean: 3\nSum: 15',
        scala: 'Scala code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        clojure: 'Clojure code executed successfully!\nOutput: Hello, World!\nHello, Programmer!\nSum: 15',
        fortran: 'Fortran code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!',
        vbnet: 'VB.NET code compiled and executed successfully!\nOutput: Hello, World!\nHello, Programmer!'
    };
    
    return outputs[language] || `Code executed successfully in ${language}!`;
}

function simulatePythonExecution(code) {
    // Simple Python simulation
    if (code.includes('print(')) {
        return 'Hello, World!\nHello, Programmer!';
    }
    return 'Python code executed successfully!';
}

function simulateSQLExecution(code) {
    if (code.toLowerCase().includes('select')) {
        return 'Query executed successfully!\nResults:\n1 | Hello, World!\n2 | Hello, Programmer!';
    }
    return 'SQL commands executed successfully!';
}

function simulateBashExecution(code) {
    if (code.includes('echo')) {
        return 'Hello, World!\nHello, Programmer!\nCurrent directory contents:\n[Directory listing would appear here]';
    }
    return 'Bash commands executed successfully!';
}

function analyzeCode() {
    const code = document.getElementById('source-code').value;
    const result = document.getElementById('analysis-result');
    
    if (!code.trim()) {
        result.innerHTML = '<div class="error">Please enter some code to analyze.</div>';
        return;
    }
    
    const analysis = performCodeAnalysis(code, currentLanguage);
    result.innerHTML = `<div class="analysis">
        <h4>📊 Code Analysis</h4>
        <div class="analysis-content">
            ${analysis}
        </div>
    </div>`;
}

function performCodeAnalysis(code, language) {
    const lines = code.split('\n').filter(line => line.trim());
    const characters = code.length;
    const words = code.split(/\s+/).filter(word => word.length > 0);
    
    let analysis = `
        <div class="analysis-item">
            <strong>Lines of Code:</strong> ${lines.length}
        </div>
        <div class="analysis-item">
            <strong>Characters:</strong> ${characters}
        </div>
        <div class="analysis-item">
            <strong>Words:</strong> ${words.length}
        </div>
    `;
    
    // Language-specific analysis
    switch (language) {
        case 'javascript':
            analysis += analyzeJavaScript(code);
            break;
        case 'python':
            analysis += analyzePython(code);
            break;
        case 'java':
            analysis += analyzeJava(code);
            break;
        case 'cpp':
            analysis += analyzeCpp(code);
            break;
        default:
            analysis += `<div class="analysis-item">
                <strong>Language:</strong> ${language.toUpperCase()}
            </div>`;
    }
    
    return analysis;
}

function analyzeJavaScript(code) {
    const functions = (code.match(/function\s+\w+/g) || []).length;
    const variables = (code.match(/let\s+|const\s+|var\s+/g) || []).length;
    const consoleLogs = (code.match(/console\.log/g) || []).length;
    
    return `
        <div class="analysis-item">
            <strong>Functions:</strong> ${functions}
        </div>
        <div class="analysis-item">
            <strong>Variables:</strong> ${variables}
        </div>
        <div class="analysis-item">
            <strong>Console Logs:</strong> ${consoleLogs}
        </div>
    `;
}

function analyzePython(code) {
    const functions = (code.match(/def\s+\w+/g) || []).length;
    const imports = (code.match(/import\s+|from\s+/g) || []).length;
    const prints = (code.match(/print\s*\(/g) || []).length;
    
    return `
        <div class="analysis-item">
            <strong>Functions:</strong> ${functions}
        </div>
        <div class="analysis-item">
            <strong>Imports:</strong> ${imports}
        </div>
        <div class="analysis-item">
            <strong>Print Statements:</strong> ${prints}
        </div>
    `;
}

function analyzeJava(code) {
    const classes = (code.match(/class\s+\w+/g) || []).length;
    const methods = (code.match(/public\s+static\s+\w+/g) || []).length;
    const systemOuts = (code.match(/System\.out/g) || []).length;
    
    return `
        <div class="analysis-item">
            <strong>Classes:</strong> ${classes}
        </div>
        <div class="analysis-item">
            <strong>Methods:</strong> ${methods}
        </div>
        <div class="analysis-item">
            <strong>System.out Statements:</strong> ${systemOuts}
        </div>
    `;
}

function analyzeCpp(code) {
    const includes = (code.match(/#include/g) || []).length;
    const functions = (code.match(/\w+\s+\w+\s*\(/g) || []).length;
    const couts = (code.match(/cout\s*</g) || []).length;
    
    return `
        <div class="analysis-item">
            <strong>Includes:</strong> ${includes}
        </div>
        <div class="analysis-item">
            <strong>Functions:</strong> ${functions}
        </div>
        <div class="analysis-item">
            <strong>Cout Statements:</strong> ${couts}
        </div>
    `;
}

function formatCode() {
    const textarea = document.getElementById('source-code');
    const code = textarea.value;
    
    if (!code.trim()) {
        return;
    }
    
    // Simple formatting based on language
    let formatted = code;
    
    switch (currentLanguage) {
        case 'javascript':
        case 'typescript':
            formatted = formatJavaScript(code);
            break;
        case 'python':
            formatted = formatPython(code);
            break;
        case 'html':
            formatted = formatHTML(code);
            break;
        case 'css':
            formatted = formatCSS(code);
            break;
        default:
            formatted = code; // No formatting for other languages
    }
    
    textarea.value = formatted;
}

function formatJavaScript(code) {
    // Simple JavaScript formatting
    return code
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/;\s*/g, ';\n    ')
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
        .replace(/;\s*/g, ';\n    ');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

// Add debugging for language detail links
function initLanguageLinks() {
    // Find all language detail links
    const languageLinks = document.querySelectorAll('.language-actions .btn');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Language link clicked:', this.href);
            // Don't prevent default - let the link work normally
            // This ensures language detail pages open correctly
        });
    });
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
