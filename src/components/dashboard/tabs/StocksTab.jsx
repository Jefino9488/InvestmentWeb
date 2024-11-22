import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const StocksTab = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Input
                        placeholder="Search stocks..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <Button>Add to Watchlist</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Watchlist</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No stocks in watchlist</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StocksTab;
