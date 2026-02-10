import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Separator,
  Avatar,
  AvatarFallback,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@sammelfieber/ui";
import {
  MessageCircle,
  Search as SearchIcon,
  Heart,
  Eye,
  Calendar,
  Users,
  Trophy,
  Plus,
  ArrowRight,
  MapPin,
  Clock,
  Flame,
  Star,
  Share2,
} from "lucide-react";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CommunityContent />;
}

const feedPosts = [
  {
    id: "1",
    author: "HWCollector_DE",
    type: "SHOWCASE",
    title: "Found this '67 Camaro STH at my local store!",
    titleDe: "Diese '67 Camaro STH in meinem Laden gefunden!",
    likes: 47,
    comments: 12,
    views: 234,
    timeAgo: "2h",
  },
  {
    id: "2",
    author: "JDM_Dreams",
    type: "DISCUSSION",
    title: "What's the best way to store carded Hot Wheels?",
    titleDe: "Wie lagert man Hot Wheels auf der Karte am besten?",
    likes: 23,
    comments: 31,
    views: 189,
    timeAgo: "4h",
  },
  {
    id: "3",
    author: "VintageVault",
    type: "SHOWCASE",
    title: "My complete 2023 RLC Exclusive collection",
    titleDe: "Meine komplette 2023 RLC Exclusive Sammlung",
    likes: 89,
    comments: 24,
    views: 567,
    timeAgo: "6h",
  },
  {
    id: "4",
    author: "SpeedFreak",
    type: "DISCUSSION",
    title: "Market prediction: Convention exclusives will 2x by summer",
    titleDe: "Marktprognose: Convention Exclusives verdoppeln sich bis Sommer",
    likes: 15,
    comments: 42,
    views: 312,
    timeAgo: "8h",
  },
];

const wantedPosts = [
  {
    id: "1",
    author: "EuroCollector",
    item: "'67 Camaro STH - 2024",
    condition: "MINT or NEAR_MINT",
    budget: "Up to 400 EUR",
    budgetDe: "Bis zu 400 EUR",
    location: "Germany",
    locationDe: "Deutschland",
    timeAgo: "1h",
  },
  {
    id: "2",
    author: "DiecastKing",
    item: "VW Drag Bus - Any Convention",
    condition: "Any condition",
    budget: "Negotiable",
    budgetDe: "Verhandelbar",
    location: "Europe",
    locationDe: "Europa",
    timeAgo: "3h",
  },
  {
    id: "3",
    author: "RareFinds",
    item: "Complete 2024 STH Set",
    condition: "MINT preferred",
    budget: "Up to 5,000 EUR",
    budgetDe: "Bis zu 5.000 EUR",
    location: "Worldwide",
    locationDe: "Weltweit",
    timeAgo: "5h",
  },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Virtual Swap Meet #23",
    titleDe: "Virtuelles Tauschtreffen #23",
    type: "SWAP_MEET",
    date: "2026-02-15T18:00:00Z",
    participants: 45,
    maxParticipants: 100,
  },
  {
    id: "2",
    title: "Rarest Find This Month Contest",
    titleDe: "Seltenster Fund dieses Monats Wettbewerb",
    type: "CONTEST",
    date: "2026-02-20T20:00:00Z",
    participants: 89,
    maxParticipants: null,
  },
  {
    id: "3",
    title: "New Release Day - February Drop",
    titleDe: "Neuerscheinungstag - Februar Drop",
    type: "RELEASE",
    date: "2026-02-22T10:00:00Z",
    participants: 234,
    maxParticipants: null,
  },
];

const topCollectors = [
  { name: "VintageVault", xp: 12450, level: 8, items: 4521, badge: "Legend" },
  { name: "HWCollector_DE", xp: 8920, level: 7, items: 2847, badge: "Expert" },
  { name: "RareFinds", xp: 7340, level: 6, items: 1892, badge: "Veteran" },
  { name: "JDM_Dreams", xp: 5680, level: 5, items: 1234, badge: "Collector" },
  { name: "EuroCollector", xp: 4210, level: 4, items: 956, badge: "Enthusiast" },
];

