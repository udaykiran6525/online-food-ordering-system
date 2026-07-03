package com.foodease.repository;

import com.foodease.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndFoodItemId(Long cartId, Long foodItemId);
    void deleteByCartId(Long cartId);
}
