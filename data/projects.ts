export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "Websites & apps" | "Tools" | "Video & motion";
  label: string;
  description: string;
  problem: string;
  approach: string;
  deliverables: string[];
  caveat?: string;
  live?: string;
  source?: string;
  instagram?: string;
  poster?: string;
};
// Public-facing work only. Never add private source URLs here.
export const projects: Project[] = [
  {
    id: "groom-room",
    number: "01",
    title: "Groom Room by Asha",
    subtitle: "A booking app built around each pet.",
    category: "Websites & apps",
    label: "Business application",
    description:
      "A dog and cat grooming booking demo with appointments sized to each pet’s breed, coat, service, and matting.",
    problem:
      "A fixed appointment length does not suit every groom. Customers also need a straightforward way to provide vaccination proof and change their booking.",
    approach:
      "The application estimates grooming time, finds calendar gaps that fit, stores bookings, and provides self-serve booking management. An authenticated owner dashboard brings appointments, vaccine holds, and the waitlist together.",
    deliverables: [
      "Mobile-first five-step booking flow",
      "Duration-aware availability with grooming buffers",
      "Vaccination-card uploads and pending-proof states",
      "Token-based rescheduling and cancellation",
      "Owner timeline, waitlist, and calendar export",
    ],
    caveat:
      "A demo application. Deposit payments and outbound messages are simulated. Dashboard time-savings figures are estimates, not measured business results.",
    live: "https://happy-paws-slots.lovable.app/",
    poster: "/images/groom-room.webp",
  },
  {
    id: "tracereel",
    number: "02",
    title: "TraceReel",
    subtitle: "Browser traces become polished demo videos.",
    category: "Tools",
    label: "Open-source engineering",
    description:
      "A developer toolkit that reconstructs smooth product demonstrations from AI-agent browser screenshots and action traces.",
    problem:
      "Live agent recordings contain pauses and abrupt changes while the model thinks. A useful demonstration needs controlled timing, readable actions, and smooth movement.",
    approach:
      "A trace adapter normalizes screenshots and actions. Reconstruction adds cursor movement, typing, click feedback, and camera framing; optional audio mixing places supplied narration and music into the finished video.",
    deliverables: [
      "Trace format and adapter architecture",
      "Smooth cursor and camera reconstruction",
      "1080p / 60 fps video rendering",
      "Narration and music mixing with ducking",
      "Validation, inspection, and technical QA tools",
    ],
    caveat:
      "Built on the MIT-licensed TakeOne foundation by Atharva Deosthale, with added agent-trace reconstruction and audio tooling. Muse is the tested reference integration; other integrations have differing verification status.",
    live: "https://trace-to-smooth-showcase.lovable.app/",
    poster: "/images/tracereel-showcase.jpg",
    source: "https://github.com/Vinayak19112003/tracereel",
  },
  {
    id: "mathlens",
    number: "03",
    title: "MathLens",
    subtitle: "Explore mathematics by moving, not memorising.",
    category: "Websites & apps",
    label: "Interactive learning MVP",
    description:
      "Visual mathematics lessons that connect live graphs, guided tasks, and formula explanations.",
    problem:
      "A formula is easier to understand when a learner can change its inputs and see the relationship on a graph.",
    approach:
      "Slope and Z-Score lessons use reusable SVG graphs, live controls, progressive explanations, and challenges. A function playground lets learners compare and explore curves.",
    deliverables: [
      "Two complete guided lessons: Slope and Z-Score",
      "Pointer and keyboard graph interactions",
      "Seven-function playground",
      "Formula reveals and concept challenges",
      "Device-local progress, bookmarks, and appearance settings",
    ],
    caveat:
      "An MVP, not a complete mathematics course. Additional lessons are planned; progress is stored in the current browser.",
    
  },
  {
    id: "branzyne-film",
    number: "04",
    title: "Branzyne — Brand Promo",
    subtitle: "A digital agency, introduced in 35 seconds.",
    category: "Video & motion",
    label: "Brand promotion film",
    description:
      "A vertical promotional film for branzyne.com, combining animated typography, purple brand lighting, and moving website previews.",
    problem:
      "Introduce a digital agency’s offer in a short, cohesive video that works on a vertical screen.",
    approach:
      "The film moves from a typographic opening into the brand reveal, website and service showcases, and a closing call to action. Purple lighting and typography connect the sequence.",
    deliverables: [
      "Vertical 9:16 composition",
      "Animated typography and brand reveal",
      "Website and service showcases",
      "Transitions and sound mix",
      "35-second, 1080 × 1920, 30 fps delivery",
    ],
    caveat:
      "Presented as a video-editing sample. Brand statistics, testimonials, and offers appearing inside the supplied film belong to its promotional content and are not portfolio results for Vinayak.",
    live: "https://www.branzyne.com/",
    instagram: "https://www.instagram.com/reel/Ded3kOWTovl/",
    poster: "/images/branzyne-poster.webp",
  },
  {
    id: "neo-film",
    number: "05",
    title: "Meet Neo",
    subtitle: "An AI persona with a cinematic introduction.",
    category: "Video & motion",
    label: "AI introduction film",
    description:
      "An introduction for Neo, an original human-looking AI persona created to present creative and technology services.",
    problem:
      "Give a fictional AI presenter a memorable introduction through performance, pacing, and a consistent visual identity.",
    approach:
      "Talking shots alternate with dark silhouette shots. Large red typography, deliberate cuts, voice treatment, and music build toward the final reveal.",
    deliverables: [
      "AI presenter direction and shot selection",
      "Dark silhouette montage",
      "Animated red typography",
      "Voice and music treatment",
      "Vertical short-form editing and final delivery",
    ],
    instagram: "https://www.instagram.com/reel/DeeDdWPo_aR/",
    poster: "/images/neo-poster.webp",
  },
];
