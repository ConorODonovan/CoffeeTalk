package com.coffeetalk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoffeeItemRepository extends JpaRepository<CoffeeItem, Integer> {
}
