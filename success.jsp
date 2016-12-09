<%@page import="java.util.*"%>


<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<!--    Eluri,Mounika  Account:  jadrn034
        CS645, Spring 2016
        Project #2
-->
<head>
    <title>Success</title>
    <link rel="stylesheet" type="text/css" href="success.css" />
   
</head>
<body>
	<% 
  List<String> list=(ArrayList<String>)session.getAttribute("data");
if(list!=null){ %>

   <h2> Successfully <%=list.get(0) %> <%=list.get(1) %> item(s) for sku=<%=list.get(2)%> </h2>  
   <a href="/jadrn034/servlet/Login">HOME</a>
   <% } 
else{
    session.invalidate();
  response.sendRedirect("http://jadran.sdsu.edu/jadrn034/login.html");
}
   %> 
    
    </body>

</html>