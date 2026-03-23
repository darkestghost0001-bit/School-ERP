import { useState, useEffect, useRef, FormEvent } from "react";
import {
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  ChevronDown,
  Star,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sun,
  Moon,
  ArrowRight,
  Play,
  Zap,
  Shield,
  Globe,
  Calendar,
  BarChart3,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
  Rocket,
  Smartphone,
  Layout,
  Check,
  Cpu,
  Cloud,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { del } from "motion/react-client";
import Loader from "./components/Loader";
import Robot from "./components/Robot";

// --- Components ---

const ThemeToggle = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-zinc-100 dark:hover:bg-white/10 transition-all"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

const CountUp = ({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1,
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

const Navbar = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-500 rounded-full border border-primary ${isScrolled ? "bg-primary/40 backdrop-blur-2xl py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]" : "bg-transparent py-5"}`}
      >
      <div className="px-4 md:px-10 flex justify-between items-center h-16">
  <div className="flex items-center">
    
    <img
      src="src/public/apple-touch-iconn.png"
      alt="logo"
      className="h-35 max-h-35 object-contain"
    />

  </div>



          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
            {["Solutions", "Services", "About"].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
                className="hover:text-brand-accent transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="hidden lg:flex items-center gap-4">
              <a 
              href="https://admin.schoolycore.com/"
              
              className="text-xs font-bold text-primary hover:text-brand-accent transition-colors">
                Sign In
              </a>
              <button  className="bg-brand-accent text-white px-6 py-2.5 rounded-full text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-brand-accent/20">
                Book Demo
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary transition-colors hover:bg-primary/5"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <Zap size={18} className="text-brand-accent" />
              ) : (
                <Layout size={18} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-3xl lg:hidden pt-32 px-8 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-center">
              {["Solutions", "Services", "About", "Pricing", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl font-bold font-display tracking-tighter text-primary hover:text-brand-accent transition-colors"
                  >
                    {item}
                  </a>
                ),
              )}
              <div className="pt-8 flex flex-col gap-4 max-w-sm mx-auto w-full">
                <button className="w-full py-4 rounded-2xl border border-primary font-bold text-primary hover:bg-primary/5 transition-colors">
                  Sign In
                </button>
                <button className="w-full py-4 rounded-2xl bg-brand-accent text-white font-bold shadow-xl shadow-brand-accent/20 hover:scale-[1.02] transition-transform">
                  Book Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Generate particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    moveRange: Math.random() * 50 + 20,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20"
    >
      {/* 3D Robot Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Robot />
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />

      {/* Interactive Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 10}%`],
              y: [`${p.y}%`, `${p.y + (Math.random() - 0.5) * 10}%`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor:
                i % 2 === 0 ? "var(--brand-accent)" : "var(--brand-lime)",
              boxShadow:
                i % 2 === 0
                  ? "0 0 10px var(--brand-accent)"
                  : "0 0 10px var(--brand-lime)",
              filter: "blur(1px)",
              translateX: mousePosition.x * p.moveRange,
              translateY: mousePosition.y * p.moveRange,
            }}
          />
        ))}
      </div>

      {/* Dynamic Background Grid */}
      <motion.div
        style={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        className="absolute inset-0 z-0 bg-grid-white mask-radial pointer-events-none opacity-30"
      />

      {/* Animated Beams Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: mousePosition.x * 30 }}
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-accent/30 to-transparent animate-beam"
        />
        <motion.div
          style={{ x: mousePosition.x * -30 }}
          className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-brand-lime/30 to-transparent animate-beam [animation-delay:2s]"
        />
        <motion.div
          style={{ x: mousePosition.x * 40 }}
          className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-brand-accent/30 to-transparent animate-beam [animation-delay:4s]"
        />
      </div>

      {/* Spotlight Effect - Mouse Reactive */}
      <motion.div
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-brand-accent/20 blur-[160px] rounded-full opacity-40 pointer-events-none z-0"
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-10 shadow-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            The Future of Education
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter text-primary mb-10 leading-[1.1] lg:leading-[0.9] perspective-1000">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block"
            >
              Schooly-Core
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-primary/40 block"
            >
              School Management
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative inline-block"
            >
              Operating System.
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="absolute -bottom-1 left-0 h-1 md:h-2 bg-brand-accent rounded-full opacity-60 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              />
            </motion.span>
          </h1>

          <p className="text-secondary text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium opacity-80">
            Streamline academics, automate administration, and elevate the
            learning experience with our all-in-one, future-ready platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button className="group relative w-full sm:w-auto overflow-hidden bg-brand-accent text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-accent/40">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started for Free{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="w-full sm:w-auto border border-primary/20 bg-primary/5 backdrop-blur-xl text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={14} className="fill-primary text-primary ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary opacity-50">
          Scroll to Explore
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent" />
      </motion.div>

      {/* Floating Elements - Enhanced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[5%] hidden 2xl:block"
        >
          <div className="bg-primary/40 backdrop-blur-xl border border-primary p-6 rounded-3xl shadow-2xl max-w-[200px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/20">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Students
                </p>
                <p className="text-lg font-bold text-primary">12.4k+</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-brand-accent"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[5%] hidden 2xl:block"
        >
          <div className="bg-primary/40 backdrop-blur-xl border border-primary p-6 rounded-3xl shadow-2xl max-w-[200px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-brand-lime rounded-xl flex items-center justify-center shadow-lg shadow-brand-lime/20">
                <BarChart3 size={20} className="text-black" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Efficiency
                </p>
                <p className="text-lg font-bold text-primary">+45%</p>
              </div>
            </div>
            <div className="flex gap-1 items-end h-10">
              {[40, 70, 45, 90, 60].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
                  className="flex-1 bg-brand-lime/50 rounded-t-sm"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DashboardShowcase = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-white mask-radial pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter mb-6 text-primary">
            Unified Command Center
          </h2>
          <p className="text-secondary text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Manage everything from a single, intuitive dashboard designed for
            speed, clarity, and performance.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative group"
        >
          <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-brand-accent to-brand-lime rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000" />
          <div className="relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-primary bg-zinc-900 shadow-2xl">
            <img
              src="https://i.pinimg.com/originals/35/19/6a/35196a16d02f153a930fc8efcf568b82.jpg"
              alt="Dashboard UI"
              className="w-full opacity-90 group-hover:scale-[1.01] transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 backdrop-blur-[1px]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12 md:mt-20">
          {[
            {
              label: "Attendance",
              icon: <ClipboardCheck size={20} />,
              color: "text-brand-accent",
            },
            {
              label: "Analytics",
              icon: <BarChart3 size={20} />,
              color: "text-brand-lime",
            },
            {
              label: "Finances",
              icon: <Zap size={20} />,
              color: "text-brand-accent",
            },
            {
              label: "Academics",
              icon: <GraduationCap size={20} />,
              color: "text-brand-lime",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-primary/5 border border-primary p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-3 text-xs md:text-sm font-bold hover:bg-primary/10 transition-all cursor-default group text-primary shadow-xl shadow-transparent hover:shadow-brand-accent/5"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 border border-primary flex items-center justify-center ${item.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
              >
                {item.icon}
              </div>
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureHighlight = () => {
  return (
    <section className="py-20 md:py-32 bg-primary relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/10 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-8">
              <Rocket size={12} /> Smart Assessment
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter mb-8 leading-[0.9] text-primary">
              Automated Grading & <br />
              <span className="text-brand-accent">Real-time Analytics.</span>
            </h2>
            <p className="text-secondary text-sm sm:text-base md:text-lg lg:text-xl mb-10 leading-relaxed font-medium">
              Eliminate manual errors and delays. Our AI-driven engine processes
              exam results and report cards instantly, providing teachers and
              parents with deep insights into student performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
              {[
                {
                  title: "Instant Grading",
                  desc: "Auto-grade quizzes with 99.9% accuracy",
                  icon: <Zap size={18} />,
                },
                {
                  title: "Trend Analysis",
                  desc: "Track progress across terms effortlessly",
                  icon: <BarChart3 size={18} />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-6 rounded-3xl border border-primary bg-primary/5 group hover:bg-primary/10 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="font-bold text-primary mb-2 text-lg">
                    {item.title}
                  </p>
                  <p className="text-sm text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <button className="w-full sm:w-auto bg-brand-accent text-white px-10 py-5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-brand-accent/20">
              Explore Academic Tools
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-brand-accent/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-primary shadow-2xl aspect-[4/5] md:aspect-square">
              <img
                src="https://images.adsttc.com/media/images/6377/98f6/78fe/a907/8f23/3245/slideshow/divya-shanthi-school-and-campus-upgrades-flying-elephant-studio_7.jpg?1668782368"
                alt="AI Learning"
                className="w-full h-full object-cover transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-primary/20 backdrop-blur-xl border border-primary/20 rounded-2xl">
                <p className="text-white font-bold text-lg mb-1">
                  AI Student Insights
                </p>
                <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
                  Powered by SchoolCoreOS AI
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesBento = () => {
  const features = [
    {
      title: "AI Grading Engine",
      description:
        "Automated assessment processing with 99.9% accuracy. Instant results for students and teachers.",
      icon: <Cpu size={24} />,
      className:
        "md:col-span-2 md:row-span-2 bg-brand-accent/5 border-brand-accent/20",
      image: "https://img.freepik.com/premium-photo/blue-building-with-welcome-back-school_1234759-5942.jpg",
    },
    {
      title: "Smart Attendance",
      description: "Face-recognition based tracking with real-time alerts.",
      icon: <Users size={20} />,
      className: "md:col-span-1 md:row-span-1",
      image: "https://www.seymour.sa.edu.au/wp-content/uploads/2022/06/dev-image-gallery-02-1600x940.jpg",
    },
    {
      title: "Secure Payments",
      description: "PCI-compliant automated invoicing & sync.",
      icon: <Shield size={20} />,
      className: "md:col-span-1 md:row-span-1",
      image: "https://img.freepik.com/premium-photo/sunny-facade-capturing-daytime-charm-school-building_1000124-194508.jpg",
    },
    {
      title: "Mobile Ecosystem",
      description:
        "Dedicated apps for parents, teachers, and students to stay connected 24/7.",
      icon: <Smartphone size={20} />,
      className: "md:col-span-2 md:row-span-1",
      image: "https://images.adsttc.com/media/images/6487/27eb/7870/723f/b3ad/ccaf/slideshow/school-campus-dos-shibukawa-eder-architects_12.jpg?1686579195",
    },
    {
      title: "Global School Sync",
      description:
        "Manage an entire network of schools from a single administrative dashboard.",
      icon: <Globe size={20} />,
      className: "md:col-span-2 md:row-span-1",
      image: "https://jamaicans.com/wp-content/uploads/2025/09/11-of-the-Most-Beautiful-Historic-and-Charming-School-Campuses-in-Jamaica.jpg",
    },
    {
      title: "Cloud Analytics",
      description: "Deep insights into institutional performance.",
      icon: <Cloud size={20} />,
      className: "md:col-span-1 md:row-span-1",
      image: "https://png.pngtree.com/thumb_back/fw800/background/20230321/pngtree-school-campus-background-image_2050985.jpg",
    },
    {
      title: "AI Timetable Generator",
      description:
        "Automatically creates optimized class schedules with conflict-free allocation for teachers and rooms.",
      icon: <Calendar size={20} />,
      className: "md:col-span-1 md:row-span-1",
      image: "https://www.usnews.com/cmsmedia/64/ce/8d0053fb4d9fbfa466fc737081e4/mccord-nov2022-04.jpg",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white mask-radial opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary bg-primary/5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            <Award size={12} /> Platform Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-display tracking-tighter mb-6 text-primary leading-[0.85]">
            Engineered for <br />
            <span className="text-brand-accent">Excellence.</span>
          </h2>
          <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
            A comprehensive suite of enterprise tools designed to transform
            institutional management through intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -10 }}
              className={`relative group overflow-hidden rounded-[2rem] border border-primary bg-primary/20 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[300px] ${feature.className}`}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 font-display tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed max-w-[280px]">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-1000">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10 mt-8">
                <button className="text-[10px] font-bold uppercase tracking-widest text-brand-accent flex items-center gap-2 group/btn">
                  Explore Feature{" "}
                  <ArrowRight
                    size={12}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SetDirection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white mask-radial opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tighter mb-8 leading-tight text-primary">
            Set your school's <br />
            <span className="text-brand-lime">Strategic Direction.</span>
          </h2>
          <p className="text-secondary text-sm sm:text-base md:text-lg lg:text-xl mb-12 leading-relaxed">
            Align your team around a unified academic and admin calendar. Plan,
            assign, and track every activity with precision.
          </p>

          <div className="space-y-6">
            {[
              { title: "Academic Calendar", icon: <Calendar size={20} /> },
              { title: "Resource Planning", icon: <Layout size={20} /> },
              { title: "Strategic Insights", icon: <BarChart3 size={20} /> },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl border border-primary bg-primary/5 hover:border-brand-lime/20 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime">
                  {item.icon}
                </div>
                <p className="font-bold text-primary">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-brand-lime/10 blur-3xl rounded-full opacity-30" />
          <img
            src="https://www.weoneil.com/wp-content/uploads/2022/06/DPS_Thomas-Jefferson_1_feat_description.jpg"
            alt="Strategy"
            className="rounded-3xl border border-primary shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Jenkins",
      role: "Principal, Horizon Academy",
      content:
        "SchoolCoreOS has completely transformed how we manage our daily operations. The real-time analytics have given us insights we never thought possible.",
      avatar: "https://picsum.photos/seed/sarah/200/200",
    },
    {
      name: "Mark Thompson",
      role: "IT Director, Global International",
      content:
        "The integration was seamless. Our staff picked it up in days, and the automated grading has saved our teachers hundreds of hours.",
      avatar: "https://picsum.photos/seed/mark/200/200",
    },
    {
      name: "Elena Rodriguez",
      role: "Administrator, Saint Jude School",
      content:
        "The fee management and multi-branch sync are game changers. We can now monitor all our campuses from a single dashboard.",
      avatar: "https://picsum.photos/seed/elena/200/200",
    },
    {
      name: "James Wilson",
      role: "Head of Academics, Pinecrest High",
      content:
        "The AI-powered reports have helped us identify struggling students much earlier. We've seen a 15% improvement in overall grades.",
      avatar: "https://picsum.photos/seed/james/200/200",
    },
    {
      name: "Lisa Chen",
      role: "Director, Bright Future School",
      content:
        "The parent portal has significantly improved our communication. Parents feel more involved and informed than ever before.",
      avatar: "https://picsum.photos/seed/lisa/200/200",
    },
    {
      name: "David Miller",
      role: "Superintendent, Metro District",
      content:
        "Scaling our operations across 10 branches was effortless with SchoolCoreOS. It's the most robust platform we've ever used.",
      avatar: "https://picsum.photos/seed/david/200/200",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % (testimonials.length - visibleCount + 1),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length, visibleCount]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev + 1) % (testimonials.length - visibleCount + 1),
    );
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (testimonials.length - visibleCount + 1)) %
        (testimonials.length - visibleCount + 1),
    );
  };

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white mask-radial opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-lime/20 bg-brand-lime/10 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-lime mb-6">
              <Star size={12} className="fill-current" /> Success Stories
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter text-primary leading-[0.9]">
              Trusted by <br />
              <span className="text-brand-accent">Global Educators.</span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-all active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden -mx-4 px-4">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (24 / visibleCount)}px)`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: `calc(${100 / visibleCount}% - ${(24 * (visibleCount - 1)) / visibleCount}px)`,
                }}
              >
                <div className="h-full bg-primary/20 backdrop-blur-xl border border-primary rounded-[2.5rem] p-8 md:p-10 flex flex-col group hover:border-brand-accent/30 transition-all duration-500">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-brand-lime fill-brand-lime"
                      />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl font-medium text-primary mb-10 leading-relaxed italic flex-grow">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-lg">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary font-display tracking-tight">
                        {testimonial.name}
                      </p>
                      <p className="text-brand-accent font-bold text-[10px] uppercase tracking-widest">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {[...Array(testimonials.length - visibleCount + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(i);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === i ? "w-12 bg-brand-accent" : "w-2 bg-primary/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Schools", value: 500, suffix: "+" },
    { label: "Students", value: 1.2, suffix: "M+" },
    { label: "AI Efficiency", value: 40, suffix: "%", sub: "Increase" },
    { label: "Uptime", value: 99.9, suffix: "%" },
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-white mask-radial opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-6xl font-bold font-display tracking-tighter text-primary mb-2 group-hover:text-brand-accent transition-colors duration-500">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                {stat.label}{" "}
                {stat.sub && (
                  <span className="text-brand-lime">{stat.sub}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to implement SchoolCoreOS?",
      answer:
        "Implementation typically takes 2-4 weeks depending on the size of your institution and the complexity of your current data. Our dedicated success team handles the heavy lifting of data migration.",
    },
    {
      question: "Is our student data secure?",
      answer:
        "Security is our top priority. SchoolCoreOS is fully GDPR and COPPA compliant. We use enterprise-grade encryption and regular security audits to ensure your data remains protected.",
    },
    {
      question: "Can we integrate with our existing tools?",
      answer:
        "Yes! SchoolCoreOS features a robust API and pre-built integrations for popular tools like Google Workspace, Microsoft 365, and various payment gateways.",
    },
    {
      question: "Do you offer training for our staff?",
      answer:
        "Absolutely. Every implementation includes comprehensive training sessions for administrators, teachers, and IT staff. We also provide a 24/7 help center and dedicated support.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white mask-radial opacity-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter text-primary mb-6">
            Common <span className="text-brand-accent">Questions</span>
          </h2>
          <p className="text-secondary text-lg">
            Everything you need to know about the platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border border-primary transition-all duration-500 ${openIndex === i ? "bg-primary/10" : "bg-primary/5 hover:bg-primary/10"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-primary">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary transition-transform duration-500 ${openIndex === i ? "rotate-180 bg-brand-accent text-white border-brand-accent" : ""}`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-grid-white mask-radial opacity-30 pointer-events-none" />

      {/* Animated Background Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[160px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter mb-8 leading-tight text-primary">
            Ready to <span className="text-brand-accent">Transform</span> <br />
            Your Institution?
          </h2>
          <p className="text-secondary text-sm sm:text-base md:text-lg lg:text-xl mb-12 max-w-2xl mx-auto">
            Join hundreds of schools already using SchoolCoreOS to power their
            daily operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative w-full sm:w-auto overflow-hidden bg-brand-accent text-white px-10 py-5 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-accent/30">
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="w-full sm:w-auto text-primary font-bold flex items-center justify-center gap-2 hover:text-brand-accent transition-colors text-sm sm:text-base group">
              Talk to an Expert{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LogoCloud = () => {
  const logos = [
    { name: "Global Academy", icon: Globe },
    { name: "Tech Institute", icon: Rocket },
    { name: "Heritage School", icon: BookOpen },
    { name: "Modern High", icon: Lightbulb },
    { name: "St. Mary's", icon: Award },
    { name: "Future Prep", icon: Zap },
  ];

  // Duplicate logos for seamless scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-20 bg-primary/50 border-y border-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-white mask-radial opacity-5 pointer-events-none" />
      <div className="relative z-10">
        <p className="text-center text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mb-12">
          Trusted by leading educational institutions worldwide
        </p>

        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex items-center gap-12 md:gap-24 whitespace-nowrap py-4 pr-12 md:pr-24"
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group cursor-default opacity-30 hover:opacity-100 transition-all duration-500 px-4"
              >
                <logo.icon
                  size={24}
                  className="text-primary group-hover:text-brand-accent transition-colors"
                />
                <span className="text-lg md:text-xl font-display font-bold text-primary group-hover:text-brand-accent transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "299",
      description: "Perfect for small specialized schools.",
      features: [
        "Up to 200 Students",
        "Core Admin Tools",
        "Basic AI Reports",
        "Email Support",
      ],
      accent: "brand-lime",
    },
    {
      name: "Professional",
      price: "799",
      description: "Our most popular plan for growing institutions.",
      features: [
        "Up to 1000 Students",
        "Advanced AI Analytics",
        "Parent/Student Portal",
        "Priority Support",
        "Custom Integrations",
      ],
      accent: "brand-accent",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale solution for large districts.",
      features: [
        "Unlimited Students",
        "Dedicated Success Manager",
        "On-site Training",
        "White-label Option",
        "API Access",
      ],
      accent: "white",
    },
  ];

  return (
    <section id="pricing" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white mask-radial opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter text-primary mb-6">
            Simple, Transparent{" "}
            <span className="text-brand-accent">Pricing</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Choose the plan that fits your school's scale and ambition. No
            hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ y: 0 }}
              animate={{ y: [0, 25, 0] }}
              transition={{
                delay: i * 0.2,
                duration: 2,
                ease: "easeOut",
                repeat: Infinity,
              }}
              className={`relative p-8 md:p-12 rounded-[3rem] border ${plan.popular ? "border-brand-accent bg-brand-accent/5" : "border-primary bg-primary/40"} backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden group`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold px-6 py-2 rounded-bl-3xl uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-primary mb-4 font-display tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                {plan.price !== "Custom" && (
                  <span className="text-primary text-2xl font-bold">$</span>
                )}
                <span className="text-5xl md:text-6xl font-bold text-primary font-display tracking-tighter">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-secondary text-sm font-medium ml-1">
                    /mo
                  </span>
                )}
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-4 text-secondary text-sm"
                  >
                    <Check size={18} className="text-brand-lime shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-5 rounded-full font-bold text-base transition-all duration-500 ${plan.popular ? "bg-brand-accent text-white hover:scale-105 shadow-xl shadow-brand-accent/20" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-white mask-radial opacity-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-primary/40 backdrop-blur-xl border border-primary rounded-[3rem] p-8 md:p-16 text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mx-auto mb-8">
            <Mail size={32} className="animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tighter text-primary mb-6">
            Stay in the <span className="text-brand-accent">Loop</span>
          </h2>
          <p className="text-secondary text-lg mb-10 max-w-xl mx-auto">
            Get the latest updates on AI in education and SchoolCoreOS features
            delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow bg-primary/5 border border-primary rounded-full px-6 py-4 text-primary focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button
              disabled={status !== "idle"}
              className="bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20"
            >
              {status === "loading" ? (
                "Subscribing..."
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={18} /> Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Solutions", "Features", "Pricing", "Updates"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Privacy"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Community", "Blog"],
    },
  ];

  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <span className="text-2xl font-bold font-display tracking-tighter text-primary mb-8 block">
              SchoolCore<span className="text-brand-accent">OS</span>
            </span>
            <p className="text-secondary text-sm mb-8 max-w-xs leading-relaxed">
              The next generation school management operating system powered by
              AI. Transform your institution today.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-secondary hover:text-brand-accent hover:border-brand-accent transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((column, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              className="col-span-1"
            >
              <h4 className="font-bold text-primary mb-6 uppercase text-[10px] tracking-[0.2em]">
                {column.title}
              </h4>
              <ul className="space-y-4 text-sm text-secondary">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="hover:text-brand-accent transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-3" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-12 border-t border-primary flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-secondary font-bold"
        >
          <p>© 2026 SchoolCoreOS. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <LogoCloud />

        <section className="py-20 bg-primary text-center relative">
          <div className="absolute inset-0 bg-dot-white mask-radial opacity-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tighter mb-4 text-primary">
              Everything you need to run a modern school.
            </h2>
            <p className="text-secondary text-lg">
              An all-in-one, AI-powered operating system for future-ready
              education.
            </p>
          </motion.div>
        </section>

        <DashboardShowcase />
        <Stats />
        <FeatureHighlight />
        <FeaturesBento />
        <SetDirection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Newsletter />
        <CTA />
      </motion.main>
      <Footer />
    </div>
  );
}
