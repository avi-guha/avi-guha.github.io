import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "../../components/Navigation";
import Contact from "../../components/Contact";

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen animate-page-fade-in">
            <Navigation />
            <div className="pt-20 pb-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm">Back to Home</span>
                </Link>
            </div>
            <Contact />
        </div>
    );
};

export default ContactPage;
