document.addEventListener('DOMContentLoaded', () => {
    // Definimos datos de ejemplo
    const productsData = [
        { id: 1, name: "Laptop Ultraligera", price: 1200, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Laptop", description: "Una laptop de alto rendimiento, ideal para trabajo y entretenimiento. Cuenta con un procesador de última generación y una batería de larga duración." },
        { id: 2, name: "Auriculares Inalámbricos", price: 150, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Auriculares", description: "Auriculares con cancelación de ruido y sonido de alta fidelidad. Perfectos para escuchar música o hacer llamadas sin interrupciones." },
        { id: 3, name: "Smartphone 5G", price: 800, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Smartphone", description: "El smartphone más rápido con conectividad 5G. Captura fotos impresionantes y disfruta de una fluidez inigualable en todas tus aplicaciones." },
        { id: 4, name: "Smartwatch Deportivo", price: 250, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Smartwatch", description: "Monitoriza tus actividades físicas y notificaciones con estilo. Resistente al agua y con una batería que dura toda la semana." },
        { id: 5, name: "Monitor 4K", price: 450, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Monitor", description: "Un monitor con una resolución impresionante para trabajo de diseño, edición de video y gaming. Los colores son vivos y el detalle es nítido." },
        { id: 6, name: "Teclado Mecánico", price: 90, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Teclado", description: "Teclado con switches mecánicos para una respuesta táctil y sonora. Ideal para gamers y programadores." },
        { id: 7, name: "Mouse Gaming", price: 60, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Mouse", description: "Mouse ergonómico con alta precisión. Cuenta con botones programables y luces RGB personalizables." },
        { id: 8, name: "Cámara Web Full HD", price: 75, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Webcam", description: "Cámara web de alta resolución para videoconferencias y streaming. Captura imágenes claras y nítidas incluso con poca luz." }
    ];

    const blogPostsData = [
        { id: 1, title: "Los 5 Gadgets más Esperados de 2025", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+1", text: "Este año promete ser uno de los más emocionantes para la tecnología. Desde autos voladores hasta dispositivos de realidad aumentada, aquí te mostramos los gadgets que están a punto de cambiar el juego. Conoce las características que los hacen únicos y por qué debes tenerlos en tu lista de deseos." },
        { id: 2, title: "Guía para Elegir tu Primera Laptop Gaming", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+2", text: "Adentrarse en el mundo del gaming en PC puede ser intimidante. Te explicamos los componentes clave que debes buscar en una laptop gaming: procesador, tarjeta gráfica, RAM y almacenamiento. Con nuestra guía, estarás listo para jugar tus títulos favoritos sin problemas." },
        { id: 3, title: "El Futuro de la Realidad Virtual", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+3", text: "La realidad virtual ya no es solo para juegos. Desde la educación hasta la medicina, su aplicación está creciendo exponencialmente. Analizamos las tendencias futuras de la RV, incluyendo la integración de la IA y el desarrollo de hardware más ligero y potente." }
    ];

    // Funciones de renderizado (ya definidas en la respuesta anterior)
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

    // Lógica de carga de contenido en páginas específicas
    const pageName = document.body.className;

    if (pageName === 'home-page' || pageName === '') {
        const featuredProductsContainer = document.getElementById('featuredProducts');
        if (featuredProductsContainer) {
            featuredProductsContainer.innerHTML = productsData.slice(0, 4).map(createProductCard).join('');
        }
    }

    if (document.getElementById('allProducts')) {
        const allProductsContainer = document.getElementById('allProducts');
        allProductsContainer.innerHTML = productsData.map(createProductCard).join('');
    }

    if (document.getElementById('blogPosts')) {
        const blogPostsContainer = document.getElementById('blogPosts');
        blogPostsContainer.innerHTML = blogPostsData.map(createBlogPostCard).join('');
    }

    // Lógica para las páginas de detalle
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const blogPostId = urlParams.get('id');

    if (document.getElementById('productTitle') && productId) {
        const product = productsData.find(p => p.id == productId);
        if (product) {
            document.getElementById('productTitle').textContent = product.name;
            document.getElementById('productImage').src = product.image.replace('250x200', '500x400');
            document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('productDescription').textContent = product.description;
        }
    }

    if (document.getElementById('blogPostTitle') && blogPostId) {
        const post = blogPostsData.find(p => p.id == blogPostId);
        if (post) {
            document.getElementById('blogPostTitle').textContent = post.title;
            document.getElementById('blogPostImage').src = post.image.replace('400x250', '800x400');
            document.getElementById('blogPostText').textContent = post.text;
        }
    }

    // Lógica de carrito
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