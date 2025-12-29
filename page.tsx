'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Search,
  Bell,
  MessageSquare,
  Plus,
  Heart,
  User,
  Settings,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  TrendingUp,
  Video,
  Image as ImageIcon,
  Film,
  Flame,
  Hash,
  Globe,
  Send,
  Smile,
  MapPin,
  Clock,
  Users,
  Grid3X3,
  BookmarkCheck,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Post {
  id: string
  user: {
    name: string
    handle: string
    avatar: string
    verified?: boolean
  }
  content: string
  type: 'text' | 'image' | 'video' | 'story'
  media?: string[]
  likes: number
  comments: number
  shares: number
  views?: number
  timestamp: string
  hashtags?: string[]
  trending?: boolean
}

interface Story {
  id: string
  user: {
    name: string
    avatar: string
    handle: string
  }
  image: string
  viewed?: boolean
}

interface Message {
  id: string
  user: {
    name: string
    avatar: string
    status?: 'online' | 'away' | 'offline'
  }
  lastMessage: string
  time: string
  unread?: number
  type: 'dm' | 'group' | 'channel'
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      handle: '@alexj',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true
    },
    content: 'Just launched our new product! 🚀 Check out this amazing demo video. The future of tech is here! #innovation #tech #startup',
    type: 'video',
    media: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'],
    likes: 1250,
    comments: 89,
    shares: 234,
    views: 4500,
    timestamp: '2h ago',
    hashtags: ['innovation', 'tech', 'startup'],
    trending: true
  },
  {
    id: '2',
    user: {
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    content: 'Beautiful sunset at the beach today. Nature never fails to amaze me 🌅 #nature #photography #sunset',
    type: 'image',
    media: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'],
    likes: 890,
    comments: 45,
    shares: 67,
    timestamp: '4h ago',
    hashtags: ['nature', 'photography', 'sunset']
  },
  {
    id: '3',
    user: {
      name: 'Tech Daily',
      handle: '@techdaily',
      avatar: 'https://i.pravatar.cc/150?img=12',
      verified: true
    },
    content: 'Breaking: New AI breakthrough in quantum computing promises 1000x faster processing speeds. This could revolutionize everything from drug discovery to climate modeling.',
    type: 'text',
    likes: 2340,
    comments: 156,
    shares: 567,
    timestamp: '6h ago',
    trending: true
  },
  {
    id: '4',
    user: {
      name: 'Emma Wilson',
      handle: '@emmaw',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    content: 'Cooking my grandma\'s secret recipe 🍝 #food #cooking #homecooked',
    type: 'image',
    media: ['https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800'],
    likes: 456,
    comments: 23,
    shares: 12,
    timestamp: '8h ago',
    hashtags: ['food', 'cooking', 'homecooked']
  },
  {
    id: '5',
    user: {
      name: 'Fitness Pro',
      handle: '@fitnesspro',
      avatar: 'https://i.pravatar.cc/150?img=15',
      verified: true
    },
    content: 'Morning workout complete! 💪 Remember, consistency is key. Here\'s my 30-day transformation. #fitness #workout #motivation',
    type: 'image',
    media: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800'],
    likes: 1567,
    comments: 78,
    shares: 123,
    views: 3400,
    timestamp: '10h ago',
    hashtags: ['fitness', 'workout', 'motivation']
  }
]

const mockStories: Story[] = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      handle: '@alexj'
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    id: '2',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=5',
      handle: '@sarahc'
    },
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    viewed: true
  },
  {
    id: '3',
    user: {
      name: 'Mike Peters',
      avatar: 'https://i.pravatar.cc/150?img=3',
      handle: '@mikep'
    },
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400'
  },
  {
    id: '4',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=9',
      handle: '@emmaw'
    },
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400'
  },
  {
    id: '5',
    user: {
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=7',
      handle: '@davidk'
    },
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400'
  },
  {
    id: '6',
    user: {
      name: 'Lisa Park',
      avatar: 'https://i.pravatar.cc/150?img=11',
      handle: '@lisap'
    },
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400'
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'online'
    },
    lastMessage: 'Hey! Did you see the new update? It\'s amazing!',
    time: '2m ago',
    unread: 3,
    type: 'dm'
  },
  {
    id: '2',
    user: {
      name: 'Tech Team',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    lastMessage: 'Alex: Meeting moved to 3pm',
    time: '15m ago',
    unread: 5,
    type: 'group'
  },
  {
    id: '3',
    user: {
      name: 'News Channel',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    lastMessage: 'Breaking: Major announcement coming soon...',
    time: '1h ago',
    type: 'channel'
  },
  {
    id: '4',
    user: {
      name: 'Mike Peters',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'away'
    },
    lastMessage: 'Thanks for the help yesterday!',
    time: '3h ago',
    type: 'dm'
  },
  {
    id: '5',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=9',
      status: 'offline'
    },
    lastMessage: 'See you at the party! 🎉',
    time: '5h ago',
    type: 'dm'
  }
]

