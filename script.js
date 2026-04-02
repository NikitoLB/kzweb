// ====== NAVEGACIÓN ======
function navigate(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('flex');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('flex');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.dataset.target === sectionId) {
            link.classList.add('active-link');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== BASE DE DATOS DE PRODUCTOS ======
const productsData = {
    'vip': {
        title: 'VIP',
        priceHtml: '<span class="line-through text-gray-500 mr-2 text-lg">AR$8000.00</span> AR$4000.00',
        images:['img/vip.jpg', 'img/vip2.jpg', 'img/vip3.jpg'], // Puedes añadir las rutas de tus fotos extra
        features:[
            '• Ropa personalizada.',
            '• Prioridad en la fila.',
            '• Abrir ticket para activar adjuntando steamid.',
            '• Por 30 días.'
        ]
    },
    'vehiculo2': {
        title: 'Vehículo VIP 2',
        priceHtml: 'AR$18000.00',
        images:['img/vehiculo2.jpg', 'img/vehiculo2_b.jpg', 'img/vehiculo2_c.jpg'],
        features:[
            '• Vehículo blindado.',
            '• Almacenamiento extra grande.',
            '• Velocidad mejorada en terrenos difíciles.',
            '• Permanente hasta el próximo wipe.'
        ]
    },
    'vehiculo1': {
        title: 'Vehículo VIP 1',
        priceHtml: 'AR$12000.00',
        images:['img/vehiculo1.jpg', 'img/vehiculo1_b.jpg'],
        features:[
            '• Vehículo civil en perfectas condiciones.',
            '• Incluye repuestos básicos (ruedas, batería).',
            '• Permanente hasta el próximo wipe.'
        ]
    },
    'base3': {
        title: 'Base 3',
        priceHtml: 'AR$30000.00',
        images:['img/base3.jpg', 'img/base3_b.jpg', 'img/base3_c.jpg'],
        features:[
            '• Estructura de gran tamaño.',
            '• Muros reforzados Nivel 3.',
            '• Doble portón de seguridad.',
            '• Cajas de almacenamiento integradas.'
        ]
    },
    'base2': {
        title: 'Base 2',
        priceHtml: 'AR$20000.00',
        images:['img/base2.jpg', 'img/base2_b.jpg'],
        features:[
            '• Estructura mediana.',
            '• Muros metálicos Nivel 2.',
            '• Ideal para clanes pequeños.'
        ]
    },
    'base1': {
        title: 'Base 1',
        priceHtml: 'AR$15000.00',
        images:['img/base1.jpg', 'img/base1_b.jpg'],
        features:[
            '• Base inicial de madera reforzada.',
            '• Excelente ubicación estratégica a elección.',
            '• Portón básico con candado de código.'
        ]
    }
};

// ====== LÓGICA DE GALERÍA Y CARGA DE PRODUCTOS ======
let currentImageArray =[];
let currentImageIndex = 0;

function viewProduct(productId) {
    const product = productsData[productId];
    if (!product) return;

    // Cargar info de texto
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('product-price').innerHTML = product.priceHtml;
    
    // Cargar características
    const featuresContainer = document.getElementById('product-features');
    featuresContainer.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerText = feature;
        featuresContainer.appendChild(li);
    });

    // Iniciar galería
    currentImageArray = product.images;
    currentImageIndex = 0;
    
    updateMainImage();
    buildThumbnails();

    // Cambiar de vista a "producto"
    navigate('producto');
}

function updateMainImage() {
    const mainImg = document.getElementById('main-product-image');
    
    // Resetear animación (truco para que se repita la clase)
    mainImg.classList.remove('fade-anim');
    void mainImg.offsetWidth; // Trigger reflow
    mainImg.classList.add('fade-anim');
    
    // Cambiar la fuente de la imagen (Si no existe la imagen fallback, carga la 1ra)
    mainImg.src = currentImageArray[currentImageIndex] || 'img/bg.jpg'; 
    
    // Actualizar estilos de las miniaturas
    const thumbs = document.querySelectorAll('.thumb-img');
    thumbs.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.remove('opacity-50', 'border-white/10');
            thumb.classList.add('opacity-100', 'border-white/50');
        } else {
            thumb.classList.add('opacity-50', 'border-white/10');
            thumb.classList.remove('opacity-100', 'border-white/50');
        }
    });
}

function buildThumbnails() {
    const thumbContainer = document.getElementById('product-thumbnails');
    thumbContainer.innerHTML = '';

    currentImageArray.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        // Clases de Tailwind
        img.className = 'thumb-img w-full h-20 object-cover rounded border cursor-pointer transition hover:opacity-100';
        
        // Estilos para la miniatura activa vs inactiva
        if (index === 0) {
            img.classList.add('opacity-100', 'border-white/50');
        } else {
            img.classList.add('opacity-50', 'border-white/10');
        }

        img.onclick = () => {
            currentImageIndex = index;
            updateMainImage();
        };

        thumbContainer.appendChild(img);
    });
}

function nextImage() {
    if (currentImageArray.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
    updateMainImage();
}

function prevImage() {
    if (currentImageArray.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
    updateMainImage();
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    navigate('inicio');
});
