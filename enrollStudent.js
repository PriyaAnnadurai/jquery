$(document).ready(function(){
    //student array with values
    var students=[
        {firstName: "John",
        lastName: "Smith",
        age:18,
        email: "John@smith.com",
        phone:9871234345
        },

        {firstName: "Walt",
        lastName: "Disney",
        age:14,
        email: "walt@disney.com",
        phone:1234987651
        },
        {firstName: "Harry",
        lastName: "Potter",
        age:10,
        email: "harryt@potter.com",
        phone:9872345677
        },
        {firstName: "Tom",
        lastName: "Jerry",
        age:7,
        email: "tomt@jerry.com",
        phone:9872345644
        }
    ];

    //to prefill the student table with values on page-load

    for(index=0;index < students.length; index++){
    students[index].id=randomIdGeneration(); //assign the random id to students
    $("#studentTable").find("tbody").append("<tr id_attribute='" + students[index].id +"'>" + 
    " <td> " + students[index].firstName + " </td>" + 
     "<td> " + students[index].lastName + " </td> " + 
     "<td> " + students[index].age + " </td> " +
     "<td> " + students[index].email + " </td>" +
     "<td> " + students[index].phone + " </td>" +
    "<td> <button class='editStudent' id_attribute='" + students[index].id + "'>Edit</button></td>" + 
    "<td> <button class='deleteStudent' id_attribute1='" + students[index].id + "'>Delete</button></td> </tr>");
    }
    
    //////to bind click functio to add button to add student data///////////
    $("#btnAdd").click(function()
    {
        var firstName=$("#inputFirstName");
        var lastName=$("#inputLastName");
        var age=$("#inputAge");
        var email=$("#inputEmail");
        var phone=$("#inputPhoneNumber");

        //assigning variables to the input_field values
        var fName_val=firstName.val();
        var lName_val=lastName.val();
        var age_val=age.val();
        var email_val=email.val();
        var phone_val=phone.val();

        var isValidSuccess=inputFieldsValidation();
   
        //to insert into student details into student table
        if(isValidSuccess === true){
            var new_student={
                id: 0,
                firstName: fName_val,
                lastName: lName_val,
                age: age_val,
                email: email_val,
                phone:phone_val
    };
    new_student.id=randomIdGeneration();
    $("#studentTable").find("tbody").append("<tr id_attribute='" + new_student.id +"'> "+
    "<td> " + fName_val + " </td> "+
    "<td> " + lName_val + " </td> "+
    "<td> " + age_val + " </td> "+
    "<td> " + email_val + " </td>"+ 
    "<td> " + phone_val + " </td> "+
    "<td> <button class='editStudent' id_attribute='"+ new_student.id +"'>Edit</button></td> "+
    "<td> <button class='deleteStudent' id_attribute1='"+ new_student.id +"'>Delete</button></td> </tr>");
    
    $("button[id_attribute='" + new_student.id + "']").bind('click',editStudent);
    $("button[id_attribute1='" + new_student.id + "']").bind('click',deleteOneStudent);


    //adding the new added student to the students array
    students.push(new_student);
    
    //to set input_fields to null after adding data to table
    $("#inputFirstName").val("");
    $("#inputLastName").val("");
    $("#inputAge").val("");
    $("#inputEmail").val("");
    $("#inputPhoneNumber").val("");
    }
    });

    /////to display the student data to be edited in the modal////
    //$(".editStudent").click(editStudent); //edit button in the table
    
    var editStudent=function(e){
            $("#editStudentModal").modal("show");
            var firstName=$("#modalInputFirstName");
            var lastName=$("#modalInputLastName");
            var age=$("#modalInputAge");
            var email=$("#modalInputEmail");
            var phone=$("#modalInputPhoneNumber");
        
            $("#btnAdd").hide();

            var studentToEdit = $(e.target).attr("id_attribute");
            
            for( i = 0 ; i < students.length ; i++) {
                var selectedStudent_Id = students[i].id;					
                if(studentToEdit === selectedStudent_Id)
                {
                firstName.val(students[i].firstName);
                lastName.val(students[i].lastName);
                age.val(students[i].age);
                email.val(students[i].email);
                phone.val(students[i].phone);
                $(".modal-body").attr("id_attribute", students[i].id);
                $("#studentName").text(students[i].firstName);
                break;
                }                                        
            }					
        }
        //////// function to delete student/////////////
    var deleteOneStudent=function(e){
    var studentToBeDeleted_Id=$(e.target).attr("id_attribute1");
    var studentToBeDeleted_Index;
    for(i=0;i<students.length;i++)
    {
        if(students[i].id === studentToBeDeleted_Id){
            studentToBeDeleted_Index = i;
            break;
        }
    }
    students.splice(studentToBeDeleted_Index,1);
    $("tr[id_attribute="+ studentToBeDeleted_Id +"]").remove();
    }
        
    $(".editStudent").on('click', editStudent); //bind edit function to Edit button
    $(".deleteStudent").on('click',deleteOneStudent);//bind delete function to Delete button
        
        $("#saveChanges").on('click', function() {
            
            var firstName=$("#modalInputFirstName");
            var lastName=$("#modalInputLastName");
            var age=$("#modalInputAge");
            var email=$("#modalInputEmail");
            var phone=$("#modalInputPhoneNumber");
            
            var fName = firstName.val().trim();
            var lName = lastName.val().trim();
            var age = age.val().trim();
            var email = email.val().trim();
            var phoneNumber = phone.val().trim();
            
            var studentId = $(".modal-body").attr("id_attribute");
            var student = {};
            var isModalValidSuccess = modalFieldsValidation();
            if(isModalValidSuccess === true) {
                console.log("hello");
                for( i = 0 ; i < students.length ; i++) {
                    var thisStudentId = students[i].id;
                    student = students[i];
                    if(thisStudentId.trim() === studentId.trim()) {
                        students[i].firstName = fName;
                        students[i].lastName = lName;
                        students[i].age = age;
                        students[i].email = email;
                        students[i].phone = phoneNumber;
                        $("tr[id_attribute="+studentId+"]").html("<td> " + fName + " </td> <td> " + lName + " </td> <td> " + age + " </td> <td> " + email + " </td> <td> " + phoneNumber + "</td><td> <button class='editStudent' id_attribute='" + student.id + "'>Edit</button> </td><td> <button class='deleteStudent' id_attribute1='" + student.id + "'>Delete</button> </td>");
                        break;
                    }
                }
                $("button[id_attribute=" + student.id + "]").on('click', editStudent);
                $("button[id_attribute1=" + student.id + "]").on('click',deleteOneStudent);
                $("#editStudentModal").modal("hide");
                $("#btnAdd").show();
            }
        
        
        });

        $("#modalClose").on('click',function(){
            $("#btnAdd").show();
        });

    //////////Sorting First Name and LastName////////////
    var th=document.getElementsByTagName('th');

    for(var col=0; col < 2; col++){
        th[col].addEventListener('click',item(col));
    }
        
    function item(col)
    {
        return function()
        {
        sortTable(col)
        }
    }

    //////////// Function to sort table //////////////
    function sortTable(col) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("studentTable");
        switching = true;
        dir = "asc"; 
        // Make a loop that will continue until no switching has been done:
        while (switching) 
        {
           switching = false; //start by saying: no switching is done:
            rows = table.rows;
            //Loop through all table rows (except the first, which contains table headers):
            for (i = 1; i < (rows.length - 1); i++) 
            {
                shouldSwitch = false;//start by saying there should be no switching:
                // Get the two elements you want to compare,one from current row and one from the next:
                x = rows[i].getElementsByTagName("TD")[col];
                y = rows[i + 1].getElementsByTagName("TD")[col];

                // check if the two rows should switch place,based on the direction, asc or desc:
                if (dir == "asc") 
                {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
                    {//if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") 
                {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) //if so, mark as a switch and break the loop:
                    {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            //   If a switch has been marked, make the switch and mark that a switch has been done:
            if (shouldSwitch) 
            {
            
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;  //Each time a switch is done, increase this count by 1:    
            }
            //If no switching has been done AND the direction is "asc",set the direction to "desc" and run the while loop again.
            else 
            {
                if (switchcount == 0 && dir == "asc") 
                {
                        dir = "desc";
                        switching = true;
                }
            }
        }
}
///////////// Sort Age /////////////
$("#sortAge").click(function(){
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("studentTable");
        switching = true;
        dir = "asc"; 
        while (switching) 
        {
           switching = false; 
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) 
            {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];

                if (dir == "asc") 
                {
                    if (Number(x.innerHTML) > Number(y.innerHTML))
                    {
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") 
                {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) 
                    {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) 
            {
            
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;     
            }
            else 
            {
                if (switchcount == 0 && dir == "asc") 
                {
                        dir = "desc";
                        switching = true;
                }
            }
        }
}); 

    /////Function to generate Random_id
    function randomIdGeneration()
    {   
        var minRandom=2222222222;
        var maxRandom=9999999999;
        var random_number=(Math.random() * maxRandom)+ minRandom;
        var rounded_id=Math.floor(random_number);

        var thisTime = new Date();
        var timeNum =thisTime.getTime();

        var random_Id=rounded_id.toString() + timeNum.toString();
        return random_Id;
    };


    ////////function to validate the input fields/////////
    var inputFieldsValidation = function(){
         // assign the input_field ids to variables
    var firstName=$("#inputFirstName");
    var lastName=$("#inputLastName");
    var age=$("#inputAge");
    var email=$("#inputEmail");
    var phone=$("#inputPhoneNumber");

    //assigning variables to the input_field values
    var fName_val=firstName.val();
    var lName_val=lastName.val();
    var age_val=age.val();
    var email_val=email.val();
    var phone_val=phone.val();

    var isValidSuccess=true;   
    
    $(".validation").remove(); //validation <p> tags class
    
    //FirstName Validation
    if(!fName_val){
        firstName.parent().find(".required-validation").show();
        isValidSuccess=false;
    }
    else if(fName_val){
        firstName.parent().find(".required-validation").hide();

    }

    //LastName Validation
    if(!lName_val){
        lastName.parent().find(".required-validation").show();
        isValidSuccess=false;
    }
    else if(lName_val){
        lastName.parent().find(".required-validation").hide();
    }

    //Age Validation
    if(!age_val){
        age.parent().find(".required-validation").show();
        isValidSuccess=false;
    }
    else if(age_val){
        age.parent().find(".required-validation").hide();
    }
    if(!age_val==false && $.isNumeric(age_val)=== false){
        isValidSuccess=false;
        age.after('<p class="validation">Please enter a number</p>'); 

    }
    if(!age_val==false && age_val <= 1 || age_val >18){
        isValidSuccess=false;
        age.after('<p class="validation">Age limit is between 2 to 18</p>');
        
    }

    //Email Validation
    if(!email_val){
        email.parent().find(".required-validation").show();
        isValidSuccess=false;
    }
    else if(email_val){
        email.parent().find(".required-validation").hide();
    }

    //Phone Validation
    if(!phone_val){
        phone.parent().find(".required-validation").show();
        isValidSuccess=false;
        
    }
    else if(phone_val){
        phone.parent().find(".required-validation").hide();
    }

     //Phone number minlength validation
    if(!phone_val==false && phone_val.length < 8){
       isValidSuccess=false;
        phone.after('<p class="validation">Minimun 8 digits</p>'); 
        
   }

//phone number maxlength validation
   if(!phone_val==false && phone_val.length > 12){
    isValidSuccess=false;
    phone.after('<p class="validation">Maximum 12 digits</p>');
    
   } 
   return isValidSuccess;
    }
    
/////////////function to validate the modal input fields/////////////
    var modalFieldsValidation = function()
    {    
    var firstName=$("#modalInputFirstName");
    var lastName=$("#modalInputLastName");
    var age=$("#modalInputAge");
    var email=$("#modalInputEmail");
    var phone=$("#modalInputPhoneNumber");

    //assigning variables to the input_field values
    var fName_val=firstName.val();
    var lName_val=lastName.val();
    var age_val=age.val();
    var email_val=email.val();
    var phone_val=phone.val();

    var isModalValidSuccess=true;   
    
    $(".validation").remove(); //validation <p> tags class
    
    //FirstName Validation
    if(!fName_val){
        firstName.parent().find(".required-validation").show();
        isModalValidSuccess=false;
    }
    else if(fName_val){
        firstName.parent().find(".required-validation").hide();

    }

    //LastName Validation
    if(!lName_val){
        lastName.parent().find(".required-validation").show();
        isModalValidSuccess=false;
    }
    else if(lName_val){
        lastName.parent().find(".required-validation").hide();
    }

    //Age Validation
    if(!age_val){
        age.parent().find(".required-validation").show();
        isModalValidSuccess=false;
    }
    else if(age_val){
        age.parent().find(".required-validation").hide();
    }
    if(!age_val==false && $.isNumeric(age_val)=== false){
        isModalValidSuccess=false;
        age.after('<p class="validation">Please enter a number</p>'); 

    }
    if(!age_val==false && age_val <= 1 || age_val >18){
        isModalValidSuccess=false;
        age.after('<p class="validation">Age limit is between 2 to 18</p>');
        
    }

    //Email Validation
    if(!email_val){
        email.parent().find(".required-validation").show();
        isModalValidSuccess=false;
    }
    else if(email_val){
        email.parent().find(".required-validation").hide();
    }

    //Phone Validation
    if(!phone_val){
        phone.parent().find(".required-validation").show();
        isModalValidSuccess=false;
        
    }
    else if(phone_val){
        phone.parent().find(".required-validation").hide();
    }

     //Phone number minlength validation
    if(!phone_val==false && phone_val.length < 8){
        isModalValidSuccess=false;
        phone.after('<p class="validation">Minimun 8 digits</p>'); 
        
   }

//phone number maxlength validation
   if(!phone_val==false && phone_val.length > 12){
    isModalValidSuccess=false;
    phone.after('<p class="validation">Maximum 12 digits</p>');
    
   } 
   return isModalValidSuccess;
    }

    });