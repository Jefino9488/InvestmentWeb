import { Link } from 'react-router-dom';
import { BarChart2, Briefcase, LightbulbIcon, ShieldCheck, TrendingUp, DollarSign, Users, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <br/>
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 sm:text-5xl">Welcome to InvestPro</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Empowering you to make smart investment decisions with real-time insights.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link to="/signup" className="flex items-center">
                            Get Started
                            <TrendingUp className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">$10B+ Assets Managed</h3>
                            <p className="text-gray-600">Trusted by investors worldwide</p>
                        </div>
                        <div>
                            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">100,000+ Active Users</h3>
                            <p className="text-gray-600">Join our growing community</p>
                        </div>
                        <div>
                            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Award-Winning Platform</h3>
                            <p className="text-gray-600">Recognized for excellence in fintech</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose InvestPro?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            title="Real-Time Analytics"
                            description="Stay updated with the latest market trends and data."
                            icon={<BarChart2 className="h-10 w-10" />}
                        />
                        <FeatureCard
                            title="Portfolio Tracking"
                            description="Manage and analyze your investments efficiently."
                            icon={<Briefcase className="h-10 w-10" />}
                        />
                        <FeatureCard
                            title="Personalized Advice"
                            description="Get tailored recommendations based on your goals."
                            icon={<LightbulbIcon className="h-10 w-10" />}
                        />
                        <FeatureCard
                            title="Risk Assessment"
                            description="Evaluate and understand your investment risks with our advanced tools."
                            icon={<ShieldCheck className="h-10 w-10" />}
                        />
                    </div>
                </div>
            </section>

            {/* Investment Strategies */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Investment Strategies</h2>
                    <Tabs defaultValue="growth" className="max-w-3xl mx-auto">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="growth">Growth</TabsTrigger>
                            <TabsTrigger value="balanced">Balanced</TabsTrigger>
                            <TabsTrigger value="conservative">Conservative</TabsTrigger>
                        </TabsList>
                        <TabsContent value="growth">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Growth Strategy</CardTitle>
                                    <CardDescription>Maximize long-term capital appreciation</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Our growth strategy focuses on stocks and assets with high potential for capital appreciation. Ideal for investors with a higher risk tolerance and a long-term investment horizon.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="balanced">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Balanced Strategy</CardTitle>
                                    <CardDescription>Blend of growth and income</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Our balanced strategy aims to provide a mix of capital growth and income. It's suitable for investors seeking moderate risk and a combination of growth and stability.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="conservative">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conservative Strategy</CardTitle>
                                    <CardDescription>Focus on capital preservation and income</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Our conservative strategy prioritizes capital preservation and steady income. It's designed for risk-averse investors or those nearing retirement who want to protect their wealth.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="InvestPro helped me achieve my financial goals with ease!"
                            name="John Doe"
                            designation="Entrepreneur"
                        />
                        <TestimonialCard
                            quote="The real-time data and insights are phenomenal."
                            name="Jane Smith"
                            designation="Investor"
                        />
                        <TestimonialCard
                            quote="Excellent platform for beginners and professionals alike."
                            name="Alice Johnson"
                            designation="Financial Advisor"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-blue-600 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6">Ready to take control of your investments?</h3>
                    <Button asChild size="lg" variant="secondary">
                        <Link to="/signup" className="flex items-center">
                            Join Now
                            <TrendingUp className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ title, description, icon }) {
    return (
        <Card>
            <CardHeader>
                <div className="mb-4 text-blue-600">{icon}</div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{description}</p>
            </CardContent>
        </Card>
    )
}

function TestimonialCard({ quote, name, designation }) {
    return (
        <Card>
            <CardContent className="pt-6">
                <p className="text-gray-700 italic mb-4">&quot;{quote}&quot;</p>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{designation}</CardDescription>
            </CardContent>
        </Card>
    )
}

