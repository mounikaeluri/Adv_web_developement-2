<%@ page session="false" %>

<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<!--     Eluri,Mounika  Account:  jadrn034
        CS645, Spring 2016
        Project #2
-->
<head>
    <title>
        Login Page
    </title>
    <link rel="stylesheet" type="text/css" href="/jadrn034/login.css" />
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript" src="/jquery/jQueryUI.js"></script>
    <script src="/jadrn034/login.js"></script>
</head>
<body>
    <h1>Teekay's Online Inventory</h1>
    <div id="container">

        <form id="loginform" name="loginform" method="post" action="/jadrn034/servlet/Login">
            <div>
            <label> Username:</label> <input type="text" name="username" required=required autofocus /> 
        </div>
        <div>
            <label> Password:</label>  <input type="password" name="password" required=required />
        </div>

            <input type="button" id="resetButton" value="Reset" />
            <input type="submit"  value="Login" />

            <p id="invalidlogin"> Invalid Credentials</p>

        </form>


    </div>
</body>

</html>
