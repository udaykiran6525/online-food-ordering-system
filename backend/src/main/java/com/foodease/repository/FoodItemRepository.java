package com.foodease.repository;

import com.foodease.entity.FoodItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByRestaurantId(Long restaurantId);
    List<FoodItem> findByCategoryId(Long categoryId);
    List<FoodItem> findByAvailableTrue();

    Page<FoodItem> findByAvailableTrue(Pageable pageable);

    @Query("SELECT f FROM FoodItem f WHERE f.available = true AND " +
           "(LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<FoodItem> searchFoodItems(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT f FROM FoodItem f WHERE f.available = true AND f.category.id = :categoryId")
    Page<FoodItem> findByCategoryIdAndAvailableTrue(@Param("categoryId") Long categoryId, Pageable pageable);

    long countByRestaurantId(Long restaurantId);
}
