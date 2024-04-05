#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.red.bold("\n\tWelcome to - Todo List App\n")
);

let todos: string[] = [];
let condition = true;
while (condition) {
  let addTask = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: chalk.yellow.bold("Choose an action:"),
      choices: ['Add Todo', 'Update Todo', 'Delete Todo', 'Exit']
    }
  ]);

  switch(addTask.action) {
    case 'Add Todo':
      let addTodo = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: chalk.green.bold("What do you want to add?"),
        },
      ]);
      todos.push(addTodo.todo);
      break;
    case 'Update Todo':
      if(todos.length === 0) {
        console.log(chalk.red.bold("No Todos to update!"));
        break;
      }
      let updateTodo = await inquirer.prompt([
        {
          name: "index",
          type: "input",
          message: chalk.cyan.bold("Enter the index of the todo you want to update:"),
          validate: function(value) {
            let valid = !isNaN(parseFloat(value));
            return valid || "Please enter a valid index.";
          },
          filter: Number
        },
        {
          name: "newTodo",
          type: "input",
          message: chalk.green.bold("Enter the updated todo:"),
        },
      ]);
      if(updateTodo.index >= 0 && updateTodo.index < todos.length) {
        todos[updateTodo.index] = updateTodo.newTodo;
      } else {
        console.log(chalk.red.bold("Invalid index!"));
      }
      break;
    case 'Delete Todo':
      if(todos.length === 0) {
        console.log(chalk.red.bold("No Todos to delete!"));
        break;
      }
      let deleteTodo = await inquirer.prompt([
        {
          name: "index",
          type: "input",
          message: chalk.magenta.bold("Enter the index of the todo you want to delete:"),
          validate: function(value) {
            let valid = !isNaN(parseFloat(value));
            return valid || "Please enter a valid index.";
          },
          filter: Number
        },
      ]);
      if(deleteTodo.index >= 0 && deleteTodo.index < todos.length) {
        todos.splice(deleteTodo.index, 1);
      } else {
        console.log(chalk.red.bold("Invalid index!"));
      }
      break;
    case 'Exit':
      condition = false;
      break;
  }

  console.log(chalk.yellow.bold("Updated Todo List:"));
  todos.forEach((todo, index) => {
    console.log(chalk.cyan.bold(`${index + 1}. ${todo}`));
  });

  if(condition) {
    let addMore = await inquirer.prompt([
      {
        name: "more",
        type: "confirm",
        message: chalk.blue.bold("Do you want to perform another action?"),
      }
    ]);
    condition = addMore.more;
  }
}
console.log(chalk.red.bold("Goodbye!"));
