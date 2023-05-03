const yf = require('yfinance');

// Define the stock symbol and time period
const symbol = 'AAPL';
const period = '1y';

// Fetch stock data from Yahoo Finance
const data = yf.download(symbol, { period: period });

// Calculate the moving averages
const ma20 = data['Close'].rolling(20).mean().iloc[-1];
const ma50 = data['Close'].rolling(50).mean().iloc[-1];

// Calculate the RSI
const delta = data['Close'].diff();
const gain = delta.where(delta > 0, 0);
const loss = -delta.where(delta < 0, 0);
const avg_gain = gain.rolling(14).mean().iloc[-1];
const avg_loss = loss.rolling(14).mean().iloc[-1];
const rs = avg_gain / avg_loss;
const rsi = 100 - (100 / (1 + rs));

// Output the conclusion based on the indicators
let conclusion = '';
if (data['Close'].iloc[-1] > ma20 && data['Close'].iloc[-1] > ma50 && rsi > 50) {
  conclusion = 'The stock is in a bullish trend.';
} else if (data['Close'].iloc[-1] < ma20 && data['Close'].iloc[-1] < ma50 && rsi < 50) {
  conclusion = 'The stock is in a bearish trend.';
} else {
  conclusion = 'The stock is in a neutral trend.';
}

console.log(conclusion);
