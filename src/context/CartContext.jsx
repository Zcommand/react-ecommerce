import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // ✅ NEW: Theme state
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Cart actions
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty > 1 ? p.qty - 1 : 1 } : p
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist actions
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((p) => p.id === product.id)) return [...prev, product];
      return prev;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  // Compare actions
  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (!prev.find((p) => p.id === product.id)) return [...prev, product];
      return prev;
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  // Recently Viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered];
      return updated.slice(0, 5);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        recentlyViewed,

        // ✅ theme values
        theme,
        toggleTheme,

        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        addToCompare,
        removeFromCompare,
        addToRecentlyViewed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};