pragma solidity ^0.5.0;
import "./safemath.sol";

contract TodoList {

    using SafeMath for uint;

	uint public taskCount = 0;
    
    struct Task {
        uint id;
        string content;
        bool completed;
    }
    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("this is a web3 todo dapp");
    }

    function createTask(string memory _content) public {
        taskCount = taskCount.add(1);
        tasks[taskCount] = Task(taskCount, _content, false);
    }
	
}