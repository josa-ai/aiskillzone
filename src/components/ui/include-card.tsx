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
  "from-[#004bca] to-[#191c1e]",
  "from-[#0061ff] to-[#191c1e]",
  "from-[#0061ff] to-[#004bca]",
  "from-[#191c1e] to-[#004bca]",
  "from-[#c2c6d9] to-[#004bca]",
  "from-[#191c1e] to-[#0061ff]",
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
    <div className="group overflow-hidden rounded-xl border border-[#f2f4f6]/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#004bca]/20">
      <div className="relative h-48">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#191c1e]/40 via-transparent to-transparent" />
      </div>
      <div className="border-t-2 border-[#f2f4f6] p-4">
        <p className="text-sm font-semibold leading-snug text-[#191c1e] transition-colors group-hover:text-[#004bca]">
          {title}
        </p>
      </div>
    </div>
  );
}
