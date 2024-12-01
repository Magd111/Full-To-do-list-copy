var users = [
  { name: "aya", isStudent: true, id: 1 },
  { name: "ali", isStudent: false, id: 2 },
  { name: "ahmed", isStudent: true, id: 3 },
  { name: "sara", isStudent: false, id: 4 },
];
//for of
// for(var user of users){
//   console.log(user.id)
// }

//filter
// var filteredArr =users.filter(function(user){
//   return user.isStudent == true
// })
// console.log(filteredArr)

// var filteredArr =users.filter(function(x){
//   return x.isStudent == true&&x.name=='aya'&&x.id==1
// })
// console.log(filteredArr)

//findindex

// var foundedIndex = users.findIndex(function(user){
//   return user.id==5 //-->مش موجود يعطي -1
// })
// console.log(foundedIndex)

//ternay operator

// var x = 5
// if(x>10){
//   console.log('x>10')
// }
// else{
//   console.log('x<10');
// }

// conditin?true:false

// x>10?console.log('x>10'):console.log('x<10');//-->متل if condition تستخدم داخل html

/////////////////////////////////////////////////////////////start workshop/////////////////////

///////////////////////////////////////-------------select elements---------------//////////

var addBtn=document.querySelector("#addBtn");

var taskInput=document.querySelector("#taskInput");

var mySelect=document.querySelector("#mySelect");

var searchInput=document.querySelector("#searchInput");

var todos = [];

if (localStorage.getItem("allTodos") != null) { //--> check if there is data in local storage
  todos = JSON.parse(localStorage.getItem("allTodos")) //--> تحول string الي object 
  displayData(todos)
} //--> لظهور المخزن في localStorage على الصفحة

addBtn.addEventListener("click" , function(){
  addTodo()
})

function addTodo(){
  var task ={
    taskDetails:taskInput.value,
    isCompleted:false,
    id:`${Math.random()*10000}-${Math.random()*10000}` //--> لظهور رقم عشوائي الى 10000-10000 //--> لاستخدامها مع الحذف و التعديل و البحث
  }
todos.push(task)
localStorage.setItem("allTodos" ,JSON.stringify(todos)); //--> JSON.stringify بتحول الاوبجكت الى string
console.log(todos);
displayAccordingSelectValue()
clear()
}

function displayData(arr){
var cartona="";
for(var task of arr){
  cartona += 
`<div class="tasks my-3 rounded text-light d-flex justify-content-between px-3 py-2 align-items-center ${task.isCompleted==true?"bg-task":""}">
  <div class="task d-flex">
      <i class="fa-regular fa-circle-check" onclick="beCompleted('${task.id}')"></i>
      <p class="task-text m-0 p-0 align-self-center ${task.isCompleted==true?"completed":""}">${task.taskDetails}</p>
  </div>
  <div>
      <i class="fa-solid fa-trash mx-2" onclick="deleteTodo('${task.id}')"></i>
  </div> 
</div>`
}
document.querySelector("#tasks").innerHTML=cartona
}


function beCompleted(idd){
  console.log(idd);
  var foundedIndex = todos.findIndex(function (task) {
    return task.id == idd
  })
  todos[foundedIndex].isCompleted = todos[foundedIndex].isCompleted == true?false:true; //-->if true then false else true
  localStorage.setItem("allTodos" , JSON.stringify(todos));
  displayAccordingSelectValue()
}


mySelect.onchange = function(){
  displayAccordingSelectValue()
}


function displayAccordingSelectValue(){
  var selectedValue = mySelect.options[mySelect.options.selectedIndex].value;
  switch(selectedValue){
    case "all":
      displayData(todos);
      break;
      case "completed":
        var completedTask = todos.filter(function (check){
          return check.isCompleted == true
        })
        displayData(completedTask);
        break;
        case "uncompleted":
          var unCompletedTask = todos.filter(function(check){
            return check.isCompleted == false
          })
          displayData(unCompletedTask);
  }
}

function deleteTodo(idd){
  var foundedIndex = todos.findIndex(function (task) {
    return task.id == idd //-->عند الضغط يقارن بين ال id المضغوط عليه و بين ال id الموجود في المصفوفة
  })
  todos.splice(foundedIndex,1);
  displayAccordingSelectValue()
  localStorage.setItem("allTodos" , JSON.stringify(todos))
}

//search
searchInput.oninput = function(e){ //-->أي حرف يضغط عليه في input يبحث عنه في المصفوفة
  // console.log(e.target.value);  تحديد المسار 
  var searchArr = [];
  for (var i=0 ; i<todos.length ; i++){
    if (todos[i].taskDetails.includes(e.target.value)){ //--> عند الكتابة في input يقارن ب استخدام includes() بين ال input و بين المصفوفة
      searchArr.push(todos[i])
    }
    displayData(searchArr)
  }
}


function clear(){
  taskInput.value=null;
}














///////////////////////////////////////////////add todo////////////////////////////////////////////////////


