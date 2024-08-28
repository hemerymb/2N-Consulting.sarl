document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById("presentationBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    var dropdown = document.getElementById("dropdownContent");
    
    // Toggle la visibilité de la liste déroulante
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
});
