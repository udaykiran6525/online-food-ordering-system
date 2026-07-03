package com.foodease.service;

import com.foodease.dto.request.CustomerRegisterRequest;
import com.foodease.dto.request.LoginRequest;
import com.foodease.dto.request.RestaurantRegisterRequest;
import com.foodease.dto.response.AuthResponse;
import com.foodease.entity.Restaurant;
import com.foodease.entity.User;
import com.foodease.exception.DuplicateEmailException;
import com.foodease.repository.RestaurantRepository;
import com.foodease.repository.UserRepository;
import com.foodease.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse registerCustomer(CustomerRegisterRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        if (userRepository.existsByEmail(cleanEmail)) {
            throw new DuplicateEmailException(cleanEmail);
        }

        User user = User.builder()
                .name(request.getName() != null ? request.getName().trim() : "")
                .email(cleanEmail)
                .phone(request.getPhone() != null ? request.getPhone().trim() : "")
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.CUSTOMER)
                .active(true)
                .build();
        user = userRepository.save(user);

        String token = jwtTokenProvider.generateTokenFromUsername(user.getEmail());
        return AuthResponse.of(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse registerRestaurant(RestaurantRegisterRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        if (userRepository.existsByEmail(cleanEmail)) {
            throw new DuplicateEmailException(cleanEmail);
        }

        User owner = User.builder()
                .name(request.getName() != null ? request.getName().trim() : "")
                .email(cleanEmail)
                .phone(request.getPhone() != null ? request.getPhone().trim() : "")
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.ADMIN)
                .active(true)
                .build();
        owner = userRepository.save(owner);

        Restaurant restaurant = Restaurant.builder()
                .name(request.getRestaurantName() != null ? request.getRestaurantName().trim() : "")
                .email(cleanEmail)
                .phone(request.getPhone() != null ? request.getPhone().trim() : "")
                .address(request.getAddress())
                .description(request.getDescription())
                .owner(owner)
                .active(true)
                .build();
        restaurant = restaurantRepository.save(restaurant);

        String token = jwtTokenProvider.generateTokenFromUsername(owner.getEmail());
        AuthResponse response = AuthResponse.of(token, owner.getId(), owner.getName(), owner.getEmail(), owner.getRole().name());
        response.setRestaurantId(restaurant.getId());
        return response;
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email != null ? email.trim().toLowerCase() : "");
    }

    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(cleanEmail, request.getPassword())
        );

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtTokenProvider.generateToken(authentication);
        AuthResponse response = AuthResponse.of(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());

        if (user.getRole() == User.Role.ADMIN) {
            restaurantRepository.findByOwnerId(user.getId())
                    .ifPresentOrElse(r -> response.setRestaurantId(r.getId()),
                            () -> response.setRestaurantId(1L));
        }
        return response;
    }
}
