// assets/data.js

const DETX = {
  brand: {
    name: "Detx Gaming",
    tagline: "Watch. Learn. Level Up.",
    email: "your@email.com",
    phone: "+8801XXXXXXXXX",
  },
  socials: [
    { label: "YouTube", href: "https://youtube.com/@YOURHANDLE" },
    { label: "Facebook", href: "https://facebook.com/YOURPAGE" },
    { label: "Instagram", href: "https://instagram.com/YOURHANDLE" },
    { label: "TikTok", href: "https://tiktok.com/@YOURHANDLE" },
    { label: "Threads", href: "https://threads.net/@YOURHANDLE" },
    { label: "Reddit", href: "https://reddit.com/user/YOURUSERNAME" },
    { label: "Discord", href: "https://discord.gg/YOURINVITE" },
  ],

  // Replace with your YouTube playlist IDs (recommended)
  youtube: {
    featuredPlaylistId: "PASTE_PLAYLIST_ID",
    highlightsPlaylistId: "PASTE_PLAYLIST_ID",
    shortsPlaylistId: "PASTE_PLAYLIST_ID",
    livePlaylistId: "PASTE_PLAYLIST_ID",
  },

  // Courses: grouped into tracks
  courses: [
    // Track 1 — Creator Launch
    {
      id: "creator-kickstart",
      track: "Creator Launch",
      title: "Creator Kickstart: Start Your YouTube Journey (Zero to Upload)",
      level: "Beginner",
      duration: "3.5 hours",
      outcome: "You will publish confidently with a repeatable upload system.",
      includes: ["Upload checklist", "First 10 video plan", "Basic content strategy"],
      originalPrice: 2990,
      discountPrice: 1490,
      badge: "Most Popular",
      description:
        "A practical start-to-finish course for launching your YouTube journey: niche choice, content planning, recording basics, upload workflow, and the first 10-video roadmap.",
    },
    {
      id: "social-fame-blueprint",
      track: "Creator Launch",
      title: "Social Media Fame Blueprint (All Platforms)",
      level: "All Levels",
      duration: "8+ hours",
      outcome: "You will know exactly what to post, where, and why it grows.",
      includes: ["Platform strategy", "Content engine", "Growth system"],
      originalPrice: 8990,
      discountPrice: 3990,
      badge: "Flagship",
      description:
        "Your main course. Covers cross-platform fame: content strategy, consistency system, audience psychology, hooks, retention, and growth loops across YouTube, FB, IG, TikTok, Threads & Reddit.",
    },
    {
      id: "content-consistency",
      track: "Creator Launch",
      title: "Content Consistency System (Post Like a Pro Without Burning Out)",
      level: "Beginner",
      duration: "2 hours",
      outcome: "You will build a sustainable posting schedule that actually works.",
      includes: ["Weekly plan", "Batching method", "Motivation-proof system"],
      originalPrice: 1490,
      discountPrice: 790,
      badge: "Best Value",
      description:
        "The simplest system to stay consistent: batching, templates, weekly schedule, and how to keep going when motivation dies.",
    },

    // Track 2 — Gaming Career + Streaming
    {
      id: "gaming-career-roadmap",
      track: "Gaming Career",
      title: "Gaming Career Roadmap: From Gamer to Creator",
      level: "Beginner → Intermediate",
      duration: "6 hours",
      outcome: "You will build a realistic gaming creator path with milestones.",
      includes: ["Gear priorities", "Content formats", "Career roadmap"],
      originalPrice: 6990,
      discountPrice: 2990,
      badge: "Core Course",
      description:
        "A real-world roadmap for gaming as a career: niche, game selection, content formats, growth milestones, monetization paths, and long-term creator thinking.",
    },
    {
      id: "pro-live-streaming",
      track: "Streaming",
      title: "Pro Live Streaming Setup (Beginner → Professional)",
      level: "Beginner",
      duration: "3 hours",
      outcome: "You will go live with clean audio, scene flow, and pro structure.",
      includes: ["Streaming setup", "Stream flow", "Live engagement"],
      originalPrice: 4990,
      discountPrice: 2490,
      badge: "Pro Setup",
      description:
        "Everything to start professional livestreaming: layouts, audio basics, stream structure, viewer retention, and confidence on live sessions.",
    },
    {
      id: "streamlabs-essentials",
      track: "Streaming",
      title: "Streamlabs Essentials (Go Live Without Stress)",
      level: "Beginner",
      duration: "2 hours",
      outcome: "You will set up scenes, sources, alerts, and overlays properly.",
      includes: ["Scenes", "Alerts", "Overlays"],
      originalPrice: 2990,
      discountPrice: 1490,
      badge: "Essential",
      description:
        "A practical Streamlabs course: scene setup, sources, alerts, overlays, audio sources, and common fixes.",
    },

    // Track 3 — Growth + Algorithms
    {
      id: "youtube-seo-mastery",
      track: "Growth & SEO",
      title: "YouTube SEO Mastery (Titles, CTR, Watch Time, Ranking)",
      level: "Intermediate",
      duration: "4 hours",
      outcome: "You will rank better and increase clicks + retention.",
      includes: ["SEO system", "Title structure", "CTR & retention fixes"],
      originalPrice: 4990,
      discountPrice: 2490,
      badge: "Growth",
      description:
        "Understand what actually ranks videos: titles, thumbnails, CTR, watch time, session time, and how to build searchable gaming content.",
    },
    {
      id: "instagram-algorithm-playbook",
      track: "Growth & SEO",
      title: "Instagram Algorithm Playbook (Reach + Reels Growth)",
      level: "Beginner → Intermediate",
      duration: "3 hours",
      outcome: "You will increase reach using repeatable reels strategy.",
      includes: ["Reels system", "Hook patterns", "Posting strategy"],
      originalPrice: 3990,
      discountPrice: 1990,
      badge: "Reach",
      description:
        "A clear IG playbook: reels structure, hook patterns, retention, posting rhythm, and growth loops.",
    },
    {
      id: "facebook-growth-engine",
      track: "Growth & SEO",
      title: "Facebook Growth Engine (Reach More People + Build Community)",
      level: "Beginner",
      duration: "2.5 hours",
      outcome: "You will build reach + audience using community-based growth.",
      includes: ["Posting system", "Community strategy", "Content types"],
      originalPrice: 2990,
      discountPrice: 1490,
      badge: "Community",
      description:
        "FB growth isn’t dead—most people just do it wrong. Learn what posts travel, how to build community, and how to convert viewers into fans.",
    },

    // Track 4 — AI Creator Tools
    {
      id: "ai-titles-hashtags",
      track: "AI Creator Tools",
      title: "AI Content Assistant: Titles, Hashtags, Descriptions with ChatGPT",
      level: "Beginner",
      duration: "2 hours",
      outcome: "You will generate better titles & SEO text faster (without cringe).",
      includes: ["Prompt templates", "Title formulas", "Hashtag strategy"],
      originalPrice: 2990,
      discountPrice: 1490,
      badge: "AI",
      description:
        "Your exact workflow: generate titles, hashtags, descriptions, tags, and community posts using AI while keeping them natural and high-click.",
    },
    {
      id: "ai-upload-system",
      track: "AI Creator Tools",
      title: "AI Upload System: Post Smarter, Not Harder",
      level: "Beginner",
      duration: "1.5 hours",
      outcome: "You will upload correctly with AI-based planning and checklists.",
      includes: ["Upload checklist", "SEO timing", "Metadata plan"],
      originalPrice: 1490,
      discountPrice: 790,
      badge: "Fast",
      description:
        "A clean upload system for YouTube/FB/IG/TikTok using AI for structure—without looking robotic.",
    },
    {
      id: "thumbnail-1-minute",
      track: "AI Creator Tools",
      title: "1-Minute Thumbnail Method (Fast + Clickable)",
      level: "Beginner",
      duration: "1 hour",
      outcome: "You will make fast thumbnails that still get clicks.",
      includes: ["Template system", "3 styles", "Speed workflow"],
      originalPrice: 1490,
      discountPrice: 790,
      badge: "Speed",
      description:
        "A rapid workflow to generate thumbnails in minutes using repeatable templates and rules.",
    },
    {
      id: "pro-thumbnails-canva-gemini",
      track: "AI Creator Tools",
      title: "Pro Thumbnails with Canva + Gemini AI (Serious Design System)",
      level: "Beginner → Intermediate",
      duration: "2.5 hours",
      outcome: "You will design professional thumbnails with structure & branding.",
      includes: ["Canva design rules", "Gemini workflow", "Brand consistency"],
      originalPrice: 3990,
      discountPrice: 1990,
      badge: "Design",
      description:
        "A professional thumbnail system with Canva + AI for concepts, layout, typography, and consistency.",
    },

    // Track 5 — Editing
    {
      id: "capcut-gaming-editing",
      track: "Editing",
      title: "CapCut Editing for Gaming (Fast Edits That Feel Pro)",
      level: "Beginner",
      duration: "3 hours",
      outcome: "You will create clean gaming edits that hold attention.",
      includes: ["Pacing", "Captions", "Sound + cut rules"],
      originalPrice: 3990,
      discountPrice: 1990,
      badge: "Editing",
      description:
        "CapCut for gaming: pacing, cut rules, captions, sound effects, and making edits that feel professional.",
    },
  ],

  shop: {
    affiliateNote:
      "We may earn a small commission from affiliate links. It does not increase your price.",
    categories: [
      {
        title: "Streaming Gear",
        items: [
          { name: "USB Mic", note: "Best starter mic for clean voice", link: "PASTE_AMAZON_AFFILIATE_LINK" },
          { name: "Capture Card", note: "Console streaming setup", link: "PASTE_AMAZON_AFFILIATE_LINK" },
          { name: "Ring Light", note: "Good lighting makes you look pro", link: "PASTE_AMAZON_AFFILIATE_LINK" },
        ],
      },
      {
        title: "Gaming Setup",
        items: [
          { name: "Headset", note: "Comfort + clear footsteps", link: "PASTE_AMAZON_AFFILIATE_LINK" },
          { name: "Mechanical Keyboard", note: "Fast response + durability", link: "PASTE_AMAZON_AFFILIATE_LINK" },
        ],
      },
      {
        title: "Digital Products (Safe)",
        items: [
          { name: "Channel Audit (1:1)", note: "Full feedback on your channel + growth plan", link: "#" },
          { name: "Thumbnail Template Pack", note: "Reusable Canva templates", link: "#" },
        ],
      },
    ],
  },
};

