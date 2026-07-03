package com.foodease.service;

import com.foodease.dto.request.FoodItemRequest;
import com.foodease.dto.response.FoodItemDTO;
import com.foodease.entity.Category;
import com.foodease.entity.FoodItem;
import com.foodease.entity.Restaurant;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.CategoryRepository;
import com.foodease.repository.FoodItemRepository;
import com.foodease.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FoodService {

    private final FoodItemRepository foodItemRepository;
    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    public Page<FoodItemDTO> getAllFoods(Pageable pageable) {
        return foodItemRepository.findByAvailableTrue(pageable).map(this::toDTO);
    }

    public Page<FoodItemDTO> searchFoods(String keyword, Pageable pageable) {
        return foodItemRepository.searchFoodItems(keyword, pageable).map(this::toDTO);
    }

    public Page<FoodItemDTO> getFoodsByCategory(Long categoryId, Pageable pageable) {
        return foodItemRepository.findByCategoryIdAndAvailableTrue(categoryId, pageable).map(this::toDTO);
    }

    public List<FoodItemDTO> getFoodsByRestaurant(Long restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId).stream().map(this::toDTO).toList();
    }

    public FoodItemDTO getFoodById(Long id) {
        FoodItem item = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item", id));
        return toDTO(item);
    }

    public FoodItemDTO createFood(FoodItemRequest request, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));

        FoodItem item = FoodItem.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .vegetarian(request.isVegetarian())
                .preparationTime(request.getPreparationTime())
                .restaurant(restaurant)
                .available(true)
                .build();

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));
            item.setCategory(category);
        }

        return toDTO(foodItemRepository.save(item));
    }

    public FoodItemDTO updateFood(Long id, FoodItemRequest request) {
        FoodItem item = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item", id));

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setImageUrl(request.getImageUrl());
        item.setVegetarian(request.isVegetarian());
        item.setPreparationTime(request.getPreparationTime());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));
            item.setCategory(category);
        }

        return toDTO(foodItemRepository.save(item));
    }

    public void deleteFood(Long id) {
        if (!foodItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Food item", id);
        }
        foodItemRepository.deleteById(id);
    }

    public FoodItemDTO toggleAvailability(Long id) {
        FoodItem item = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item", id));
        item.setAvailable(!item.isAvailable());
        return toDTO(foodItemRepository.save(item));
    }

    public FoodItemDTO toDTO(FoodItem item) {
        return FoodItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .rating(item.getRating())
                .totalRatings(item.getTotalRatings())
                .available(item.isAvailable())
                .vegetarian(item.isVegetarian())
                .preparationTime(item.getPreparationTime())
                .categoryId(item.getCategory() != null ? item.getCategory().getId() : null)
                .categoryName(item.getCategory() != null ? item.getCategory().getName() : null)
                .restaurantId(item.getRestaurant() != null ? item.getRestaurant().getId() : null)
                .restaurantName(item.getRestaurant() != null ? item.getRestaurant().getName() : null)
                .createdAt(item.getCreatedAt())
                .build();
    }
}
