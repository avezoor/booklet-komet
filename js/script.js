document.addEventListener("DOMContentLoaded", function () {
    // Handle loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        updateThemeIcon(isDark);
        localStorage.setItem('darkMode', isDark);
    });
    
    // Check saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark-mode', savedDarkMode);
    updateThemeIcon(savedDarkMode);
    // Show current date in header
    const currentDateElement = document.getElementById("current-date");
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    currentDateElement.textContent = today.toLocaleDateString('id-ID', options);
    
    // Slide configuration
    const slideFiles = [
        "src/cover.md",
        "pages/p1-gambaran-umum.md",
        "pages/p2-timeline.md",
        "pages/p3-ketentuan.md",
        "pages/p4-benefit.md",
        "pages/p5-divisi.md",
        "pages/p6-pendaftaran.md",
        "pages/p7-contact-person.md",
        "src/launch.md"
    ];

    // Configure marked.js to preserve LaTeX
    const renderer = new marked.Renderer();

    // MathJax is configured in the HTML head for better performance

    // Elements
    const slidesContainer = document.getElementById("slides");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    // State
    let currentSlideIndex = 0;
    let slides = [];

    // Initialize the slider
    async function initSlider() {
        try {
            const markdownPromises = slideFiles.map((file) =>
                fetch(file).then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Failed to load ${file}: ${response.status} ${response.statusText}`
                        );
                    }
                    return response.text();
                })
            );
    
            const markdownContents = await Promise.all(markdownPromises);
    
            markdownContents.forEach((markdown, index) => {
                const slideElement = document.createElement("div");
                slideElement.className = "slide";
                slideElement.innerHTML = marked.parse(markdown);
                slidesContainer.appendChild(slideElement);
                slides.push(slideElement);
            });
    
            slides[0].classList.add("active"); // Aktifkan slide pertama
            document.getElementById("prev").disabled = true; // Nonaktifkan tombol prev
    
            setTimeout(renderMathJax, 100); // Render LaTeX pada slide pertama
        } catch (error) {
            console.error("Error initializing slider:", error);
            slidesContainer.innerHTML = `<div class="error">
                <h2>Error Loading Slides</h2>
                <p>${error.message}</p>
            </div>`;
        }
    }
    

    // Go to a specific slide
    function goToSlide(index, direction = 'next') {
        const oldIndex = currentSlideIndex;
        
        // Validate index
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        // If we're not changing slides, do nothing
        if (oldIndex === index) return;
        
        // Update current index
        currentSlideIndex = index;
        
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove("active"));
        
        // Set direction-specific animation
        if (direction === 'prev') {
            // Coming from right when going to previous slide
            slides[currentSlideIndex].style.animation = 'slideInLeft 0.7s ease forwards';
        } else {
            // Coming from left when going to next slide
            slides[currentSlideIndex].style.animation = 'slideInRight 0.7s ease forwards';
        }
        
        // Add active class to current slide
        slides[currentSlideIndex].classList.add("active");
        
        // Update button states
        prevButton.disabled = currentSlideIndex === 0;
        nextButton.disabled = currentSlideIndex === slides.length - 1;
        
        // Render LaTeX for current slide
        setTimeout(renderMathJax, 300);
    }

    // Render LaTeX formulas using MathJax
    async function renderMathJax() {
        if (window.MathJax?.typesetPromise) {
            try {
                await window.MathJax.typesetPromise();
            } catch (error) {
                console.error("Error rendering LaTeX:", error);
            }
        }
    }

    // Event Listeners
    prevButton.addEventListener("click", () => {
        goToSlide(currentSlideIndex - 1, 'prev');
    });

    nextButton.addEventListener("click", () => {
        goToSlide(currentSlideIndex + 1, 'next');
    });

    // Keyboard navigation
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            goToSlide(currentSlideIndex - 1, 'prev');
        } else if (event.key === "ArrowRight") {
            goToSlide(currentSlideIndex + 1, 'next');
        }
    });

    // Initialize the slider
    initSlider();
});
