package com.foodease.dto.request;

import lombok.Data;

@Data
public class UserProfileRequest {
    private String name;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String dob;
    private String gender;
    private String preferredDeliveryAddress;
    private String preferredPaymentMethod;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getPreferredDeliveryAddress() { return preferredDeliveryAddress; }
    public void setPreferredDeliveryAddress(String preferredDeliveryAddress) { this.preferredDeliveryAddress = preferredDeliveryAddress; }
    public String getPreferredPaymentMethod() { return preferredPaymentMethod; }
    public void setPreferredPaymentMethod(String preferredPaymentMethod) { this.preferredPaymentMethod = preferredPaymentMethod; }
}
