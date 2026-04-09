import { Layout } from "@/components/layout/Layout";
import { useGetAdmitCards } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, CalendarDays, FileText, ExternalLink, Filter, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AdmitCards() {
  const { data, isLoading, error } = useGetAdmitCards();
  const [searchQuery, setSearchQuery] = useState("");

  const admitCards = data?.items ?? [];
  const lastUpdated = data?.lastUpdated;

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return admitCards;
    
    const query = searchQuery.toLowerCase();
    return admitCards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.organization.toLowerCase().includes(query) ||
        card.postName.toLowerCase().includes(query)
    );
  }, [admitCards, searchQuery]);

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-12 border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Latest Admit Cards
            </h1>
            <p className="text-secondary-foreground/80 text-lg mb-8">
              Download your exam hall tickets and call letters. Search by exam name or organization.
            </p>
            
            <div className="relative relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search exams, organizations, posts..."
                className="pl-10 h-12 bg-white text-black border-transparent focus-visible:ring-primary shadow-sm text-base rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-admit-cards"
              />
            </div>
            
            {lastUpdated && (
              <div className="flex items-center gap-2 mt-4 text-sm text-secondary-foreground/60">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {error && (
          <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading data</AlertTitle>
            <AlertDescription>
              We encountered an issue fetching the latest admit cards. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Results Info */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="font-semibold text-lg">
              {filteredCards.length} {filteredCards.length === 1 ? 'result' : 'results'} found
              {searchQuery && <span className="text-muted-foreground font-normal"> for "{searchQuery}"</span>}
            </h2>
            {searchQuery && (
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} data-testid="btn-clear-search">
                Clear Search
              </Button>
            )}
          </div>
        )}

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <Card key={`skeleton-ac-page-${i}`} className="overflow-hidden">
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
          ) : filteredCards.length > 0 ? (
            filteredCards.map((card) => (
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
                <CardContent className="flex-1 space-y-4 text-sm">
                  <div className="flex items-start gap-2.5 text-secondary/80">
                    <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2 font-medium" title={card.postName}>{card.postName}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col gap-1 bg-muted/50 p-2.5 rounded-md">
                      <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Release Date</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CalendarDays className="w-3.5 h-3.5 text-primary" />
                        <span className="truncate">{card.releaseDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 bg-muted/50 p-2.5 rounded-md">
                      <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Exam Date</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CalendarDays className="w-3.5 h-3.5 text-primary" />
                        <span className="truncate">{card.examDate || "Not notified"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t bg-slate-50/50">
                  <Button asChild className="w-full gap-2 shadow-none" size="default">
                    <a href={card.link} target="_blank" rel="noopener noreferrer" data-testid={`btn-download-${card.id}`}>
                      Download Admit Card <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : !error ? (
            <div className="col-span-full py-16 text-center bg-muted/30 rounded-xl border border-dashed flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-secondary">No admit cards found</h3>
              <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                We couldn't find any admit cards matching your search criteria. Try using different keywords or clear the search.
              </p>
              <Button onClick={() => setSearchQuery("")} data-testid="btn-reset-search-empty">
                Clear Search
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
