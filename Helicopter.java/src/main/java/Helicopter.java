import java.util.List;
import java.util.Scanner;

public class Helicopter{
    String type;
    String model;
    double capacityWeight;
    int crewMax;
    int crewMin;
    double fuselageLength;
    double height;
    double rotorDiameter;
    // engineType;

     public void createHelicopter(List<String> types){
         Scanner myScanner = new Scanner(System.in);
         ConnectToDB db = new ConnectToDB();
        System.out.println("What type of helicopter are you adding?");
        type = Format.formatString(myScanner.nextLine());
        System.out.println("What model?");
        model = myScanner.nextLine();
         System.out.println("What is the capacity weight?");
         capacityWeight = Double.parseDouble(Format.formatString(myScanner.nextLine()));
         System.out.println("What is the crew size?");
       crewMax = Integer.parseInt(Format.formatString(myScanner.nextLine()));
         db.writeToFile(this, types);
    }
}
