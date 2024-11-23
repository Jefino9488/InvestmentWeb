import { ChevronRight, BarChart2, Briefcase, LightbulbIcon, ShieldCheck } from 'lucide-react'

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <br/>
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 sm:text-5xl">Welcome to InvestPro</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Empowering you to make smart investment decisions with real-time insights.
                    </p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg transition-colors hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center mx-auto">
                        Get Started
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

            {/* Testimonials Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                        <TestimonialCard
                            quote="InvestPro's risk assessment tools have been invaluable for my portfolio management."
                            name="Robert Chen"
                            designation="Risk Analyst"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-blue-600 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6">Ready to take control of your investments?</h3>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center mx-auto">
                        Join Now
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </section>
        </div>
    )
}

const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
        <div className="mb-4 text-blue-600">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
)

const TestimonialCard = ({ quote, name, designation }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 italic mb-4">&quot;{quote}&quot;</p>
        <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{designation}</p>
    </div>
)

