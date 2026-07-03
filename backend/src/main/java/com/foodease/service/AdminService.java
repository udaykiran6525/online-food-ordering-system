package com.foodease.service;

import com.foodease.dto.response.DashboardStatsDTO;
import com.foodease.entity.Order;
import com.foodease.entity.User;
import com.foodease.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final FoodItemRepository foodItemRepository;
    private final CategoryRepository categoryRepository;

    public DashboardStatsDTO getDashboardStats(Long restaurantId) {
        return DashboardStatsDTO.builder()
                .totalOrders(orderRepository.count())
                .pendingOrders(orderRepository.countByStatus(Order.OrderStatus.PENDING))
                .confirmedOrders(orderRepository.countByStatus(Order.OrderStatus.CONFIRMED))
                .preparingOrders(orderRepository.countByStatus(Order.OrderStatus.PREPARING))
                .outForDeliveryOrders(orderRepository.countByStatus(Order.OrderStatus.OUT_FOR_DELIVERY))
                .deliveredOrders(orderRepository.countByStatus(Order.OrderStatus.DELIVERED))
                .cancelledOrders(orderRepository.countByStatus(Order.OrderStatus.CANCELLED))
                .totalRevenue(orderRepository.getTotalRevenue())
                .totalCustomers(userRepository.countByRole(User.Role.CUSTOMER))
                .totalFoodItems(restaurantId != null ? foodItemRepository.countByRestaurantId(restaurantId) : foodItemRepository.count())
                .totalCategories(categoryRepository.count())
                .build();
    }
}
