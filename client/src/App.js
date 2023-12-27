import Web3 from 'web3';
import './App.css';


function App() {
    const contractAddress = '0x0405f1B0CE09dF8dc7De4187427b08c246F583aa'; // Replace with your deployed contract address

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "dataEntries",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_ipfsHash",
                    "type": "string"
                }
            ],
            "name": "setIPFSHash",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_sender",
                    "type": "address"
                }
            ],
            "name": "getIPFSHash",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        }
      ];

    let web3;
    let contract;
    let ipfs;

    window.onload = async () => {
        // Connect to Metamask
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                contract = new web3.eth.Contract(abi, contractAddress);

                // Connect to IPFS
                ipfs = createIPFSInstance();

                displayContractHash();
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.error("No web3 provider detected");
        }
    };

    function createIPFSInstance() {
        const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: '1dab7f3ee54c42de8baa0cd86ae1cd3e' } });
        return ipfs;
    }

    // eslint-disable-next-line 
    async function uploadToIPFS() {
        const textToUpload = document.getElementById("ipfsInput").value;

        // Upload to IPFS
        const ipfsResponse = await ipfs.add(textToUpload);
        const ipfsHash = ipfsResponse.cid.toString();

        // Update UI
        document.getElementById("ipfsHash").innerText = ipfsHash;

        // Set IPFS Hash in the Smart Contract
        const accounts = await web3.eth.getAccounts();
        await contract.methods.setIPFSHash(ipfsHash).send({ from: accounts[0] });

        // Update UI with Contract IPFS Hash
        displayContractHash();
    }

    async function displayContractHash() {
        const accounts = await web3.eth.getAccounts();
        const contractHash = await contract.methods.getIPFSHash(accounts[0]).call();
        document.getElementById("contractHash").innerText = contractHash;
    }

}

export default App;
