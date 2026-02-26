package com.coffeetalk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initData(CoffeeItemRepository repository) {
        return args -> {
            repository.save(new CoffeeItem(null, LocalDateTime.now(), "Mocha Bros", "Sunrise", "Espresso", "Italy", "Arabica", "Rich and smooth.", 5));
            repository.save(new CoffeeItem(null, LocalDateTime.now(), "Latte Co", "Velvet", "Latte", "France", "Robusta", "Creamy and bold.", 4));
            repository.save(new CoffeeItem(null, LocalDateTime.now(), "Espresso Express", "Harmony", "Espresso", "Brazil", "Arabica", "Balanced and nutty.", 5));
        };
    }
}
