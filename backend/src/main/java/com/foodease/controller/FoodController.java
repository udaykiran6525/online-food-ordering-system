package com.foodease.controller;

import com.foodease.dto.request.FoodItemRequest;
import com.foodease.dto.response.FoodItemDTO;
import com.foodease.entity.Restaurant;
import com.foodease.repository.RestaurantRepository;
import com.foodease.service.FoodService;
import com.foodease.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class FoodController {

    private final FoodService foodService;
    private final UserService userService;
    private final RestaurantRepository restaurantRepository;

    public FoodController(FoodService foodService, UserService userService, RestaurantRepository restaurantRepository) {
        this.foodService = foodService;
        this.userService = userService;
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping
    public ResponseEntity<Page<FoodItemDTO>> getAllFoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "id") String sort) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(sort));

        if (keyword != null && !keyword.isEmpty()) {
            return ResponseEntity.ok(foodService.searchFoods(keyword, pageable));
        } else if (categoryId != null) {
            return ResponseEntity.ok(foodService.getFoodsByCategory(categoryId, pageable));
        }
        return ResponseEntity.ok(foodService.getAllFoods(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItemDTO> getFoodById(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.getFoodById(id));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodItemDTO>> getFoodsByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(foodService.getFoodsByRestaurant(restaurantId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodItemDTO> createFood(@Valid @RequestBody FoodItemRequest request) {
        var currentUser = userService.getCurrentUser();
        Restaurant restaurant = restaurantRepository.findByOwnerId(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for admin"));
        return ResponseEntity.ok(foodService.createFood(request, restaurant.getId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodItemDTO> updateFood(@PathVariable Long id,
                                                   @Valid @RequestBody FoodItemRequest request) {
        return ResponseEntity.ok(foodService.updateFood(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodItemDTO> toggleAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.toggleAvailability(id));
    }
}
