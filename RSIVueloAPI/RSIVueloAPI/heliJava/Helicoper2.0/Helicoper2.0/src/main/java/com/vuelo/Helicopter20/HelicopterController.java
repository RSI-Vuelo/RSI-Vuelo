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
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.DataInput;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.List;

@CrossOrigin
@RestController
public class HelicopterController {

    @Autowired
    HelicopterRepository helicopterRepository;

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }



    @RequestMapping("/api/helicopter")
    public  String getAllHelicopters() throws JsonProcessingException {
        List<Helicopter> h = helicopterRepository.findAll();
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(h);
        return json;
    }

    @PostMapping("/Helicopter/createHeli")
    public Helicopter createHelicopter(@RequestBody Helicopter heli, HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        httpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        httpResponse.setHeader("Access-Control-Allow-Headers", "*");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Max-Age", "4800");
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
