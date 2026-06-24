import { useState } from "react";
import "./App.css";
import hero from "./assets/hero.png";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      title: "Laptop",
      price: "₹50,000",
      rating: "⭐⭐⭐⭐⭐",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      specs: ["Intel Core i7", "16GB RAM", "512GB SSD", "15.6 inch Display", "Windows 11"],
    },
    {
      title: "Mobile Phone",
      price: "₹20,000",
      rating: "⭐⭐⭐⭐",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      specs: ["8GB RAM", "128GB Storage", "5000mAh Battery", "50MP Camera", "5G Support"],
    },
    {
      title: "Headphones",
      price: "₹2,000",
      rating: "⭐⭐⭐⭐⭐",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      specs: ["Wireless", "Noise Cancellation", "40 Hour Battery", "Bluetooth 5.0"],
    },
    {
      title: "Smart Watch",
      price: "₹5,000",
      rating: "⭐⭐⭐⭐",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      specs: ["Heart Rate Monitor", "Water Resistant", "GPS", "7 Day Battery"],
    },
  ];

  // ADD TO CART
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.title === product.title);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // REMOVE ONE ITEM
  const removeFromCart = (product) => {
    const existingItem = cartItems.find((item) => item.title === product.title);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.title !== product.title));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // REMOVE ALL
  const removeAll = (product) => {
    setCartItems(cartItems.filter((item) => item.title !== product.title));
  };

  // TOTAL ITEMS
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <h2 className="logo">amazon</h2>

        <input className="searchBar" type="text" placeholder="Search Amazon" />

        <div className="nav">
          <span>Hello, Sign In</span>
          <span>Orders</span>

          <span className="cart" onClick={() => setShowCart(true)}>
            Cart 🛒 {totalItems}
          </span>
        </div>
      </header>

      {/* HERO */}
      <div className="hero">
        <img src={hero} alt="Banner" />
      </div>

      {/* PRODUCTS */}
      <div className="productContainer">
        {products.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <p>{item.rating}</p>

            <button onClick={() => addToCart(item)}>Add to Cart</button>

            <button onClick={() => setSelectedProduct(item)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* CART POPUP */}
      {showCart && (
        <div className="popup">
          <div className="popup-content">
            <h2>Your Cart</h2>

            {cartItems.length === 0 ? (
              <p>No Products Added</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index}>
                  <img src={item.image} alt={item.title} className="cart-image" />
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                  <p>{item.rating}</p>

                  <p>
                    Quantity: <strong>{item.quantity}</strong>
                  </p>

                  <button className="removeBtn" onClick={() => removeFromCart(item)}>
                    Remove One
                  </button>

                  <button className="deleteBtn" onClick={() => removeAll(item)}>
                    Remove All
                  </button>

                  <hr />
                </div>
              ))
            )}

            <button className="closeBtn" onClick={() => setShowCart(false)}>
              Close Cart
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT DETAILS POPUP */}
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedProduct.title}</h2>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="cart-image"
            />

            <p>
              <strong>Price:</strong> {selectedProduct.price}
            </p>

            <p>
              <strong>Rating:</strong> {selectedProduct.rating}
            </p>

            <h3>Specifications</h3>

            <ul>
              {selectedProduct.specs?.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>

            <button className="closeBtn" onClick={() => setSelectedProduct(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;