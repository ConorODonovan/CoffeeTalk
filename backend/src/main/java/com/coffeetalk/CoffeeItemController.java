package com.coffeetalk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class CoffeeItemController {
    private final CoffeeItemService service;

    @Autowired
    public CoffeeItemController(CoffeeItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<CoffeeItem> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoffeeItem> getItemById(@PathVariable Integer id) {
        Optional<CoffeeItem> item = service.getItemById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CoffeeItem addItem(@RequestBody CoffeeItem item) {
        return service.addItem(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Integer id) {
        service.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
