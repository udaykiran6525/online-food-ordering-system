package com.foodease.service;

import com.foodease.entity.Category;
import com.foodease.entity.Restaurant;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.CategoryRepository;
import com.foodease.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    // GET ALL CATEGORIES
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // GET BY RESTAURANT 
    public List<Category> getCategoriesByRestaurant(Long restaurantId) {
        return categoryRepository.findByRestaurant_Id(restaurantId);
    }

    // CREATE CATEGORY 
    public Category createCategory(String name, String imageUrl, String description, Long restaurantId) {

        Restaurant restaurant = null;

        if (restaurantId != null) {
            restaurant = restaurantRepository.findById(restaurantId)
                    .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));
        }

        Category category = Category.builder()
                .name(name)
                .imageUrl(imageUrl)
                .description(description)
                .restaurant(restaurant)
                .build();

        return categoryRepository.save(category);
    }

    // UPDATE CATEGORY
    public Category updateCategory(Long id, String name, String imageUrl, String description) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));

        category.setName(name);
        category.setImageUrl(imageUrl);
        category.setDescription(description);

        return categoryRepository.save(category);
    }

    // DELETE CATEGORY
    public void deleteCategory(Long id) {

        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", id);
        }

        categoryRepository.deleteById(id);
    }
}
