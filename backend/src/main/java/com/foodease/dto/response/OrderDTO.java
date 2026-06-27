package com.foodease.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long restaurantId;
    private String restaurantName;
    private List<OrderItemDTO> orderItems;
    private BigDecimal totalAmount;
    private BigDecimal deliveryFee;
    private String status;
    private String paymentMethod;
    private String paymentStatus;
    private String deliveryAddress;
    private String specialInstructions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDTO {
        private Long id;
        private Long foodItemId;
        private String foodItemName;
        private String foodItemImage;
        private Integer quantity;
        private BigDecimal price;
    }
}
