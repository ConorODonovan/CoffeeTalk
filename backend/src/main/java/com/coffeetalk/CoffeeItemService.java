package com.coffeetalk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoffeeItemService {
    private final CoffeeItemRepository repository;

    @Autowired
    public CoffeeItemService(CoffeeItemRepository repository) {
        this.repository = repository;
    }

    public List<CoffeeItem> getAllItems() {
        return repository.findAll();
    }

    public Optional<CoffeeItem> getItemById(Integer id) {
        return repository.findById(id);
    }

    public CoffeeItem addItem(CoffeeItem item) {
        return repository.save(item);
    }

    public void deleteItem(Integer id) {
        repository.deleteById(id);
    }
}
