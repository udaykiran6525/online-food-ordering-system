package com.foodease.controller;

import com.foodease.dto.response.OrderDTO;
import com.foodease.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tracking")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TrackingController {

    private final OrderService orderService;

    public TrackingController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderTracking(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
}
