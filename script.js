// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  const employees = []; // Initialize an array to hold employee objects
  
  let addMore = true; // Boolean to control the loop for collecting multiple employees

  while (addMore) {
    // Collect employee details using prompt
    const firstName = prompt("Enter the employee's first name:");
    const lastName = prompt("Enter the employee's last name:");
    let salary = prompt("Enter the employee's salary:");

    // Validate and convert salary to a number
    salary = parseFloat(salary);
    if (isNaN(salary)) {
      alert("Invalid salary input. Please enter a numeric value.");
      continue; // Restart the loop to recollect employee data
    }

    // Create a new employee object
    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary
    };

    // Add the employee object to the array
    employees.push(employee);

    // Ask if the user wants to add another employee
    addMore = confirm("Do you want to add another employee?");
  }

  return employees; // Return the array of employee objects
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log("No employees to calculate the average salary.");
    return;
  }

  // Calculate the total salary
  const totalSalary = employeesArray.reduce((sum, employee) => sum + employee.salary, 0);

  // Calculate the average salary
  const averageSalary = totalSalary / employeesArray.length;

  // Format the average salary to two decimal places
  const formattedAverageSalary = averageSalary.toFixed(2);

  // Log the message with the number of employees and the formatted average salary
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${formattedAverageSalary}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) 
{
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  if (employeesArray.length >= 1)
    {
      alert(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
      console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
    }
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);