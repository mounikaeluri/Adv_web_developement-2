/*Eluri,Mounika   Account:  jadrn034
CS645, Spring 2016
Project #2 */

var onhandQt;

$(document).ready(function () {

    // checkLoginStatus();
    $("#tabs").tabs();

    document.getElementById("submitbutton").disabled = true;
    document.getElementById("rsubmitbutton").disabled = true;

    document.getElementById("clearbutton").addEventListener("click", clearform);
    document.getElementById("rclearbutton").addEventListener("click", rclearform);

    document.getElementById("sendInventory").onsubmit = validateQt;
    document.getElementById("receiveInventory").onsubmit = validateRQt

    $("#sku").keydown(addSKUFormat);
    $("#rsku").keydown(addRSKUFormat);

   $("#quantity").keydown(clearQt);
   $("#rquantity").keydown(clearRQt);

    document.getElementById("sku").onblur = GetSkuDetails;
    document.getElementById("sku").onfocus = clearError;

    document.getElementById("rsku").onblur = rGetSkuDetails;
    document.getElementById("rsku").onfocus = rclearError;


    $("#date").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#rdate").datepicker({ dateFormat: 'yy-mm-dd' });
    setDate();

});

function setDate() {
    var today = new Date();   //adapted from stackoverflow.com
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }


    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("date").value = today;
    document.getElementById("rdate").value = today;
}

function validateQt() {
    var quantity = document.getElementById("quantity").value;
    var status = document.getElementById("qtstatus");

    if (quantity != "") {
        var pattern = new RegExp("^[0-9]+$");
        if (!pattern.test(quantity)) {
            status.innerHTML = "Quantity must be a valid number";
            status.style.display = "inline";
            return false;
        }
        if(parseInt(quantity)<=0){
            status.innerHTML = "Quantity must be greater than 0";
            status.style.display = "inline";
            return false;
        }
        if (parseInt(quantity) > onhandQt) {
            status.innerHTML = "Quantity to send cannot be greater than the on hand quantity";
            status.style.display = "inline";
            return false;
        }
        return true;
    }
}

function clearQt() {
    var status = document.getElementById("qtstatus");
    status.style.display = "none";
    status.innerHTML = "";
}

function clearRQt() {
    var status = document.getElementById("rqtstatus");
    status.style.display = "none";
    status.innerHTML = "";

}

function validateRQt() {
    var quantity = document.getElementById("rquantity").value;
    var status = document.getElementById("rqtstatus");

    if (quantity != "") {
        var pattern = new RegExp("^[0-9]+$");
        if (!pattern.test(quantity)) {
            status.innerHTML = "Quantity must be a valid number";
            status.style.display = "inline";
            return false;
        }
        if (parseInt(quantity) <= 0)
        {
            status.innerHTML = "Quantity must be greater than 0";
            status.style.display = "inline";
            return false;
        }
        return true;
    }

}


function clearError() {
    document.getElementById("skustatus").style.display = "none";
    document.getElementById("submitbutton").disabled = true;
}

function rclearError() {
    document.getElementById("rskustatus").style.display = "none";
    document.getElementById("rsubmitbutton").disabled = true;
}

function detectEnterKey(event) {
    var key = event.keyCode || event.charCode;
    if (key == 13) {

    }
}

function GetSkuDetails() {
    document.getElementById("submitbutton").disabled = true;
    if (validateSKU()) {

        var sku = document.getElementById("sku").value;
        $.get('http://jadran.sdsu.edu/jadrn039/servlet/GetSkuDetails?sku=' + sku, populateSendInventory);
    }
    else {
        document.getElementById("sku").focus();
    }
}

function rGetSkuDetails() {
    document.getElementById("rsubmitbutton").disabled = true;
    if (rvalidateSKU()) {
        var sku = document.getElementById("rsku").value;
        $.get('http://jadran.sdsu.edu/jadrn039/servlet/GetSkuDetails?sku=' + sku, populateReceiveInventory);
    }
    else {
        document.getElementById("rsku").focus();
    }
}

