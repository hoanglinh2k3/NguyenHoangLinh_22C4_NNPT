const API_URL = "https://api.escuelajs.co/api/v1/products";
const PROXY = "https://images.weserv.nl/?url=";

fetch(API_URL)
  .then(res => res.json())
  .then(products => {
    const fixedProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category?.name || "Unknown",
      image: getValidImage(p)
    }));

    renderProducts(fixedProducts);
  })
  .catch(err => console.error(err));

function getValidImage(product) {
  let images = product.images;

  // images đôi khi là string JSON
  if (typeof images === "string") {
    try {
      images = JSON.parse(images);
    } catch {
      images = [];
    }
  }

  if (Array.isArray(images)) {
    for (let img of images) {
      if (img && img.startsWith("http")) {
        return PROXY + encodeURIComponent(img);
      }
    }
  }

  // fallback KHÔNG random – theo ID
  return `https://picsum.photos/seed/product-${product.id}/600/400`;
}

function renderProducts(products) {
  const container = document.getElementById("product-list");

  container.innerHTML = products.map(p => `
    <div class="card">
      <img 
        src="${p.image}"
        alt="${p.title}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/seed/product-${p.id}/600/400'"
      >
      <div class="card-body">
        <h3>${p.title}</h3>
        <div class="price">$${p.price}</div>
        <div class="desc">${p.description}</div>
        <div class="category">${p.category}</div>
      </div>
    </div>
  `).join("");
}
