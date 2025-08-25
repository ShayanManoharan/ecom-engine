package com.ecom.engine.service;

import com.ecom.engine.entity.Cart;
import com.ecom.engine.entity.CartItem;
import com.ecom.engine.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CartService {
    
    @Autowired
    private ProductService productService;
    
    // In-memory storage for carts
    private Map<String, Cart> carts = new ConcurrentHashMap<>();
    
    public String createCart() {
        String cartId = UUID.randomUUID().toString();
        carts.put(cartId, new Cart(cartId));
        return cartId;
    }
    
    public Cart getCart(String cartId) {
        return carts.get(cartId);
    }
    
    public boolean addItemToCart(String cartId, Long productId, Integer quantity) {
        Cart cart = carts.get(cartId);
        if (cart == null) {
            return false;
        }
        
        Product product = productService.getProductById(productId).orElse(null);
        if (product == null) {
            return false;
        }
        
        CartItem item = new CartItem(productId, product.getName(), product.getPrice(), quantity);
        cart.addItem(item);
        return true;
    }
    
    public boolean updateItemQuantity(String cartId, Long productId, Integer quantity) {
        Cart cart = carts.get(cartId);
        if (cart == null) {
            return false;
        }
        
        cart.updateItemQuantity(productId, quantity);
        return true;
    }
}

