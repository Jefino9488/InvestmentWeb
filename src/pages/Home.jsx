import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import StocksTab from "@/components/dashboard/tabs/StocksTab";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
    const [marketSummary, setMarketSummary] = useState([]);
    const [news, setNews] = useState([]);
    const [isLoadingMarket, setIsLoadingMarket] = useState(true);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 5;

    const handleRefresh = () => {
        console.log("Refreshing data...");
        // Add actual refresh logic here
    };

    useEffect(() => {
        setIsLoadingMarket(true);
        fetch("http://localhost:5000/api/stock?symbol=IBM")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const timeSeries = data.map(({ timestamp, openPrice, highPrice, lowPrice, closePrice }) => ({
                        timestamp,
                        openPrice,
                        highPrice,
                        lowPrice,
                        closePrice,
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

    const handleNextPage = () => {
        if (currentPage < Math.ceil(news.length / newsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * newsPerPage;
    const displayedNews = news.slice(startIndex, startIndex + newsPerPage);

    // Prepare data for the graph
    const chartData = {
        labels: marketSummary.map(({ timestamp }) => new Date(timestamp).toLocaleString()),
        datasets: [
            {
                label: "Stock Price (Close)",
                data: marketSummary.map(({ closePrice }) => parseFloat(closePrice)),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
            {
                label: "Stock Price (Open)",
                data: marketSummary.map(({ openPrice }) => parseFloat(openPrice)),
                borderColor: "rgb(192, 75, 192)",
                backgroundColor: "rgba(192, 75, 192, 0.2)",
                fill: false,
            },
            {
                label: "Stock Price (High)",
                data: marketSummary.map(({ highPrice }) => parseFloat(highPrice)),
                borderColor: "rgb(192, 192, 75)",
                backgroundColor: "rgba(192, 192, 75, 0.2)",
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Stock Price Trends',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price ($)',
                },
            },
        },
    };

    return (
        <div className="container mx-auto p-6 space-y-8 pt-8">
            <br/>
            <header className="mb-8 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-primary">Dashboard</h1>
                    <Button onClick={handleRefresh} variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Refresh data</span>
                    </Button>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                        <TabsTrigger value="overview" className="text-sm sm:text-base">Overview</TabsTrigger>
                        <TabsTrigger value="stocks" className="text-sm sm:text-base">Stocks</TabsTrigger>
                        <TabsTrigger value="crypto" className="text-sm sm:text-base">Crypto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <OverviewTab onRefresh={handleRefresh} />
                    </TabsContent>
                    <TabsContent value="stocks">
                        <StocksTab />
                    </TabsContent>
                    <TabsContent value="crypto">
                        <Card>
                            <CardContent className="flex items-center justify-center h-40">
                                <p className="text-xl text-muted-foreground">Crypto trading coming soon!</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </header>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Market Summary Section */}
            <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-primary">Market Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoadingMarket
                        ? Array(6)
                            .fill(null)
                            .map((_, index) => (
                                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <Skeleton className="h-6 w-[250px] mb-4" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </CardContent>
                                </Card>
                            ))
                        : marketSummary.length > 0
                            ? marketSummary.slice(0, 6).map(({ timestamp, closePrice, openPrice }) => (
                                <Card key={timestamp} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-2xl text-primary">${parseFloat(closePrice).toFixed(2)}</h3>
                                            {parseFloat(closePrice) > parseFloat(openPrice) ? (
                                                <TrendingUp className="text-green-500" />
                                            ) : (
                                                <TrendingDown className="text-red-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{new Date(timestamp).toLocaleString()}</p>
                                    </CardContent>
                                </Card>
                            ))
                            : (
                                <Card className="col-span-full">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-lg text-muted-foreground">No stock data available.</p>
                                    </CardContent>
                                </Card>
                            )}
                </div>

                {/* Graph for Market Summary */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Market Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[400px]">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Latest News Section */}
            <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-primary">Latest Financial News</h2>
                {isLoadingNews ? (
                    Array(3)
                        .fill(null)
                        .map((_, index) => (
                            <Card key={index} className="mb-4 shadow-md">
                                <CardContent className="p-6">
                                    <Skeleton className="h-6 w-[300px] mb-4" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </CardContent>
                            </Card>
                        ))
                ) : displayedNews.length > 0 ? (
                    displayedNews.map((article, index) => (
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
                                        <DollarSign className="ml-2 h-4 w-4" />
                                    </a>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{article.description}</p>
                            </CardContent>
                            <CardFooter>
                                <p className="text-xs text-muted-foreground">Source: {article.source.name}</p>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <Card className="shadow-md">
                        <CardContent className="p-6 text-center">
                            <p className="text-lg text-muted-foreground">No news available</p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="outline">
                        Previous
                    </Button>
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(news.length / newsPerPage)}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;

