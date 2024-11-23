import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, TrendingDown } from 'lucide-react';
import AddInvestmentModal from '../components/AddInvestmentModal';

const Portfolio = () => {
    const [investments, setInvestments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        const fetchInvestments = async () => {
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, 'investments'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const investmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setInvestments(investmentsData);

                // Calculate total value and profit
                let value = 0;
                let profit = 0;
                investmentsData.forEach(inv => {
                    value += inv.currentPrice * inv.quantity;
                    profit += (inv.currentPrice - inv.purchasePrice) * inv.quantity;
                });
                setTotalValue(value);
                setTotalProfit(profit);
            }
        };

        fetchInvestments();
    }, []);

    const handleAddInvestment = (newInvestment) => {
        setInvestments([...investments, newInvestment]);
        setTotalValue(prev => prev + newInvestment.currentPrice * newInvestment.quantity);
        setTotalProfit(prev => prev + (newInvestment.currentPrice - newInvestment.purchasePrice) * newInvestment.quantity);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <br/>
            <br/>
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Your Investment Portfolio</CardTitle>
                    <CardDescription className="text-blue-100">Track and manage your investments</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold">Total Value</p>
                        <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Total Profit/Loss</p>
                        <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                            ${totalProfit.toFixed(2)}
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        variant="secondary"
                        className="bg-white text-blue-600 hover:bg-blue-100"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Investment
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Investment Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Purchase Price</TableHead>
                                <TableHead>Current Value</TableHead>
                                <TableHead>Profit/Loss</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {investments.map((investment) => (
                                <TableRow key={investment.id}>
                                    <TableCell className="font-medium">{investment.symbol}</TableCell>
                                    <TableCell>{investment.quantity}</TableCell>
                                    <TableCell>${investment.purchasePrice.toFixed(2)}</TableCell>
                                    <TableCell>${(investment.currentPrice * investment.quantity).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className={`flex items-center ${investment.currentPrice > investment.purchasePrice ? 'text-green-600' : 'text-red-600'}`}>
                                            {investment.currentPrice > investment.purchasePrice ? (
                                                <TrendingUp className="mr-2 h-4 w-4" />
                                            ) : (
                                                <TrendingDown className="mr-2 h-4 w-4" />
                                            )}
                                            ${((investment.currentPrice - investment.purchasePrice) * investment.quantity).toFixed(2)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AddInvestmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddInvestment={handleAddInvestment}
            />
        </div>
    );
};

export default Portfolio;

