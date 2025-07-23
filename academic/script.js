/**
 * SEVAA Academic Research Portal - Interactive Features
 * Academic-focused JavaScript for research data visualization and interactions
 */

// Academic Research Data
const researchData = {
    metrics: {
        researchAreas: 4,
        districts: 2,
        studies: 5,
        participants: 850
    },
    
    findings: {
        education: {
            improvement: 40,
            metric: "literacy rate improvement",
            status: "ongoing"
        },
        livelihood: {
            improvement: 25,
            metric: "income increase",
            status: "evaluation"
        },
        health: {
            improvement: 60,
            metric: "healthcare awareness",
            status: "completed"
        },
        environment: {
            improvement: 85,
            metric: "sapling survival rate",
            status: "monitoring"
        }
    },
    
    publications: [
        {
            year: 2024,
            type: "Research Report",
            title: "Community-Based Learning Centers: A Participatory Evaluation",
            citations: 12
        },
        {
            year: 2024,
            type: "Conference Paper",
            title: "Sustainable Livelihood Interventions: Economic and Environmental Co-benefits",
            citations: 8
        },
        {
            year: 2023,
            type: "Policy Brief",
            title: "Mobile Health Camps: Policy Recommendations for Rural Healthcare",
            citations: 15
        }
    ]
};

