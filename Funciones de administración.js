// Funciones de administración
function toggleAdminForm() {
    const adminForm = document.getElementById('adminForm');
    adminForm.style.display = adminForm.style.display === 'block' ? 'none' : 'block';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        isAdmin = true;
        welcomeScreen.style.display = 'none';
        adminPanel.style.display = 'block';
        loadAdminProducts();
    } else {
        alert('Credenciales incorrectas');
    }
}

function logout() {
    isAdmin = false;
    adminPanel.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    adminForm.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    
    if (!name || !price || !description) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: newId,
        name: name,
        price: price,
        description: description,
        images: ['/api/placeholder/800/600', '/api/placeholder/800/600']
    };
    
    products.unshift(newProduct);
    loadProducts();
    alert('Producto agregado correctamente');
    
    // Limpiar formulario
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
}

// Event Listeners
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('addProductButton').addEventListener('click', addProduct);