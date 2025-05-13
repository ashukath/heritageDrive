package com.example.heritagedrive.controller;

import com.example.heritagedrive.dto.TestimonialRequest;
import com.example.heritagedrive.model.Testimonial;
import com.example.heritagedrive.service.TestimonialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class TestimonialController {

    private final TestimonialService testimonialService;

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllPublicTestimonials() {
        log.debug("REST request to get all public testimonials");
        return ResponseEntity.ok(testimonialService.getAllPublicTestimonials());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Testimonial> createTestimonial(
            @Valid @RequestPart("testimonial") TestimonialRequest request,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {
        
        log.info("Received testimonial submission request");
        log.debug("Testimonial request data: {}", request);
        if (photo != null) {
            log.debug("Photo included in request. Original filename: {}, size: {} bytes", 
                     photo.getOriginalFilename(), photo.getSize());
        }

        try {
            Testimonial savedTestimonial = testimonialService.createTestimonial(request, photo);
            log.info("Successfully created testimonial with ID: {}", savedTestimonial.getId());
            return ResponseEntity.ok(savedTestimonial);
        } catch (Exception e) {
            log.error("Failed to create testimonial", e);
            throw e;
        }
    }
} 