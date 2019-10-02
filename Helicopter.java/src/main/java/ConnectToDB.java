import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

public class ConnectToDB {
    String dbName = "Helicopter";
     int port = 27017;
     boolean creating = false;
    private static MongoDatabase database;
    public void connect(){
        MongoClient mongo;
        String host = "localhost";
        try {
           mongo = new MongoClient(host, port);
            database = mongo.getDatabase(dbName);
        }
        catch (Error e){
            System.out.println("Error: " + e);
        }
        if(creating == false) {
            createTypeList();
            System.out.println("success!!");
        }
    }

    void createTypeList( ){
        System.out.println("this is where we create a list of the types of helicopters");
        MongoIterable<String> typeOfHelicopters;
        typeOfHelicopters = database.listCollectionNames();
        GetHelicopterTypes helicopterTypes;
        helicopterTypes = new GetHelicopterTypes(typeOfHelicopters);
        //check for existance
    }

    static void writeToFile (Helicopter helicopter, List<String> typeOfHelicopters){
        if(typeOfHelicopters.contains(helicopter.type)){
            Document helicopter_document = new Document()
                    .append("type",helicopter.type)
                    .append("model",helicopter.model)
                    .append("capacity weight", helicopter.capacityWeight)
                    .append("crew max", helicopter.crewMax);
            MongoCollection<Document> collection = database.getCollection(helicopter.type);
            collection.insertOne(helicopter_document);

        } else{
            database.createCollection((String) helicopter.type);
            Document helicopter_document = new Document()
                    .append("type",helicopter.type)
                    .append("model",helicopter.model)
                    .append("capacity weight", helicopter.capacityWeight)
                    .append("crew max", helicopter.crewMax);
            MongoCollection<Document> collection = database.getCollection(helicopter.type);
            collection.insertOne(helicopter_document);
        }


    }

    static void displayHelicoptersOfTypes(String type){
        MongoCollection<Document> collection = database.getCollection(type);
        FindIterable<Document> iterDoc = collection.find();
        int i = 1;
        Iterator it = iterDoc.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
            i++;
        }
        displayHelicopterOfModel(collection);
    }

    static void displayHelicopterOfModel(MongoCollection<Document> collection) {
        // display a selected model
//TODO:  be able to call create function from within an existing collection
        Scanner myScanner = new Scanner(System.in);
        System.out.println("what model are you looking for?");
        String result = myScanner.nextLine();
        FindIterable<Document> foundData = null;
        try {
            foundData = collection.find(Filters.eq("model", result));
        } catch (Error e) {
            System.out.println("Error occurred, " + e + " didn't find model.");
        }
        // needing to print out the document
        Iterator iter = foundData.iterator();
        while(iter.hasNext()){
            if(foundData != null) {
                System.out.println("found " + iter.next());
            }
            else {
                System.out.println(iter.next());
                if (GetHelicopterTypes.isCreatingHelicopter(myScanner)) {
                    Helicopter helicopter = new Helicopter();
                   // helicopter.createHelicopter();
                  }
            }
        }

    }
}
