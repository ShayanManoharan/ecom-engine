package com.ecom.engine.config;

import com.ecom.engine.entity.Product;
import com.ecom.engine.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductService productService;
    
    @Override
    public void run(String... args) throws Exception {
        // Only seed if no products exist
        if (productService.getAllActiveProducts().isEmpty()) {
            seedProducts();
        }
    }
    
    private void seedProducts() {
        // Create products one by one to avoid constructor issues
        createProduct("Wireless Bluetooth Headphones", 
            "High-quality wireless headphones with noise cancellation and 30-hour battery life", 
            new BigDecimal("89.99"), 
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", 
            "Electronics", 50);
            
        createProduct("Smart Fitness Watch", 
            "Track your fitness goals with heart rate monitoring, GPS, and water resistance", 
            new BigDecimal("199.99"), 
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", 
            "Electronics", 30);
            
        createProduct("Organic Cotton T-Shirt", 
            "Comfortable 100% organic cotton t-shirt available in multiple colors", 
            new BigDecimal("24.99"), 
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", 
            "Clothing", 100);
            
        createProduct("Stainless Steel Water Bottle", 
            "Eco-friendly 32oz water bottle that keeps drinks cold for 24 hours", 
            new BigDecimal("34.99"), 
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", 
            "Home & Garden", 75);
            
        createProduct("Wireless Charging Pad", 
            "Fast wireless charging pad compatible with all Qi-enabled devices", 
            new BigDecimal("49.99"), 
            "https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400", 
            "Electronics", 40);
            
        createProduct("Yoga Mat", 
            "Non-slip yoga mat made from eco-friendly materials, perfect for home workouts", 
            new BigDecimal("39.99"), 
            "https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400", 
            "Sports", 60);
            
        createProduct("Coffee Maker", 
            "Programmable coffee maker with thermal carafe and 12-cup capacity", 
            new BigDecimal("79.99"), 
            "https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400", 
            "Home & Garden", 25);
            
        createProduct("Running Shoes", 
            "Lightweight running shoes with superior cushioning and breathable mesh", 
            new BigDecimal("129.99"), 
            "https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400", 
            "Sports", 35);
            
        createProduct("Laptop Stand", 
            "Adjustable aluminum laptop stand for better ergonomics and cooling", 
            new BigDecimal("29.99"), 
            "https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400", 
            "Electronics", 45);
            
        createProduct("Plant Pot Set", 
            "Set of 3 ceramic plant pots with drainage holes, perfect for indoor plants", 
            new BigDecimal("44.99"), 
            "https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400", 
            "Home & Garden", 55);
            
        System.out.println("✅ Seeded 10 products successfully!");
    }
    
    private void createProduct(String name, String description, BigDecimal price, 
                             String imageUrl, String category, Integer stockQuantity) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImageUrl(imageUrl);
        product.setCategory(category);
        product.setStockQuantity(stockQuantity);
        product.setActive(true);
        productService.saveProduct(product);
    }
}

