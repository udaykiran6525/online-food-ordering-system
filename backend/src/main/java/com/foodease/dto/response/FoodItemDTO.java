package com.foodease.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodItemDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Double rating;
    private Integer totalRatings;
    private boolean available;
    private boolean vegetarian;
    private String preparationTime;
    private Long categoryId;
    private String categoryName;
    private Long restaurantId;
    private String restaurantName;
    private LocalDateTime createdAt;
}
