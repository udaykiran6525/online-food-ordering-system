package com.foodease.controller;

import com.foodease.dto.response.FoodItemDTO;
import com.foodease.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<FoodItemDTO>> getWishlist() {
        return ResponseEntity.ok(wishlistService.getWishlist());
    }

    @GetMapping("/ids")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<Long>> getWishlistFoodIds() {
        return ResponseEntity.ok(wishlistService.getWishlistFoodIds());
    }

    @PostMapping("/{foodItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<FoodItemDTO>> addToWishlist(@PathVariable Long foodItemId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(foodItemId));
    }

    @DeleteMapping("/{foodItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<FoodItemDTO>> removeFromWishlist(@PathVariable Long foodItemId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(foodItemId));
    }
}
