package com.ecom.engine.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Cart {
    private String id;
    private Map<Long, CartItem> items = new ConcurrentHashMap<>();
    
    public Cart(String id) {
        this.id = id;
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public List<CartItem> getItems() {
        return new ArrayList<>(items.values());
    }
    
    public void addItem(CartItem item) {
        items.put(item.getProductId(), item);
    }
    
    public void updateItemQuantity(Long productId, Integer quantity) {
        CartItem item = items.get(productId);
        if (item != null) {
            item.setQuantity(quantity);
        }
    }
    
    public void removeItem(Long productId) {
        items.remove(productId);
    }
    
    public BigDecimal getSubtotal() {
        return items.values().stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    public BigDecimal getTax() {
        // Fixed 8.5% tax rate
        return getSubtotal().multiply(new BigDecimal("0.085"));
    }
    
    public BigDecimal getTotal() {
        return getSubtotal().add(getTax());
    }
}

