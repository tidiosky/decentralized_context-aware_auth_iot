/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

module.exports.info = 'Creating tokens.';

let txIndex = 0;
let devices = ['device0', 'device1', 'device2', 'device3', 'device4', 'device5', 'device6', 'device7', 'device8'];
let issuers = ['123456', '654321', '987654', '456789', '123789', '987321'];
let status = ['0', '1'];
let bc, contx;

module.exports.init = function(blockchain, context, args) {
    bc = blockchain;
    contx = context;

    return Promise.resolve();
};

module.exports.run = function() {
    txIndex++;
    let device = devices[Math.floor(Math.random() * devices.length)];
    let issuer = issuers[Math.floor(Math.random() * issuers.length)];
    let status = status[Math.floor(Math.random() * status.length)];

    let args = {
        chaincodeFunction: 'createToken',
        chaincodeArguments: [device, issuer, status]
    };

    return bc.invokeSmartContract(contx, 'tokengen', 'v0', args, 30);
};

module.exports.end = function() {
    return Promise.resolve();
};
