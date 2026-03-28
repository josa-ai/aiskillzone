import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRightLeft,
  BarChart3,
  BookOpen,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Code2,
  Compass,
  Crosshair,
  Database,
  FileText,
  FormInput,
  GitBranch,
  GraduationCap,
  HelpCircle,
  LayoutTemplate,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  MailCheck,
  Map,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Mic,
  Monitor,
  Paintbrush,
  PenLine,
  Phone,
  PieChart,
  Plug,
  ScanSearch,
  Search,
  Send,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Star,
  Store,
  Tag,
  Target,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Accessibility,
  ArrowRightLeft,
  BarChart3,
  BookOpen,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Code2,
  Compass,
  Crosshair,
  Database,
  FileText,
  FormInput,
  GitBranch,
  GraduationCap,
  HelpCircle,
  LayoutTemplate,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  MailCheck,
  Map,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Mic,
  Monitor,
  Paintbrush,
  PenLine,
  Phone,
  PieChart,
  Plug,
  ScanSearch,
  Search,
  Send,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Star,
  Store,
  Tag,
  Target,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
};

const GRADIENTS = [
  "from-brand-royal-purple to-brand-midnight-plum",
  "from-brand-tech-blue to-brand-deep-navy",
  "from-brand-mauve-purple to-brand-royal-purple",
  "from-brand-deep-navy to-brand-tech-blue",
  "from-brand-cool-azure to-brand-tech-blue",
  "from-brand-midnight-plum to-brand-mauve-purple",
];

interface IncludeCardProps {
  title: string;
  icon: string;
  index: number;
  serviceSlug: string;
}

export function IncludeCard({ title, index, serviceSlug }: IncludeCardProps) {
  const imagePath = `/images/services/includes/${serviceSlug}/${index}.jpg`;

  return (
    <div className="group overflow-hidden rounded-xl border border-brand-soft-lavender/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-royal-purple/20">
      <div className="relative h-48">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-midnight-plum/40 via-transparent to-transparent" />
      </div>
      <div className="border-t-2 border-brand-soft-lavender p-4">
        <p className="text-sm font-semibold leading-snug text-brand-deep-navy transition-colors group-hover:text-brand-royal-purple">
          {title}
        </p>
      </div>
    </div>
  );
}