function populateSendInventory(response) {

    if (response.length > 0) {


        if (response == "Logout")
        {
            clearform();
            window.location = "http://jadran.sdsu.edu/jadrn039/login.html";
            return;
        }
        var values = response.split(',');
        var vendor = values[0];
        var category = values[1];
        var mfid = values[2];
        if (values[3] == "null") {
            document.getElementById("skustatus").innerHTML = "There is no on hand quantity to send";
            document.getElementById("skustatus").style.display = "inline";
            document.getElementById("submitbutton").disabled = true;
            return;
        }

        onhandQt = parseInt(values[3]);
        var sku = document.getElementById("sku").value;

        document.getElementById("vendor").value = vendor;
        document.getElementById("category").value = category;
        document.getElementById("manufactureid").value = mfid;
        document.getElementById("pic").setAttribute("src", "/~jadrn039/proj1/file_upload/_tk_images/" + sku.toLowerCase() + ".jpg");
        document.getElementById("pic").style.visibility = 'visible';
        document.getElementById("submitbutton").disabled = false;
    }
    else {
        document.getElementById("skustatus").innerHTML = "SKU does not exist";
        document.getElementById("skustatus").style.display = "inline";
        document.getElementById("submitbutton").disabled = true;
    }
}

function populateReceiveInventory(response) {
    if (response.length > 0) {

        if (response == "Logout") {
            rclearform();
            window.location = "http://jadran.sdsu.edu/jadrn039/login.html";
            return;
        }
        var values = response.split(',');
        var vendor = values[0];
        var category = values[1];
        var mfid = values[2];

        document.getElementById("rvendor").value = vendor;
        document.getElementById("rcategory").value = category;
        document.getElementById("rmanufactureid").value = mfid;
        document.getElementById("rsubmitbutton").disabled = false
        var sku = document.getElementById("rsku").value;
        document.getElementById("rpic").setAttribute("src", "/~jadrn039/proj1/file_upload/_tk_images/" + sku.toLowerCase() + ".jpg");
        document.getElementById("rpic").style.visibility = 'visible';
    }
    else {
        document.getElementById("rskustatus").innerHTML = "SKU does not exist";
        document.getElementById("rskustatus").style.display = "inline";
        document.getElementById("rsubmitbutton").disabled = true;
    }

}


function addSKUFormat(event) {         // adapted from http://stackoverflow.com/questions/9906885/detect-backspace-and-del-on-input-event

    document.getElementById("vendor").value = "";
    document.getElementById("category").value = "";
    document.getElementById("manufactureid").value = "";
    document.getElementById("pic").setAttribute("src", "");
    document.getElementById("pic").style.visibility = 'hidden';

    var key = event.keyCode || event.charCode;
    if (key != 8 && key != 9 && key != 46) {

        var sku = document.getElementById("sku");

        if (sku.value.length > 6) {
            sku.value = sku.value.substring(0, sku.value.length - 1);
        }
        sku.value = sku.value.toUpperCase();
        if (sku.value.length == 3) {
            sku.value = sku.value + "-";
        }

    }
}

function addRSKUFormat(event) {         // adapted from http://stackoverflow.com/questions/9906885/detect-backspace-and-del-on-input-event
    document.getElementById("rvendor").value = "";
    document.getElementById("rcategory").value = "";
    document.getElementById("rmanufactureid").value = "";
    document.getElementById("rpic").setAttribute("src", "");
    document.getElementById("rpic").style.visibility = 'hidden';

    var key = event.keyCode || event.charCode;
    if (key != 8 && key != 9 && key != 46) {

        var sku = document.getElementById("rsku");

        if (sku.value.length > 6) {
            sku.value = sku.value.substring(0, sku.value.length - 1);
        }
        sku.value = sku.value.toUpperCase();
        if (sku.value.length == 3) {
            sku.value = sku.value + "-";
        }

    }
}

function clearform() {
    document.getElementById("sendInventory").reset();
    document.getElementById("pic").style.display = "none";
}
function rclearform() {
    document.getElementById("receiveInventory").reset();
    document.getElementById("rpic").style.display = "none";
}

function validateSKU() {

    var sku = document.getElementById("sku").value;
    if (sku == "") {
        return false;
    }
    var pattern = new RegExp("^[A-Z]{3}-[0-9]{3}$");
    if (!pattern.test(sku)) {

        document.getElementById("skustatus").innerHTML = "SKU must be of the format ABC-123";
        document.getElementById("skustatus").style.display = "inline";
        return false;
    }

    document.getElementById("skustatus").style.display = "none";
    return true;
}

function rvalidateSKU() {
    var sku = document.getElementById("rsku").value;
    if (sku == "") {
        return false;
    }
    var pattern = new RegExp("^[A-Z]{3}-[0-9]{3}$");
    if (!pattern.test(sku)) {

        document.getElementById("rskustatus").innerHTML = "SKU must be of the format ABC-123";
        document.getElementById("rskustatus").style.display = "inline";
        return false;
    }

    document.getElementById("rskustatus").style.display = "none";
    return true;

}

