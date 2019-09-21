pragma solidity ^0.5.0;

contract SimpleStorage {
    uint public storedData;
    event ValueChanged(address indexed who, uint new_value);

    constructor(uint initialValue) public {
        storedData = initialValue;
    }

    function set(uint x) public {
        storedData = x;
        emit ValueChanged(msg.sender, x);
    }

    function get() public view returns (uint retVal) {
        return storedData;
    }

}

