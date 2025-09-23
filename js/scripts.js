document.addEventListener('DOMContentLoaded', () => {
    // Definimos datos de ejemplo
    const featuredProductsData = [
        { id: 1, name: "Laptop Ultraligera", price: 1200, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Laptop" },
        { id: 2, name: "Auriculares Inalámbricos", price: 150, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Auriculares" },
        { id: 3, name: "Smartphone 5G", price: 800, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Smartphone" },
        { id: 4, name: "Smartwatch Deportivo", price: 250, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Smartwatch" }
    ];

    const allProductsData = [
        ...featuredProductsData,
        { id: 5, name: "Monitor 4K", price: 450, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Monitor" },
        { id: 6, name: "Teclado Mecánico", price: 90, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Teclado" },
        { id: 7, name: "Mouse Gaming", price: 60, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Mouse" },
        { id: 8, name: "Cámara Web Full HD", price: 75, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Webcam" }
    ];

    const blogPostsData = [
        { id: 1, title: "Los 5 Gadgets más Esperados de 2025", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+1" },
        { id: 2, title: "Guía para Elegir tu Primera Laptop Gaming", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+2" },
        { id: 3, title: "El Futuro de la Realidad Virtual", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+3" }
    ];

    // Función para crear el HTML de una tarjeta de producto
    const createProductCard = (product) => {
        return `
            <div class="product-card">
                <a href="detalle-producto.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
            </div>
        `;
    };

    // Función para crear el HTML de una tarjeta de blog
    const createBlogPostCard = (post) => {
        return `
            <div class="blog-post-card">
                <a href="detalle-blog.html?id=${post.id}">
                    <img src="${post.image}" alt="${post.title}">
                </a>
                <h3><a href="detalle-blog.html?id=${post.id}">${post.title}</a></h3>
            </div>
        `;
    };

    // Cargamos productos en la página de inicio
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (featuredProductsContainer) {
        featuredProductsContainer.innerHTML = featuredProductsData.map(createProductCard).join('');
    }

    // Cargamos todos los productos en la página de productos
    const allProductsContainer = document.getElementById('allProducts');
    if (allProductsContainer) {
        allProductsContainer.innerHTML = allProductsData.map(createProductCard).join('');
    }

    // Cargamos posts en la página del blog
    const blogPostsContainer = document.getElementById('blogPosts');
    if (blogPostsContainer) {
        blogPostsContainer.innerHTML = blogPostsData.map(createBlogPostCard).join('');
    }

    // Simulación del carrito de compras
    const cartCountElement = document.getElementById('cartCount');
    let cartCount = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                alert('Producto añadido al carrito!');
            }
        });
    });
});