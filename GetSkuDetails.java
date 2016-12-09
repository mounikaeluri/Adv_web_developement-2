/*  GetSkuDetails.java
  Eluri,Mounika
    Account:  jadrn034
    CS645
    Project #2
    Spring 2016
 */

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.Vector;
import sdsu.*;
import helpers.*;


public class GetSkuDetails extends HttpServlet {
    	private ServletContext context=null;
	private RequestDispatcher dispatcher = null;
        private String toDo = "";

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {


        HttpSession session = request.getSession(false);
        String responseString="";

        if(session!=null)
        {
            String sku = request.getParameter("sku");
            String query="select vendor.name, category.name, mfdid from products, vendor, category  where sku='"+sku+"' and products.vendorid=vendor.id and products.catid=category.id;";
            Vector<String []> result = DBHelper.doQuery(query);


            if(result.size()>0)
            {

             String[] row=result.get(0);

             for(String column: row)
             {
                responseString+=column+",";
             }
            query="select on_hand_quantity from on_hand where sku='"+sku+"';";
            result= DBHelper.doQuery(query);
            if(result.size()>0)
            {
               int qt= Integer.parseInt(result.get(0)[0]);
                if(qt>0)
                {
                    responseString+=Integer.toString(qt);
                }
                 else
                {
                     responseString+="null";
                }

            }
            else
            {
                 responseString+="null";
            }
         }


        }

        else
        {
           responseString="Logout";
        }

         response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
         response.getWriter().write(responseString);
    }
}



