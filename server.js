const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/convert', (req, res) => {
    const { amount, from, to } = req.query;

    const convertedAmount = convertCurrency(amount, from, to);

    res.json({ result: convertedAmount });
});

app.listen(port, () => {
    console.log('Server is running');
});

function convertCurrency(amount, from, to) {
    const exchangeRates = {
        USD: { EUR: 0.85, GBP: 0.73, JPY: 113.09, THB: 32.95 },
        EUR: { USD: 1.18, GBP: 0.86, JPY: 129.94, THB: 37.99 },
        GBP: { USD: 1.38, EUR: 1.16, JPY: 149.28, THB: 43.74 },
        JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0067, THB: 0.307 },
        THB: { USD: 0.030, EUR: 0.026, GBP: 0.023, JPY: 3.26 },
    };

    if (from === to) {
        return amount;
    }

    const rate = exchangeRates[from] && exchangeRates[from][to];
    if (!rate) {
        throw new Error('Exchange rate not available');
    }

    return amount * rate;
}