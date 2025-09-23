// ============================================
// DATOS GLOBALES Y CONFIGURACIÓN
// ============================================

// Arreglo de productos
const productos = [
    {
        id: 1,
        codigo: 'LAPTOP001',
        nombre: 'Laptop HP Pavilion',
        descripcion: 'Laptop HP Pavilion 15.6" Intel Core i5, 8GB RAM, 256GB SSD',
        precio: 850000,
        stock: 15,
        stockCritico: 5,
        categoria: 'Laptops',
        imagen: 'https://via.placeholder.com/300x200/3498db/ffffff?text=Laptop+HP'
    },
    {
        id: 2,
        codigo: 'PHONE001',
        nombre: 'iPhone 15',
        descripcion: 'iPhone 15 128GB - Últimos modelos disponibles',
        precio: 1200000,
        stock: 8,
        stockCritico: 3,
        categoria: 'Smartphones',
        imagen: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=iPhone+15'
    },
    {
        id: 3,
        codigo: 'MOUSE001',
        nombre: 'Mouse Gaming RGB',
        descripcion: 'Mouse gaming con iluminación RGB y 7 botones programables',
        precio: 45000,
        stock: 25,
        stockCritico: 10,
        categoria: 'Accesorios',
        imagen: 'https://via.placeholder.com/300x200/27ae60/ffffff?text=Mouse+Gaming'
    },
    {
        id: 4,
        codigo: 'KB001',
        nombre: 'Teclado Mecánico',
        descripcion: 'Teclado mecánico gaming con switches azules',
        precio: 120000,
        stock: 12,
        stockCritico: 4,
        categoria: 'Accesorios',
        imagen: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=Teclado'
    },
    {
        id: 5,
        codigo: 'MON001',
        nombre: 'Monitor 24" Full HD',
        descripcion: 'Monitor LED 24 pulgadas Full HD 1920x1080',
        precio: 280000,
        stock: 6,
        stockCritico: 2,
        categoria: 'Monitores',
        imagen: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Monitor+24'
    },
    {
        id: 6,
        codigo: 'TAB001',
        nombre: 'Tablet Samsung',
        descripcion: 'Tablet Samsung Galaxy Tab A8 10.5" 64GB',
        precio: 350000,
        stock: 10,
        stockCritico: 3,
        categoria: 'Tablets',
        imagen: 'https://via.placeholder.com/300x200/34495e/ffffff?text=Tablet'
    }
];

