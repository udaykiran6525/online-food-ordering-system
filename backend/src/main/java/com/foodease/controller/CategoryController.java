package com.foodease.controller;

import com.foodease.entity.Category;
import com.foodease.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Category>> getCategoriesByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(categoryService.getCategoriesByRestaurant(restaurantId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createCategory(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        String imageUrl = (String) body.get("imageUrl");
        String description = (String) body.get("description");
        Long restaurantId = body.get("restaurantId") != null ? Long.valueOf(body.get("restaurantId").toString()) : null;
        return ResponseEntity.ok(categoryService.createCategory(name, imageUrl, description, restaurantId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id,
                                                    @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(categoryService.updateCategory(id, body.get("name"),
                body.get("imageUrl"), body.get("description")));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
