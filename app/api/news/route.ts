import { NextRequest, NextResponse } from 'next/server';

const mockNewsData = [
  { title: 'Fed keeps interest rates steady, signals potential cuts in 2024', impact: 'positive', source: 'Reuters' },
  { title: 'Tech stocks rally as AI sector shows strong earnings growth', impact: 'positive', source: 'Bloomberg' },
  { title: 'Oil prices surge amid Middle East supply concerns', impact: 'negative', source: 'CNBC' },
  { title: 'Major banks report better-than-expected Q4 earnings', impact: 'positive', source: 'Wall Street Journal' },
  { title: 'Consumer confidence drops to 6-month low on inflation worries', impact: 'negative', source: 'Financial Times' },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbols = searchParams.get('symbols')?.split(',') || ['AAPL'];
    
    try {
      const yahooFinance = (await import('yahoo-finance2')).default;
      const allNews: any[] = [];
      
      for (const symbol of symbols.slice(0, 3)) {
        try {
          const result: any = await yahooFinance.search(symbol);
          if (result.news && result.news.length > 0) {
            result.news.slice(0, 2).forEach((item: any) => {
              allNews.push({
                title: item.title,
                impact: Math.random() > 0.5 ? 'positive' : 'negative',
                source: item.publisher || 'Financial News',
              });
            });
          }
        } catch (error) {
          // Silently skip this symbol
        }
      }
      
      if (allNews.length > 0) {
        return NextResponse.json({ news: allNews.slice(0, 4) });
      }
    } catch (error) {
      // Silently use mock news data
    }
    
    return NextResponse.json({ news: mockNewsData });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ news: mockNewsData });
  }
}