// Arreglo de regiones y comunas
const regionesYComunas = {
    "Metropolitana": ["Santiago", "Las Condes", "Providencia", "Ñuñoa", "La Florida", "Maipú", "Pudahuel"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Limache", "San Antonio"],
    "Bio Bío": ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel", "San Pedro de la Paz"],
    "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Victoria"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"]
};

// Usuarios registrados (simulación)
let usuarios = [
    {
        run: '12345678K',
        nombre: 'Juan',
        apellidos: 'Pérez González',
        email: 'juan.perez@duoc.cl',
        fechaNacimiento: '1990-01-15',
        tipo: 'Cliente',
        region: 'Metropolitana',
        comuna: 'Santiago',
        direccion: 'Av. Libertador 1234'
    }
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// ============================================
// FUNCIONES GENERALES
// ============================================

// Función para formatear precios
function formatearPrecio(precio) {
    return '$' + precio.toLocaleString('es-CL');
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        cartCount.textContent = totalItems;
    }
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// ============================================
// FUNCIONES DE PRODUCTOS
// ============================================

// Función para mostrar productos
function mostrarProductos(productosAMostrar = productos, containerId = 'featuredProducts') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    productosAMostrar.forEach(producto => {
        const productoHTML = `
            <div class="product-card" onclick="irADetalle(${producto.id})">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${producto.nombre}</div>
                    <div class="product-price">${formatearPrecio(producto.precio)}</div>
                    <button class="btn-add-cart" onclick="event.stopPropagation(); agregarAlCarrito(${producto.id})">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += productoHTML;
    });
}

// Función para ir al detalle del producto
function irADetalle(id) {
    localStorage.setItem('productoDetalle', id);
    window.location.href = 'detalle-producto.html';
}

// Función para agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad++;
        } else {
            alert('No hay suficiente stock disponible');
            return;
        }
    } else {
        if (producto.stock > 0) {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            });
        } else {
            alert('Producto agotado');
            return;
        }
    }
    
    guardarCarrito();
    alert(`${producto.nombre} agregado al carrito`);
}

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

// Validar RUN chileno
function validarRUN(run) {
    if (!/^[0-9]+[0-9kK]$/.test(run)) {
        return false;
    }
    
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();
    
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();
    
    return dv === dvCalculado;
}

// Validar email
function validarEmail(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.endsWith(dominio));
}

// Función para mostrar errores
function mostrarError(inputId, mensaje) {
    const input = document.getElementById(inputId);
    const errorDiv = input.nextElementSibling;
    
    input.classList.add('error');
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = mensaje;
        errorDiv.classList.add('show');
    }
}

// Función para limpiar errores
function limpiarError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = input.nextElementSibling;
    
    input.classList.remove('error');
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.classList.remove('show');
    }
}

// ============================================
// VALIDACIONES DE FORMULARIOS
// ============================================

// Validar formulario de registro/usuario
function validarFormularioUsuario(formData) {
    let esValido = true;
    
    // Validar RUN
    if (!formData.run) {
        mostrarError('run', 'El RUN es requerido');
        esValido = false;
    } else if (formData.run.length < 7 || formData.run.length > 9) {
        mostrarError('run', 'El RUN debe tener entre 7 y 9 caracteres');
        esValido = false;
    } else if (!validarRUN(formData.run)) {
        mostrarError('run', 'RUN inválido');
        esValido = false;
    } else {
        limpiarError('run');
    }
    
    // Validar nombre
    if (!formData.nombre) {
        mostrarError('nombre', 'El nombre es requerido');
        esValido = false;
    } else if (formData.nombre.length > 50) {
        mostrarError('nombre', 'El nombre no puede exceder 50 caracteres');
        esValido = false;
    } else {
        limpiarError('nombre');
    }
    
    // Validar apellidos
    if (!formData.apellidos) {
        mostrarError('apellidos', 'Los apellidos son requeridos');
        esValido = false;
    } else if (formData.apellidos.length > 100) {
        mostrarError('apellidos', 'Los apellidos no pueden exceder 100 caracteres');
        esValido = false;
    } else {
        limpiarError('apellidos');
    }
    
    // Validar email
    if (!formData.email) {
        mostrarError('email', 'El email es requerido');
        esValido = false;
    } else if (formData.email.length > 100) {
        mostrarError('email', 'El email no puede exceder 100 caracteres');
        esValido = false;
    } else if (!validarEmail(formData.email)) {
        mostrarError('email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        esValido = false;
    } else {
        limpiarError('email');
    }
    
    // Validar dirección
    if (!formData.direccion) {
        mostrarError('direccion', 'La dirección es requerida');
        esValido = false;
    } else if (formData.direccion.length > 300) {
        mostrarError('direccion', 'La dirección no puede exceder 300 caracteres');
        esValido = false;
    } else {
        limpiarError('direccion');
    }
    
    return esValido;
}

// Validar formulario de login
function validarFormularioLogin(formData) {
    let esValido = true;
    
    // Validar email
    if (!formData.email) {
        mostrarError('email', 'El email es requerido');
        esValido = false;
    } else if (formData.email.length > 100) {
        mostrarError('email', 'El email no puede exceder 100 caracteres');
        esValido = false;
    } else if (!validarEmail(formData.email)) {
        mostrarError('email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        esValido = false;
    } else {
        limpiarError('email');
    }
    
    // Validar contraseña
    if (!formData.password) {
        mostrarError('password', 'La contraseña es requerida');
        esValido = false;
    } else if (formData.password.length < 4 || formData.password.length > 10) {
        mostrarError('password', 'La contraseña debe tener entre 4 y 10 caracteres');
        esValido = false;
    } else {
        limpiarError('password');
    }
    
    return esValido;
}

// Validar formulario de contacto
function validarFormularioContacto(formData) {
    let esValido = true;
    
    // Validar nombre
    if (!formData.nombre) {
        mostrarError('nombre', 'El nombre es requerido');
        esValido = false;
    } else if (formData.nombre.length > 100) {
        mostrarError('nombre', 'El nombre no puede exceder 100 caracteres');
        esValido = false;
    } else {
        limpiarError('nombre');
    }
    
    // Validar email (opcional pero debe ser válido si se proporciona)
    if (formData.email && formData.email.length > 100) {
        mostrarError('email', 'El email no puede exceder 100 caracteres');
        esValido = false;
    } else if (formData.email && !validarEmail(formData.email)) {
        mostrarError('email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        esValido = false;
    } else {
        limpiarError('email');
    }
    
    // Validar comentario
    if (!formData.comentario) {
        mostrarError('comentario', 'El comentario es requerido');
        esValido = false;
    } else if (formData.comentario.length > 500) {
        mostrarError('comentario', 'El comentario no puede exceder 500 caracteres');
        esValido = false;
    } else {
        limpiarError('comentario');
    }
    
    return esValido;
}

// Validar formulario de producto
function validarFormularioProducto(formData) {
    let esValido = true;
    
    // Validar código
    if (!formData.codigo) {
        mostrarError('codigo', 'El código es requerido');
        esValido = false;
    } else if (formData.codigo.length < 3) {
        mostrarError('codigo', 'El código debe tener al menos 3 caracteres');
        esValido = false;
    } else {
        limpiarError('codigo');
    }
    
    // Validar nombre
    if (!formData.nombre) {
        mostrarError('nombre', 'El nombre es requerido');
        esValido = false;
    } else if (formData.nombre.length > 100) {
        mostrarError('nombre', 'El nombre no puede exceder 100 caracteres');
        esValido = false;
    } else {
        limpiarError('nombre');
    }
    
    // Validar descripción (opcional)
    if (formData.descripcion && formData.descripcion.length > 500) {
        mostrarError('descripcion', 'La descripción no puede exceder 500 caracteres');
        esValido = false;
    } else {
        limpiarError('descripcion');
    }
    
    // Validar precio
    if (!formData.precio) {
        mostrarError('precio', 'El precio es requerido');
        esValido = false;
    } else if (formData.precio < 0) {
        mostrarError('precio', 'El precio no puede ser negativo');
        esValido = false;
    } else {
        limpiarError('precio');
    }
    
    // Validar stock
    if (!formData.stock && formData.stock !== 0) {
        mostrarError('stock', 'El stock es requerido');
        esValido = false;
    } else if (formData.stock < 0) {
        mostrarError('stock', 'El stock no puede ser negativo');
        esValido = false;
    } else if (!Number.isInteger(Number(formData.stock))) {
        mostrarError('stock', 'El stock debe ser un número entero');
        esValido = false;
    } else {
        limpiarError('stock');
    }
    
    // Validar stock crítico (opcional)
    if (formData.stockCritico && formData.stockCritico < 0) {
        mostrarError('stockCritico', 'El stock crítico no puede ser negativo');
        esValido = false;
    } else if (formData.stockCritico && !Number.isInteger(Number(formData.stockCritico))) {
        mostrarError('stockCritico', 'El stock crítico debe ser un número entero');
        esValido = false;
    } else {
        limpiarError('stockCritico');
    }
    
    // Validar categoría
    if (!formData.categoria) {
        mostrarError('categoria', 'La categoría es requerida');
        esValido = false;
    } else {
        limpiarError('categoria');
    }
    
    return esValido;
}

// ============================================
// FUNCIONES PARA REGIONES Y COMUNAS
// ============================================

function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    if (!selectRegion) return;
    
    selectRegion.innerHTML = '<option value="">Seleccionar Región</option>';
    Object.keys(regionesYComunas).forEach(region => {
        selectRegion.innerHTML += `<option value="${region}">${region}</option>`;
    });
}

function cargarComunas(region) {
    const selectComuna = document.getElementById('comuna');
    if (!selectComuna || !region) return;
    
    selectComuna.innerHTML = '<option value="">Seleccionar Comuna</option>';
    if (regionesYComunas[region]) {
        regionesYComunas[region].forEach(comuna => {
            selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
        });
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito al cargar la página
    actualizarContadorCarrito();
    
    // Mostrar productos en la página principal
    if (document.getElementById('featuredProducts')) {
        mostrarProductos(productos.slice(0, 4)); // Solo primeros 4 productos
    }
    
    // Mostrar todos los productos en la página de productos
    if (document.getElementById('productosContainer')) {
        mostrarProductos(productos, 'productosContainer');
    }
    
    // Cargar regiones al cargar la página
    cargarRegiones();
    
    // Event listener para cambio de región
    const selectRegion = document.getElementById('region');
    if (selectRegion) {
        selectRegion.addEventListener('change', function() {
            cargarComunas(this.value);
        });
    }
    
    // Form de registro/usuario
    const formUsuario = document.getElementById('formUsuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                run: document.getElementById('run').value,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                email: document.getElementById('email').value,
                fechaNacimiento: document.getElementById('fechaNacimiento')?.value,
                tipo: document.getElementById('tipo')?.value || 'Cliente',
                region: document.getElementById('region').value,
                comuna: document.getElementById('comuna').value,
                direccion: document.getElementById('direccion').value
            };
            
            if (validarFormularioUsuario(formData)) {
                // Simular guardado
                usuarios.push(formData);
                alert('Usuario registrado exitosamente');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Form de login
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            if (validarFormularioLogin(formData)) {
                // Simular autenticación
                const usuario = usuarios.find(u => u.email === formData.email);
                if (usuario) {
                    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
                    if (usuario.tipo === 'Administrador' || usuario.tipo === 'Vendedor') {
                        window.location.href = 'admin/index.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    alert('Usuario no encontrado. Revisa tus credenciales.');
                }
            }
        });
    }
    
    // Form de contacto
    const formContacto = document.getElementById('formContacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                comentario: document.getElementById('comentario').value
            };
            
            if (validarFormularioContacto(formData)) {
                alert('Mensaje enviado exitosamente. Te contactaremos pronto.');
                formContacto.reset();
            }
        });
    }
    
    // Form de producto (admin)
    const formProducto = document.getElementById('formProducto');
    if (formProducto) {
        formProducto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                codigo: document.getElementById('codigo').value,
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                precio: parseFloat(document.getElementById('precio').value),
                stock: parseInt(document.getElementById('stock').value),
                stockCritico: document.getElementById('stockCritico').value ? parseInt(document.getElementById('stockCritico').value) : null,
                categoria: document.getElementById('categoria').value
            };
            
            if (validarFormularioProducto(formData)) {
                // Generar nuevo ID
                const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
                
                // Crear nuevo producto
                const nuevoProducto = {
                    id: nuevoId,
                    ...formData,
                    imagen: 'https://via.placeholder.com/300x200/3498db/ffffff?text=' + encodeURIComponent(formData.nombre)
                };
                
                productos.push(nuevoProducto);
                alert('Producto guardado exitosamente');
                window.location.href = 'productos.html';
            }
        });
    }
});

// ============================================
// FUNCIONES PARA PÁGINAS ESPECÍFICAS
// ============================================

// Función para cargar detalle del producto
function cargarDetalleProducto() {
    const productoId = localStorage.getItem('productoDetalle');
    if (!productoId) {
        window.location.href = 'productos.html';
        return;
    }
    
    const producto = productos.find(p => p.id === parseInt(productoId));
    if (!producto) {
        window.location.href = 'productos.html';
        return;
    }
    
    // Actualizar el DOM con los datos del producto
    document.getElementById('productoNombre').textContent = producto.nombre;
    document.getElementById('productoImagen').src = producto.imagen;
    document.getElementById('productoImagen').alt = producto.nombre;
    document.getElementById('productoDescripcion').textContent = producto.descripcion;
    document.getElementById('productoPrecio').textContent = formatearPrecio(producto.precio);
    document.getElementById('productoStock').textContent = `Stock disponible: ${producto.stock}`;
    
    // Configurar botón de agregar al carrito
    const btnAgregar = document.getElementById('btnAgregarCarrito');
    btnAgregar.onclick = () => agregarAlCarrito(producto.id);
}

// Función para mostrar carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carritoContainer');
    if (!carritoContainer) return;
    
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }
    
    let carritoHTML = '<div class="carrito-items">';
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        carritoHTML += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>Precio: ${formatearPrecio(item.precio)}</p>
                    <div class="cantidad-controls">
                        <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span>Cantidad: ${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                    <p>Subtotal: ${formatearPrecio(subtotal)}</p>
                    <button onclick="eliminarDelCarrito(${item.id})" class="btn-danger btn-sm">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    carritoHTML += `
        </div>
        <div class="carrito-total">
            <h3>Total: ${formatearPrecio(total)}</h3>
            <button class="btn-primary" onclick="procesarCompra()">Procesar Compra</button>
        </div>
    `;
    
    carritoContainer.innerHTML = carritoHTML;
}

// Función para cambiar cantidad en el carrito
function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    const producto = productos.find(p => p.id === id);
    
    if (!item || !producto) return;
    
    const nuevaCantidad = item.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
    } else if (nuevaCantidad <= producto.stock) {
        item.cantidad = nuevaCantidad;
        guardarCarrito();
        mostrarCarrito();
    } else {
        alert('No hay suficiente stock disponible');
    }
}

// Función para eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

// Función para procesar compra
function procesarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Simular procesamiento de compra
    alert('Compra procesada exitosamente. ¡Gracias por tu compra!');
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

// ============================================
// FUNCIONES PARA ADMIN
// ============================================

// Función para mostrar lista de productos en admin
function mostrarProductosAdmin() {
    const tbody = document.querySelector('#tablaProductos tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    productos.forEach(producto => {
        const stockClase = producto.stock <= (producto.stockCritico || 0) ? 'text-danger' : '';
        const fila = `
            <tr>
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${formatearPrecio(producto.precio)}</td>
                <td class="${stockClase}">${producto.stock}</td>
                <td>${producto.categoria}</td>
                <td>
                    <button class="btn-warning btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
                    <button class="btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

// Función para mostrar lista de usuarios en admin
function mostrarUsuariosAdmin() {
    const tbody = document.querySelector('#tablaUsuarios tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    usuarios.forEach((usuario, index) => {
        const fila = `
            <tr>
                <td>${usuario.run}</td>
                <td>${usuario.nombre} ${usuario.apellidos}</td>
                <td>${usuario.email}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.region}, ${usuario.comuna}</td>
                <td>
                    <button class="btn-warning btn-sm" onclick="editarUsuario(${index})">Editar</button>
                    <button class="btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

// Funciones para manejo de productos y usuarios (placeholders)
function editarProducto(id) {
    localStorage.setItem('productoEditar', id);
    window.location.href = 'editar-producto.html';
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        const index = productos.findIndex(p => p.id === id);
        if (index > -1) {
            productos.splice(index, 1);
            mostrarProductosAdmin();
            alert('Producto eliminado exitosamente');
        }
    }
}

function editarUsuario(index) {
    localStorage.setItem('usuarioEditar', index);
    window.location.href = 'editar-usuario.html';
}

function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        usuarios.splice(index, 1);
        mostrarUsuariosAdmin();
        alert('Usuario eliminado exitosamente');
    }
}