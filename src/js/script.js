let currentIndex = 0;
let cardsContainer = null;
let cards = [];
let totalCards = 0;
let slideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des éléments du carrousel après le chargement du DOM
    cardsContainer = document.querySelector('.cards');
    cards = document.querySelectorAll('.card');
    totalCards = cards.length;

    if (cardsContainer && cards.length > 0) {
        startCarousel();
        updateCarousel(); // Initialisation de l'état des cartes
    } else {
        console.error('cardsContainer or cards are not found.');
    }

    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
    
            // Vérifier si le lien est interne (commence par '#')
            if (targetHref.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetHref);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.error('Element introuvable :', targetHref);
                }
            }
            // Si le lien est vers la même page avec chemin relatif
            else if (window.location.pathname === new URL(targetHref, window.location.href).pathname) {
                e.preventDefault();
                const targetId = new URL(targetHref, window.location.href).hash;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.error('Element introuvable :', targetId);
                }
            }
            // Sinon, laisser le comportement par défaut (navigation vers une autre page)
        });
    });
    

    document.getElementById("presentationBtn").addEventListener("click", function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut du lien
        var dropdown = document.getElementById("dropdownContent");
        
        // Toggle la visibilité de la liste déroulante
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    const sections = document.querySelectorAll('.hero-section, .about-section, .services, .content1, .conten');
    const options = {
        root: null,
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animation pour les cartes
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseout', () => {
            card.classList.remove('hover');
        });
    });

    // Gestion du slideshow
    showSlides();
});

function moveLeft() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
    updateCarousel();
}

function moveRight() {
    currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}

function updateCarousel() {
    if (cardsContainer && cards.length > 0) {
        cardsContainer.style.transform = `translateX(-${currentIndex * 220}px)`;

        // Gestion de l'effet d'apparition
        cards.forEach((card, index) => {
            card.classList.toggle('show', index === currentIndex);
        });
    } else {
        console.error('cardsContainer or cards are not found.');
    }
}

// Fonction pour faire coulisser automatiquement les cartes
function startCarousel() {
    setInterval(moveRight, 3000); // Déplace à droite toutes les 3 secondes
}

// Animation de la navbar lors du défilement
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Gestion du slideshow avec fade
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.style.display = "none");

    slideIndex = (slideIndex >= slides.length) ? 0 : slideIndex;
    slides[slideIndex].style.display = "block";
    slideIndex++;

    setTimeout(showSlides, 5000); // Change de slide toutes les 5 secondes
}

// Sélection des éléments
const presentationBtn = document.getElementById('presentationBtn');
const dropdownContent = document.getElementById('dropdownContent');

// Fonction pour afficher le dropdown
function showDropdown() {
    dropdownContent.style.display = 'block';
}

// Fonction pour masquer le dropdown
function hideDropdown() {
    dropdownContent.style.display = 'none';
}

// Affiche le dropdown lorsque la souris passe sur le bouton
presentationBtn.addEventListener('mouseover', showDropdown);

// Cache le dropdown lorsque la souris quitte le bouton ou le contenu du dropdown
presentationBtn.addEventListener('mouseout', (event) => {
    if (!dropdownContent.contains(event.relatedTarget)) {
        hideDropdown();
    }
});

// Gère les événements de la liste déroulante
dropdownContent.addEventListener('mouseover', showDropdown);
dropdownContent.addEventListener('mouseout', (event) => {
    if (!presentationBtn.contains(event.relatedTarget)) {
        hideDropdown();
    }
});



