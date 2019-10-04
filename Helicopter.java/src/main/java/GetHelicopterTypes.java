
import com.mongodb.client.MongoIterable;

import java.util.*;

public class GetHelicopterTypes {
    public GetHelicopterTypes(MongoIterable types) {
        ConnectToDB db = new ConnectToDB();
        Scanner myScanner = new Scanner(System.in);
        Iterator itr = types.iterator();
        System.out.println("the type of helicopters include:");
        List<String> helicopterTypes = new ArrayList<>();
        while (itr.hasNext()) {
            String type = (String) itr.next();
            System.out.println(type);
            helicopterTypes.add(type);
        }
        //taking user input to search for helicopter type
        System.out.println("what type of helicopter are you looking for?");
        // format the user input string
        String inputHelicopterType = Format.formatString(myScanner.nextLine());
        if (helicopterTypes.contains(inputHelicopterType)) {
            System.out.println("Helicopter type found");
            db.displayHelicoptersOfTypes(inputHelicopterType);
        } else /*helicopter not found */{
            if (isCreatingHelicopter(myScanner)) {
                Helicopter helicopter = new Helicopter();
                helicopter.createHelicopter(helicopterTypes);
            } else {
                //doFalse
            }
        }
    }
    public static boolean isCreatingHelicopter(Scanner myScanner) {
        System.out.println("Helicopter not found: would you like to create one?");
        String result = Format.formatString(myScanner.nextLine());
        return result.equals(Format.formatString("y")) || result.equals(Format.formatString("yes"));
    }
}



