package com.foodease.dto.request;

import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;
    private String deliveryAddress;
    private String paymentMethod;
    private String specialInstructions;
}
