## Instructions to start API

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