// Academic Functionality Class
class AcademicPortal {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupAccessibility();
    }
    
    init() {
        this.updateMetrics();
        this.initSmoothScrolling();
        this.setupNavigationHighlight();
        this.initDataVisualization();
        this.setupCitationGenerator();
    }
    
    // Update Research Metrics with Animation
    updateMetrics() {
        const metrics = document.querySelectorAll('.metric-number, .data-number');
        
        metrics.forEach(metric => {
            const finalValue = parseInt(metric.textContent.replace(/\D/g, ''));
            if (finalValue) {
                this.animateCounter(metric, 0, finalValue, 2000);
            }
        });
    }
    
    // Counter Animation for Academic Metrics
    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            // Format numbers for academic presentation
            const formatted = this.formatAcademicNumber(Math.floor(current));
            element.textContent = formatted;
        }, 16);
    }
    
    // Format numbers for academic display
    formatAcademicNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // Smooth Scrolling for Academic Navigation
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL for academic referencing
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // Navigation Highlight for Research Sections
    setupNavigationHighlight() {
        const sections = document.querySelectorAll('.paper-section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section link
                    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Data Visualization for Research Findings
    initDataVisualization() {
        this.createProgressBars();
        this.setupInteractiveMetrics();
        this.initResearchTimeline();
    }
    
    // Create Progress Bars for Research Findings
    createProgressBars() {
        const findings = document.querySelectorAll('.finding-item');
        
        findings.forEach((finding, index) => {
            const progress = document.createElement('div');
            progress.className = 'research-progress';
            progress.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" data-progress="0"></div>
                </div>
                <span class="progress-label">Impact Measurement</span>
            `;
            
            finding.appendChild(progress);
            
            // Animate progress based on research data
            setTimeout(() => {
                const fillElement = progress.querySelector('.progress-fill');
                const progressValue = this.getProgressValue(index);
                fillElement.style.width = progressValue + '%';
                fillElement.setAttribute('data-progress', progressValue);
            }, 500 + (index * 200));
        });
    }
    
    // Get progress value based on research findings
    getProgressValue(index) {
        const values = [75, 60, 80, 85]; // Based on research impact
        return values[index] || 50;
    }
    
    // Interactive Metrics with Hover Effects
    setupInteractiveMetrics() {
        const metricCards = document.querySelectorAll('.metric, .data-card');
        
        metricCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.showMetricDetails(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.hideMetricDetails(card);
            });
        });
    }
    
    showMetricDetails(card) {
        const tooltip = document.createElement('div');
        tooltip.className = 'metric-tooltip';
        tooltip.innerHTML = this.getMetricTooltip(card);
        
        card.appendChild(tooltip);
        
        // Position tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(-10px)';
        }, 10);
    }
    
    hideMetricDetails(card) {
        const tooltip = card.querySelector('.metric-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    getMetricTooltip(card) {
        const label = card.querySelector('.metric-label, .data-label');
        if (!label) return '';
        
        const tooltips = {
            'Research Areas': 'Four interconnected domains: Education, Livelihood, Community Health, and Environmental Sustainability',
            'Research Districts': 'Primary research locations: Purulia and Paschim Burdwan districts in West Bengal',
            'Ongoing Studies': 'Active longitudinal research projects with community partnerships',
            'Research Participants': 'Community members actively engaged in participatory research studies'
        };
        
        return tooltips[label.textContent] || 'Research metric with ongoing data collection';
    }
    
    // Research Timeline Visualization
    initResearchTimeline() {
        const timelineContainer = document.querySelector('.research-timeline');
        if (!timelineContainer) return;
        
        const timeline = this.createTimelineHTML();
        timelineContainer.innerHTML = timeline;
        
        // Animate timeline items
        setTimeout(() => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 200);
            });
        }, 500);
    }
    
    createTimelineHTML() {
        return `
            <div class="timeline-line"></div>
            <div class="timeline-item" data-year="2023">
                <div class="timeline-content">
                    <h4>Research Foundation</h4>
                    <p>Established methodological framework and community partnerships</p>
                </div>
            </div>
            <div class="timeline-item" data-year="2024">
                <div class="timeline-content">
                    <h4>Data Collection Phase</h4>
                    <p>Implemented comprehensive research studies across four thrust areas</p>
                </div>
            </div>
            <div class="timeline-item" data-year="2025">
                <div class="timeline-content">
                    <h4>Forest School Launch</h4>
                    <p>Planned launch of Tilka Murmu SEVAA Vano Vidyalay research initiative</p>
                </div>
            </div>
        `;
    }
    
    // Citation Generator for Academic Use
    setupCitationGenerator() {
        const citationBtn = document.querySelector('.generate-citation');
        if (citationBtn) {
            citationBtn.addEventListener('click', () => {
                this.generateCitation();
            });
        }
        
        // Auto-generate citation on page load
        this.updateCitationInfo();
    }
    
    generateCitation() {
        const currentYear = new Date().getFullYear();
        const citation = `SEVAA Research Institute. (${currentYear}). Community-Based Social Intervention: An Evidence-Based Approach to Rural Development. Retrieved from ${window.location.href}`;
        
        // Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(citation).then(() => {
                this.showNotification('Citation copied to clipboard');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = citation;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Citation copied to clipboard');
        }
    }
    
    updateCitationInfo() {
        const citationElement = document.querySelector('.citation');
        if (citationElement) {
            const currentYear = new Date().getFullYear();
            citationElement.innerHTML = citationElement.innerHTML.replace(/\d{4}/, currentYear);
        }
    }
    
    // Academic Search Functionality
    setupAcademicSearch() {
        const searchInput = document.querySelector('.academic-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.performAcademicSearch(query);
        });
    }
    
    performAcademicSearch(query) {
        const searchableElements = document.querySelectorAll('h2, h3, h4, p, li');
        let results = [];
        
        searchableElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(query)) {
                results.push({
                    element: element,
                    section: this.findParentSection(element),
                    content: element.textContent.substring(0, 100) + '...'
                });
            }
        });
        
        this.displaySearchResults(results);
    }
    
    findParentSection(element) {
        let parent = element.parentElement;
        while (parent && !parent.classList.contains('paper-section')) {
            parent = parent.parentElement;
        }
        return parent ? parent.querySelector('.section-title').textContent : 'Unknown Section';
    }
    
    // Event Listeners Setup
    setupEventListeners() {
        // Research Area Card Interactions
        const researchCards = document.querySelectorAll('.research-area-card');
        researchCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showResearchDetails(card);
            });
        });
        
        // Method Card Interactions
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightMethodology(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetMethodology(card);
            });
        });
        
        // Publication Interactions
        const publications = document.querySelectorAll('.publication-item');
        publications.forEach(pub => {
            pub.addEventListener('click', () => {
                this.showPublicationDetails(pub);
            });
        });
        
        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
        
        // Window Resize Handler
        window.addEventListener('resize', () => {
            this.handleResponsiveUpdates();
        });
    }
    
    // Show Research Details Modal
    showResearchDetails(card) {
        const title = card.querySelector('.area-title').textContent;
        const content = card.querySelector('.area-content').innerHTML;
        
        const modal = this.createModal(title, content);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'academic-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        [closeBtn, overlay].forEach(element => {
            element.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        });
        
        return modal;
    }
    
    // Initialize Animations
    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const animatedElements = document.querySelectorAll('.method-card, .research-area-card, .finding-item, .publication-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    // Accessibility Features
    setupAccessibility() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#abstract';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Keyboard focus management
        this.setupFocusManagement();
        
        // Screen reader announcements
        this.setupScreenReaderSupport();
    }
    
    setupFocusManagement() {
        const focusableElements = document.querySelectorAll('a, button, input, [tabindex]');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.setAttribute('data-focused', 'true');
            });
            
            element.addEventListener('blur', () => {
                element.removeAttribute('data-focused');
            });
        });
    }
    
    setupScreenReaderSupport() {
        // Add ARIA labels to important sections
        const sections = document.querySelectorAll('.paper-section');
        sections.forEach((section, index) => {
            section.setAttribute('aria-label', `Research section ${index + 1}`);
        });
        
        // Add live region for dynamic updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }
    
    // Utility Functions
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'academic-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    handleKeyboardNavigation(e) {
        // Academic keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'c':
                    if (e.shiftKey) {
                        e.preventDefault();
                        this.generateCitation();
                    }
                    break;
                case 'f':
                    e.preventDefault();
                    this.focusSearchInput();
                    break;
            }
        }
    }
    
    handleResponsiveUpdates() {
        // Update visualizations on resize
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateDataVisualization();
        }, 250);
    }
    
    updateDataVisualization() {
        // Recalculate and update any responsive data visualizations
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
}

// Academic Portal Styles (injected via JavaScript for dynamic functionality)
const academicStyles = `
    .skip-to-content {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-navy);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
    }
    
    .skip-to-content:focus {
        top: 6px;
    }
    
    .research-progress {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--gray-200);
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: var(--gray-200);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--academic-green), var(--accent-blue));
        width: 0%;
        transition: width 1s ease-out;
        border-radius: 4px;
    }
    
    .progress-label {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-top: 0.25rem;
        display: block;
    }
    
    .metric-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: var(--primary-navy);
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 100;
        max-width: 200px;
        white-space: normal;
        text-align: center;
    }
    
    .metric-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--primary-navy);
    }
    
    .academic-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .academic-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(30, 58, 95, 0.8);
        backdrop-filter: blur(4px);
    }
    
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
    }
    
    .modal-body {
        padding: 1rem;
    }
    
    .academic-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--academic-green);
        color: white;
        padding: 1rem;
        border-radius: 4px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .academic-notification.show {
        transform: translateX(0);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    nav a.active {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    
    [data-focused="true"] {
        outline: 2px solid var(--accent-blue);
        outline-offset: 2px;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = academicStyles;
document.head.appendChild(styleSheet);

// Initialize Academic Portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AcademicPortal();
});

// Export for external use (if needed for testing or extension)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AcademicPortal, researchData };
}