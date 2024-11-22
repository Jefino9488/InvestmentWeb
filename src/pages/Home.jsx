import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import StocksTab from "@/components/dashboard/tabs/StocksTab";

const Home = () => {
    const [marketSummary, setMarketSummary] = useState([]);
    const [news, setNews] = useState([]);
    const [isLoadingMarket, setIsLoadingMarket] = useState(true);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    const handleRefresh = () => {
        // Implement refresh logic here
        console.log("Refreshing data...");
    };

    // Fetch stock market summary
    useEffect(() => {
        setIsLoadingMarket(true);
        fetch("http://localhost:5000/api/stock?symbol=IBM")
            .then((res) => res.json())
            .then((data) => {
                if (data && typeof data === "object") {
                    const timeSeries = Object.entries(data).map(([timestamp, values]) => ({
                        timestamp,
                        closePrice: values["4. close"], // Update with the correct key for the closing price
                    }));
                    setMarketSummary(timeSeries);
                } else {
                    throw new Error("Invalid stock data received");
                }
            })
            .catch((err) => {
                console.error("Error fetching stock data:", err);
                setError("Failed to fetch market data. Please try again later.");
            })
            .finally(() => setIsLoadingMarket(false));
    }, []);

    // Fetch financial news
    useEffect(() => {
        setIsLoadingNews(true);
        fetch("http://localhost:5000/api/news")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setNews(data);
                } else {
                    throw new Error("Invalid news data received");
                }
            })
            .catch((err) => {
                console.error("Error fetching news:", err);
                setError("Failed to fetch news. Please try again later.");
            })
            .finally(() => setIsLoadingNews(false));
    }, []);

    return (
        <div className="container mx-auto p-6 space-y-8">
            <br/>

            <header className="mb-8 space-y-4">
                <h1 className="text-5xl font-bold text-primary text-center">Dashboard</h1>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="stocks">Stocks</TabsTrigger>
                        <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <OverviewTab onRefresh={handleRefresh}/>
                    </TabsContent>
                    <TabsContent value="stocks">
                        <StocksTab/>
                    </TabsContent>
                    <TabsContent value="crypto">
                        <div className="text-center py-8 text-muted-foreground">
                            Crypto trading coming soon!
                        </div>
                    </TabsContent>
                </Tabs>
            </header>

            {error && (
                <Alert variant="destructive" className="my-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Market Summary Section */}
            <section className="space-y-4">
                <h2 className="text-3xl font-semibold text-primary">Market Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoadingMarket ? (
                        Array(6).fill().map((_, index) => (
                            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <Skeleton className="h-6 w-[250px] mb-4"/>
                                    <Skeleton className="h-4 w-[200px]"/>
                                </CardContent>
                            </Card>
                        ))
                    ) : marketSummary.length > 0 ? (
                        marketSummary.slice(0, 6).map(({timestamp, closePrice}) => (
                            <Card key={timestamp} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-2xl text-primary mb-2">
                                        ${parseFloat(closePrice).toFixed(2)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(timestamp).toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="col-span-full">
                            <CardContent className="p-6 text-center">
                                <p className="text-lg text-muted-foreground">No stock data available.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>

            {/* Latest News Section */}
            <section className="space-y-4">
                <h2 className="text-3xl font-semibold text-primary">Latest Financial News</h2>
                {isLoadingNews ? (
                    Array(3).fill().map((_, index) => (
                        <Card key={index} className="mb-4 shadow-md">
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-[300px] mb-4"/>
                                <Skeleton className="h-4 w-[200px]"/>
                            </CardContent>
                        </Card>
                    ))
                ) : news.length > 0 ? (
                    news.map((article, index) => (
                        <Card key={index} className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center"
                                    >
                                        {article.title}
                                    </a>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{article.source.name}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="shadow-md">
                        <CardContent className="p-6 text-center">
                            <p className="text-lg text-muted-foreground">No news available</p>
                        </CardContent>
                    </Card>
                )}
            </section>
        </div>
    );
};

export default Home;

