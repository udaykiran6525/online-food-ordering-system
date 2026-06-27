package com.foodease.controller;

import com.foodease.dto.request.CustomerRegisterRequest;
import com.foodease.dto.request.LoginRequest;
import com.foodease.dto.request.RestaurantRegisterRequest;
import com.foodease.dto.response.AuthResponse;
import com.foodease.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/customer")
    public ResponseEntity<AuthResponse> registerCustomer(@Valid @RequestBody CustomerRegisterRequest request) {
        return ResponseEntity.ok(authService.registerCustomer(request));
    }

    @PostMapping("/register/restaurant")
    public ResponseEntity<AuthResponse> registerRestaurant(@Valid @RequestBody RestaurantRegisterRequest request) {
        return ResponseEntity.ok(authService.registerRestaurant(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(authService.emailExists(email));
    }
}
