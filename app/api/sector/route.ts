import { NextRequest, NextResponse } from 'next/server';

const sectorMap: {[key: string]: string} = {
  'AAPL': 'Technology',
  'AMZN': 'Consumer Cyclical',
  'TSLA': 'Consumer Cyclical',
  'NVDA': 'Technology',
  'GOOG': 'Communication Services',
  'MSFT': 'Technology',
  'META': 'Communication Services'
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    
    if (!symbol) {
      return NextResponse.json({ error: 'Symbol required' }, { status: 400 });
    }

    try {
      const yahooFinance = (await import('yahoo-finance2')).default;
      const result: any = await yahooFinance.quoteSummary(symbol, { 
        modules: ['assetProfile'] 
      });
      
      const sector = result.assetProfile?.sector || sectorMap[symbol] || 'Unknown';
      return NextResponse.json({ symbol, sector });
    } catch (error) {
      // Silently use mock sector data
      return NextResponse.json({ 
        symbol,
        sector: sectorMap[symbol] || 'Unknown' 
      });
    }
  } catch (error) {
    console.error(`Error fetching sector for ${request.nextUrl.searchParams.get('symbol')}:`, error);
    return NextResponse.json({ 
      symbol: request.nextUrl.searchParams.get('symbol'),
      sector: 'Unknown' 
    });
  }
}
