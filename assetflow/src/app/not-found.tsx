import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center py-32">
        <div className="relative mb-8">
          <div className="font-headline text-[120px] font-black text-on-background/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-[80px] text-primary animate-bounce">
              extension_off
            </span>
          </div>
        </div>
        
        <h1 className="font-headline text-4xl font-black text-on-background mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-[18px] text-on-surface-variant max-w-md mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="font-headline font-bold text-[16px] bg-primary text-on-primary px-8 py-4 rounded-xl border-2 border-on-background bento-shadow"
          >
            Back to Home
          </Link>
          <Link 
            href="/explore" 
            className="font-headline font-bold text-[16px] bg-surface text-on-background px-8 py-4 rounded-xl border-2 border-on-background hover:bg-surface-variant transition-colors"
          >
            Explore Assets
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
