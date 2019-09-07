pragma solidity 0.5.11;

contract ValueStore {

    uint256 internal value;

    constructor(uint256 _value) public {
        value = _value;
    }

    function setValue(uint256 _value) public {
        require(_value != 5, "5 is a test revert value");
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

}
