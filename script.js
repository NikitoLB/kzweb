function navigate(sectionId) {
    // 1. Ocultar todas las secciones
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('flex'); // Removemos flex para que hidden funcione bien
    });

    // 2. Mostrar la sección deseada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('flex'); // Todas las secciones usan flex en Tailwind
    }

    // 3. Actualizar el estilo del Navbar (si es una sección del menú principal)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.dataset.target === sectionId) {
            link.classList.add('active-link');
        }
    });

    // Subir al top de la página al cambiar
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Iniciar en 'inicio' por defecto (por seguridad extra)
document.addEventListener('DOMContentLoaded', () => {
    navigate('inicio');
});
