package com.foodease.service;

import com.foodease.entity.Category;
import com.foodease.entity.FoodItem;
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

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getCategoriesByRestaurant(Long restaurantId) {
        return categoryRepository.findByRestaurantId(restaurantId);
    }

    public Category createCategory(String name, String imageUrl, String description, Long restaurantId) {
        Category category = Category.builder()
                .name(name)
                .imageUrl(imageUrl)
                .description(description)
                .build();

        if (restaurantId != null) {
            Restaurant restaurant = restaurantRepository.findById(restaurantId)
                    .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));
            category.setRestaurant(restaurant);
        }

        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, String name, String imageUrl, String description) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        category.setName(name);
        category.setImageUrl(imageUrl);
        category.setDescription(description);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", id);
        }
        categoryRepository.deleteById(id);
    }
}
