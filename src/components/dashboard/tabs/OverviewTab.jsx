import { useEffect, useState } from 'react';
import StatsCard from '../StatsCard';
import MarketOverview from '../MarketOverview';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

const OverviewTab = ({ onRefresh }) => {
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const handleRefresh = () => {
        onRefresh?.();
        setLastUpdated(new Date());
    };

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
                    value="$15,231.89"
                    change="12.5"
                    changeType="increase"
                />
                <StatsCard
                    title="Today's Change"
                    value="+$231.89"
                    change="2.3"
                    changeType="increase"
                />
                <StatsCard
                    title="Total Investments"
                    value="23"
                />
                <StatsCard
                    title="Market Status"
                    value="Open"
                />
            </div>

            <MarketOverview data={[
                { name: 'S&P 500', price: '4,783.83', change: '+25.61', percentChange: '+0.54' },
                { name: 'NASDAQ', price: '15,055.65', change: '+80.12', percentChange: '+0.53' },
                { name: 'DOW', price: '37,656.52', change: '+168.76', percentChange: '+0.45' },
            ]} />
        </div>
    );
};

export default OverviewTab;
