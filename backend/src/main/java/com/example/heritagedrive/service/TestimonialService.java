package com.example.heritagedrive.service;

import com.example.heritagedrive.dto.TestimonialRequest;
import com.example.heritagedrive.model.Testimonial;
import com.example.heritagedrive.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    @Transactional(readOnly = true)
    public List<Testimonial> getAllPublicTestimonials() {
        log.debug("Fetching all public testimonials");
        return testimonialRepository.findByConsentGivenTrueOrderBySubmissionDateDesc();
    }

    @Transactional
    public Testimonial createTestimonial(TestimonialRequest request, MultipartFile photo) {
        log.debug("Creating new testimonial for user: {}", request.getName());
        
        createUploadDirectoryIfNotExists();

        Testimonial testimonial = new Testimonial();
        testimonial.setName(request.getName());
        testimonial.setEmail(request.getEmail());
        testimonial.setRating(request.getRating());
        testimonial.setMessage(request.getMessage());
        testimonial.setConsentGiven(request.getConsentGiven());
        testimonial.setSubmissionDate(LocalDateTime.now());

        if (photo != null && !photo.isEmpty()) {
            String photoPath = savePhoto(photo);
            testimonial.setPhotoPath(photoPath);
        }

        return testimonialRepository.save(testimonial);
    }

    private void createUploadDirectoryIfNotExists() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            log.error("Failed to create upload directory", e);
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    private String savePhoto(MultipartFile photo) {
        try {
            String fileName = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
            Path targetLocation = Paths.get(uploadDir).resolve(fileName);
            Files.copy(photo.getInputStream(), targetLocation);
            log.debug("Saved photo: {}", fileName);
            return fileName;
        } catch (IOException e) {
            log.error("Failed to store file", e);
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }
} 