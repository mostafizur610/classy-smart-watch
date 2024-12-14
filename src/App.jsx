import { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import './App.css'; 
import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.png';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';


function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = {
    name: 'Classy Modern Smart watch',
    originalPrice: 99.00,
    basePrice: 79.00,
    bandColors: [
      { color: 'Purple', image: img1 },
      { color: 'Cyan', image: img2 },
      { color: 'Blue', image: img3 },
      { color: 'Black', image: img4 },
    ],
    sizes: [
      { size: 'S', price: 69 },
      { size: 'M', price: 79 },
      { size: 'L', price: 89 },
      { size: 'XL', price: 99 },
    ],
  };

  const [selectedColor, setSelectedColor] = useState(products.bandColors[0]);
  const [selectedSize, setSelectedSize] = useState(products.sizes[1]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const existingItemIndex = cart.findIndex(
      (item) => item.color === selectedColor.color && item.size === selectedSize.size
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          name: products.name,
          color: selectedColor.color,
          size: selectedSize.size,
          price: selectedSize.price * quantity,
          quantity,
          image: selectedColor.image,
        },
      ]);
    }
    setShowCart(true);
  };

  const handleQuantityChange = (amount) => {
    if (quantity + amount > 0) setQuantity(quantity + amount);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const quantityTotal = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-8">
        {/* Product Image */}
        <div className="w-1/2">
        <img
        src={selectedColor.image}
        alt={selectedColor.color}
        className="rounded-xl shadow-md mb-4"
      />
        </div>

        {/* Product Details */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-start pt-4">{products.name}</h1>
          <div className='flex py-2'><div className='flex mt-1'><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke /><FaRegStar /></div> <p className='mx-2'>(02 Reviews)</p></div>
          <div className='flex pb-2'> <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px' }} className='pt-4'>
        ${products?.originalPrice.toFixed(2)}
      </span>
      <h4 className="text-start text-2xl text-gray-600 mt-2">${products.basePrice.toFixed(2)}</h4></div>
          
          <p className='text-start'>I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.</p>
          <div className="mt-4">
            <div className='flex gap-8'><p>Type</p><p>Model Number</p></div>
            <div className='flex gap-5 font-bold'><p>Watch</p><p>Model Number</p></div>
            <h3 className="font-semibold text-left py-2">Band Color</h3>
            <div className="flex gap-4 mt-2">
              {products.bandColors.map((color) => (
                <div
                  key={color.color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColor.color === color.color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color.toLowerCase() }}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-left">Wrist Size</h3>
            <div className="flex gap-4 mt-2">
              {products.sizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize.size === size.size ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {size.size} (${size.price})
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-4 items-center">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black"
            >
              -
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black"
            >
              +
            </button>

            <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded bg-blue-500 text-white shadow-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <CiHeart />

          </div>

          
        </div>
      </div>

      {/* Floating Checkout Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 px-4 py-2 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 flex items-center gap-2"
        >
          Checkout ({cart.length})
        </button>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-black text-left">Your Cart</h2>
            <div className='flex justify-end'><p className='text-end text-black mr-36'>Quantity</p><p className='text-end text-black'>Price</p></div>
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center gap-4 py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    
                  </div>
                  <div className='flex justify-end gap-40'>
                  <p className="text-sm text-gray-600 ml-28">{item.quantity}</p>
                  <p className="font-bold text-black">${item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <hr />
            <div className="mt-4 flex justify-between font-semibold text-black">
              <span>Total</span>
              <span className='ml-56'>{quantityTotal}</span>
              <span>${cartTotal.toFixed(2)}</span>    
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setShowCart(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-black"
              >
                Continue Shopping
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
