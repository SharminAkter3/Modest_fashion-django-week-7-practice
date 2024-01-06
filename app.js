const loadAllProducts =()=>{
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((products) =>{
            console.log(products)
            const parent = document.getElementById("products-container");
            products.forEach((product) => {
                const div = document.createElement("div");
                div.classList.add("product-card");
                div.innerHTML = `
                <img class="doc-img" src=${product.image} alt="" />
                <h4>${product.title.slice(0, 60)}</h4>
                <h6>${product.category}</h6>
                <p>
                ${product.description.slice(0, 50)}
                </p>
                <p>Price: $${product.price}</p>
                
                <button class='btn btn-danger'><a class="text-white text-decoration-none" target='_blank' href="product_details.html?productId=${product.id}">Details</a></button>
                `;
            parent.appendChild(div);          
            });
        });   
};


const loadProductsByCategory = (category) => {
    document.getElementById('products-container').innerHTML = '';

    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((products) => {
            const parent = document.getElementById('products-container');
            products.forEach((product) => {
                console.log(product);
                const div = document.createElement("div");
                div.classList.add("product-card");
                div.innerHTML = `
                    <img class="doc-img" src=${product.image} alt="" />
                    <h4>${product.title.slice(0, 60)}</h4>
                    <h6>${product.category}</h6>
                    <p>${product.description.slice(0, 50)}</p>
                    <p>Price: $${product.price}</p>
                    <button class='btn btn-danger'><a class="text-white text-decoration-none" target='_blank' href="product_details.html?productId=${product.id}">Details</a></button>
                `;
                parent.appendChild(div);
            });
        })
};

const loadAllCategory = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then((res) => res.json())
        .then((categories) => {
            const parent = document.getElementById('all-category');
            categories.forEach((category) => {
                const li = document.createElement('li');
                li.classList.add('dropdown-item');
                li.innerHTML = `
                    <li onclick="loadProductsByCategory('${category}')">${category}</li>
                `;
                parent.appendChild(li);
            });
        });
};




const getparams = () => {
    const param = new URLSearchParams(window.location.search).get('productId');
    if (param) {
        fetch(`https://fakestoreapi.com/products/${param}`)
            .then((res) => res.json())
            .then((data) => showProductDetails(data));
    }
};


const showProductDetails =(data) =>{
    console.log(data);
    const parent = document.getElementById('product-details-container');
    const div = document.createElement('div');
    div.classList.add('product-details');
    div.innerHTML= `
        <div class="">
            <img src=${data.image} alt="" />
        </div>
        <div class="details">
            <h3>${data.title}</h3>
            <h5>${data.category}</h5>
            <p>
            ${data.description}
            </p>
            <div class="d-flex gap-5 mt-2 mb-2">
            <h5>Rating : ${data.rating.rate}</h5>
            <h5>Price : ${data.price}$</h5>
            </div>
        </div>    
    `;
    parent.appendChild(div);
}


loadAllProducts();
loadAllCategory();
getparams();
showProductDetails();