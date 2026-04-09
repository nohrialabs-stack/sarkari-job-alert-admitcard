import { Layout } from "@/components/layout/Layout";
import { useGetAdmitCards } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, Download, AlertCircle, Clock, Flame } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isNew(firstSeen: string): boolean {
  return Date.now() - new Date(firstSeen).getTime() < TWO_DAYS_MS;
}

export default function AdmitCards() {
  const { data, isLoading, error } = useGetAdmitCards();
  const [searchQuery, setSearchQuery] = useState("");

  const admitCards = data?.items ?? [];

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return admitCards;
    const query = searchQuery.toLowerCase();
    return admitCards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.organization.toLowerCase().includes(query)
    );
  }, [admitCards, searchQuery]);

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-10 border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Latest Admit Cards
            </h1>
            <p className="text-secondary-foreground/70 text-base mb-6">
              Direct links to official government websites. New cards appear at the top and are removed after 10 days.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by exam or organization..."
                className="pl-10 h-12 bg-white text-black border-transparent focus-visible:ring-primary shadow-sm text-base rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-admit-cards"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6 max-w-3xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading data</AlertTitle>
            <AlertDescription>
              Could not fetch admit cards right now. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredCards.length}</span>{" "}
              {filteredCards.length === 1 ? "result" : "results"}
              {searchQuery && (
                <span> for <span className="italic">"{searchQuery}"</span></span>
              )}
            </p>
            {searchQuery && (
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} data-testid="btn-clear-search">
                Clear
              </Button>
            )}
          </div>
        )}

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={`sk-${i}`} className="flex items-center gap-4 p-4 rounded-xl border bg-white">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <Skeleton className="h-9 w-40 rounded-lg shrink-0" />
              </div>
            ))
          ) : filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border bg-white hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
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
                  <p className="font-semibold text-secondary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {card.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Added {new Date(card.firstSeen).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>

                <div className="sm:shrink-0">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`btn-download-${card.id}`}
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    Download Admit Card
                  </a>
                </div>
              </div>
            ))
          ) : !error ? (
            <div className="py-16 text-center bg-muted/30 rounded-xl border border-dashed flex flex-col items-center">
              <Search className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-medium text-secondary">No results found</h3>
              <p className="text-muted-foreground mt-2 mb-6 max-w-md text-sm">
                Try different keywords or clear the search.
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
