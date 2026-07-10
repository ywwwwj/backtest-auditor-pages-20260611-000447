import React from "react";

const sitePath = (page: string) => (
  window.location.pathname.includes("/v2/") ? `../${page}` : `./${page}`
);

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      secondary: "bg-gray-800 text-white hover:bg-gray-700",
      ghost: "hover:bg-gray-800/50 text-white",
      gradient: "bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95"
    };
    
    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base"
    };
    
    const shared = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <a
          ref={ref as never}
          href={href}
          className={shared}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={shared} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Icons
const ArrowRight = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Menu = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-white">Backtest Auditor</div>
          
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href={sitePath("methodology.html")} className="text-sm text-white/60 hover:text-white transition-colors">
              Methodology
            </a>
            <a href={sitePath("cases.html")} className="text-sm text-white/60 hover:text-white transition-colors">
              Cases
            </a>
            <a href={sitePath("app.html")} className="text-sm text-white/60 hover:text-white transition-colors">
              Workspace
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button href={sitePath("demo.html")} variant="ghost" size="sm">
              Watch demo
            </Button>
            <Button href={sitePath("audit.html")} variant="default" size="sm">
              Request audit
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 animate-[slideDown_0.3s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href={sitePath("methodology.html")}
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Methodology
            </a>
            <a
              href={sitePath("cases.html")}
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cases
            </a>
            <a
              href={sitePath("app.html")}
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workspace
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-800/50">
              <Button href={sitePath("demo.html")} variant="ghost" size="sm">
                Watch demo
              </Button>
              <Button href={sitePath("audit.html")} variant="default" size="sm">
                Request audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const Hero = React.memo(() => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24"
      style={{
        animation: "fadeIn 0.6s ease-out"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm max-w-full">
        <span className="text-xs text-center whitespace-nowrap" style={{ color: '#9ca3af' }}>
          Built for Strategy Tester, LEAN, Python, and CSV exports
        </span>
        <a
          href={sitePath("cases.html")}
          className="flex items-center gap-1 text-xs hover:text-white transition-all active:scale-95 whitespace-nowrap"
          style={{ color: '#9ca3af' }}
          aria-label="Read more about the new version"
        >
          See the audit standard
          <ArrowRight size={12} />
        </a>
      </aside>

      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-medium text-center max-w-3xl px-6 leading-tight mb-6"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.05em"
        }}
      >
          Your backtest passed. <br />Does it survive reality?
      </h1>

      <p className="text-sm md:text-base text-center max-w-2xl px-6 mb-10" style={{ color: '#9ca3af' }}>
        Stress costs, slippage, lookahead risk, and OOS decay before you spend another week tuning parameters.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 mb-14">
          <Button
          href={sitePath("app.html?example=kill")}
          variant="gradient"
          size="lg"
          className="rounded-lg flex items-center justify-center"
          aria-label="Open Backtest Auditor workspace"
        >
          Stress-test a sample result
        </Button>
        <Button href={sitePath("app.html")} variant="ghost" size="lg" className="border border-gray-700">
          Open the workspace
        </Button>
      </div>

      <div className="w-full max-w-5xl relative pb-20">
        <div
          className="absolute left-1/2 w-[90%] pointer-events-none z-0"
          style={{
            top: "-23%",
            transform: "translateX(-50%)"
          }}
          aria-hidden="true"
        >
          <img
            src="https://i.postimg.cc/Ss6yShGy/glows.png"
            alt=""
            className="w-full h-auto"
            loading="eager"
          />
        </div>
        
        <div className="relative z-10">
          <img
            src="./audit-workspace.png"
            alt="Backtest Auditor workspace showing a KILL audit verdict and risk checks"
            className="w-full h-auto rounded-lg shadow-2xl"
            loading="eager"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-3 pb-8">
        <article className="border border-gray-800 bg-gray-950 px-5 py-5 text-left">
          <span className="text-xs text-emerald-300">01 / Reality costs</span>
          <h2 className="mt-3 text-lg font-medium text-white">Would fees and slippage erase it?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">Check the assumptions that polished equity curves usually hide.</p>
        </article>
        <article className="border border-gray-800 bg-gray-950 px-5 py-5 text-left">
          <span className="text-xs text-amber-300">02 / False evidence</span>
          <h2 className="mt-3 text-lg font-medium text-white">Did it learn from the future?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">Flag lookahead gaps, thin samples, and second-half decay before live testing.</p>
        </article>
        <article className="border border-gray-800 bg-gray-950 px-5 py-5 text-left">
          <span className="text-xs text-red-300">03 / Next decision</span>
          <h2 className="mt-3 text-lg font-medium text-white">What is the one test to run next?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">Leave with a Continue, Retest, or Kill decision instead of another loose report.</p>
        </article>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

// Main Component
export default function Component() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
    </main>
  );
}
