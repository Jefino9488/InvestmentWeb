import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MarketOverview = ({ data }) => {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Index</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Change</TableHead>
                            <TableHead>% Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell className={item.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {item.change >= 0 ? '+' : ''}{item.change}
                                </TableCell>
                                <TableCell className={item.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {item.percentChange >= 0 ? '+' : ''}{item.percentChange}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default MarketOverview;
