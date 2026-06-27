package com.foodease.controller;

import com.foodease.entity.Restaurant;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.RestaurantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantRepository.findByActiveTrue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody com.foodease.dto.request.RestaurantUpdateRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));

        if (request.getName() != null) restaurant.setName(request.getName().trim());
        if (request.getDescription() != null) restaurant.setDescription(request.getDescription().trim());
        if (request.getAddress() != null) restaurant.setAddress(request.getAddress().trim());
        if (request.getPhone() != null) restaurant.setPhone(request.getPhone().trim());
        if (request.getBusinessTiming() != null) restaurant.setBusinessTiming(request.getBusinessTiming().trim());
        if (request.getGstNumber() != null) restaurant.setGstNumber(request.getGstNumber().trim());

        return ResponseEntity.ok(restaurantRepository.save(restaurant));
    }
}
