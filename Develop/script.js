//get current time when page opens
var time = moment();
//get 24h time
var curHour = parseInt(time.format("HH"));
//get month date
var curDay = time.format("MMMM Do")
//set date to today's date
$("#currentDay").text(curDay)
//how we're storing the day's tasks
//prototype obj for day's tasks
// tasks = {date: "date", tasks: [{time: 8, task: ""}, task9AM, etc]}

//Try to get stored tasks
var daysTasks = JSON.parse(localStorage.getItem("dailyTasks"))
//If they exist
if (daysTasks) {
    //If they're for today.
    if (daysTasks.date === curDay) {
        //Get tasks
        var taskArray = daysTasks.tasks;
        //set tasks to various time blocks.
        for (let index = 0; index < taskArray.length; index++) {
            const element = taskArray[index];
            const taskClass = "#" + element.time + "Text";
            const task = element.task;
            $(taskClass).text(task);
        }
        //Create new obj if dates don't match
    } else {
        daysTasks = {
            date: curDay,
            tasks: []
        }
    }
    //create new obj is tasks don't exist
} else {
    daysTasks = {
        date: curDay,
        tasks: []
    }
}

//add classes for past/present/future
//working with 24h time, so it's trivial
for (let hour = 9; hour < 18; hour++) {
    var selector = "#" + hour + "Text"
    if (hour === curHour) {
        $(selector).addClass("present");
    } else if (hour < curHour) {
        $(selector).addClass("past");
    } else {
        $(selector).addClass("future");
    }
}

//The on click event when you press the save button
$(".saveBtn").on("click", function () {
    //Get the id of it's parent, so we know what block we're working with
    var timeOfPressedBtn = $(this).parent().prop('id')
    //Set use the selector for the text area related to the button/
    var textAreaSelectorOfBtn = "#" + timeOfPressedBtn + "Text"

    //look in daysTask for a task at hour of pressed button
    //If it exists, modify it and set the taskExists flag.
    var TaskExists = false
    for (let index = 0; index < daysTasks.tasks.length; index++) {
        const element = daysTasks.tasks[index];
        if (element.time === timeOfPressedBtn) {
            element.task = $(textAreaSelectorOfBtn).val();
            TaskExists = true;
        }
    }
    //If not, add a new task for that hour into the daysTasks
    if (!TaskExists) {
        daysTasks.tasks.push({
            time: timeOfPressedBtn,
            task: $(textAreaSelectorOfBtn).val()
        })
    }

    //Saves daysTasks
    localStorage.setItem("dailyTasks", JSON.stringify(daysTasks))




