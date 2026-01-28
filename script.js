// Bước 1: Gọi API
fetch("https://api.escuelajs.co/api/v1/products")
  .then(response => response.json())
  .then(data => {
    // Bước 2: Convert JSON → Object dùng cho UI
    const products = data.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.images[0],
      category: item.category.name
    }));

    // Bước 3: Hiển thị
    renderProducts(products);
  })
  .catch(error => console.error("Lỗi:", error));

// Hàm render UI
function renderProducts(products) {
  const container = document.getElementById("product-list");

  container.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <p class="desc">${product.description}</p>
      <span class="category">${product.category}</span>
    </div>
  `).join("");
}
