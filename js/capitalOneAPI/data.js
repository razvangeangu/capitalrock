var accID;
var predictionData = "";

$(function(){

require(['account', 'atm', 'branch', 'customer', 'deposit', 'withdrawal', 'bills', 'merchant', 'purchase'], function (account, atm, branch, customer, deposit, withdrawal, bills, merchant, purchase) {

		var apikey = '336a0b14a38b90b71c79fd007b26f8be';
		accountDemo(apikey, account); // !!! Verified !!!
		depositDemo(apikey, deposit); // !!! Verified - One 404 Error !!!
		// withdrawalDemo(apikey, withdrawal); // !!! Verified !!!	
		billsDemo(apikey, bills); // !!! Verified !!!	
		// purchaseDemo(apikey, purchase); // No Purchases for existing accounts
		predictFile();
	});
});

function accountDemo (apikey, account) {
	// console.log('Account Demo');
	var custAccount = account.initWithKey(apikey);
	var custID = '56c66be5a73e492741507427';

	// Adding a sample account with data
	// var sampleAccount = "{\"balance\":314483,\"nickname\":\"Tania Copocean\",\"rewards\":2,\"type\":\"Checking\"}";
	// console.log("[Account - Create Sample for Miss. Tania's Account]:  response" + custAccount.createAccount(custID, sampleAccount));

		// Getting nickname and balance of all accounts in custAccount
		// console.log(10 + ". Account (" + custAccount.getAllAccounts()[10].nickname + ") - $" + custAccount.getAllAccounts()[10].balance);


		// Getting id account id for our demo
		accID = custAccount.getAllAccounts()[10]._id;

		// document.getElementById("revenue").innerHTML="£ " + custAccount.getAllAccounts()[10].balance;
}

function depositDemo (apikey, deposit) {
		var depositAccount = deposit.initWithKey(apikey);
		var sampleDeposit = "{\"medium\": \"balance\",\"amount\": 241234,\"description\": \"Tania's Deposit\"}";
		var sampleDepositUpdate = "{\"medium\": \"balance\",\"amount\": 16435,\"description\": \"Tania's Deposit\"}";
		

		

		
		// console.log("[Deposit - New deposit]: " + depositAccount.createDeposit(accID, sampleDeposit));
		// console.log("Deposit (" + depositAccount.getAllByAccountId(accID)[5].description + "), amount: " + depositAccount.getAllByAccountId(accID)[5].amount);
		document.getElementById("username").innerHTML=depositAccount.getAllByAccountId(accID)[5].description;
		var revenue = String(depositAccount.getAllByAccountId(accID)[5].amount);
		document.getElementById("revenue").innerHTML="£ " + revenue.slice(0,3) + "," + revenue.slice(3,6);
		// console.log("[Deposit - Update Deposit]: " + depositAccount.updateDeposit(depositAccount.getAllByAccountId(accID)[5]._id, sampleDepositUpdate)); //API failed - "NetworkError: 404 Not Found

		// console.log("id: " + depositAccount.getAllByAccountId(accID)[5]._id);

		// var lastDesposit = depositAccount.getAllByAccountId(accID).pop();
		
		// console.log("[Deposit - Delete Deposit]: " + depositAccount.deleteDeposit('56007939ce1cef140015e48a'));
	}

	function billsDemo (apikey, bills) {
		var billAccount = bills.initWithKey(apikey);
		var custID = '56c66be5a73e492741507427';
		var sum = 0;
		// var sampleBill = "{\"status\": \"pending\",\"payee\": \"Verizon\",\"nickname\": \"Cable/Internet\",\"payment_date\": \"2016-02-18\", \"recurring_date\": 1, \"payment_amount\": 109 }";
		// var sampleBill = "{\"status\": \"cancelled\",\"payee\": \"Tesco\",\"nickname\": \"Food\",\"payment_date\": \"2016-02-22\", \"recurring_date\": 1, \"payment_amount\": 12388 }";
		// var sampleBill3 = "{\"status\": \"cancelled\",\"payee\": \"Pandora\",\"nickname\": \"Jewelry\",\"payment_date\": \"2016-02-23\", \"recurring_date\": 1, \"payment_amount\": 10378 }";
		// var sampleBill4 = "{\"status\": \"cancelled\",\"payee\": \"California\",\"nickname\": \"Holiday trip\",\"payment_date\": \"2016-02-23\", \"recurring_date\": 1, \"payment_amount\": 150487 }";
		// var sampleBill5 = "{\"status\": \"cancelled\",\"payee\": \"Others\",\"nickname\": \"Others\",\"payment_date\": \"2016-02-29\", \"recurring_date\": 1, \"payment_amount\": 6969 }";
		
		// console.log('[bills - create a bill] Response: ' + billAccount.createBill(accID, sampleBill));
		// console.log('[bills - create a bill] Response: ' + billAccount.createBill(accID, sampleBill2));
		// console.log('[bills - get an account\'s bills] Response: ' + billAccount.getAllByAccountId(accID));
		for (var i = 0; i < billAccount.getAllByAccountId(accID).length; i++) {
			var billID = billAccount.getAllByAccountId(accID)[i]._id;
			predictionData += String(i) + ', ' + String(billAccount.getBill(billID).payment_amount) + '\n';
			// console.log("Bill(" + billAccount.getBill(billID).nickname + "), amount: $" + billAccount.getBill(billID).payment_amount + " id: " + billID);
			sum += billAccount.getBill(billID).payment_amount;
			document.getElementById("typeOfSpending" + String(i)).innerHTML=billAccount.getBill(billID).nickname;
		}

		document.getElementById("spendings").innerHTML="£ " + String(sum).slice(0,2) + "," + String(sum).slice(2,5);

		for (var i = 0; i < billAccount.getAllByAccountId(accID).length; i++) {
			var billID = billAccount.getAllByAccountId(accID)[i]._id;
			document.getElementById("typeOfSpending" + String(i) + "p").innerHTML=String((billAccount.getBill(billID).payment_amount/sum*100).toFixed(2)) + "%";
		}
		
		// var lastBill = billAccount.getAllByAccountId(accID).pop();
		// console.log('[bills - update a bill] Response: ' + billAccount.updateBill(billAccount.getAllByAccountId(accID)[1]._id, sampleBill));
		// console.log('[bills - delete bill] Response: ' + billAccount.deleteBill(billID));
	}

	function predictFile() {
		var textFile = null,
		makeTextFile = function (text) {
	    	var data = new Blob([text], {type: 'text/plain'});

	    	if (textFile !== null) {
	      		window.URL.revokeObjectURL(textFile);
	    	}

	    	textFile = window.URL.createObjectURL(data);
	    	return textFile;
	  	};

    	// window.location.href = makeTextFile(predictionData);
	}