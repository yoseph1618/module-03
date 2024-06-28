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
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log("No employees to select from.");
    return;
  }

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * employeesArray.length);

  // Select the random employee
  const randomEmployee = employeesArray[randomIndex];

  // Display the random employee
  console.log("Randomly selected employee:", randomEmployee);
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

// Function to collect, sort, and display employee data
const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees); // Display collected employees in the console

  displayAverageSalary(employees); // Calculate and display the average salary

  console.log('==============================');

  getRandomEmployee(employees); // Select and display a random employee

  // Sort employees by last name (and first name if last names are the same)
  employees.sort(function(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else if (a.lastName > b.lastName) {
      return 1;
    } else { // If last names are the same, sort by first name
      if (a.firstName < b.firstName) {
        return -1;
      } else if (a.firstName > b.firstName) {
        return 1;
      } else {
        return 0; // If both last and first names are the same
      }
    }
  });

  displayEmployees(employees); // Display the sorted employees
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
