let productsContainer = document.getElementById("products-detels");
let productId = localStorage.getItem('clickproduct')


let getProcutsDatels = async function (productId) {
  let res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  let ProcutsDatels = await res.json();


  let temp = `
<div class="card" style="width: 18rem;">
  <img src="${ProcutsDatels.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${ProcutsDatels.title}</h5><span class="badge text-bg-success">${ProcutsDatels.price}</span>

    <p class="card-text">${ProcutsDatels.description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

`


  productsContainer.innerHTML = temp;

}


getProcutsDatels(productId);