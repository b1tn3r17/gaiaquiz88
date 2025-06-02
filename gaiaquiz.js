const axios = require('axios');
const fs = require('fs');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCurrentMoscowTime = () => {
    const now = new Date();
    return now.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
};

(async () => {
    try {
        console.log('Goyda Net By [Cryptohomo Industries]\n\n');
        const addressList = fs.readFileSync('keyword.txt', 'utf-8');
        const addressListArray = addressList.split('\n');

        const GAIA_API_KEY = 'ключ сюда'; 

        for (let index = 11; index < addressListArray.length; index++) {
            const Wallet = addressListArray[index];
            console.log("Content Chat: " + Wallet + "\n");

            try {
                const response = await axios.post(
                    'https://bitner.gaia.domains/v1/chat/completions',
                    {
                        'messages': [
                            {
                                'role': 'system',
                                'content': 'You are a helpful assistant.'
                            },
                            {
                                'role': 'user',
                                'content': `${Wallet}`
                            }
                        ]
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${GAIA_API_KEY}` 
                        }
                    }
                );

                console.log("Response: [" + response.data.choices[0].message.content + "]\n");
                console.log("Last message sent at (MSK, UTC+3): " + getCurrentMoscowTime() + "\n");

                await delay(1000);

            } catch (postError) {
                console.error("Error during axios post: ", postError);
            }
        }
    } catch (error) {
        console.error("Error: ", error);
    }
})();
