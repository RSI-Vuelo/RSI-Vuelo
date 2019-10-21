package com.vuelo.Helicopter20;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;

import java.io.DataInput;
import java.io.IOException;
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
    public Response createHelicopter(@RequestBody String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Response response = new Response();
        try {
            helicopterRepository.insert(objectMapper.readValue(json, Helicopter.class));
        }catch(DataAccessException dae){
            response.setStatus(500);
            response.setMessage("Failed to insert");
            return response;
        }
        catch(JsonMappingException jme){
            response.setStatus(500);
            response.setMessage("Incorrect JSON");
            return response;
        }
        catch(Exception e){
            response.setStatus(500);
            response.setMessage("Unknown error");
            return response;
        }
        response.setStatus(200);
        response.setMessage("Helicopter Successfully Inserted");
        return response;
    }


    @RequestMapping("/Helicopter/{model}")
    public  String getHelicopterByModel(@PathVariable String model){
        Helicopter h = helicopterRepository.findByModel(model);
        return h.toString();
    }

}
