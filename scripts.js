// Sample product data
const products = [
    {
      id: '1',
      name: 'Classic White',
      category: 'Wall Panel',
      color: 'White',
      size: '1220x2440mm',
      price: 45.99,
      description: 'Premium white PVC wall panel with smooth finish, ideal for modern interiors. Easy to clean and maintain with excellent durability.',
      thickness: '8mm',
      fireRating: 'Class B',
      waterResistance: true,
      rating: 4.5
    },
    {
      id: '2',
      name: 'Wood Grain Oak',
      category: 'Wall Panel',
      color: 'Brown',
      size: '1220x2440mm',
      price: 52.99,
      description: 'Realistic oak wood grain pattern, perfect for rustic or traditional decor. Resistant to moisture and termites.',
      thickness: '10mm',
      fireRating: 'Class B',
      waterResistance: true,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Marble Effect',
      category: 'Wall Panel',
      color: 'Gray',
      size: '1220x2440mm',
      price: 58.99,
      description: 'Elegant marble effect panel that adds luxury to any space. Lightweight alternative to real marble.',
      thickness: '9mm',
      fireRating: 'Class A',
      waterResistance: true,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Textured Concrete',
      category: 'Ceiling Panel',
      color: 'Gray',
      size: '600x600mm',
      price: 32.99,
      description: 'Industrial style concrete texture for modern ceiling applications. Easy to install with hidden fixing system.',
      thickness: '6mm',
      fireRating: 'Class A',
      waterResistance: false,
      rating: 4.2
    },
    {
      id: '5',
      name: 'Bamboo Look',
      category: 'Wall Panel',
      color: 'Beige',
      size: '1220x2440mm',
      price: 49.99,
      description: 'Natural bamboo appearance with eco-friendly appeal. Perfect for creating a warm, natural atmosphere.',
      thickness: '8mm',
      fireRating: 'Class B',
      waterResistance: true,
      rating: 4.6
    },
    {
      id: '6',
      name: 'Glossy Black',
      category: 'Wall Panel',
      color: 'Black',
      size: '1220x2440mm',
      price: 54.99,
      description: 'Sleek glossy black finish for contemporary spaces. Creates dramatic visual impact with easy maintenance.',
      thickness: '8mm',
      fireRating: 'Class B',
      waterResistance: true,
      rating: 4.4
    }
  ];
  
  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const colorSelect = document.getElementById('colorSelect');
  const colorPreview = document.getElementById('colorPreview');
  const productModal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalRating = document.getElementById('modalRating');
  const modalDescription = document.getElementById('modalDescription');
  const modalCategory = document.getElementById('modalCategory');
  const modalColor = document.getElementById('modalColor');
  const modalSize = document.getElementById('modalSize');
  const modalThickness = document.getElementById('modalThickness');
  const modalFireRating = document.getElementById('modalFireRating');
  const modalWaterResistance = document.getElementById('modalWaterResistance');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const cartBtn = document.getElementById('cartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const headerCartCount = document.querySelector('.cart-count');
  
  // State
  let currentProduct = null;
  let cart = [];
  
  // Initialize the app
  function init() {
    renderProducts(products);
    setupEventListeners();
  }
  
  // Render products to the grid
  function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
  
    if (productsToRender.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state">
          <p>No products match your filters. Try adjusting your search criteria.</p>
        </div>
      `;
      return;
    }
  
    productsToRender.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'product-card';
      productEl.innerHTML = `
        <div class="product-image">
          <div class="image-placeholder"></div>
        </div>
        <div class="product-details">
          <div class="product-title">
            <h3>${product.name}</h3>
            <span class="product-price">$${product.price.toFixed(2)}</span>
          </div>
          <div class="product-rating">
            ${renderStars(product.rating)}
            <span>(${product.rating})</span>
          </div>
          <p class="product-description">${product.description}</p>
          <div class="product-color">
            <div class="color-indicator" style="background-color: ${product.color.toLowerCase()}"></div>
            <span class="color-text">${product.color} | ${product.size}</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-outline quick-view-btn">Quick View</button>
            <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      `;
  
      // Add event listeners to the buttons in this product
      const quickViewBtn = productEl.querySelector('.quick-view-btn');
      const addToCartBtn = productEl.querySelector('.add-to-cart-btn');
  
      quickViewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showProductModal(product);
      });
  
      addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
      });
  
      // Click on the whole product card
      productEl.addEventListener('click', () => {
        showProductModal(product);
      });
  
      productsGrid.appendChild(productEl);
    });
  }
  
  // Render star rating
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
  
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i === fullStars && hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
  
    return stars;
  }
  
  // Filter products based on search and filters
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    const color = colorSelect.value;
  
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                           product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'All' || product.category === category;
      const matchesColor = color === 'All' || product.color === color;
  
      return matchesSearch && matchesCategory && matchesColor;
    });
  
    renderProducts(filtered);
  }
  
  // Show product modal
  function showProductModal(product) {
    currentProduct = product;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalRating.innerHTML = renderStars(product.rating) + `<span>(${product.rating})</span>`;
    modalDescription.textContent = product.description;
    modalCategory.textContent = product.category;
    modalColor.textContent = product.color;
    modalSize.textContent = product.size;
    modalThickness.textContent = product.thickness;
    modalFireRating.textContent = product.fireRating;
    modalWaterResistance.textContent = product.waterResistance ? 'Yes' : 'No';
  
    productModal.classList.add('active');
  }
  
  // Hide product modal
  function hideProductModal() {
    productModal.classList.remove('active');
  }
  
  // Add product to cart
  function addToCart(product) {
    cart.push(product);
    updateCart();
    showToast(`${product.name} added to cart`);
  }
  
  // Remove product from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  // Update cart UI
  function updateCart() {
    // Update cart count in header
    headerCartCount.textContent = cart.length;
    cartCount.textContent = cart.length;
  
    // Update cart items in sidebar
  }