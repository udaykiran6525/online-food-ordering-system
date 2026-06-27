package com.foodease.service;

import com.foodease.dto.response.FoodItemDTO;
import com.foodease.entity.FoodItem;
import com.foodease.entity.User;
import com.foodease.entity.Wishlist;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.FoodItemRepository;
import com.foodease.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final FoodItemRepository foodItemRepository;
    private final UserService userService;
    private final FoodService foodService;

    public List<FoodItemDTO> getWishlist() {
        User user = userService.getCurrentUser();
        return wishlistRepository.findByUserId(user.getId()).stream()
                .map(wishlist -> foodService.toDTO(wishlist.getFoodItem()))
                .toList();
    }

    public List<Long> getWishlistFoodIds() {
        User user = userService.getCurrentUser();
        return wishlistRepository.findByUserId(user.getId()).stream()
                .map(wishlist -> wishlist.getFoodItem().getId())
                .toList();
    }

    public List<FoodItemDTO> addToWishlist(Long foodItemId) {
        User user = userService.getCurrentUser();
        if (!wishlistRepository.existsByUserIdAndFoodItemId(user.getId(), foodItemId)) {
            FoodItem foodItem = foodItemRepository.findById(foodItemId)
                    .orElseThrow(() -> new ResourceNotFoundException("Food item", foodItemId));
            Wishlist wishlistItem = Wishlist.builder()
                    .user(user)
                    .foodItem(foodItem)
                    .build();
            wishlistRepository.save(wishlistItem);
        }
        return getWishlist();
    }

    public List<FoodItemDTO> removeFromWishlist(Long foodItemId) {
        User user = userService.getCurrentUser();
        wishlistRepository.deleteByUserIdAndFoodItemId(user.getId(), foodItemId);
        return getWishlist();
    }
}
