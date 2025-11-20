
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function loadProductDetails() {
    if (!productId || !products[productId]) {
        window.location.href = 'index.html';
        return;
    }

    const product = products[productId];

    document.title = `${product.name} - ASIREM`;

    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="index.html">HOME</a> / <a href="index.html">PERFUMES</a> / ${product.name}`;
    }

    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = `${product.name} - Vista principal`;
    }

    const carouselThumbnails = document.querySelectorAll('.carousel-thumbnail img');
    carouselThumbnails.forEach((img, index) => {
        if (product.carouselImages[index]) {
            img.src = product.carouselImages[index];
            img.alt = `Vista ${index + 1}`;
        }
    });

    const productTitle = document.querySelector('.product-title');
    if (productTitle) {
        productTitle.textContent = product.name;
    }

    const productDescription = document.querySelector('.product-description');
    if (productDescription) {
        productDescription.innerHTML = product.description.map(p => `<p>${p}</p>`).join('');
    }

    const specsList = document.querySelector('.specs-list');
    if (specsList) {
        specsList.innerHTML = `
            <li>
                <span class="spec-label">Top Notes</span>
                <span class="spec-value">${product.topNotes}</span>
            </li>
            <li>
                <span class="spec-label">Heart Notes</span>
                <span class="spec-value">${product.heartNotes}</span>
            </li>
            <li>
                <span class="spec-label">Base Notes</span>
                <span class="spec-value">${product.baseNotes}</span>
            </li>
            <li>
                <span class="spec-label">Olfactory Family</span>
                <span class="spec-value">${product.olfactoryFamily}</span>
            </li>
            <li>
                <span class="spec-label">Concentration</span>
                <span class="spec-value">${product.concentration}</span>
            </li>
            <li>
                <span class="spec-label">Volume</span>
                <span class="spec-value">${product.volume}</span>
            </li>
        `;
    }

    const currentPrice = document.querySelector('.current-price');
    const previousPrice = document.querySelector('.previous-price');
    if (currentPrice) {
        currentPrice.textContent = product.price;
    }
    if (previousPrice) {
        previousPrice.textContent = product.previousPrice;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProductDetails);
} else {
    loadProductDetails();
}
