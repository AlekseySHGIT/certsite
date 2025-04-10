package com.certsite.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String companyName;
    private String inn;
    private String ogrn;
    private String bankDetails;
    private String legalAddress;
    private String physicalAddress;
    private String contractInfo;
    private String edsInfo;
    private Double advancePayment;
}
