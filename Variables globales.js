// Variables globales
let products = [];
let currentProductId = 0;
const adminCredentials = {
    username: 'FamiliaBG',
    password: '1234'
};
let isAdmin = false;
let userCount = 0;
let connectedUsers = new Set();

// Elementos del DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const catalog = document.getElementById('catalog');
const adminPanel = document.getElementById('adminPanel');
const productsGrid = document.getElementById('productsGrid');
const adminProducts = document.getElementById('adminProducts');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const confirmModal = document.getElementById('confirmModal');
const userCounter = document.getElementById('userCounter');

// Inicializar WebSocket para usuarios conectados
const socket = new WebSocket('wss://tu-dominio.com/ws');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'userCount') {
        userCount = data.count;
        userCounter.textContent = userCount;
    }
};

// Funciones principales
function openCatalog() {
    welcomeScreen.style.display = 'none';
    catalog.style.display = 'block';
    updateUserCount();
}

function updateUserCount() {
    const userId = Math.random().toString(36).substr(2, 9);
    connectedUsers.add(userId);
    socket.send(JSON.stringify({
        type: 'userConnect',
        userId: userId
    }));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos iniciales
    loadProducts();
    
    // Eventos de navegación
    document.getElementById('enterButton').addEventListener('click', openCatalog);
    document.getElementById('adminLink').addEventListener('click', toggleAdminForm);
    
    // Eventos de modales
    document.getElementById('closeModal').addEventListener('click', closeProductModal);
    document.getElementById('cancelDelete').addEventListener('click', closeConfirmModal);
    
    // Eventos de carga de imágenes
    document.getElementById('productImages').addEventListener('change', handleImageUpload);
});

// Funciones de carga y visualización
function loadProducts() {
    productsGrid.innerHTML = '';
    adminProducts.innerHTML = '';
    
    products.forEach(product => {
        createProductCard(product, 'productsGrid');
        createProductCard(product, 'adminProducts');
    });
}

function createProductCard(product, containerId) {
    const container = document.getElementById(containerId);
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="product-img">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price}</p>
        </div>
    `;
    
    if (containerId === 'adminProducts') {
        const controls = document.createElement('div');
        controls.className = 'admin-product-controls';
        controls.innerHTML = `
            <button class="btn-delete" data-id="${product.id}">Eliminar</button>
        `;
        productCard.appendChild(controls);
    }
    
    container.appendChild(productCard);
}