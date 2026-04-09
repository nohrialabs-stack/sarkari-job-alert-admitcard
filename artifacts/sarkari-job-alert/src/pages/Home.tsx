import { useGetAdmitCards } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Download, BookOpen, Bell, Smartphone, ChevronRight } from "lucide-react";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isNew(firstSeen: string): boolean {
  return Date.now() - new Date(firstSeen).getTime() < TWO_DAYS_MS;
}

function Ticker({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];
  return (
    <div className="overflow-x-hidden bg-primary/10 border-y border-primary/20 text-primary py-2.5">
      <div className="animate-ticker items-center gap-10 px-4 text-sm font-medium">
        {doubled.map((label, i) => (
          <span key={i} className="flex items-center gap-2 mr-10 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { data: admitCardsData, isLoading } = useGetAdmitCards();
  const admitCards = admitCardsData?.items ?? [];
  const newCount = admitCards.filter((c) => isNew(c.firstSeen)).length;

  const tickerItems = isLoading
    ? ["Fetching latest updates..."]
    : admitCards.slice(0, 8).map((ac) => ac.title);

  return (
    <Layout>
      {(admitCards.length > 0 || isLoading) && (
        <Ticker items={tickerItems} />
      )}

      <section className="relative py-12 md:py-16 overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Your Gateway to <span className="text-primary">Government Exams</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-secondary-foreground/70 max-w-xl font-light">
            Official admit card links & free mock tests — auto-updated every 6 hours.
          </p>
        </div>
      </section>

      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-center">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary shrink-0" />
              <span className="font-medium text-secondary">Get the <span className="text-primary font-bold">fastest notifications</span> on new admit cards — download our app!</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://play.google.com/store/apps/details?id=com.sarkarialert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5" /> Download Free
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sarkarialert&reviewId=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                ⭐⭐⭐⭐⭐ Rate us 5 stars
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10 md:py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          <Link href="/admit-cards" data-testid="link-block-admit-cards">
            <div className="group relative flex flex-col items-center justify-center text-center gap-5 p-10 md:p-14 rounded-3xl border-2 border-primary/20 bg-white hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all cursor-pointer h-full min-h-64">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                <Download className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary group-hover:text-primary transition-colors">
                  Admit Cards
                </h2>
                <p className="mt-2 text-muted-foreground text-sm">
                  Direct official government links
                </p>
                {newCount > 0 && (
                  <span className="mt-3 inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-3 py-1 rounded-full">
                    🔥 {newCount} new today
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/mock-tests" data-testid="link-block-mock-tests">
            <div className="group relative flex flex-col items-center justify-center text-center gap-5 p-10 md:p-14 rounded-3xl border-2 border-secondary/20 bg-white hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1 transition-all cursor-pointer h-full min-h-64">
              <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                <BookOpen className="w-10 h-10 text-secondary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary group-hover:text-primary transition-colors">
                  Mock Tests
                </h2>
                <p className="mt-2 text-muted-foreground text-sm">
                  Free practice for all major exams
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ 100% Free
                </span>
              </div>
              <div className="flex items-center gap-1 text-secondary text-sm font-semibold">
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </section>
    </Layout>
  );
}
