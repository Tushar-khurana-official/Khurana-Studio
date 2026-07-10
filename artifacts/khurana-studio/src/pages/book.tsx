import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useLenis } from "@/hooks/use-lenis";
import { FadeIn } from "@/components/fade-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateBooking } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number is required."),
  serviceType: z.string().min(1, "Please select a service type."),
  packageType: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred date is required."),
  venue: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more about your vision."),
});

export const BookPage = () => {
  useLenis();
  const [location] = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  const createBooking = useCreateBooking();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      packageType: "",
      preferredDate: "",
      venue: "",
      budget: "",
      message: "",
    },
  });

  // Pre-fill package if coming from pricing section
  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get('package');
      if (pkg) {
        // Find matching option or set to general
        const validPackages = ["essential", "premium", "luxury", "editorial"];
        if (validPackages.includes(pkg)) {
          form.setValue("packageType", pkg);
        }
      }
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createBooking.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      }
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-[100dvh] bg-studio-bg-alt pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-studio-silver/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-studio-dark rounded-full flex items-center justify-center mx-auto mb-8 text-studio-silver"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h2 className="font-serif text-4xl mb-4">Inquiry Received</h2>
                  <p className="font-sans text-muted-foreground mb-8">
                    Thank you for considering Khurana Studio. We have received your details and will be in touch within 24 hours to discuss your vision.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="font-sans uppercase tracking-widest rounded-none h-14 px-8"
                  >
                    Return to Home
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FadeIn className="text-center mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6 text-foreground">Book a Session</h1>
                    <p className="font-sans text-muted-foreground font-light">
                      Let's create something beautiful together. Fill out the form below to inquire about dates, pricing, and availability.
                    </p>
                  </FadeIn>

                  <div className="bg-card border border-border p-8 md:p-12 shadow-sm">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest">Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Doe" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="jane@example.com" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest">Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+91 98765 43210" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="preferredDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest">Preferred Date</FormLabel>
                                <FormControl>
                                  <Input type="date" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest">Service Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12 rounded-none border-border bg-transparent focus:ring-1 focus:ring-foreground">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-none border-border">
                                    <SelectItem value="wedding">Wedding Photography</SelectItem>
                                    <SelectItem value="portrait">Editorial Portrait</SelectItem>
                                    <SelectItem value="fashion">Fashion Campaign</SelectItem>
                                    <SelectItem value="commercial">Commercial / Product</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="packageType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Package (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                                  <FormControl>
                                    <SelectTrigger className="h-12 rounded-none border-border bg-transparent focus:ring-1 focus:ring-foreground">
                                      <SelectValue placeholder="Select a package" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-none border-border">
                                    <SelectItem value="essential">Essential (₹1.5L)</SelectItem>
                                    <SelectItem value="premium">Premium (₹3.5L)</SelectItem>
                                    <SelectItem value="luxury">Luxury (₹6.0L)</SelectItem>
                                    <SelectItem value="editorial">Editorial (Custom)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="venue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Venue / Location (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="City or specific venue" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Approximate Budget (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. ₹2 Lakhs" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-sans text-xs uppercase tracking-widest">Tell us about your vision</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe the aesthetic, vibe, and any specific requirements..." 
                                  className="min-h-[150px] rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground resize-y" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          disabled={createBooking.isPending}
                          className="w-full h-14 rounded-none font-sans text-sm uppercase tracking-widest bg-foreground text-background hover:bg-studio-silver hover:text-foreground transition-colors"
                        >
                          {createBooking.isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                          ) : (
                            "Submit Inquiry"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookPage;
