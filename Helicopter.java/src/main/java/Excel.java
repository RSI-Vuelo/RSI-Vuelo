/*public class Excel {
 public Excel(FileInputStream file){
     this.pathName = file;
 }
    public FileInputStream getExelName() {
        return pathName;
    }

    public void setPathName(FileInputStream pathName) {
        this.pathName = pathName;
    }

 FileInputStream pathName;
 List readExel(){
     // reading exel file
     ArrayList<String> typeList = new ArrayList<String>();
    // List typeOfHelicopters = null;
     try {

         //obtaining input bytes from a file
         FileInputStream fileInputStream = new FileInputStream(pathName.getFD());
         // Creating workbook instance that refers to the excel file
         XSSFWorkbook wb = new XSSFWorkbook(fileInputStream);
         //creating a Sheet object to retrieve the object
         XSSFSheet sheet = wb.getSheetAt(0);
         //evaluating cell types
         FormulaEvaluator formulaEvaluator = wb.getCreationHelper().createFormulaEvaluator();
         for (Row row : sheet)     //iteration over row using for each loop
         {
            if(row.getRowNum() > 0 ) {
                typeList = (ArrayList<String>) getType(sheet, row, typeList);
            }
             for ( Cell cell : row)    //iteration over cell using for each loop
             {
                 switch (formulaEvaluator.evaluateInCell(cell).getCellTypeEnum()) {
                     case NUMERIC: //field that represents numeric cell type
                         // getting the value of the cell as a number
                         System.out.print(cell.getNumericCellValue() + "\t");
                         break;
                     case STRING: //field that represents string cell type
                         //getting the value of the cell as a string
                         System.out.print(cell.getStringCellValue()+"\t" );
                         break;
                     case BOOLEAN: //field that represents boolean cell type
                         //getting the value of the cell as a boolean
                         System.out.print(cell.getBooleanCellValue() +"\t");
                 }
             }
             System.out.println();
         }
         
         //GetHelicopterTypes helicopterTypes = new GetHelicopterTypes((MongoIterable) typeOfHelicopters);

     } catch (
             FileNotFoundException e) {
         e.printStackTrace();
     } catch (
             IOException e) {
         e.printStackTrace();
     }
     return typeList;
 }
 List getType(XSSFSheet sheet, Row row, ArrayList<String> typeList){
     sheet.getRow(0); //returns the logical row
     row.getCell(0); //getting the cell representing the given column
     Cell type = row.getCell(0);
     String value = type.getStringCellValue();    //getting cell value
     //add the type of helicopter to the list.
     typeList.add(value);
     // check for the category here: to come later
     return typeList;
 }

}
*/