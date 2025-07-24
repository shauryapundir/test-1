// =================== Product Data ====================
const products = [
  {
  id: 1001,
  name: "Blue & Red Dungaree",
  category: ["newborn", "baby"],
  gender: ["boys", "girls"],
  type: "dungaree",
  sizes: ["M", "L", "XL", "XXL", "3XL"],
  mrp: 1861,
  price: 1116,
  colors: ["Blue", "Red"],
  images: ["dress/1001.jpg", "dress/1002.jpg"],
  colorImages: {
    Blue: "dress/1001.jpg",
    Red: "dress/1002.jpg"
  }
},
  {
    id: 1002,
    name: "White-Pink Dungaree",
    category: ["newborn", "baby"],
    gender: ["girls"],
    type: "dungaree",
    sizes: ["0-3 months", "3-6 months"],
    mrp: 1566,
    price: 780,
    images: ["dress/1003.jpg"]
  },
  {
    id: 1003,
    name: "White-Grey Dungaree",
    category: ["newborn", "baby"],
    gender: ["boys"],
    type: "dungaree",
    sizes: ["3 months", "6 months", "9 months"],
    mrp: 1156,
    price: 775,
    images: ["dress/1004.jpg"]
  },
  {
    id: 1004,
    name: "White-Blue Dungaree",
    category: ["newborn", "baby"],
    gender: ["boys"],
    type: "dungaree",
    sizes: ["0-3 months", "3-6 months", "6-9 months"],
    mrp: 1079,
    price: 723,
    images: ["dress/1005.jpg"]
  },
  {
    id: 1005,
    name: "White-Skyblue Dungaree",
    category: ["newborn", "baby"],
    gender: ["girls"],
    type: "dungaree",
    sizes: ["0-3 months", "3-6 months", "6-12 months", "12-18 months"],
    mrp: 1341,
    price: 805,
    images: ["dress/1006.jpg"]
  },
  {
    id: 1006,
    name: "White-Pink Dungaree (Short Size)",
    category: ["newborn", "baby"],
    gender: ["girls"],
    type: "dungaree",
    sizes: ["0-3 months", "3-6 months"],
    mrp: 1079,
    price: 723,
    images: ["dress/1007.jpg"]
  },
  {
    id: 1007,
    name: "Blue Romper",
    category: ["newborn", "baby"],
    gender: ["boys", "girls"],
    type: "romper",
    sizes: ["0-3 months"],
    mrp: 499,
    price: 499,
    images: ["dress/1008.jpg"]
  },
  {
    id: 1008,
    name: "Skyblue-White Dungaree",
    category: ["newborn", "baby"],
    gender: ["boys"],
    type: "dungaree",
    sizes: ["0-3 months"],
    mrp: 1199,
    price: 1199,
    images: ["dress/1009.jpg"]
  },
  {
    id: 1009,
    name: "Baby Pink Romper",
    category: ["newborn", "baby"],
    gender: ["girls"],
    type: "romper",
    sizes: ["0-3 months", "3-6 months", "12-18 months"],
    mrp: 1133,
    price: 680,
    images: ["dress/1010.jpg"]
  },
  {
    id: 1010,
    name: "White-Green Romper",
    category: ["baby"],
    gender: ["boys"],
    type: "romper",
    sizes: ["12-18 months", "18-24 months"],
    mrp: 499,
    price: 499,
    images: ["dress/1011.jpg"]
  },
  {
    id: 1011,
    name: "White Romper (1Y+)",
    category: ["baby"],
    gender: ["girls"],
    type: "romper",
    sizes: ["1 year", "1.5 years"],
    mrp: 999,
    price: 999,
    images: ["dress/1012.jpg"]
  },
  {
    id: 1012,
    name: "Yellow-White Dungaree",
    category: ["newborn", "baby"],
    gender: ["girls"],
    type: "dungaree",
    sizes: ["3 months", "6 months"],
    mrp: 1002,
    price: 671,
    images: ["dress/1013.jpg"]
  },
  {
    id: 1013,
    name: "Orange & Yellow Romper",
    category: ["baby"],
    gender: ["girls"],
    type: "romper",
    sizes: ["3-6 months", "6-9 months", "9-12 months"],
    mrp: 2500,
    price: 2500,
    colors: ["Orange", "Yellow"],
    images: ["dress/1014.jpg", "dress/1015.jpg"]
  }
];


