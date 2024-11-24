import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Trash2, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { auth, db } from '@/Firebase';
import { doc, setDoc, deleteDoc, collection, query, getDocs } from 'firebase/firestore';
import { toast } from "react-hot-toast";

const StocksTab = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}`);
            setSearchResults(response.data || []);
        } catch (error) {
            console.error('Error searching stocks:', error);
            setError('Failed to search stocks. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    const addToWatchlist = useCallback(async (stock) => {
        const user = auth.currentUser;
        if (user && !watchlist.some(item => item.symbol === stock.symbol)) {
            try {
                const watchlistRef = doc(db, 'watchlists', user.uid, 'stocks', stock.symbol);
                await setDoc(watchlistRef, stock);
                setWatchlist([...watchlist, stock]);
                toast.success(`Added ${stock.symbol} to watchlist`);
            } catch (error) {
                console.error('Error adding to watchlist:', error);
                toast.error('Failed to add to watchlist');
            }
        }
    }, [watchlist]);

    const removeFromWatchlist = useCallback(async (symbol) => {
        const user = auth.currentUser;
        if (user) {
            try {
                const watchlistRef = doc(db, 'watchlists', user.uid, 'stocks', symbol);
                await deleteDoc(watchlistRef);
                setWatchlist(watchlist.filter(item => item.symbol !== symbol));
                toast.success(`Removed ${symbol} from watchlist`);
            } catch (error) {
                console.error('Error removing from watchlist:', error);
                toast.error('Failed to remove from watchlist');
            }
        }
    }, [watchlist]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, 'watchlists', user.uid, 'stocks'));
                const querySnapshot = await getDocs(q);
                const watchlistData = querySnapshot.docs.map(doc => doc.data());
                setWatchlist(watchlistData);
            }
        };

        fetchWatchlist();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const timeoutId = setTimeout(() => {
                handleSearch();
            }, 500); // Debounce search
            return () => clearTimeout(timeoutId);
        }
    }, [searchQuery, handleSearch]);

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Stock Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Input
                                placeholder="Search stocks..."
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <Button onClick={handleSearch} disabled={isLoading}>
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {searchResults.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Symbol</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Region</TableHead>
                                        <TableHead>Currency</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {searchResults.map((result) => (
                                        <TableRow key={result.symbol}>
                                            <TableCell className="font-medium">{result.symbol}</TableCell>
                                            <TableCell>{result.name}</TableCell>
                                            <TableCell>{result.type}</TableCell>
                                            <TableCell>{result.region}</TableCell>
                                            <TableCell>{result.currency}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => addToWatchlist(result)}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Star className="mr-2 h-4 w-4" />
                                                    Add
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Your Watchlist</CardTitle>
                </CardHeader>
                <CardContent>
                    {watchlist.length > 0 ? (
                        <ScrollArea className="h-[200px]">
                            <ul className="space-y-2">
                                {watchlist.map((stock) => (
                                    <li key={stock.symbol} className="flex justify-between items-center p-2 bg-secondary rounded">
                                        <span className="font-medium">{stock.symbol} - {stock.name}</span>
                                        <Button
                                            onClick={() => removeFromWatchlist(stock.symbol)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove {stock.symbol} from watchlist</span>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    ) : (
                        <p className="text-muted-foreground">No stocks in watchlist</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StocksTab;

