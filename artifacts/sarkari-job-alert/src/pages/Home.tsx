import { useGetAdmitCards, useGetMockTests } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, BookOpen, Clock, ArrowRight, Download, AlertCircle, Flame } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isNew(firstSeen: string): boolean {
  return Date.now() - new Date(firstSeen).getTime() < TWO_DAYS_MS;
}

function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex overflow-x-hidden bg-primary/10 border-y border-primary/20 text-primary py-2.5">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8 px-4 text-sm font-medium">
        {children}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 px-4 text-sm font-medium">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const { data: admitCardsData, isLoading: isLoadingAdmitCards, error: admitCardsError } = useGetAdmitCards();
  const { data: mockTestsData, isLoading: isLoadingMockTests, error: mockTestsError } = useGetMockTests();

  const admitCards = admitCardsData?.items ?? [];
  const mockTests = mockTestsData?.items ?? [];
  const featuredAdmitCards = admitCards.slice(0, 6);
  const featuredMockTests = mockTests.slice(0, 6);

  return (
    <Layout>
      {(admitCards.length > 0 || isLoadingAdmitCards) && (
        <Marquee>
          {isLoadingAdmitCards ? (
            <span>Fetching latest updates...</span>
          ) : (
            admitCards.slice(0, 6).map((ac) => (
              <span key={`marquee-${ac.id}`} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {ac.title}
              </span>
            ))
          )}
        </Marquee>
      )}

      <section className="relative py-20 lg:py-28 overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium py-1.5 px-4 text-sm">
            India's Trusted Government Job Portal
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Your Gateway to <span className="text-primary">Government Exams</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-secondary-foreground/80 max-w-2xl font-light">
            Get direct official admit card download links and free mock tests — updated daily, no clutter.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all">
              <Link href="/admit-cards" data-testid="link-hero-admit-cards">Download Admit Cards</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white transition-all">
              <Link href="/mock-tests" data-testid="link-hero-mock-tests">Practice Mock Tests</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-secondary">Latest Admit Cards</h2>
            <p className="text-muted-foreground mt-1">Official download links — sorted newest first</p>
          </div>
          <Button asChild variant="ghost" className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/10">
            <Link href="/admit-cards" data-testid="link-view-all-admit-cards">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {admitCardsError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load admit cards. Please try again later.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {isLoadingAdmitCards ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`sk-ac-${i}`} className="flex items-center gap-4 p-4 rounded-xl border bg-white">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <Skeleton className="h-9 w-40 rounded-lg shrink-0" />
              </div>
            ))
          ) : featuredAdmitCards.length > 0 ? (
            featuredAdmitCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border bg-white hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Building2 className="w-3.5 h-3.5" />
                      {card.organization}
                    </span>
                    {isNew(card.firstSeen) && (
                      <Badge className="gap-1 text-xs bg-red-500 hover:bg-red-500 text-white border-0 py-0 px-1.5 h-5">
                        <Flame className="w-3 h-3" /> NEW
                      </Badge>
                    )}
                  </div>
                  <p className="font-semibold text-secondary leading-snug group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {card.title}
                  </p>
                </div>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`btn-download-${card.id}`}
                  className="sm:shrink-0 inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Download Admit Card
                </a>
              </div>
            ))
          ) : !admitCardsError ? (
            <div className="py-10 text-center bg-muted/30 rounded-xl border border-dashed">
              <p className="text-muted-foreground text-sm">No admit cards available right now. Check back soon.</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-14 md:py-20 bg-slate-50 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-secondary">Practice Mock Tests</h2>
              <p className="text-muted-foreground mt-1">Free topic-wise practice tests for major govt exams</p>
            </div>
            <Button asChild variant="ghost" className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/10">
              <Link href="/mock-tests" data-testid="link-view-all-mock-tests">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {mockTestsError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load mock tests. Please try again later.</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingMockTests ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`sk-mt-${i}`} className="p-5 rounded-xl border bg-white space-y-3">
                  <Skeleton className="h-5 w-1/3 rounded-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              ))
            ) : featuredMockTests.length > 0 ? (
              featuredMockTests.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col p-5 rounded-xl border bg-white hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <Badge variant="secondary" className="w-fit mb-3 bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs">
                    {test.category}
                  </Badge>
                  <h3 className="font-semibold text-secondary leading-snug flex-1 mb-2">{test.title}</h3>
                  {test.questionCount && (
                    <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {test.questionCount} Questions
                    </p>
                  )}
                  <div className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed select-none border border-dashed border-muted-foreground/30">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </div>
                </div>
              ))
            ) : !mockTestsError ? (
              <div className="col-span-full py-10 text-center bg-white rounded-xl border border-dashed">
                <p className="text-muted-foreground text-sm">No mock tests available right now.</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 container mx-auto px-4">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">Why Sarkari Job Alert?</h2>
          <p className="text-muted-foreground mb-10 text-base">We cut through the noise so you can focus on what matters — preparing.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Always Fresh</h3>
              <p className="text-sm text-muted-foreground">Admit cards auto-expire after 10 days so you only see current, relevant listings.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Official Links</h3>
              <p className="text-sm text-muted-foreground">Every download button takes you directly to the official government website — no middlemen.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Practice</h3>
              <p className="text-sm text-muted-foreground">Access free mock tests for SSC, Banking, Railway, UPSC, Defence, and Insurance exams.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
