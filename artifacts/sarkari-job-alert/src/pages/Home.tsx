import { useGetAdmitCards, useGetMockTests } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { CalendarDays, FileText, Building2, BookOpen, Clock, ArrowRight, ExternalLink, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
      {/* Marquee Updates */}
      {(admitCards.length > 0 || isLoadingAdmitCards) && (
        <Marquee>
          {isLoadingAdmitCards ? (
            <span>Fetching latest updates...</span>
          ) : (
            admitCards.slice(0, 5).map((ac) => (
              <span key={`marquee-${ac.id}`} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {ac.organization} - {ac.title} ({ac.postName}) Admit Card Out!
              </span>
            ))
          )}
        </Marquee>
      )}

      {/* Hero Section */}
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
            Stay ahead with the latest admit cards, exam dates, and free mock tests. 
            Organized accurately to help you prepare better.
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

      {/* Featured Admit Cards */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-secondary">Latest Admit Cards</h2>
            <p className="text-muted-foreground mt-2 text-lg">Recently released hall tickets for major exams</p>
          </div>
          <Button asChild variant="ghost" className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/10">
            <Link href="/admit-cards" data-testid="link-view-all-admit-cards">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {admitCardsError && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load admit cards. Please try again later.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingAdmitCards ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={`skeleton-ac-${i}`} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter className="pt-4 border-t bg-muted/50">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : featuredAdmitCards.length > 0 ? (
            featuredAdmitCards.map((card) => (
              <Card key={card.id} className="flex flex-col group hover:shadow-md transition-all border-border/50 hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-medium truncate" title={card.organization}>{card.organization}</span>
                  </div>
                  <CardTitle className="leading-snug text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-sm">
                  <div className="flex items-start gap-2 text-secondary/80">
                    <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2" title={card.postName}>{card.postName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 p-2 rounded-md">
                    <CalendarDays className="w-4 h-4" />
                    <span>Released: <span className="font-medium text-foreground">{card.releaseDate}</span></span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t bg-slate-50/50">
                  <Button asChild className="w-full gap-2 shadow-none" variant="outline" size="sm">
                    <a href={card.link} target="_blank" rel="noopener noreferrer" data-testid={`btn-download-${card.id}`}>
                      Get Admit Card <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-muted/30 rounded-xl border border-dashed">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium">No admit cards found</h3>
              <p className="text-muted-foreground text-sm mt-1">Check back later for updates</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Mock Tests */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-secondary">Practice Mock Tests</h2>
              <p className="text-muted-foreground mt-2 text-lg">Sharpen your skills with our free topic-wise mock tests</p>
            </div>
            <Button asChild variant="ghost" className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/10">
              <Link href="/mock-tests" data-testid="link-view-all-mock-tests">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {mockTestsError && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load mock tests. Please try again later.</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingMockTests ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={`skeleton-mt-${i}`} className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-6 w-1/4 mb-3 rounded-full" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            ) : featuredMockTests.length > 0 ? (
              featuredMockTests.map((test) => (
                <Card key={test.id} className="flex flex-col border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit mb-3 bg-secondary/10 text-secondary hover:bg-secondary/20">
                      {test.category}
                    </Badge>
                    <CardTitle className="leading-snug text-lg">{test.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-4">
                    {test.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{test.description}</p>
                    )}
                    {test.questionCount && (
                      <div className="flex items-center gap-1.5 text-sm font-medium text-secondary">
                        <BookOpen className="w-4 h-4 text-primary" />
                        {test.questionCount}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-white" size="sm">
                      <a href={test.link} target="_blank" rel="noopener noreferrer" data-testid={`btn-start-test-${test.id}`}>
                        Start Test <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <h3 className="text-lg font-medium">No mock tests found</h3>
                <p className="text-muted-foreground text-sm mt-1">Check back later for updates</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">Why use Sarkari Job Alert?</h2>
          <p className="text-muted-foreground mb-8 text-lg">We simplify your government job preparation journey.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">Fast Updates</h3>
              <p className="text-sm text-muted-foreground">Get admit cards and notifications as soon as they are officially released.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">Clean Interface</h3>
              <p className="text-sm text-muted-foreground">No clutter, no confusing ads. Just the information you need in a structured format.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">Free Practice</h3>
              <p className="text-sm text-muted-foreground">Access hundreds of topic-wise mock tests to evaluate your exam readiness.</p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
