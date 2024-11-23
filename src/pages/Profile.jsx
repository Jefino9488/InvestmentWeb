import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from 'react-hot-toast';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUser(currentUser);
                setName(currentUser.displayName || '');
                setEmail(currentUser.email || '');

                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    setPhone(userDoc.data().phone || '');
                }
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, { displayName: name });
            await updateDoc(doc(db, 'users', user.uid), {
                name,
                phone
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="container mx-auto p-6 max-w-2xl mt-16 md:mt-24">
            <Card className="w-full shadow-lg">
                <CardHeader className="flex flex-col items-center space-y-4 pb-8">
                    <Avatar className="w-24 h-24 border-4 border-primary/10">
                        <AvatarImage src={user.photoURL || '/placeholder.svg?height=96&width=96'} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end px-6 py-4 bg-gray-50">
                    <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto">Update Profile</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Profile;

