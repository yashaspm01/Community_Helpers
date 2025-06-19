document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();
    
    // Add event listeners
    setupEventListeners();
    
    // Animate stats on load
    animateStats();
});

function initializeCharts() {
    // Growth Chart
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Community Members',
                    data: [1200, 1450, 1800, 2100, 2350, 2600, 2847],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#007bff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: '#f1f5f9'
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#007bff'
                    }
                }
            }
        });
    }

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Food Distribution', 'Education', 'Healthcare', 'Environment', 'Community Building'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#007bff',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
}

function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically update the chart data
            console.log('Filter changed to:', this.textContent);
        });
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Smooth scroll to section if it exists
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Here you would implement search functionality
            console.log('Searching for:', searchTerm);
        });
    }

    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Here you would show notifications
            console.log('Notifications clicked');
        });
    }

    // Add project button
    const addProjectBtn = document.querySelector('.add-project-btn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            // Here you would open add project modal
            console.log('Add project clicked');
        });
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/[,$]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            // Format the number
            if (finalValue >= 1000000) {
                stat.textContent = (currentValue / 1000000).toFixed(1) + 'M';
            } else if (finalValue >= 1000) {
                stat.textContent = Math.floor(currentValue).toLocaleString();
            } else {
                stat.textContent = Math.floor(currentValue);
            }
            
            // Add currency symbol if original had it
            if (stat.textContent.includes('$')) {
                stat.textContent = '$' + stat.textContent;
            }
        }, 16);
    });
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function updateChartData(chartId, newData) {
    // Function to update chart data dynamically
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.data.datasets[0].data = newData;
        chart.update();
    }
}

// Add smooth scrolling for internal links
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

// Add loading states for async operations
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate random updates to stats
        const statCards = document.querySelectorAll('.stat-content h3');
        statCards.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/[,$]/g, ''));
            const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and 5
            const newValue = Math.max(0, currentValue + change);
            
            if (newValue !== currentValue) {
                stat.textContent = newValue.toLocaleString();
                
                // Add visual feedback for changes
                stat.style.color = change > 0 ? '#10b981' : '#ef4444';
                setTimeout(() => {
                    stat.style.color = '';
                }, 1000);
            }
        });
    }, 30000); // Update every 30 seconds
}

// Initialize real-time updates
// simulateRealTimeUpdates();