package com.foodease.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalOrders;
    private long pendingOrders;
    private long deliveredOrders;
    private long confirmedOrders;
    private long preparingOrders;
    private long outForDeliveryOrders;
    private long cancelledOrders;
    private BigDecimal totalRevenue;
    private long totalCustomers;
    private long totalFoodItems;
    private long totalCategories;
}
