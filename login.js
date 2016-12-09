/*Eluri,Mounika    Account:  jadrn034
CS645, Spring 2016
Project #2 */

$(document).ready(function () {
    document.getElementById("resetButton").addEventListener("click", clearform);
});

function clearform()
{
    document.getElementById("loginform").reset();
    document.getElementById("invalidlogin").hidden = true;
}



