package encrypt;

import java.security.*;
import java.util.*;
import java.io.*;
import helpers.*;
public class PasswordUtilities {
   // private static final String passwordFileName =
     //   "passwords.dat";
        
    public static boolean isValidLogin(String username, String password) {
       //Vector<String> userData = new Vector<String>(); 
     //  String inLine;
      /* try {    
        BufferedReader reader = new BufferedReader
               (new FileReader(passwordFileName));
           while((inLine = reader.readLine()) != null)
               userData.add(inLine);
           reader.close();  
            }
        catch(Exception e) {
            throw new RuntimeException("Error reading password file!");
            }*/

		
	String s_query = "SELECT password FROM pswd WHERE username=\"" + username + "\"";
	Vector<String []> tmp = DBHelper.doQuery(s_query);
			
			
       String encryptedPassword = getEncryptedPassword(password);     
   
            if( tmp.get(0)[0].equals(encryptedPassword)) 
                return true;                             
              // end for
        return false;
        }
        
    public static String getEncryptedPassword(String str) {   
        try {  
            MessageDigest d = MessageDigest.getInstance("MD5");
            byte [] b = str.getBytes();     
            d.update(b);
            return  byteArrayToHexString(d.digest());
            }
        catch(Exception e) {
            e.printStackTrace();               
            }
    return null;
    }          
    
    private static String byteArrayToHexString(byte[] b){
        String str = "";
        for(int i=0; i < b.length; i++) {
            int value = b[i] & 0xFF;
            if(value < 16)
                str += "0";
            str += Integer.toHexString(value);
            }
        return str.toUpperCase();
        }   
	
        
    /*public static boolean addEntryToPasswordFile(String username, String password) {
        try {
            Properties p = new Properties();
            FileInputStream in = new FileInputStream(passwordFileName);
            p.load(in);
            in.close();
            String encryptedPassword = getEncryptedPassword(password);
            p.setProperty(username, encryptedPassword);
            
            FileOutputStream out = new FileOutputStream(passwordFileName);
            p.store(out, "password file");
            out.close();
            return true;
            }
        catch(Exception e) {
            e.printStackTrace();
            return false;
            }
        }	 
	
 /*  public static void main(String [] args) {
   Boolean flag = isValidLogin("cs645","sp2016");
System.out.println(flag);   
	}
	*/
   	            
}            
