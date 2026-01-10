# Portfolio Performance Tracking

Your investment dashboard now fully tracks portfolio performance with accurate calculations!

## How It Works

### 1. **Adding Stocks**
When you click "Add Stock to Portfolio", you enter:
- **Stock Symbol** (e.g., AAPL)
- **Quantity** (number of shares)
- **Purchase Price** (price per share you paid)
- **Purchase Date** (when you bought it)

### 2. **Live Price Updates**
- The dashboard automatically fetches current prices from Yahoo Finance every 60 seconds
- Your portfolio holdings are updated with real-time prices
- All calculations happen automatically

### 3. **Performance Calculations**

For each stock:
```
Cost Basis = Purchase Price × Quantity
Current Value = Current Price × Quantity
Gain/Loss = Current Value - Cost Basis
Gain/Loss % = (Gain/Loss ÷ Cost Basis) × 100
```

For total portfolio:
```
Total Cost = Sum of all Cost Bases
Total Value = Sum of all Current Values
Total Gain/Loss = Total Value - Total Cost
Total Gain/Loss % = (Total Gain/Loss ÷ Total Cost) × 100
```

### 4. **What You See**

**In Portfolio List:**
- **Purchase Price**: What you paid per share
- **Current Price**: Live market price
- **Cost Basis**: Total amount you invested (Purchase Price × Quantity)
- **Value**: Current total value (Current Price × Quantity)
- **Gain/Loss**: Dollar amount and percentage profit/loss

**Portfolio Summary:**
- **Total Value**: Current worth of entire portfolio
- **Total Cost**: How much you invested
- **Total Gain/Loss**: Overall profit/loss in $ and %

### 5. **Data Storage**
- Your portfolio is saved in browser localStorage
- Persists between sessions
- Current prices refresh automatically when you visit

## Example

If you bought:
- 10 shares of AAPL at $150.00 on Jan 1, 2024

And current price is $185.50:
- Cost Basis: $1,500.00
- Current Value: $1,855.00
- Gain: +$355.00 (+23.67%)

## Tips

- Enter accurate purchase prices for correct performance tracking
- The system handles fractional shares (e.g., 1.5 shares)
- Add multiple purchases of the same stock as separate entries
- Delete holdings you've sold
- Prices update automatically every minute
