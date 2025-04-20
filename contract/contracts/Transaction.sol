// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionRecorder {
    // Struct lưu thông tin transaction
    struct TransactionInfo {
        address sender; // Địa chỉ người chuyển
        uint256 amountETH; // Số tiền giao dịch theo ETH
        uint256 amountVND; // Số tiền giao dịch nhận được theo VND
        string txHash; // Transaction hash
        string status; // Trạng thái giao dịch
        uint256 timestamp; // Thời gian giao dịch
    }

    // Danh sách transaction
    TransactionInfo[] public transactions;

    // Event khi thêm transaction
    event TransactionStored(
        address indexed sender,
        uint256 amountETH,
        uint256 amountVND,
        string txHash,
        string status,
        uint256 timestamp
    );

    // Hàm lưu transaction hash
    function storeTransaction(
        uint256 amountETH,
        uint256 amountVND,
        string calldata txHash,
        string calldata status
    ) external {
        emit DebugLog(
            msg.sender,
            amountETH,
            amountVND,
            txHash,
            status,
            block.timestamp
        );

        TransactionInfo memory newTx = TransactionInfo({
            sender: msg.sender,
            amountETH: amountETH,
            amountVND: amountVND,
            txHash: txHash,
            status: status,
            timestamp: block.timestamp
        });

        transactions.push(newTx);
        emit TransactionStored(
            msg.sender,
            amountETH,
            amountVND,
            txHash,
            status,
            block.timestamp
        );
    }

    event DebugLog(
        address sender,
        uint256 amountETH,
        uint256 amountVND,
        string txHash,
        string status,
        uint256 timestamp
    );

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
            string memory,
            uint256
        )
    {
        require(index < transactions.length, "Invalid index");
        TransactionInfo memory txInfo = transactions[index];
        return (
            txInfo.sender,
            txInfo.amountETH,
            txInfo.amountVND,
            txInfo.txHash,
            txInfo.status,
            txInfo.timestamp
        );
    }

    // Hàm lấy toàn bộ danh sách transaction
    function getTransactions() public view returns (TransactionInfo[] memory) {
        return transactions;
    }
}
