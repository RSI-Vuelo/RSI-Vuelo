package com.vuelo.Helicopter20;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelicopterRepository extends MongoRepository<Helicopter, String> {
    Helicopter findByModel(String model);
    List<Helicopter> findAll();
   Helicopter insert(Helicopter helicopter);
}