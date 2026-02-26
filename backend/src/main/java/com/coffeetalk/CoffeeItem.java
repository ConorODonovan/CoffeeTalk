package com.coffeetalk;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coffee_items")
public class CoffeeItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(name = "country_of_origin", nullable = false)
    private String countryOfOrigin;

    @Column(name = "bean_variety", nullable = false)
    private String beanVariety;

    @Column(length = 1024)
    private String notes;

    @Column(nullable = false)
    private Integer rating;

    public CoffeeItem() {}

    public CoffeeItem(Integer id, LocalDateTime timestamp, String brand, String name, String type, String countryOfOrigin, String beanVariety, String notes, Integer rating) {
        this.id = id;
        this.timestamp = timestamp;
        this.brand = brand;
        this.name = name;
        this.type = type;
        this.countryOfOrigin = countryOfOrigin;
        this.beanVariety = beanVariety;
        this.notes = notes;
        this.rating = rating;
    }
    // Getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCountryOfOrigin() { return countryOfOrigin; }
    public void setCountryOfOrigin(String countryOfOrigin) { this.countryOfOrigin = countryOfOrigin; }

    public String getBeanVariety() { return beanVariety; }
    public void setBeanVariety(String beanVariety) { this.beanVariety = beanVariety; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
}
