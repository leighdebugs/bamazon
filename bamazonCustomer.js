// set requirements
var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to mysql
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: 'root',
	password: 'Il0veyou!',
	database: 'bamazon'
});

// show inventory upon connecting
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	showInventory();
});

// function for displaying inventory; called upon connecting
var showInventory = function(){
	connection.query("SELECT * FROM products", function(err,res){
		for(var i=0; i<res.length; i++){
			console.log(res[i].item_id + ": " 
				+ res[i].product_name + " // Dept: " + res[i].department_name
				+ " // Price: " + res[i].price + " // Qty: " + res[i].stock_quantity);
		};
	// call function to prompt user for input
	userPrompt(res);
	});
};

// function to prompt user for input; called after displaying store data
var userPrompt = function(res){
	inquirer.prompt([{
		type: 'input',
		name: 'choice',
		message: "Please select the item you wish to purchase by entering the product ID."
	}]).then(function(answer){
		var correct = false;
		for(var i=0; i<res.length; i++){
			if(res[i].productname==answer.choice);{
				correct=true;
				var product=answer.choice;
				var id=i;
			};
		};
	});
};


