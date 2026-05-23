// Main functionality

let userPreferences = {
    style: null,
    color: null,
    vibe: null
};

// DOM Elements
const landingPage = document.getElementById('landing');
const quizContainer = document.getElementById('quiz');
const productsContainer = document.getElementById('products');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const backToQuizBtn = document.getElementById('backToQuizBtn');
const showProductsBtn = document.getElementById('showProductsBtn');
const productModal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');
const preferenceBtns = document.querySelectorAll('.pref-btn');

// Event Listeners
startBtn.addEventListener('click', goToQuiz);
backBtn.addEventListener('click', goToLanding);
backToQuizBtn.addEventListener('click', goToQuiz);
showProductsBtn.addEventListener('click', goToProducts);
modalClose.addEventListener('click', closeModal);

// Preference button interactions
preferenceBtns.forEach(btn => {
    btn.addEventListener('click', selectPreference);
});

// Click outside modal to close
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeModal();
    }
});

// Navigation Functions
function goToLanding() {
    landingPage.style.display = 'flex';
    quizContainer.style.display = 'none';
    productsContainer.style.display = 'none';
    resetPreferences();
}

function goToQuiz() {
    landingPage.style.display = 'none';
    quizContainer.style.display = 'block';
    productsContainer.style.display = 'none';
}

function goToProducts() {
    landingPage.style.display = 'none';
    quizContainer.style.display = 'none';
    productsContainer.style.display = 'block';
    displayProducts();
}

// Preference Selection
function selectPreference(e) {
    const btn = e.currentTarget;
    const type = btn.dataset.type;
    const value = btn.dataset.value;
    
    // Remove previous selection in this category
    document.querySelectorAll(`[data-type="${type}"]`).forEach(b => {
        b.classList.remove('selected');
    });
    
    // Add selection to clicked button
    btn.classList.add('selected');
    
    // Update preferences
    userPreferences[type] = value;
    
    // Check if all preferences are selected
    checkAllPreferencesSelected();
}

function checkAllPreferencesSelected() {
    const allSelected = Object.values(userPreferences).every(val => val !== null);
    showProductsBtn.disabled = !allSelected;
}

function resetPreferences() {
    userPreferences = {
        style: null,
        color: null,
        vibe: null
    };
    preferenceBtns.forEach(btn => btn.classList.remove('selected'));
    showProductsBtn.disabled = true;
}

// Products Display
function displayProducts() {
    const recommendations = getRecommendations(userPreferences);
    const productsGrid = document.getElementById('productsGrid');
    const matchMessage = document.getElementById('matchMessage');
    
    // Create match message
    const styleLabel = capitalizeString(userPreferences.style);
    const colorLabel = capitalizeString(userPreferences.color);
    const vibeLabel = capitalizeString(userPreferences.vibe);
    matchMessage.textContent = `${styleLabel} • ${colorLabel} • ${vibeLabel} — ${recommendations.length} perfect matches found! ✨`;
    
    // Clear grid
    productsGrid.innerHTML = '';
    
    // Create product cards
    recommendations.forEach((product, index) => {
        const card = createProductCard(product);
        card.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
    
    const tagsHTML = product.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    card.innerHTML = `
        <div class="product-image">
            ${product.emoji}
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-tags">
                ${tagsHTML}
            </div>
            <div class="product-footer">
                <span class="product-price">${product.price}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(product));
    
    return card;
}

// Modal Functions
function openModal(product) {
    const tagsHTML = product.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    document.getElementById('modalImage').textContent = product.emoji;
    document.getElementById('modalImage').style.fontSize = '8rem';
    document.getElementById('modalImage').style.display = 'flex';
    document.getElementById('modalImage').style.alignItems = 'center';
    document.getElementById('modalImage').style.justifyContent = 'center';
    document.getElementById('modalImage').style.background = 'linear-gradient(135deg, #FFE6F0, #F0E6FF)';
    document.getElementById('modalImage').style.borderRadius = '15px';
    
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalSize').textContent = product.size;
    document.getElementById('modalTags').innerHTML = tagsHTML;
    
    productModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Utility Functions
function capitalizeString(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});