const trendingTopics = [
  { tag: '#TechNews', posts: '125K' },
  { tag: '#WorldCup2024', posts: '89K' },
  { tag: '#NewMusic', posts: '67K' },
  { tag: '#StartupLife', posts: '45K' },
  { tag: '#HealthyLiving', posts: '32K' }
]

const suggestions = [
  { name: 'John Doe', handle: '@johndoe', avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Jane Smith', handle: '@janesmith', avatar: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Bob Wilson', handle: '@bobwilson', avatar: 'https://i.pravatar.cc/150?img=8' }
]

export default function SocialMediaPlatform() {
  const [activeTab, setActiveTab] = useState<'feed' | 'explore' | 'messages' | 'profile' | 'notifications'>('feed')
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set())
  const [showComposer, setShowComposer] = useState(false)
  const [composerContent, setComposerContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
  }

  const handleBookmark = (postId: string) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts)
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId)
    } else {
      newBookmarkedPosts.add(postId)
    }
    setBookmarkedPosts(newBookmarkedPosts)
  }

  const renderStoryItem = (story: Story, index: number) => (
    <CarouselItem key={story.id} className="basis-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <div className={`relative ${story.viewed ? '' : 'ring-2 ring-pink-500 ring-offset-2 ring-offset-background'}`}>
          <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-background">
            <AvatarImage src={story.user.avatar} alt={story.user.name} />
            <AvatarFallback>{story.user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-xs font-medium truncate w-20 text-center">{story.user.name.split(' ')[0]}</span>
      </motion.div>
    </CarouselItem>
  )

  const renderPost = (post: Post, index: number) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6"
    >
      <Card className="border-border/50 overflow-hidden hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold hover:underline cursor-pointer">{post.user.name}</span>
                  {post.user.verified && <Badge variant="secondary" className="h-5 px-1.5"><span className="text-xs">✓</span></Badge>}
                  <span className="text-sm text-muted-foreground">{post.user.handle}</span>
                  <span className="text-sm text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                </div>
                {post.trending && (
                  <div className="flex items-center gap-1 text-xs text-orange-500 mt-0.5">
                    <Flame className="h-3 w-3" />
                    <span className="font-medium">Trending</span>
                  </div>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Unfollow</DropdownMenuItem>
                <DropdownMenuItem>Mute</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{post.content}</p>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.hashtags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          {post.media && post.media.length > 0 && (
            <div className={`grid gap-2 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {post.media.map((media, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-lg">
                  <img
                    src={media}
                    alt={`Post media ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                  />
                  {post.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <Separator />
        <CardFooter className="pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 ${likedPosts.has(post.id) ? 'text-red-500 hover:text-red-600' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Like</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Comment</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-1">
              {post.views && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Video className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.views}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Views</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${bookmarkedPosts.has(post.id) ? 'text-yellow-500 hover:text-yellow-600' : ''}`}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <Bookmark className={`h-5 w-5 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )

  const renderMessageItem = (message: Message, index: number) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors"
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={message.user.avatar} alt={message.user.name} />
          <AvatarFallback>{message.user.name[0]}</AvatarFallback>
        </Avatar>
        {message.user.status === 'online' && (
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{message.user.name}</span>
            {message.type === 'group' && <Badge variant="outline" className="text-xs">Group</Badge>}
            {message.type === 'channel' && <Badge variant="secondary" className="text-xs">Channel</Badge>}
          </div>
          <span className="text-xs text-muted-foreground">{message.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
      </div>
      {message.unread && message.unread > 0 && (
        <Badge variant="default" className="h-5 w-5 flex items-center justify-center p-0 rounded-full">
          {message.unread}
        </Badge>
      )}
    </motion.div>
  )

  const renderSidebar = () => (
    <div className="hidden lg:block w-80 fixed right-0 top-0 h-screen border-l border-border/50 p-6 bg-background/95 backdrop-blur overflow-y-auto">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* User Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://i.pravatar.cc/150?img=10" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">@johndoe</p>
              </div>
            </div>
            <div className="flex justify-around mt-4 text-center">
              <div>
                <div className="font-bold">1.2K</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="font-bold">45.6K</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="font-bold">892</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between hover:bg-accent p-2 rounded-lg cursor-pointer transition-colors">
                <div>
                  <div className="font-medium text-sm">{topic.tag}</div>
                  <div className="text-xs text-muted-foreground">{topic.posts} posts</div>
                </div>
                <ChevronRightIcon />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Suggested for you
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={suggestion.avatar} />
                    <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{suggestion.name}</div>
                    <div className="text-xs text-muted-foreground">{suggestion.handle}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Follow</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">NexusSocial</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'feed', icon: Home, label: 'Home' },
              { id: 'explore', icon: Search, label: 'Explore' },
              { id: 'messages', icon: MessageSquare, label: 'Messages' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'profile', icon: User, label: 'Profile' }
            ].map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeTab === item.id ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setActiveTab(item.id as any)}
                      className="rounded-full"
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            <Button
              size="icon"
              onClick={() => setShowComposer(true)}
              className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </nav>

          {/* Mobile Search */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSearchQuery('')}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </div>

          {/* Mobile Profile */}
          <Avatar className="h-9 w-9 cursor-pointer md:hidden">
            <AvatarImage src="https://i.pravatar.cc/150?img=10" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 md:px-6 py-6 lg:mr-80">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Stories */}
              <Card>
                <CardContent className="pt-6">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {mockStories.map((story, index) => renderStoryItem(story, index))}
                    </CarouselContent>
                  </Carousel>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              {mockPosts.map((post, index) => renderPost(post, index))}
            </motion.div>
          )}

          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Explore</h2>
                <Tabs defaultValue="foryou" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="foryou">For You</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="live">Live</TabsTrigger>
                  </TabsList>
                  <TabsContent value="foryou" className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['150690592534621bda4d32df4', '146947496802857224b2761acb3c5d', '1501785888041af3ef285b470', '14700714596043b5ec3a7fe05', '14722141034519374bd1c798e', '1447752875215b2761acb3c5d', '15187706604394636190af475', '1507525428034b723cf961d3e', '1473093295043cdd812d0e601'].map((id, i) => (
                      <div key={i} className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square">
                        <img
                          src={`https://images.unsplash.com/photo-${id}?w=400`}
                          alt={`Explore ${i}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <div className="flex items-center gap-1 text-white text-sm">
                            <Play className="h-4 w-4" />
                            <span>{Math.floor(Math.random() * 100) + 10}K</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="trending" className="mt-6 space-y-4">
                    {trendingTopics.map((topic, idx) => (
                      <Card key={idx} className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                                {idx + 1}
                              </div>
                              <div>
                                <div className="font-semibold">{topic.tag}</div>
                                <div className="text-sm text-muted-foreground">{topic.posts} posts</div>
                              </div>
                            </div>
                            <Flame className="h-5 w-5 text-orange-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="videos" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockPosts.filter(p => p.type === 'video' || p.media).map((post, idx) => (
                      <Card key={idx} className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="relative aspect-video">
                          <img src={post.media?.[0]} alt="Video" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {post.views} views
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={post.user.avatar} />
                              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{post.user.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="live" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['150690592534621bda4d32df4', '1473093295043cdd812d0e601', '1517836357463d25dfeac3438', '14700714596043b5ec3a7fe05'].map((id, i) => (
                      <Card key={i} className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="relative aspect-video">
                          <img
                            src={`https://images.unsplash.com/photo-${id}?w=400`}
                            alt="Live"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                            LIVE
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {Math.floor(Math.random() * 50) + 5}K watching
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="font-semibold">Live Stream {i + 1}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 1}`} />
                            </Avatar>
                            <span>Streamer {i + 1}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search messages..." className="pl-9" />
                </div>
              </div>

              <Tabs defaultValue="direct" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                  <TabsTrigger value="channels">Channels</TabsTrigger>
                </TabsList>
                <TabsContent value="direct" className="mt-4 space-y-2">
                  {mockMessages.filter(m => m.type === 'dm').map((msg, idx) => renderMessageItem(msg, idx))}
                </TabsContent>
                <TabsContent value="groups" className="mt-4 space-y-2">
                  {mockMessages.filter(m => m.type === 'group').map((msg, idx) => renderMessageItem(msg, idx))}
                </TabsContent>
                <TabsContent value="channels" className="mt-4 space-y-2">
                  {mockMessages.filter(m => m.type === 'channel').map((msg, idx) => renderMessageItem(msg, idx))}
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Notifications</h2>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="likes">Likes</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="mentions">Mentions</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-2">
                  {[
                    { type: 'like', user: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5', time: '2m ago', content: 'liked your post' },
                    { type: 'comment', user: 'Mike Peters', avatar: 'https://i.pravatar.cc/150?img=3', time: '5m ago', content: 'commented: "Great work! 🔥"' },
                    { type: 'follow', user: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=9', time: '10m ago', content: 'started following you' },
                    { type: 'mention', user: 'Tech Daily', avatar: 'https://i.pravatar.cc/150?img=12', time: '15m ago', content: 'mentioned you in a post', verified: true },
                    { type: 'like', user: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=4', time: '20m ago', content: 'liked your comment' },
                    { type: 'share', user: 'Lisa Park', avatar: 'https://i.pravatar.cc/150?img=11', time: '30m ago', content: 'shared your post' },
                  ].map((notif, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={notif.avatar} />
                        <AvatarFallback>{notif.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{notif.user}</span>
                          {notif.verified && <Badge variant="secondary" className="h-5 px-1.5"><span className="text-xs">✓</span></Badge>}
                          <span className="text-sm text-muted-foreground">{notif.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notif.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/20">
                      <AvatarImage src="https://i.pravatar.cc/150?img=10" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center md:text-left space-y-4">
                      <div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          <h2 className="text-2xl font-bold">John Doe</h2>
                          <Badge variant="secondary" className="h-6 px-1.5"><span className="text-sm">✓</span></Badge>
                        </div>
                        <p className="text-muted-foreground">@johndoe</p>
                      </div>
                      <p className="text-sm">Content creator | Tech enthusiast | Coffee lover ☕️ Creating content that matters. Based in San Francisco 🌉</p>
                      <div className="flex justify-center md:justify-start gap-6 text-center">
                        <div>
                          <div className="font-bold text-xl">1,234</div>
                          <div className="text-sm text-muted-foreground">Posts</div>
                        </div>
                        <div>
                          <div className="font-bold text-xl">45.6K</div>
                          <div className="text-sm text-muted-foreground">Followers</div>
                        </div>
                        <div>
                          <div className="font-bold text-xl">892</div>
                          <div className="text-sm text-muted-foreground">Following</div>
                        </div>
                      </div>
                      <div className="flex justify-center md:justify-start gap-2">
                        <Button>Edit Profile</Button>
                        <Button variant="outline">Share Profile</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="posts"><Grid3X3 className="h-4 w-4 mr-2" />Posts</TabsTrigger>
                  <TabsTrigger value="videos"><Video className="h-4 w-4 mr-2" />Videos</TabsTrigger>
                  <TabsTrigger value="saved"><BookmarkCheck className="h-4 w-4 mr-2" />Saved</TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className="mt-4">
                  <div className="grid grid-cols-3 gap-1">
                    {['150690592534621bda4d32df4', '1473093295043cdd812d0e601', '1517836357463d25dfeac3438', '14700714596043b5ec3a7fe05', '14722141034519374bd1c798e', '1447752875215b2761acb3c5d', '15187706604394636190af475', '1507525428034b723cf961d3e', '146947496802857224b2761acb3c5d', '1501785888041af3ef285b470', '14700714596043b5ec3a7fe05', '14722141034519374bd1c798e'].map((id, i) => (
                      <div key={i} className="relative aspect-square group cursor-pointer">
                        <img
                          src={`https://images.unsplash.com/photo-${id}?w=300`}
                          alt={`Post ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{Math.floor(Math.random() * 1000) + 100}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{Math.floor(Math.random() * 100) + 10}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {['15187706604394636190af475', '1473093295043cdd812d0e601', '1517836357463d25dfeac3438'].map((id, i) => (
                      <Card key={i} className="overflow-hidden cursor-pointer">
                        <div className="relative aspect-video">
                          <img
                            src={`https://images.unsplash.com/photo-${id}?w=400`}
                            alt="Video"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-10 w-10 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {Math.floor(Math.random() * 100) + 10}K views
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <p className="text-sm font-medium line-clamp-2">My video content {i + 1}</p>
                          <p className="text-xs text-muted-foreground mt-1">{Math.floor(Math.random() * 30) + 1} days ago</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="saved" className="mt-4">
                  <div className="grid grid-cols-3 gap-1">
                    {['150690592534621bda4d32df4', '1473093295043cdd812d0e601', '1517836357463d25dfeac3438', '14700714596043b5ec3a7fe05', '14722141034519374bd1c798e', '1447752875215b2761acb3c5d'].map((id, i) => (
                      <div key={i} className="relative aspect-square group cursor-pointer">
                        <img
                          src={`https://images.unsplash.com/photo-${id}?w=300`}
                          alt={`Saved ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Bookmark className="h-5 w-5 text-white fill-current" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sidebar */}
      {renderSidebar()}

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur md:hidden lg:hidden">
        <div className="flex items-center justify-around h-16">
          {[
            { id: 'feed', icon: Home },
            { id: 'explore', icon: Search },
            { id: 'create', icon: Plus },
            { id: 'messages', icon: MessageSquare },
            { id: 'profile', icon: User }
          ].map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              onClick={() => {
                if (item.id === 'create') {
                  setShowComposer(true)
                } else {
                  setActiveTab(item.id as any)
                }
              }}
              className={`rounded-full ${item.id === 'create' ? 'h-12 w-12 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600' : ''} ${activeTab === item.id ? 'text-primary' : ''}`}
            >
              <item.icon className={`h-6 w-6 ${item.id === 'create' ? 'text-white' : ''}`} />
            </Button>
          ))}
        </div>
      </nav>

      {/* Post Composer Modal */}
      <AnimatePresence>
        {showComposer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowComposer(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-background rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Create Post</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowComposer(false)}>
                  <span className="text-xl">×</span>
                </Button>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://i.pravatar.cc/150?img=10" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={composerContent}
                      onChange={(e) => setComposerContent(e.target.value)}
                      className="min-h-[120px] resize-none border-0 focus-visible:ring-0 text-lg"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Video className="h-4 w-4" />
                    Video
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Film className="h-4 w-4" />
                    Story
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Public</span>
                </div>
                <Button onClick={() => setShowComposer(false)} className="bg-gradient-to-r from-pink-500 to-violet-500">
                  Post
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-muted-foreground"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
