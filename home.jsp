<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<!--    Eluri,Mounika  Account:  jadrn034
        CS645, Spring 2016
        Project #2
-->
<head>
    <meta charset="utf-8" />
    <title>Teekay's Online Inventory</title>

    <link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.0/themes/base/jquery-ui.css" />
    <link type="text/css" rel="stylesheet" href="/jadrn034/home.css" />
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript" src="/jquery/jQueryUI.js"></script>
    <script type="text/javascript" src="/jadrn034/home.js"></script>
</head>

<body>

    <h1>Online Inventory</h1>

    <div id="logout">
        <p id="welcome">Welcome <%= session.getAttribute("user") %>,</p>
        <a href="/jadrn034/servlet/Logout">Logout</a>
    </div>


    <div id="tabs">
        <ul>
            <li><a href="#tabs-1">Send Inventory</a></li>
            <li><a href="#tabs-2">Receive Inventory</a></li>
        </ul>

        <div id="tabs-1">
            <br />
            <h2>Send Inventory</h2>
            <form id="sendInventory" name="sendInventory" method="post" action="/jadrn034/servlet/SendInventory">
                <div>
                    <label>Date:</label> <input type="text" name="date" id="date" required=required readonly="readonly" />
                </div>

                <div>
                    <label>SKU:</label> <input type="text" id="sku" name="sku" autofocus required=required /> <p id="skustatus">SKU doesn't exists</p>
                </div>

                <div>
                    <label>Vendor:</label> <input type="text" name="vendor" id="vendor" readonly=readonly />
                </div>

                <div>
                    <label>Category:</label> <input type="text" name="category" id="category" readonly=readonly />
                </div>

                <div>
                    <label>Manufacturer's ID:</label> <input type="text" name="manufactureid" id="manufactureid" readonly=readonly />
                </div>

                <div>
                    <label>Product Image:</label><div class="img"><img id="pic" /></div>
                </div>

                <div>
                    <label>Quantity:</label> <input type="number" name="quantity" id="quantity" required=required /> <p id="qtstatus"></p>
                </div>
                
                <input type="button" id="clearbutton" value="Reset" />
                <input type="submit" id="submitbutton" value="Submit" />
            </form>
        </div>

        <div id="tabs-2">
            <br />
            <h2>Receive Inventory</h2>
            <form id="receiveInventory" name="receiveInventory" method="post" action="/jadrn034/servlet/ReceiveInventory">

                <div>
                    <label>Date:</label> <input type="text" name="date" id="rdate" required=required readonly="readonly" />
                </div>

                <div>
                    <label>SKU:</label> <input type="text" id="rsku" name="sku" autofocus required=required /> <p id="rskustatus">SKU doesn't exist</p>
                </div>

                <div>
                    <label>Vendor:</label> <input type="text" name="vendor" id="rvendor" readonly=readonly />
                </div>

                <div>
                    <label>Category:</label> <input type="text" name="category" id="rcategory" readonly=readonly />
                </div>

                <div>
                    <label>Manufacturer's ID:</label> <input type="text" name="manufactureid" id="rmanufactureid" readonly=readonly />
                </div>

                <div>
                    <label>Product Image:</label><div class="img"><img id="rpic" /></div>
                </div>

                <div>
                    <label>Quantity:</label> <input type="number" name="quantity" id="rquantity" required=required /> <p id="rqtstatus"></p>
                </div>
                <input type="button" id="rclearbutton" value="Reset" />
                <input type="submit" id="rsubmitbutton" value="Submit" />
            </form>
        </div>


    </div>
</body>
</html>
