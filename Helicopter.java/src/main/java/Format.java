public class Format {
    public static String formatString(String input){
        input = input.trim();
        String result = " ";
        String words[] = input.split(" ");
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
           // System.out.println("singular word separated by space: " + word);
            word = word.toLowerCase();
            //System.out.println("Word should be lowercase: " + word);
            String letter1 = word.substring(0, 1);
           // System.out.println("this is  the first letter of each word: " + letter1);
            letter1 = letter1.toUpperCase();
           // System.out.println("this is  the first letter capitalized of each word: " + letter1);
            word = letter1.concat(word.substring(1));
           // System.out.println("completed word: " + word);
            words[i] = word;
        }
        if(words.length >1) {
            for (int i = 0; i < words.length - 1; i++) {
                String space = " ";
                words[i] = words[i].concat(space);
                result = words[i].concat(words[i + 1]);
            }
        }
        else {
            result = words[0];
        }
        //System.out.println("printing resulting string: " + result);
        return result;
    }
}

