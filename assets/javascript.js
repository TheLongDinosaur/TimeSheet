
var database= firebase.database();
var name = "";
var role= "";
var clockIn = "";
var clockOut= "";


$("#clockIn").on("click", function(event){
    event.preventDefault();
    name = $("#name").val();
    role = $("#role").val();
    clockIn= $("#clockIn").val();
})