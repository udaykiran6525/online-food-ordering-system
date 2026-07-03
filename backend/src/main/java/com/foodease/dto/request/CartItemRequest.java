package com.foodease.dto.request;

import lombok.Data;

@Data
public class CartItemRequest {
    private Long foodItemId;
    private Integer quantity;

    public CartItemRequest() {}

    public Long getFoodItemId() { return foodItemId; }
    public void setFoodItemId(Long foodItemId) { this.foodItemId = foodItemId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
