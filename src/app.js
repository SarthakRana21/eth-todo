const TruffleContract = require('truffle-contract');
const App = {
    web3Provider: null,
    account: null,

    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
    },

    loadWeb3: async () => {
        if (typeof window.ethereum !== 'undefined') {
            App.web3Provider = window.ethereum;
            window.web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Ethereum enabled");
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (typeof window.web3 !== 'undefined') {
            // Legacy dapp browsers
            App.web3Provider = window.web3.currentProvider;
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            // Non-dapp browsers
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    },

    loadAccount: async () => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            App.account = accounts[0];
        } else {
            console.log("No accounts found");
        }
    },

    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json');
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);
    }
};

// jQuery for loading the app once the window is ready
$(() => {
    $(window).on('load', () => {
        App.load();
    });
});
