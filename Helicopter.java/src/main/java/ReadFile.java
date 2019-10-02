import java.io.*;

public class ReadFile {
    public ReadFile(File file){
        this.fileName = file;
    }

    public File getFileName() {
        return fileName;
    }

    public void setFileName(File fileName) {
        this.fileName = fileName;
    }

    File fileName;
    void readFile(){
        String line = null;
        try {
            // FileReader reads text files in the default encoding.
            FileReader fileReader = new FileReader(fileName);
            // wrap FileReader in BufferedReader.
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            printFile(line, bufferedReader);
            // close files.
            bufferedReader.close();
        }
        catch(
                FileNotFoundException ex) {
            System.out.println(
                    "Unable to open file '" +
                            fileName + "'");
        }
        catch(
                IOException ex) {
            System.out.println(
                    "Error reading file '"
                            + fileName + "'");
            // Or we could just do this:
            // ex.printStackTrace();
        }
    }

      private void printFile(String line, BufferedReader reader) throws IOException {
         while((line = reader.readLine()) != null) {
             // need to make helicopter types here.
             System.out.println(line);
         }
     }
}

