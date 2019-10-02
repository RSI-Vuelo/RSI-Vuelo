import java.io.FileNotFoundException;
import java.util.Scanner;

//ToDo: check data entry field are in the right format
public class Main {
    public static void main(String args[]) throws FileNotFoundException {
        //connecting to database
      ConnectToDB conn = new ConnectToDB();
        conn.connect();
        //----------------------------------------------------------------------

        // scanner to allow INPUT
        Scanner myScanner = new Scanner(System.in);

        //----------------------------------------------------------------------
       // ArrayList<String> typeList = new ArrayList<String>();
         //   FileInputStream pathName = new FileInputStream(new File("C:\\Users\\tommie.walker\\IdeaProjects\\Helicopter.java\\src\\main\\java\\Helicopter_List.xlsx"));
          //  Excel excel = new Excel(pathName);
            //read entire exel file.
           // excel.readExel();
    }
}


