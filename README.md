## Instructions to start applications

### API

1. Install node if it is not installed from https://nodejs.org/en/download/. You can check if installed already with command node -v.
2. Create credentials.env file with 
GATEWAY_TOKEN={Yor gateway token}
ENVIROMENT_KEY={Your key}
ACCESS_SECRET={You secret}
RECEIVER_TOKEN={Your receiver token}
3. Run npm install 
4. To start in development mode run
npm run dev
It will automatically restart if code changes are detected.
To start in production mode run
npm run start

### UI

npm install
npm start

## Notes
1. It wasn't clear if a test gateway is automatically added to trial account or need to add it.
2. When key has extra characters at the end it still work. 
3. Noticed a RedactPaymentMethod transaction, but I didn't find in the docs what it means.
4. Can't figure out how to make purchase using stored card data.
