## Instructions to start applications

### API

1. Install node if it is not installed from https://nodejs.org/en/download/. You can check if installed already with command
    node -v
2. Create .env file with
    GATEWAY_TOKEN={Your gateway token}
    ENVIROMENT_KEY={Your key}
    ACCESS_SECRET={Your secret}
    RECEIVER_TOKEN={Your receiver token}
3. Run npm install 
4. To start in development mode run
    npm run dev
    It will automatically restart if code changes are detected.
    To start in production mode run
    npm run start

### UI

1. Create .env.local file with
    REACT_APP_ENVIRONMENT_KEY={Your key}

2. Run commands
    npm install
    npm start

## Notes
1. It wasn't clear if a test gateway was automatically added to trial account or we need to add it.
2. When key has extra characters at the end it still works. 
3. Noticed a RedactPaymentMethod transaction, but I didn't find in the docs what it means.
4. Can't figure out how to make purchase using stored card data.
5. Executing the transaction for Spreedly Express doesn't mention anything about paymentMethod callback argument SpreedlyExpress.onPaymentMethod(function(token, paymentMethod). Express Javascript API calls this argument formData.


## Implementation Notes
1. The API application has a separate route for retain. However, credit card data can be saved with the purchase API call by passing retain_on_success in the request body.
