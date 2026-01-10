const yahooFinance = require('yahoo-finance2').default;

async function testAPI() {
  try {
    console.log('Testing Yahoo Finance API...\n');
    
    // Test 1: quoteSummary
    console.log('1. Testing quoteSummary for AAPL:');
    const quote = await yahooFinance.quoteSummary('AAPL', { modules: ['price'] });
    console.log('Price:', quote.price?.regularMarketPrice);
    console.log('Change:', quote.price?.regularMarketChangePercent);
    console.log('Name:', quote.price?.shortName);
    console.log('');
    
    // Test 2: quote (simpler method)
    console.log('2. Testing quote for AAPL:');
    const quote2 = await yahooFinance.quote('AAPL');
    console.log('Price:', quote2.regularMarketPrice);
    console.log('Change:', quote2.regularMarketChangePercent);
    console.log('Name:', quote2.shortName || quote2.longName);
    console.log('');
    
    // Test 3: historical
    console.log('3. Testing historical for AAPL (last 5 days):');
    const now = new Date();
    const past = new Date();
    past.setDate(past.getDate() - 5);
    const historical = await yahooFinance.historical('AAPL', {
      period1: past,
      period2: now,
      interval: '1d'
    });
    console.log('Last close:', historical[historical.length - 1]?.close);
    console.log('');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
