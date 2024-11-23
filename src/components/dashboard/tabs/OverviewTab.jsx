import { useEffect, useState, useCallback } from 'react';
import StatsCard from '../StatsCard';
import MarketOverview from '../MarketOverview';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import axios from 'axios';

const OverviewTab = ({ onRefresh }) => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [marketData, setMarketData] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [todayChange, setTodayChange] = useState(0);
    const [totalInvestments, setTotalInvestments] = useState(0);
    const [marketStatus, setMarketStatus] = useState('');

    const handleRefresh = useCallback(() => {
        onRefresh?.();
        setLastUpdated(new Date());
        fetchMarketData();
    }, [onRefresh]);

    const fetchMarketData = useCallback(async () => {
        try {
            const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
            
            // Fetch data for multiple indices
            const indices = ['IBM', 'TSCO', 'MSFT'];
            const marketDataPromises = indices.map(symbol =>
                axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
            );
            console.log(marketData);
            
            const marketResponses = await Promise.all(marketDataPromises);
            const newMarketData = marketResponses.map(response => {
                const data = response.data['Global Quote'];
                if (!data) return null; // Skip if no data is available
                return {
                    name: data['01. symbol'],
                    price: parseFloat(data['05. price']).toFixed(2),
                    change: parseFloat(data['09. change']).toFixed(2),
                    percentChange: parseFloat(data['10. change percent']).toFixed(2)
                };
            }).filter(Boolean); // Remove any null entries
            
            setMarketData(newMarketData);
            
            // Fetch market status
            const marketStatusResponse = await axios.get(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${apiKey}`);
            const marketStatusData = marketStatusResponse.data;
            setMarketStatus(marketStatusData.market_type?.us_market || 'Unknown');
            
            // Simulate portfolio data (replace with real data in production)
            const simulatedPortfolioValue = Math.random() * 100000 + 50000;
            const simulatedTodayChange = (Math.random() - 0.5) * 1000;
            const simulatedTotalInvestments = Math.floor(Math.random() * 50) + 10;
            
            setPortfolioValue(simulatedPortfolioValue.toFixed(2));
            setTodayChange(simulatedTodayChange.toFixed(2));
            setTotalInvestments(simulatedTotalInvestments);
            
        } catch (error) {
            console.error('Error fetching market data:', error.message);
        }
    }, []);

    useEffect(() => {
        fetchMarketData();
    }, [fetchMarketData]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Portfolio Value"
                    value={`$${portfolioValue}`}
                    change={(portfolioValue / 100000 * 100 - 100).toFixed(2)}
                    changeType={portfolioValue > 100000 ? 'increase' : 'decrease'}
                />
                <StatsCard
                    title="Today's Change"
                    value={`${todayChange > 0 ? '+' : '-'}$${Math.abs(todayChange)}`}
                    change={(todayChange / portfolioValue * 100).toFixed(2)}
                    changeType={todayChange > 0 ? 'increase' : 'decrease'}
                />
                <StatsCard
                    title="Total Investments"
                    value={totalInvestments.toString()}
                />
                <StatsCard
                    title="Market Status"
                    value={marketStatus}
                />
            </div>

            <MarketOverview data={marketData} />
        </div>
    );
};

export default OverviewTab;
