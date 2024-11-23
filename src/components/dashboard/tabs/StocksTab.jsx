import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StocksTab = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const handleSearch = useCallback(async () => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`);
            setSearchResults(response.data.bestMatches || []);
        } catch (error) {
            console.error('Error searching stocks:', error);
        }
    }, [searchQuery]);

    const addToWatchlist = useCallback((symbol) => {
        if (!watchlist.includes(symbol)) {
            setWatchlist([...watchlist, symbol]);
        }
    }, [watchlist]);

    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        }
    }, [searchQuery, handleSearch]);

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
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" onClick={handleSearch} />
                </div>
                <Button onClick={handleSearch}>Search</Button>
            </div>

            {searchResults.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Symbol</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {searchResults.map((result) => (
                                    <TableRow key={result['1. symbol']}>
                                        <TableCell>{result['1. symbol']}</TableCell>
                                        <TableCell>{result['2. name']}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => addToWatchlist(result['1. symbol'])}>Add to Watchlist</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Your Watchlist</CardTitle>
                </CardHeader>
                <CardContent>
                    {watchlist.length > 0 ? (
                        <ul>{watchlist.map((symbol) => <li key={symbol}>{symbol}</li>)}</ul>
                    ) : (
                        <p className="text-muted-foreground">No stocks in watchlist</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StocksTab;
