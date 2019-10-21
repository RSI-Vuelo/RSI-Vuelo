package com.vuelo.Helicopter20;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = {"com.vuelo.Helicopter20"})
public class MongoConfig {



}