function CommunityContent() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            {locale === "de" ? "Gemeinschaft" : "Community"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("community")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {locale === "de"
              ? "Verbinde dich mit Sammlern, teile deine Funde und finde was du suchst."
              : "Connect with collectors, share your finds, and discover what you're looking for."}
          </p>
        </div>
        <Button variant="gold">
          <Plus className="mr-2 h-4 w-4" />
          {locale === "de" ? "Beitrag erstellen" : "Create Post"}
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content - 2 cols */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="feed">
            <TabsList>
              <TabsTrigger value="feed">
                <MessageCircle className="mr-2 h-4 w-4" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="wanted">
                <SearchIcon className="mr-2 h-4 w-4" />
                {locale === "de" ? "Gesucht" : "Wanted"}
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </TabsTrigger>
            </TabsList>

            {/* Feed Tab */}
            <TabsContent value="feed">
              <div className="mt-6 space-y-4">
                {feedPosts.map((post) => (
                  <Card key={post.id} className="group transition-all hover:border-[var(--color-primary)]/20">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback>
                            {post.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{post.author}</span>
                            <Badge variant={post.type === "SHOWCASE" ? "gold" : "secondary"}>
                              {post.type === "SHOWCASE"
                                ? (locale === "de" ? "Vitrine" : "Showcase")
                                : (locale === "de" ? "Diskussion" : "Discussion")}
                            </Badge>
                            <span className="text-xs text-white/30">{post.timeAgo}</span>
                          </div>
                          <h4 className="mt-2 text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                            {locale === "de" ? post.titleDe : post.title}
                          </h4>

                          {/* Post image placeholder */}
                          {post.type === "SHOWCASE" && (
                            <div className="mt-3 aspect-[16/9] rounded-lg bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]" />
                          )}

                          {/* Post actions */}
                          <div className="mt-3 flex items-center gap-4">
                            <button className="flex items-center gap-1 text-xs text-white/40 hover:text-pink-400 transition-colors">
                              <Heart className="h-3.5 w-3.5" />
                              {post.likes}
                            </button>
                            <button className="flex items-center gap-1 text-xs text-white/40 hover:text-[var(--color-primary)] transition-colors">
                              <MessageCircle className="h-3.5 w-3.5" />
                              {post.comments}
                            </button>
                            <span className="flex items-center gap-1 text-xs text-white/20">
                              <Eye className="h-3.5 w-3.5" />
                              {post.views}
                            </span>
                            <button className="ml-auto text-xs text-white/30 hover:text-white/60">
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-4 text-center">
                  <Button variant="outline">
                    {locale === "de" ? "Mehr laden" : "Load More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Wanted / ISO Tab */}
            <TabsContent value="wanted">
              <div className="mt-6 space-y-4">
                {wantedPosts.map((post) => (
                  <Card key={post.id} className="group transition-all hover:border-[var(--color-primary)]/20">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="text-[10px]">
                              {post.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">{post.author}</span>
                              <span className="text-[10px] text-white/30">{post.timeAgo}</span>
                            </div>
                            <h4 className="mt-1 text-sm font-medium">
                              <Badge variant="outline" className="mr-2">ISO</Badge>
                              {post.item}
                            </h4>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                              <span>{post.condition}</span>
                              <span className="text-[var(--color-primary)]">
                                {locale === "de" ? post.budgetDe : post.budget}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {locale === "de" ? post.locationDe : post.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {locale === "de" ? "Anbieten" : "Offer"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-4 text-center">
                  <Button variant="gold">
                    <Plus className="mr-2 h-4 w-4" />
                    {locale === "de" ? "Gesuch erstellen" : "Post Wanted"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="mt-6 space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="group transition-all hover:border-[var(--color-primary)]/20">
                    <CardContent className="flex items-center gap-5 p-5">
                      {/* Date Badge */}
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                        <span className="font-mono text-lg font-bold text-[var(--color-primary)]">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-[var(--color-primary)]/60">
                          {new Date(event.date).toLocaleDateString(
                            locale === "de" ? "de-DE" : "en-US",
                            { month: "short" }
                          )}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                            {locale === "de" ? event.titleDe : event.title}
                          </h4>
                          <Badge
                            variant={
                              event.type === "CONTEST" ? "gold" :
                              event.type === "SWAP_MEET" ? "secondary" : "outline"
                            }
                          >
                            {event.type === "SWAP_MEET"
                              ? (locale === "de" ? "Tausch" : "Swap")
                              : event.type === "CONTEST"
                                ? (locale === "de" ? "Wettbewerb" : "Contest")
                                : "Release"}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(event.date).toLocaleTimeString(
                              locale === "de" ? "de-DE" : "en-US",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.participants}
                            {event.maxParticipants && `/${event.maxParticipants}`}
                          </span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        {locale === "de" ? "Anmelden" : "RSVP"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[var(--color-primary)]" />
                <h3 className="text-sm font-medium">
                  {locale === "de" ? "Top Sammler" : "Top Collectors"}
                </h3>
              </div>
              <div className="mt-4 space-y-3">
                {topCollectors.map((collector, i) => (
                  <div key={collector.name} className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold ${
                      i === 0 ? "bg-[var(--color-primary)] text-[var(--color-background)]" :
                      i === 1 ? "bg-white/20 text-white" :
                      i === 2 ? "bg-orange-400/20 text-orange-400" :
                      "bg-white/5 text-white/40"
                    }`}>
                      {i + 1}
                    </span>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[9px]">
                        {collector.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{collector.name}</p>
                      <p className="text-[10px] text-white/30">
                        Lvl {collector.level} &middot; {collector.xp.toLocaleString()} XP
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[9px]">
                      {collector.badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hot Topics */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <h3 className="text-sm font-medium">
                  {locale === "de" ? "Beliebte Themen" : "Hot Topics"}
                </h3>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { tag: "2024 STH", posts: 234 },
                  { tag: "Convention 2026", posts: 189 },
                  { tag: "Grading Tips", posts: 156 },
                  { tag: "Market Predictions", posts: 98 },
                  { tag: "Storage Solutions", posts: 87 },
                ].map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 transition-colors hover:bg-white/[0.04]">
                    <span className="text-xs font-medium">#{topic.tag}</span>
                    <span className="font-mono text-[10px] text-white/30">
                      {topic.posts} {locale === "de" ? "Beitrage" : "posts"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-medium">
                {locale === "de" ? "Community Stats" : "Community Stats"}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Mitglieder" : "Members"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">12,847</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Online" : "Online"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-green-400">347</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Beitrage heute" : "Posts Today"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">89</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Events" : "Events"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">{upcomingEvents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
