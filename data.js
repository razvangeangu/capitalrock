var accID;

$(function(){

require(['account', 'atm', 'branch', 'customer', 'deposit', 'withdrawal', 'bills', 'merchant', 'purchase'], function (account, atm, branch, customer, deposit, withdrawal, bills, merchant, purchase) {

		var apikey = '336a0b14a38b90b71c79fd007b26f8be';
		accountDemo(apikey, account); // !!! Verified !!!
		depositDemo(apikey, deposit); // !!! Verified - One 404 Error !!!
		// withdrawalDemo(apikey, withdrawal); // !!! Verified !!!	
		billsDemo(apikey, bills); // !!! Verified !!!	
		// purchaseDemo(apikey, purchase); // No Purchases for existing accounts
	});
});

function accountDemo (apikey, account) {
	// console.log('Account Demo');
	var custAccount = account.initWithKey(apikey);
	var custID = '56c66be5a73e492741507427';

	// Adding a sample account with data
	// var sampleAccount = "{\"balance\":314483,\"nickname\":\"Tania Copocean\",\"rewards\":2,\"type\":\"Checking\"}";
	// console.log("[Account - Create Sample for Miss. Tania's Account]:  response" + custAccount.createAccount(custID, sampleAccount));

	for (var i = 0; i < 11; i++) {
		// Getting nickname and balance of all accounts in custAccount
		// console.log(i + ". Account (" + custAccount.getAllAccounts()[i].nickname + ") - $" + custAccount.getAllAccounts()[i].balance);


		// Getting id account id for our demo
		if (i == 10) {
			accID = custAccount.getAllAccounts()[i]._id;
		}
	}
}

function depositDemo (apikey, deposit) {
		var depositAccount = deposit.initWithKey(apikey);
		var sampleDeposit = "{\"medium\": \"balance\",\"amount\": 241234,\"description\": \"Tania's Deposit\"}";
		var sampleDepositUpdate = "{\"medium\": \"balance\",\"amount\": 289432,\"description\": \"Tania's Deposit\"}";
		

		

		
		// console.log("[Deposit - New deposit]: " + depositAccount.createDeposit(accID, sampleDeposit));
		console.log("Deposit (" + depositAccount.getAllByAccountId(accID)[5].description + "), amount: " + depositAccount.getAllByAccountId(accID)[5].amount);
		// console.log("[Deposit - Update Deposit]: " + depositAccount.updateDeposit(depositAccount.getAllByAccountId(accID)[5]._id, sampleDepositUpdate)); //API failed - "NetworkError: 404 Not Found

		// console.log("id: " + depositAccount.getAllByAccountId(accID)[5]._id);

		// var lastDesposit = depositAccount.getAllByAccountId(accID).pop();
		
		// console.log("[Deposit - Delete Deposit]: " + depositAccount.deleteDeposit('56007939ce1cef140015e48a'));
	}

	function billsDemo (apikey, bills) {
		var billAccount = bills.initWithKey(apikey);
		var custID = '56c66be5a73e492741507427';
		// var sampleBill = "{\"status\": \"pending\",\"payee\": \"Verizon\",\"nickname\": \"Cable/Internet\",\"payment_date\": \"2016-02-18\", \"recurring_date\": 1, \"payment_amount\": 109 }";
		// var sampleBill2 = "{\"status\": \"cancelled\",\"payee\": \"Tesco\",\"nickname\": \"Food\",\"payment_date\": \"2016-02-22\", \"recurring_date\": 1, \"payment_amount\": 469 }";
		
		// console.log('[bills - create a bill] Response: ' + billAccount.createBill(accID, sampleBill));
		// console.log('[bills - create a bill] Response: ' + billAccount.createBill(accID, sampleBill2));
		// console.log('[bills - get an account\'s bills] Response: ' + billAccount.getAllByAccountId(accID));
		for (var i = 0; i < 2; i++) {
			var billID = billAccount.getAllByAccountId(accID)[i]._id;
			console.log("Bill(" + billAccount.getBill(billID).nickname + "), amount: $" + billAccount.getBill(billID).payment_amount);
		}
		
		// var lastBill = billAccount.getAllByAccountId(accID).pop();
		// console.log('[bills - update a bill] Response: ' + billAccount.updateBill(lastBill._id, sampleBill));
		// console.log('[bills - delete bill] Response: ' + billAccount.deleteBill(billID));
	}