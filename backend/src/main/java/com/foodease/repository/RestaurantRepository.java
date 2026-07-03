package com.foodease.repository;

import com.foodease.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByOwnerId(Long ownerId);
    boolean existsByEmail(String email);
    List<Restaurant> findByActiveTrue();
    Optional<Restaurant> findByEmail(String email);
}
