const products = [
    { name: "Laptop", price: 1500, category: "Electronics" },
    { name: "Phone", price: 800, category: "Electronics" },
    { name: "Keyboard", price: 100, category: "Accessories" },
    { name: "Mouse", price: 50, category: "Accessories" },
    { name: "T-Shirt", price: 25, category: "Clothing" },
    { name: "Shoes", price: 80, category: "Clothing" }
];

const productList = document.getElementById("product-list");
const showing = document.getElementById("showing")

function displayProducts(data){
   showing.textContent = `showing: ${data.length}`;
   productList.innerHTML = data.map(product => `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px auto; max-width: 300px; text-align: center;">
            <h3>${product.name}</h3>
            <p>price: $${product.price}</p>
            <p>category: ${product.category}</p>
        </div>
    `).join('');
}
displayProducts(products);

function updateProducts() {
    let result = [...products];

    const searchValue = search.value.toLowerCase().trim();
    const categoryValue = catalog.value;
    const priceValue = price.value;

    result = result.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    if (categoryValue !== "All") {
        result = result.filter(product =>
            product.category === categoryValue
        );
    }

    if (priceValue === "Low->High") {
        result.sort((a, b) => a.price - b.price);
    }

    if (priceValue === "High->Low") {
        result.sort((a, b) => b.price - a.price);
    }

    displayProducts(result);
}

const search = document.getElementById("search");

search.addEventListener("input", (event)=>{
    let value = event.target.value.toLowerCase();

    const searchfilter = products.filter(data =>{
        return data.name.toLowerCase().includes(value);
    });
    updateProducts();
});

const price = document.getElementById("price");

price.addEventListener("change", (event) =>{
    let value = event.target.value;
    let sortedProducts = [...products];

    if(value === "Low->High"){
        sortedProducts.sort((a, b)=> a.price - b.price);
    }
    else if(value ==="High->Low"){
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    else{
        displayProducts(products);
    }
    
    updateProducts();
});

const catalog = document.getElementById("catalog");

catalog.addEventListener("change", (event) =>{
    let value = event.target.value;
    if(value === "All"){
       updateProducts();
    }
    
    let filtercatalog = products.filter(product => product.category === value);
    
    updateProducts();
});
