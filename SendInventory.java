/*  SendInventory.java
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
import java.lang.Integer;
import java.util.*;
import helpers.*;


public class SendInventory extends HttpServlet {
    	private ServletContext context=null;
	private RequestDispatcher dispatcher = null;
        private String toDo = "";

    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {

         HttpSession session = request.getSession(false);
         if(session!=null)
         {
        String sku = request.getParameter("sku");
        String date = request.getParameter("date");
        int quantity= Integer.parseInt(request.getParameter("quantity"));

       String query="insert into merchandise_out values('"+sku+"','"+date+"',"+quantity+");";
        DBHelper.doUpdate(query);

         query="select on_hand_quantity from on_hand where sku='"+sku+"';";
        Vector<String []> result= DBHelper.doQuery(query);

        int newQt=Integer.parseInt(result.get(0)[0])-quantity;
        query="update on_hand set last_date_modified='"+date+"', on_hand_quantity="+newQt+" where sku='"+sku+"';";
        DBHelper.doUpdate(query);


        List<String> list= new ArrayList<String>();
        list.add("sent");
        list.add(Integer.toString(quantity));
        list.add(sku);
        session.setAttribute("data", list);
        response.sendRedirect("http://jadran.sdsu.edu/jadrn039/success.jsp");

        }
        else
        {
         response.sendRedirect("http://jadran.sdsu.edu/jadrn039/login.html");

        }
    }


}



