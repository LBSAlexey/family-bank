// Функции можно вызывать даже до объявления.
// Удобно это или странно? Каждый решает для себя...
loadAccounts();

async function loadAccounts() {
    let response = await axios.get('/accounts');
    let accounts = response.data;

    renderAccounts(accounts);
};

async function renderAccounts(accounts) {
    let accountsContainer = document.querySelector(`#accounts`);


    accountsContainer.innerHTML += ``;
    for (let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        // Выводим данные на экран
        accountsContainer.innerHTML += `
        

        <button type="button" class="list-group-item list-group-item-action account-item">
            <span>${account.owner}</span>
            <span>${account.creditcard}</span>
        </button>

        
        `;
    }

    let nodes = document.querySelectorAll('.account-item')

    for(let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let account = accounts[i];
        node.addEventListener(`click`, function() { 
            renderBalance(account)
            loadTransactions(account)
            loadTransactionsIncome(account)
            loadTransactionsExpences(account)
        });
    }
    
};

async function renderBalance(account) {

    let balanceNode = document.querySelector(`#balance`);
    balanceNode.innerHTML = `<button type="button" class="button-income">Доходы</button> ${account.balance} <button type="button" class="button-expences ">Расходы</button>`

};


async function loadTransactions(account) {
    let response = await axios.get('/transactions/all', { 
        params: {
            account: account._id,
        }
    }) 

    let transactions = response.data;

    renderTransactions(transactions);
}


async function renderTransactions(transactions) {

    let transactionsNode = document.querySelector('#transactions');
    transactionsNode.innerHTML = ``
    for(let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        // console.log(transaction);

        if(transaction.value >= 0) {
            transactionsNode.innerHTML += 
            `
            <li class="list-group-item list-group-item-success">
                <span>${transaction.value}</span>
                <span>${transaction.category}</span>
            </li>
            `;
        } else {
            transactionsNode.innerHTML += 
            `
            <li class="list-group-item">
                <span>${transaction.value}</span>
                <span>${transaction.category}</span>
            </li>
            `;
        }
        
    }

};

async function loadTransactionsIncome(account) {
    let response = await axios.get('/transactions/income', { 
        params: {
            account: account._id,
        }
    }) 

    let transactions = response.data;

    renderTransactionsIncome(transactions);

}

async function loadTransactionsExpences(account) {
    let response = await axios.get('/transactions/expences', { 
        params: {
            account: account._id,
        }
    }) 

    let transactions = response.data;

  renderTransactionsExpences(transactions);
}

async function renderTransactionsExpences(transactions) {
    let buttonExpences = document.querySelector(`.button-expences`);
    let transactionsNode = document.querySelector('#transactions');
    
    buttonExpences.addEventListener(`click`, () => {
        transactionsNode.innerHTML = ``;
        for(let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            if(transaction.value < 0) {
                transactionsNode.innerHTML += 
                `
                <li class="list-group-item list-group-item-danger">
                    <span>${transaction.value}</span>
                    <span>${transaction.category}</span>
                </li>
                `;
            }
        }
    })
}

async function renderTransactionsIncome(transactions) {
    let buttonIncome = document.querySelector(`.button-income`);
    let transactionsNode = document.querySelector('#transactions');
    
    buttonIncome.addEventListener(`click`, () => {
        transactionsNode.innerHTML = ``;
        for(let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            if(transaction.value >= 0) {
                transactionsNode.innerHTML += 
                `
                <li class="list-group-item list-group-item-success">
                    <span>${transaction.value}</span>
                    <span>${transaction.category}</span>
                </li>
                `;
            }
        }
    })
}