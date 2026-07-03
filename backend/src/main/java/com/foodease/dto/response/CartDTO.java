package com.foodease.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Long userId;
    private List<CartItemDTO> items;
    private BigDecimal total;
    private int itemCount;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemDTO {
        private Long id;
        private Long foodItemId;
        private String foodItemName;
        private String foodItemImage;
        private BigDecimal foodItemPrice;
        private Integer quantity;
        private BigDecimal subtotal;
        private Long restaurantId;
    }
}
