package com.foodease.dto.request;

import lombok.Data;

@Data
public class RestaurantUpdateRequest {
    private String name;
    private String description;
    private String address;
    private String phone;
    private String businessTiming;
    private String gstNumber;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getBusinessTiming() { return businessTiming; }
    public void setBusinessTiming(String businessTiming) { this.businessTiming = businessTiming; }
    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }
}
