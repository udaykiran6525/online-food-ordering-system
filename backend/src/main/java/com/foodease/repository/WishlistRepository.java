package com.foodease.repository;

import com.foodease.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long userId);
    Optional<Wishlist> findByUserIdAndFoodItemId(Long userId, Long foodItemId);
    boolean existsByUserIdAndFoodItemId(Long userId, Long foodItemId);
    void deleteByUserIdAndFoodItemId(Long userId, Long foodItemId);
}
