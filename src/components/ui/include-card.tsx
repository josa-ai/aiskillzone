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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md hover:shadow-brand-soft-lavender/30">
      <div className="relative h-40">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug text-brand-deep-navy">
          {title}
        </p>
      </div>
    </div>
  );
}