window.allProducts = products;

// =================== Product Rendering ====================
function renderShopProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  const selectedGenders = Array.from(document.querySelectorAll(".filter-gender:checked")).map(cb => cb.value);
  const selectedTypes = Array.from(document.querySelectorAll(".filter-type:checked")).map(cb => cb.value);
  const minPrice = parseFloat(document.getElementById("min-price")?.value || 0);
  const maxPrice = parseFloat(document.getElementById("max-price")?.value || Infinity);

  const filtered = products.filter(p => {
    const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(p.gender);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.type);
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesGender && matchesType && matchesPrice;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-products col-12 text-center my-5">
        <span class="material-icons fs-1 text-muted">search_off</span>
        <p class="mt-2">No matching products found.<br>Try changing your filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isWishlisted = wishlist.includes(product.id);

    return `
      <div class="product text-center col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
        <div class="position-relative" style="cursor:pointer" onclick="location.href='product.html?id=${product.id}'">
          <img class="img-fluid mb-2" src="${product.images[0]}" alt="${product.name}">
          <span class="material-icons position-absolute top-0 end-0 p-2 text-${isWishlisted ? 'danger' : 'muted'}"
            onclick="event.stopPropagation(); toggleWishlist(${product.id})">
            ${isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </div>
        <div class="star mb-1">
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star_border</span>
        </div>
        <h5 class="p-name">${product.name}</h5>
        <div class="d-flex flex-column align-items-center">
  ${product.mrp && product.mrp > product.price
     ? `<small class="text-muted text-decoration-line-through">₹${product.mrp}</small>`
     : ""}
  <span class="fw-semibold text-danger">₹${product.price}</span>
</div>

        <button class="buy-btn" onclick="location.href='product.html?id=${product.id}'">Buy Now</button>
      </div>
    `;
  }).join("");
}

function renderTypeFilters() {
  const typeContainer = document.getElementById("filter-type-options");
  if (!typeContainer) return;

  const uniqueTypes = [...new Set(products.map(p => p.type))];
  typeContainer.innerHTML = uniqueTypes.map(type => `
    <div><input type="checkbox" class="filter-type" value="${type}" /> ${type.charAt(0).toUpperCase() + type.slice(1)}</div>
  `).join("");
}

function setupSidebarFilters() {
  const filterBtn = document.getElementById("apply-filters");
  if (filterBtn) {
    filterBtn.addEventListener("click", renderShopProducts);
  }
}

// =================== Wishlist Logic ====================
function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId); // remove
  } else {
    wishlist.push(productId); // add
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderShopProducts();
  updateWishlistCount();
}

function updateWishlistCount() {
  const count = (JSON.parse(localStorage.getItem("wishlist")) || []).length;
  const badge = document.getElementById("wishlist-count");

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

// =================== Live Search Suggestions ====================
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistCount();
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const suggestionBox = document.getElementById("searchSuggestions");

  if (searchBox && suggestionBox) {
    searchBox.addEventListener("input", () => {
      const query = searchBox.value.trim().toLowerCase();
      if (!query) {
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";
        return;
      }

      const matches = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);

      if (matches.length === 0) {
        suggestionBox.innerHTML = "<div class='p-2 text-muted'>No results</div>";
        suggestionBox.style.display = "block";
        return;
      }

      suggestionBox.innerHTML = matches.map(p => `
        <div class="suggestion-item p-2 border-bottom" style="cursor:pointer" onclick="location.href='product.html?id=${p.id}'">
          ${p.name}
        </div>
      `).join("");

      suggestionBox.classList.add("show");
    });

    

    document.addEventListener("click", (e) => {
      if (!suggestionBox.contains(e.target) && e.target !== searchBox) {
        suggestionBox.style.display = "none";
      }
    });
  }

  setupSidebarFilters();
  renderShopProducts();
  renderTypeFilters();
});

fetch("http://localhost:5000/api/products") // Example
