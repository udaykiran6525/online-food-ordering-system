package com.foodease.repository;

import com.foodease.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    Page<Order> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId, Pageable pageable);
    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<Order> findByStatus(Order.OrderStatus status);

    long countByStatus(Order.OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status = 'DELIVERED'")
    BigDecimal getTotalRevenue();

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status = 'DELIVERED' AND o.createdAt >= :startDate")
    BigDecimal getRevenueFromDate(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.restaurant.id = :restaurantId AND o.status = :status")
    long countByRestaurantIdAndStatus(@Param("restaurantId") Long restaurantId,
                                      @Param("status") Order.OrderStatus status);
}
