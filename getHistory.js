const express = require('express');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/historical', async (req, res) => {
    const { symbol, period1, period2 } = req.query;

    if (!symbol || !period1 || !period2) {
        return res.status(400).json({ error: 'Symbol, period1, and period2 are required.' });
    }

    const queryOptions = { period1, period2 };

    try {
        const result = await yahooFinance.historical(symbol, queryOptions);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching historical data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
