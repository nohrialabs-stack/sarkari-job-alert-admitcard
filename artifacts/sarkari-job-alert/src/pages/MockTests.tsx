import { Layout } from "@/components/layout/Layout";
import { useGetMockTests } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, AlertCircle, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function MockTests() {
  const { data, isLoading, error } = useGetMockTests();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const mockTests = data?.items ?? [];
  const lastUpdated = data?.lastUpdated;

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(mockTests.map((t) => t.category));
    return ["All", ...Array.from(cats).sort()];
  }, [mockTests]);

  const filteredTests = useMemo(() => {
    if (selectedCategory === "All") return mockTests;
    return mockTests.filter((test) => test.category === selectedCategory);
  }, [mockTests, selectedCategory]);

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-12 md:py-16 border-b border-primary-foreground/10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 bg-white/10 border-white/20 text-white">Free Practice</Badge>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Online Mock Tests
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-6 font-light max-w-2xl">
              Evaluate your exam preparation with topic-wise free mock tests. Build speed and accuracy.
            </p>
            
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80 bg-black/10 w-fit px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4" />
                <span>Updated: {lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {error && (
          <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading data</AlertTitle>
            <AlertDescription>
              We encountered an issue fetching the mock tests. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 space-y-6">
            <div className="bg-slate-50 border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Categories
              </h3>
              
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-8 w-full rounded-md" />
                </div>
              ) : (
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left px-3 py-2 rounded-md text-sm transition-all whitespace-nowrap lg:whitespace-normal font-medium flex items-center justify-between ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      data-testid={`btn-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {category}
                      {selectedCategory === category && <ChevronRight className="w-4 h-4 opacity-70 hidden lg:block" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-secondary text-secondary-foreground rounded-xl p-5 shadow-sm hidden lg:block">
              <h4 className="font-medium text-white mb-2">Tips for success</h4>
              <ul className="space-y-3 mt-4 text-sm text-secondary-foreground/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Take tests in a quiet environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Don't pause the timer once started</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Review all mistakes after finishing</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-secondary">
                {isLoading ? "Loading tests..." : `${filteredTests.length} Tests Available`}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={`skeleton-mt-page-${i}`} className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3">
                      <Skeleton className="h-5 w-1/3 mb-3 rounded-full" />
                      <Skeleton className="h-6 w-full mb-1" />
                      <Skeleton className="h-6 w-2/3" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))
              ) : filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <Card key={test.id} className="flex flex-col border-border/50 shadow-sm hover:shadow-md transition-shadow hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                          {test.category}
                        </Badge>
                        {test.questionCount && (
                          <Badge variant="outline" className="text-muted-foreground border-muted-foreground/20">
                            {test.questionCount}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="leading-snug text-lg">{test.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                      {test.description ? (
                        <p className="text-sm text-muted-foreground line-clamp-3">{test.description}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Topic specific mock test</p>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button asChild className="w-full gap-2" variant="outline">
                        <a href={test.link} target="_blank" rel="noopener noreferrer" data-testid={`btn-start-test-${test.id}`}>
                          Start Practice Test <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : !error ? (
                <div className="col-span-full py-16 text-center bg-muted/30 rounded-xl border border-dashed">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
                  <h3 className="text-xl font-medium text-secondary">No tests found in this category</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto mb-6">
                    Try selecting a different category to view available mock tests.
                  </p>
                  <Button onClick={() => setSelectedCategory("All")} data-testid="btn-reset-category">
                    View All Tests
                  </Button>
                </div>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
