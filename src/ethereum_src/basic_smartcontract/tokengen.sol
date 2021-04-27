pragma solidity ^0.4.0;

contract TokenGen {

struct Token {
        string issuer;
	string status;
}

mapping (string => Token) tokens;

function TokenGen()
        public
    {
        createToken("d1","123456","0");
        createCar("d2","654321","0");
        createCar("d0","123456","1");
    }

    function createToken(string device, string issuer, string status)
        public
        payable
    {
        tokens[device] = Token(issuer, status);
    }

    function changeTokenState(string device, string newStatus)
        public
        payable
    {
        tokens[device].status = newStatus;
    }    
    function queryToken(string device)
        public
        view
        returns (string, string)
    {
        return (tokens[device].issuer, tokens[device].status);
    }
}
