import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "../../components/Navigation";
import Resume from "../../components/Resume";

const ResumePage = () => {
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
            <Resume />
        </div>
    );
};

export default ResumePage;
