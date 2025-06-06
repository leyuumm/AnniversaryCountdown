// Set your anniversary date here (Year, Month (0-11), Day)
const anniversaryDate = new Date(2024, 5, 7, 0, 0, 0, 0); // June 7, 2024, 12:00 AM
const revealDate = new Date(2025, 5, 7, 0, 0, 0, 0); // June 7, 2025, 12:00 AM

function getNextAnniversary() {
    const now = new Date();
    let next = new Date(now.getFullYear(), 5, 12, 12, 0, 0, 0); // June 12, 12:00:00 this year
    if (now > next) {
        next = new Date(now.getFullYear() + 1, 5, 12, 12, 0, 0, 0);
    }
    return next;
}

let celebrationShown = false;

function shouldRevealContent() {
    const now = new Date();
    return now >= revealDate;
}

function updateCountdown() {
    const now = new Date();
    const diff = now - anniversaryDate;

    // Calculate years, months, days, hours, minutes, seconds
    let years = now.getFullYear() - anniversaryDate.getFullYear();
    let months = now.getMonth() - anniversaryDate.getMonth();
    let days = now.getDate() - anniversaryDate.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Reveal content and celebration
    const mainContent = document.getElementById('main-content');
    if (shouldRevealContent()) {
        if (!mainContent.classList.contains('fade-in')) {
            mainContent.classList.remove('hidden-fade');
            setTimeout(() => mainContent.classList.add('fade-in'), 50);
            showCelebration();
        }
    } else {
        mainContent.classList.remove('fade-in');
        mainContent.classList.add('hidden-fade');
    }
}

function showCelebration() {
    const container = document.getElementById('celebration');
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const flower = document.createElement('img');
        flower.src = 'images/carnation.png';
        flower.className = 'firework-flower';
        flower.style.left = Math.random() * 80 + 10 + '%';
        flower.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(flower);
    }
    setTimeout(() => { container.innerHTML = ''; }, 4000);
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial update

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add floating animation to carnation decorations
const carnations = document.querySelectorAll('.carnation-decoration');
carnations.forEach(carnation => {
    setInterval(() => {
        carnation.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px)`;
    }, 50);
}); 