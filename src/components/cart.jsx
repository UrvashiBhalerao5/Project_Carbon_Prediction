import React from 'react';
import { Trash } from 'lucide-react'; // Import Trash icon
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  
  // Retrieve cart items from localStorage
  const [cartItems, setCartItems] = React.useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  React.useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(1, newQuantity) } 
        : item
    );
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return '0.00';

    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price?.split(' ')[0] || '0');
      return total + (price * (item.quantity || 1));
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert('Proceeding to checkout');
    // Optionally clear cart after checkout
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
      {!cartItems || cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center border-b py-3"
            >
              <div className="flex items-center">
                <img 
                  src="/api/placeholder/40/40" 
                  alt={item.projectName || 'Project'} 
                  className="h-10 w-10 rounded-full mr-4" 
                />
                <div>
                  <p className="font-medium">{item.projectName || 'Unnamed Project'}</p>
                  <p className="text-gray-500 text-sm">{item.price || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                  className="px-4 py-2 bg-gray-200 rounded-l text-lg"
                >
                  -
                </button>
                <input
                  type="text"  // Use text instead of number
                  value={item.quantity || 1}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only update if the value is a valid number
                    if (/^\d+$/.test(value) || value === '') {
                      updateQuantity(item.id, value ? parseInt(value) : 1);
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-center w-20 border text-lg"  // Increased width slightly
                />
                <button 
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-r text-lg"
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)} // Trash bin button to remove item
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <strong>Total:</strong>
            <span className="text-lg font-bold">{calculateTotal()} CO2</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            disabled={!cartItems || cartItems.length === 0}
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
