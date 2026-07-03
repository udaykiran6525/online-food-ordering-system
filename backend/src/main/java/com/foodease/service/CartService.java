package com.foodease.service;

import com.foodease.dto.response.CartDTO;
import com.foodease.entity.Cart;
import com.foodease.entity.CartItem;
import com.foodease.entity.FoodItem;
import com.foodease.entity.User;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.CartItemRepository;
import com.foodease.repository.CartRepository;
import com.foodease.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final FoodItemRepository foodItemRepository;
    private final UserService userService;

    public CartDTO getCart() {
        User user = userService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
        return toDTO(cart);
    }

    public CartDTO addToCart(Long foodItemId, int quantity) {
        User user = userService.getCurrentUser();
        FoodItem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Food item", foodItemId));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndFoodItemId(cart.getId(), foodItemId);

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
            cartItemRepository.save(existingItem.get());
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .foodItem(foodItem)
                    .quantity(quantity)
                    .build();
            cart.getItems().add(cartItemRepository.save(newItem));
        }

        cart.recalculateTotal();
        cartRepository.save(cart);
        return toDTO(cartRepository.findByUserId(user.getId()).get());
    }

    public CartDTO updateQuantity(Long cartItemId, int quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item", cartItemId));

        if (quantity <= 0) {
            Cart cart = item.getCart();
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
            cart.recalculateTotal();
            cartRepository.save(cart);
            return toDTO(cart);
        }

        item.setQuantity(quantity);
        cartItemRepository.save(item);
        Cart cart = cartRepository.findById(item.getCart().getId()).get();
        cart.recalculateTotal();
        cartRepository.save(cart);
        return toDTO(cart);
    }

    public CartDTO removeItem(Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item", cartItemId));
        Cart cart = item.getCart();
        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        cart.recalculateTotal();
        cartRepository.save(cart);
        return toDTO(cart);
    }

    public void clearCart(Long userId) {
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cart.getItems().clear();
            cart.setTotal(BigDecimal.ZERO);
            cartRepository.save(cart);
        });
    }

    private CartDTO toDTO(Cart cart) {
        List<CartDTO.CartItemDTO> itemDTOs = cart.getItems().stream().map(item ->
                CartDTO.CartItemDTO.builder()
                        .id(item.getId())
                        .foodItemId(item.getFoodItem().getId())
                        .foodItemName(item.getFoodItem().getName())
                        .foodItemImage(item.getFoodItem().getImageUrl())
                        .foodItemPrice(item.getFoodItem().getPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getFoodItem().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .restaurantId(item.getFoodItem().getRestaurant() != null ? item.getFoodItem().getRestaurant().getId() : null)
                        .build()
        ).toList();

        return CartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .items(itemDTOs)
                .total(cart.getTotal())
                .itemCount(cart.getItems().size())
                .build();
    }
}
