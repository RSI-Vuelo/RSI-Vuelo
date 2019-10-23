package com.vuelo.Helicopter20;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;

import java.io.DataInput;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.List;


@RestController
public class HelicopterController {

    @Autowired
    HelicopterRepository helicopterRepository;

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/getAll")
    public  String getAllHelicopters() throws JsonProcessingException {

        List<Helicopter> h = helicopterRepository.findAll();

        //Output to front end
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(h);

        //Read and convert to object from frontend
       // List<Helicopter> h2 =  objectMapper.readValue( json , objectMapper.getTypeFactory()
             //   .constructCollectionType(List.class, Helicopter.class));
        return json;
        // return heliRepo.findByModel(model);
    }

    @PostMapping("/Helicopter/createHeli")
    public Helicopter createHelicopter(@RequestBody Helicopter heli) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

            helicopterRepository.insert(heli);

            return heli;

    }


    @RequestMapping("/Helicopter/{model}")
    public  String getHelicopterByModel(@PathVariable String model){
        Helicopter h = helicopterRepository.findByModel(model);
        return h.toString();
    }

}
