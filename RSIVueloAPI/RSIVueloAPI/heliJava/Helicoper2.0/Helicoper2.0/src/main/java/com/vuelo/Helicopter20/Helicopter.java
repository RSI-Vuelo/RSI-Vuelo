package com.vuelo.Helicopter20;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Helicopters")
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Helicopter {
    String type;
    @Field
    String model;
    int capacityWeight;
    int crewMax;
    int crewMin;
    double fuselageLength;
    double height;
    double rotorDiameter;
    int maxSpeed;
    String manufacturer;
    String url;
}
