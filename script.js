// Funcionalidad de la Tienda (Filtros y Búsqueda)
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const storeItems = document.querySelectorAll('.store-item');
    const searchInput = document.getElementById('store-search');

    // Función para filtrar por categoría
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar estilos de los botones
            filterBtns.forEach(b => {
                b.classList.remove('bg-white', 'text-black');
                b.classList.add('text-gray-300');
            });
            btn.classList.add('bg-white', 'text-black');
            btn.classList.remove('text-gray-300');

            const filterValue = btn.getAttribute('data-filter');

            // Filtrar items
            storeItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Función de búsqueda
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            // Forzamos el botón "TODOS" al buscar
            document.querySelector('[data-filter="all"]').click();

            storeItems.forEach(item => {
                const title = item.querySelector('.product-title').innerText.toLowerCase();
                if (title.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// Función básica para navegación entre secciones (si no la tenías)
function navigate(targetId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.add('hidden'));
    
    const targetSection = document.getElementById(targetId);
    if(targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('flex');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active-link'));
    
    const activeBtn = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if(activeBtn) {
        activeBtn.classList.add('active-link');
    }
}
