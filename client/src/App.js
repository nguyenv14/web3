import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
// import { setRequestMeta } from "next/dist/server/request-meta";

function App() {
  const [depositValue, setDepositValue] = useState(0);
  const [greet, setGreet] = useState('');
  const [greetingValue, setGreetingValue] = useState('');
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
  // Deploy để lấy contract address và lấy ABI từ file JSON
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const contractAddress2 = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  const ABIStore = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountVND",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "txHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "customerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "customerName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "productTitle",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "action",
          "type": "string"
        }
      ],
      "name": "DebugLog",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountVND",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "txHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "customerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "TransactionStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getTransaction",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountETH",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountVND",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "txHash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "customerId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "productId",
              "type": "uint256"
            }
          ],
          "internalType": "struct TransactionRecorder.TransactionInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountVND",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "txHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "customerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "storeTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountVND",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "txHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "customerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = new ethers.Contract(contractAddress, ABI, signer);  
  const contractStore =  new ethers.Contract(
    contractAddress2,
    ABIStore,
    wallet
  );
  useEffect(() => {
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    }
    
    const getGreeting = async () => {
      const greeting = await contract.greet();
      setGreet(greeting);
    }

    const getBalance = async () => {
      // Lấy địa chỉ ở ví metamask
      const balance = await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      setBalance(ethers.utils.formatEther(balance));
    }

    const fetchTransactions = async () => {
      try {
        console.log("Contract Address:", contractAddress2);
        console.log("Is Valid:", ethers.utils.isAddress(contractAddress2));
        const network = await provider.getNetwork();
        console.log("Current Network:", network.chainId);
        const count = await contractStore.getTransactionCount();
        let transactions = [];

        for (let i = 0; i < count; i++) {
            let tx = await contractStore.getTransaction(i);
            transactions.push({
                sender: tx[0],
                amountETH: tx[1].toString(),
                amountVND: tx[2].toString(),
                txHash: tx[3],
                status: tx[4],
                timestamp: tx[5].toString(),
                customerId: tx[6],
                productId: tx[7],
            });
        }
        console.log(transactions);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    const checkNetwork = async () => {
      const network = await provider.getNetwork();
      console.log("Current network:", network);
      const code = await provider.getCode(contractAddress2);
      console.log("Contract code exists:", code !== '0x');
    };
    
    checkNetwork().catch(console.error);

    requestAccounts()
      .catch(console.error)
    getBalance()
      .catch(console.error)
    getGreeting()
      .catch(console.error)
    fetchTransactions().catch(console.error)
  }, [])

  const handleDepositChange = (e) => {
    setDepositValue(e.target.value)
  }

  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value);
  }

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    const ethValue = ethers.utils.parseEther(depositValue)
    const deposit = await contract.deposit({value: ethValue});
    await deposit.wait();

    
    const txStore = await contractStore.storeTransaction(
      ethValue,
      ethValue,
      deposit.hash, 
      "completed" ,
      1,
      1
    );
    await txStore.wait();
    console.log("Transaction hash:", deposit.hash);
    console.log("Transaction hash1:", txStore.hash);
    const balance = await provider.getBalance(contractAddress);
    setBalance(ethers.utils.formatEther(balance));
  }

  const handleGreetingSubmit = async (e) => {
    e.preventDefault();
    await contract.setGreeting(greetingValue)
    setGreet(greetingValue);
    setGreetingValue('');
  }

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {}, []);

  const handleChange = (e) => {
    if(e.target.name === "filename") {
      setFileName(e.target.value);
    }
    if(e.target.name === "file") {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("filename", fileName);
      formData.append("file", file);

      const res = await fetch("/api/uploadData", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Network response is not ok");
      }
      const data = await res.json();    
      setResult(data.message);

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="container">
      <div className="row mt-5">

        <div className="col">
          <h3>{greet}</h3>
          <p>Contract Balance: {balance} ETH</p>
        </div>

        <div className="col">
          <div className="mb-3">
            <h4>Deposit ETH</h4>
            <form onSubmit={handleDepositSubmit}>
              <div className="mb-3">
                <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange} value={depositValue} />
              </div>
              <button type="submit" className="btn btn-success">Deposit</button>
            </form>

            <h4 className="mt-3">Change Greeting1</h4>
            <form onSubmit={handleGreetingSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="" onChange={handleGreetingChange} value={greetingValue} />
              </div>
              <button type="submit" className="btn btn-dark">Change</button>
            </form>
            <form onSubmit={handleSubmit} className='mt-3'>
              <label className="text">Enter Unique Filename: </label>
              <input type="text" name="filename" value={fileName} onChange={handleChange} className="input"></input>
              <br />
              <br />
              <input type="file" name="file" onChange={handleChange} className="input"></input>
              <br />
              <br />
              <input type="Submit" className="btn btn-dark"></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;