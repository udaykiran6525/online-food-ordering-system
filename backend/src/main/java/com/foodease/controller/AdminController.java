package com.foodease.controller;

import com.foodease.dto.response.DashboardStatsDTO;
import com.foodease.entity.User;
import com.foodease.repository.RestaurantRepository;
import com.foodease.service.AdminService;
import com.foodease.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;
    private final RestaurantRepository restaurantRepository;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsDTO> getDashboard() {
        User currentUser = userService.getCurrentUser();
        Long restaurantId = restaurantRepository.findByOwnerId(currentUser.getId())
                .map(r -> r.getId()).orElse(null);
        return ResponseEntity.ok(adminService.getDashboardStats(restaurantId));
    }

    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllCustomers() {
        return ResponseEntity.ok(userService.getAllCustomers());
    }
}
