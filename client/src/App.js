import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
// import { setRequestMeta } from "next/dist/server/request-meta";

function App() {
  const [depositValue, setDepositValue] = useState(0);
  const [greet, setGreet] = useState('');
  const [greetingValue, setGreetingValue] = useState('');
  const [balance, setBalance] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
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
  const contract = new ethers.Contract(contractAddress, ABI, signer);  

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

    requestAccounts()
      .catch(console.error)
    getBalance()
      .catch(console.error)
    getGreeting()
      .catch(console.error)
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