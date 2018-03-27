//What happens when Clock In button is clicked
//0. create new table row, with 3 table data columns (one under name, under clock in , under clock out)
//1. grab name input and append to table
    //grab role input and append to table
//2. grab current time as soon as you click clock in and append it to table
//3. perhaps have a placeholder value to clockout appear until user clicks clock out

//what happens when clock out is clicked
//1. grab current time as soon as user clicks clock out and append to table


var database= firebase.database();
var name = "";
var role= "";
var clockIn = "";
var clockOut= "";



var clock = {
    now:Date.now(),
    add:function (qty, units) {
            switch(units.toLowerCase()) {
                case 'weeks'   :  val = qty * 1000 * 60 * 60 * 24 * 7;  break;
                case 'days'    :  val = qty * 1000 * 60 * 60 * 24;  break;
                case 'hours'   :  val = qty * 1000 * 60 * 60;  break;
                case 'minutes' :  val = qty * 1000 * 60;  break;
                case 'seconds' :  val = qty * 1000;  break;
                default       :  val = undefined;  break;
                }
            return val;
            },
    format:function (timestamp){
            var date = new Date(timestamp);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            // Will display time in xx/xx/xxxx 00:00:00 format
            return formattedTime = month + '/' + 
                                day + '/' + 
                                year + ' ' + 
                                hours + ':' + 
                                minutes.substr(-2) + 
                                ':' + seconds.substr(-2);
            }
};
// console.log(clock.format(clock.now));
//returns 10/8/2015 21:02:16

// console.log(clock.format(clock.now + clock.add(10, 'minutes'))); 
//returns 10/8/2015 21:08:18


$("#clockIn").on("click", function(event){
//    grab data from forms
    event.preventDefault();
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    clockIn= clock.format(clock.now);
    console.log(name, role, clockIn);
    var employee = {
        name: name,
        role: role,
        clockIn: clockIn,
        clockOut: clockOut
    }

    // push data to firebase
    database.ref().push(employee);

    // clear forms
    $("#name").val("");
    $("#role").val("");
})


database.ref().on("child_added", function (childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    $(name).attr("id", childSnapshot.val().name);
    var role = childSnapshot.val().role;
    var clockIn = childSnapshot.val().clockIn;

    $(".table").append("<tr id='"+name+"'><td>" + name + "</td><td>" + role + "</td><td>" + clockIn + "</td>");
})


// time to create results for clock out.... add id to row to be called
$("#clockOut").on("click", function(event){
    event.preventDefault();
    clockOut = clock.format(clock.now)
    name = $("#name").val().trim();
    $("#"+name).append("<td>" + clockOut + "</td>");
    database.ref().set(employee.clockOut)
})
//Firebase stuff....
        