package com.foodease.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist_items", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "food_item_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_item_id", nullable = false)
    private FoodItem foodItem;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
