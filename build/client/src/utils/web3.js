import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      console.log('Accounts:', accounts);
    })
    .catch(error => {
      console.error("User denied account access", error);
    });
} else {
  console.error("Metamask not detected. Please install Metamask.");
}

const getAccount = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (error) {
    console.error("Error fetching accounts: ", error);
    return null;
  }
};

export { web3, getAccount };