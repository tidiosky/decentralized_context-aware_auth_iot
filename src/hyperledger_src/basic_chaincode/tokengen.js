
'use strict';

const { Contract } = require('fabric-contract-api');

class TokenGen extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger with random token ===========');
        const tokens = [
            {
                device: 'd1',
                issuer: '123456', // Simple structure for evaluation, could be complexified for real deployment
		status: '0',
            },
            {
                device: 'd2',
                issuer: '654321',
		status: '0',
            },
            {
                device: 'd0',
                issuer: '123456',
		status: '1', // revoked
            },

        ];

        for (let i = 0; i < tokens.length; i++) {
            tokens[i].docType = 'token';
            await ctx.stub.putState('TOKEN' + i, Buffer.from(JSON.stringify(tokens[i])));
            console.info('Added <--> ', tokens[i]);
        }
        console.info('============= END : Initialize Ledger with randow token ===========');
    }

    async queryToken(ctx, device) {
        const tokenAsBytes = await ctx.stub.getState(device); // get a specific token from chaincode state
        if (!tokenAsBytes || tokenAsBytes.length === 0) {
            throw new Error(`${device} does not exist`);
        }
        console.log(tokenAsBytes.toString());
        return tokenAsBytes.toString();
    }

    async createToken(ctx, device, issuer,status) {
        console.info('============= START : Create Token ===========');

        const token = {
            device,
	    issuer,
	    status,	 
            docType: 'token',
        };

        await ctx.stub.putState(device, Buffer.from(JSON.stringify(token)));
        console.info('============= END : Create Token ===========');
    }

    async queryAllTokens(ctx) {
        const startKey = 'device0';
        const endKey = 'device999'; // could be changed depending on the number of devices

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeTokenState(ctx, device, status) { // Revoke Token
        console.info('============= START : changeTokenState ===========');

        const tokenAsBytes = await ctx.stub.getState(device); 
        if (!tokenAsBytes || tokenAsBytes.length === 0) {
            throw new Error(`${device} does not exist`);
        }
        const token = JSON.parse(tokenAsBytes.toString());
        token.stats = status;

        await ctx.stub.putState(device, Buffer.from(JSON.stringify(token)));
        console.info('============= END : changeTokenState ===========');
    }

}

module.exports = TokenGen;
