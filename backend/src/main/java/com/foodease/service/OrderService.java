package com.foodease.service;

import com.foodease.dto.request.OrderRequest;
import com.foodease.dto.response.OrderDTO;
import com.foodease.entity.*;
import com.foodease.exception.ResourceNotFoundException;
import com.foodease.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final RestaurantRepository restaurantRepository;
    private final PaymentRepository paymentRepository;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public OrderDTO placeOrder(OrderRequest request) {
        User user = userService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalStateException("Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot place order with empty cart");
        }

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", request.getRestaurantId()));

        Order order = Order.builder()
                .user(user)
                .restaurant(restaurant)
                .deliveryAddress(request.getDeliveryAddress())
                .specialInstructions(request.getSpecialInstructions())
                .status(Order.OrderStatus.PENDING)
                .deliveryFee(BigDecimal.valueOf(40))
                .orderItems(new ArrayList<>())
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .foodItem(cartItem.getFoodItem())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getFoodItem().getPrice())
                    .build();
            order.getOrderItems().add(orderItem);
            total = total.add(cartItem.getFoodItem().getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        order.setTotalAmount(total.add(order.getDeliveryFee()));
        order = orderRepository.save(order);

        Payment.PaymentMethod paymentMethod = Payment.PaymentMethod.valueOf(
                request.getPaymentMethod() != null ? request.getPaymentMethod() : "CASH_ON_DELIVERY"
        );
        Payment payment = Payment.builder()
                .order(order)
                .amount(order.getTotalAmount())
                .method(paymentMethod)
                .status(paymentMethod == Payment.PaymentMethod.CASH_ON_DELIVERY
                        ? Payment.PaymentStatus.PENDING : Payment.PaymentStatus.COMPLETED)
                .transactionId(UUID.randomUUID().toString())
                .build();
        paymentRepository.save(payment);

        cart.getItems().clear();
        cart.setTotal(BigDecimal.ZERO);
        cartRepository.save(cart);

        messagingTemplate.convertAndSend("/topic/new-orders", toDTO(order));

        return toDTO(order);
    }

    public List<OrderDTO> getMyOrders() {
        User user = userService.getCurrentUser();
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toDTO).toList();
    }

    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
        return toDTO(order);
    }

    public Page<OrderDTO> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByCreatedAtDesc(pageable).map(this::toDTO);
    }

    public Page<OrderDTO> getRestaurantOrders(Long restaurantId, Pageable pageable) {
        return orderRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId, pageable).map(this::toDTO);
    }

    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));
        order.setStatus(Order.OrderStatus.valueOf(status));
        order = orderRepository.save(order);

        OrderDTO dto = toDTO(order);
        messagingTemplate.convertAndSend("/topic/order/" + orderId, dto);
        messagingTemplate.convertAndSend("/topic/orders/user/" + order.getUser().getId(), dto);

        return dto;
    }

    public OrderDTO toDTO(Order order) {
        List<OrderDTO.OrderItemDTO> itemDTOs = order.getOrderItems().stream().map(item ->
                OrderDTO.OrderItemDTO.builder()
                        .id(item.getId())
                        .foodItemId(item.getFoodItem().getId())
                        .foodItemName(item.getFoodItem().getName())
                        .foodItemImage(item.getFoodItem().getImageUrl())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build()
        ).toList();

        Payment payment = order.getPayment();

        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .userName(order.getUser().getName())
                .restaurantId(order.getRestaurant().getId())
                .restaurantName(order.getRestaurant().getName())
                .orderItems(itemDTOs)
                .totalAmount(order.getTotalAmount())
                .deliveryFee(order.getDeliveryFee())
                .status(order.getStatus().name())
                .paymentMethod(payment != null ? payment.getMethod().name() : null)
                .paymentStatus(payment != null ? payment.getStatus().name() : null)
                .deliveryAddress(order.getDeliveryAddress())
                .specialInstructions(order.getSpecialInstructions())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}
