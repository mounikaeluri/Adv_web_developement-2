/*  Login.java
    Eluri,Mounika
    Account:  jadrn034
    CS645
    Project #2
    Spring 2016
 */

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class Login extends HttpServlet {
    	private ServletContext context=null;
	private RequestDispatcher dispatcher = null;
        private String toDo = "";

    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if(PasswordUtilities.isValidLogin(username,password)) {
            toDo = "/WEB-INF/jsp/home.jsp";
            HttpSession session = request.getSession(true);
             session.setAttribute("user", username);
            }
        else
            toDo = "/WEB-INF/jsp/login_err.jsp";
        context = getServletContext();
        dispatcher = request.getRequestDispatcher(toDo);
        dispatcher.forward(request, response);
    }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {

        HttpSession session = request.getSession(false);
        if(session!=null)
        {
            toDo = "/WEB-INF/jsp/home.jsp";
            context = getServletContext();
            dispatcher = request.getRequestDispatcher(toDo);
            dispatcher.forward(request, response);
        }
        else
        {
            response.sendRedirect("http://jadran.sdsu.edu/jadrn039/login.html");
        }

    }
}



