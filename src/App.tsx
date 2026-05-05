import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Phone, Star, Clock, Info, CheckCircle2, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Utility for class merging
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Time slots for the booking system
  const timeSlots = [
    "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM", 
    "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", 
    "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM", "09:00 PM - 10:00 PM",
    "10:00 PM - 11:00 PM", "11:00 PM - 12:00 AM"
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && selectedSlot) {
      setIsBookingComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden dark select-none">
      {/* HEADER */}
      <header className="mb-6 pt-6 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Star className="w-6 h-6 text-black fill-black" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none mb-0.5">GARUDA'S CRICKET ZONE</h1>
              <span className="text-[10px] text-primary uppercase tracking-widest font-bold leading-tight">Premium Multi-Turf Facility</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center font-medium text-sm text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">Facility</a>
            <a href="#location" className="hover:text-white transition-colors">Pricing</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <Button onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} className="font-bold px-5 rounded-full uppercase tracking-wider text-xs text-primary-foreground">
              Book Turf
            </Button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-card border-b border-border overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4 font-medium text-center">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
                <a href="#location" onClick={() => setIsMobileMenuOpen(false)}>Location</a>
                <Button onClick={() => { setIsMobileMenuOpen(false); document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); }} className="w-full font-display uppercase">
                   Book Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-4 md:px-6 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:auto-rows-[150px]">
        {/* HERO SECTION */}
        <section className="relative lg:col-span-8 lg:row-span-4 bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 min-h-[500px] flex items-end">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000" 
              alt="Cricket Turf Background" 
              className="w-full h-full object-cover object-center opacity-70 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
          </div>

          <div className="relative z-20 p-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-black text-[10px] uppercase font-bold px-3 py-1 rounded-full border-none shadow-none hover:bg-primary/90 rounded-full">Available Now</Badge>
                <div className="flex items-center text-primary text-xs tracking-widest">
                   ★★★★★ <span className="text-white ml-2 font-medium">4.7 (22 Reviews)</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black uppercase mb-3">
                PLAY LIKE A PRO.
              </h1>

              <p className="text-neutral-300 max-w-md text-sm md:text-base font-medium mb-4">
                Experience Tirupati's finest 24/7 cricket turf with professional grade flooring, night floodlights, and premium gear.
              </p>
            </motion.div>
          </div>
        </section>

        {/* BOOKING SECTION widget */}
        <section id="book" className="lg:col-span-4 lg:row-span-4 bg-neutral-100 rounded-3xl p-6 text-black flex flex-col justify-between border-4 border-primary dark:bg-zinc-100 min-h-[500px]">
          {isBookingComplete ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase">Confirmed!</h3>
              <p className="text-neutral-600 text-sm">
                Request for {date ? format(date, "MMM d") : ""} at {selectedSlot} received.
              </p>
              <Button onClick={() => setIsBookingComplete(false)} variant="outline" className="mt-4 rounded-xl border-black hover:bg-neutral-200">
                Book Another
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-black uppercase mb-6 text-black">Instant Booking</h3>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Select Date</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex justify-between items-center w-full border-b border-neutral-300 pb-2 text-sm text-black"
                        >
                          <span className="font-medium">{date ? format(date, "PPP") : "Pick a date"}</span>
                          <CalendarIcon className="w-4 h-4 text-neutral-400" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-border bg-card dark" align="end">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          className="rounded-xl border-none"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2 flex-grow">
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Available Slots</p>
                    <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2 pb-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          disabled={!date}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "py-2 px-1 border rounded-lg text-center text-xs font-bold transition-colors",
                            selectedSlot === slot 
                              ? "bg-black border-black text-white" 
                              : "border-neutral-300 text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                          )}
                        >
                          {slot.split(' - ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!date || !selectedSlot}
                className="w-full bg-black text-white py-4 rounded-xl font-black uppercase text-sm tracking-wider hover:bg-neutral-800 disabled:opacity-50 mt-6"
              >
                Confirm • ₹1200/hr
              </button>
            </form>
          )}
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="lg:col-span-4 lg:row-span-2 bg-neutral-900 rounded-3xl relative overflow-hidden group border border-neutral-800 min-h-[250px]">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=500" alt="Gallery preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-end p-6 transition-colors group-hover:bg-black/20 cursor-pointer" onClick={() => document.getElementById("gallery-dialog-btn")?.click()}>
            <p className="text-sm font-bold uppercase tracking-widest text-white">Gallery View</p>
          </div>
          
          <Dialog>
             <DialogTrigger asChild id="gallery-dialog-btn">
               <button className="sr-only">Open Gallery</button>
             </DialogTrigger>
             <DialogContent className="max-w-4xl bg-card border-none p-4 rounded-3xl">
               <DialogTitle className="sr-only">Gallery</DialogTitle>
                <div className="grid grid-cols-2 gap-2 h-[60vh] overflow-y-auto pr-2 rounded-2xl">
                  {[
                    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1624647348981-d14fb9346618?w=800&auto=format&fit=crop&q=80"
                  ].map((img, i) => (
                    <img key={i} src={img} className="w-full h-48 md:h-64 object-cover rounded-xl border border-border" alt="Gallery item" />
                  ))}
               </div>
             </DialogContent>
          </Dialog>
        </section>

        {/* INFO CARD */}
        <section id="about" className="lg:col-span-5 lg:row-span-2 bg-neutral-900 rounded-3xl p-6 lg:p-8 border border-neutral-800 flex flex-col justify-between min-h-[250px]">
          <div>
            <p className="text-[10px] text-neutral-500 uppercase font-black mb-3">Location & Hours</p>
            <h4 className="text-xl lg:text-2xl font-bold leading-tight mb-2">Annamayya Marg, Kothapalli,<br/>Tirupati, AP 517501</h4>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-neutral-800 pt-4 mt-4">
             <div className="flex items-center gap-2 bg-neutral-800 px-4 py-2.5 rounded-full w-fit">
               <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
               <span className="text-xs font-bold tracking-wider">OPEN 24 HOURS</span>
             </div>
             <a href="tel:09391689895" className="text-neutral-400 text-sm font-medium hover:text-white transition-colors">+91 93916 89895</a>
          </div>
        </section>

        {/* MINI STATS / FEATURES */}
        <section className="lg:col-span-3 lg:row-span-2 bg-primary rounded-3xl p-6 lg:p-8 text-black flex flex-col justify-center items-center text-center min-h-[250px]">
          <div className="text-4xl lg:text-5xl font-black italic mb-2 uppercase">Top Gear</div>
          <p className="text-xs lg:text-sm font-bold leading-none opacity-80 uppercase tracking-tighter">Professional Kits Provided</p>
          <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-[200px]">
            <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
              <div className="w-full h-full bg-black"></div>
            </div>
            <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-black"></div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-8 mb-4 px-4 md:px-6 container mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest gap-4">
        <p>© 2024 Garuda Sports Management</p>
        <div className="flex gap-4">
          <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-white transition-colors cursor-pointer">Safety Guidelines</span>
          <span className="hover:text-white transition-colors cursor-pointer">Contact Support</span>
        </div>
      </footer>
    </div>
  );
}
