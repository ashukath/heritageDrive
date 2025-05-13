package com.example.heritagedrive.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class TestimonialRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Please provide a valid email address")
    private String email;

    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer rating;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 1000, message = "Message must be between 10 and 1000 characters")
    private String message;

    @NotNull(message = "Consent is required")
    private Boolean consentGiven;
} 