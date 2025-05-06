// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract TransactionRecorder {
    // Struct lưu thông tin transaction
    struct TransactionInfo {
        address sender;        
        uint256 amountEth;      
        uint256 amountVnd;     
        string transactionHash;    
        uint256 accountAOVId;         
        uint256 timestamp;   
        uint256 customerId;    
        uint256 accountFreeFireId;    
    }

    // Danh sách transaction
    TransactionInfo[] public transactions;

    // Event khi thêm transaction
    event TransactionStored(
        address indexed sender,
        uint256 amountEth,
        uint256 amountVnd,
        string transactionHash,
        uint256 accountAOVId,
        uint256 timestamp,
        uint256 customerId,
        uint256 accountFreeFireId
    );

    // Event để debug
    event DebugLog(
        address sender,
        uint256 amountEth,
        uint256 amountVnd,
        string transactionHash,
        uint256 accountAOVId,
        uint256 timestamp,
        uint256 customerId,
        string customerName,
        uint256 productId,
        string productTitle,
        string action
    );

    // Hàm lưu transaction hash
    function storeTransaction(
        uint256 amountEth,
        uint256 amountVnd,
        string calldata transactionHash,
        uint256 accountAOVId,
        uint256 customerId,
        uint256 accountFreeFireId
    ) external {
    
        TransactionInfo memory newTx = TransactionInfo({
            sender: msg.sender,
            amountEth: amountEth,
            amountVnd: amountVnd,
            transactionHash: transactionHash,
            accountAOVId: accountAOVId,
            timestamp: block.timestamp,
            customerId: customerId,
            accountFreeFireId: accountFreeFireId
        });

        transactions.push(newTx);

        emit TransactionStored(
            msg.sender,
            amountEth,
            amountVnd,
            transactionHash,
            accountAOVId,
            block.timestamp,
            customerId,
            accountFreeFireId
        );
    }

    // Hàm trả về số lượng transaction đã lưu
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    // Hàm lấy transaction theo index
    function getTransaction(
        uint256 index
    )
        public
        view
        returns (
            address,
            uint256,
            uint256,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        require(index < transactions.length, "Invalid index");
        TransactionInfo memory txInfo = transactions[index];
        return (
            txInfo.sender,
            txInfo.amountEth,
            txInfo.amountVnd,
            txInfo.transactionHash,
            txInfo.accountAOVId,
            txInfo.timestamp,
            txInfo.customerId,
            txInfo.accountFreeFireId
        );
    }

    // Hàm lấy toàn bộ danh sách transaction
    function getTransactions() public view returns (TransactionInfo[] memory) {
        return transactions;
    }
}
// contract TransactionRecorder {