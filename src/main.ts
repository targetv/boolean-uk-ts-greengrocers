import "./styles/index.css"
import "./styles/reset.css"

const app = document.querySelector<HTMLDivElement>('#app')!


function createElm(tag: any, attObj: {}){
  const elm = document.createElement(tag);
  for(const key of Object.keys(attObj)){
    elm[key] = attObj[key];
  }
  return elm
}

let state : object = {
  storeItems: [],
  cartItems: []
}


fetch("http://localhost:4000/store").then(resp => resp.json()).then(data => {
  state.storeItems = data
  init()
})


/// Header


function setState(setState) {
  state = { ...state, ...setState };
  console.log(state)
  renderCart();
}




function createShopItems(){
  const storeList = document.querySelector(".store--item-list");
  for(const storeItem of state.storeItems){
    const shopItemToAdd =  shopItem(storeItem)
    storeList.append(shopItemToAdd)

  }

  return storeList
}

function shopItem(shopItem : object){
  const liEl = document.createElement("li");
  const divEl = createElm("div", {className:"store--item-icon"})
  const imgEl = createElm("img", {src:`${shopItem.img}`, alt:`${shopItem.name}`})
  const buttonEl = createElm("button", {innerText: "Add to cart"})
  buttonEl.addEventListener("click", () => {
  
  
   
  
  })
  divEl.append(imgEl)
  liEl.append(divEl, buttonEl)
  return liEl
}

function cartItemsEl(){
  const cartItemsEl = document.querySelector(".cart--item-list");
  for(const item  of state.cartItems){
    const cartItemToAdd = addCartItem(item)
      cartItemsEl.append(cartItemToAdd)
  }

}

function addCartItem(cartItem: object){

  const liEl = document.createElement("li")
  const imgEl = createElm("img", {className: "cart--item-icon", src:`${cartItem.img}`, alt:`${cartItem.name}`})
  const pEl = createElm("p", {innerText: `${cartItem.name}`})
  const buttonElMinus = createElm("button", {className: "quantity-btn remove-btn center", innerText: "-"})
  const spanEl = createElm("span", {className: "quantity-text center", innerText: `${cartItem.quantity}`})
  const buttonElPlus = createElm("button", {className: "quantity-btn add-btn center", innerText: "+" })
  liEl.append(imgEl, pEl, buttonElMinus, spanEl, buttonElPlus)

  return liEl
}





function render(){
  createShopItems()
  cartItemsEl()
}

function renderCart(){
  cartItemsEl();
}

function init(){
  createShopItems()
  cartItemsEl()

}





app.append()
