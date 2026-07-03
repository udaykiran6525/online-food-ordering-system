package com.foodease.controller;

import com.foodease.dto.request.UserProfileRequest;
import com.foodease.entity.User;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        return ResponseEntity.ok(userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody UserProfileRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));

        if (request.getName() != null) user.setName(request.getName().trim());
        if (request.getPhone() != null) user.setPhone(request.getPhone().trim());
        if (request.getAddress() != null) user.setAddress(request.getAddress().trim());
        if (request.getCity() != null) user.setCity(request.getCity().trim());
        if (request.getState() != null) user.setState(request.getState().trim());
        if (request.getPincode() != null) user.setPincode(request.getPincode().trim());
        if (request.getDob() != null) user.setDob(request.getDob().trim());
        if (request.getGender() != null) user.setGender(request.getGender().trim());
        if (request.getPreferredDeliveryAddress() != null) user.setPreferredDeliveryAddress(request.getPreferredDeliveryAddress().trim());
        if (request.getPreferredPaymentMethod() != null) user.setPreferredPaymentMethod(request.getPreferredPaymentMethod().trim());

        return ResponseEntity.ok(userRepository.save(user));
    }
}
