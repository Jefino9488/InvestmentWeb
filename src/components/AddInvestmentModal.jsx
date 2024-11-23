import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { auth, db } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { DollarSign, Percent, BarChart3 } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const AddInvestmentModal = ({ isOpen, onClose, onAddInvestment }) => {
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                const newInvestment = {
                    userId: user.uid, // Ensure this is correctly set
                    symbol: symbol.toUpperCase(),
                    quantity: parseFloat(quantity),
                    purchasePrice: parseFloat(purchasePrice),
                    currentPrice: parseFloat(purchasePrice), // Placeholder for API integration
                };

                const docRef = await addDoc(collection(db, 'investments'), newInvestment);
                onAddInvestment({ id: docRef.id, ...newInvestment });
                toast.success('Investment added successfully');
                onClose();
            } else {
                toast.error('User is not authenticated');
            }
        } catch (error) {
            console.error('Error adding investment:', error.message);
            toast.error(`Failed to add investment: ${error.message}`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add New Investment</DialogTitle>
                    <DialogDescription>
                        Enter the details of your new investment below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="symbol" className="text-sm font-medium text-gray-700">Symbol</Label>
                        <div className="relative">
                            <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                id="symbol"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                className="pl-10"
                                placeholder="e.g., AAPL"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</Label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="pl-10"
                                placeholder="Number of shares"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="purchasePrice" className="text-sm font-medium text-gray-700">Purchase Price</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                id="purchasePrice"
                                type="number"
                                step="0.01"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                                className="pl-10"
                                placeholder="Price per share"
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">Add Investment</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddInvestmentModal;

