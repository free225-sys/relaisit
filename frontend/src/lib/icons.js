/**
 * Icônes utilisées par le site, importées nommément.
 *
 * Pourquoi ce fichier : `import * as Icons from "lucide-react"` empêche
 * l'élimination du code mort et embarque les ~2,3 Mo de sources de la
 * bibliothèque entière dans le paquet livré au visiteur. En listant ici les
 * seules icônes réellement affichées, le paquet principal passe de 293 ko à
 * 145 ko compressés, à rendu strictement identique.
 *
 * Pour ajouter une icône : l'importer ci-dessous, puis l'ajouter à l'objet
 * `Icons`. Une icône absente retombe sur `Circle` côté composant.
 */
import {
  // Services, méthode, valeurs et formations (référencées par nom dans src/data)
  BrainCircuit,
  Compass,
  Cpu,
  FileSpreadsheet,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  LifeBuoy,
  Lock,
  MapPin,
  MonitorSmartphone,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
  Workflow,
  Zap,
  // Interface
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Circle,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Quote,
  Send,
  Star,
  X,
} from "lucide-react";

export const Icons = {
  BrainCircuit,
  Compass,
  Cpu,
  FileSpreadsheet,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  LifeBuoy,
  Lock,
  MapPin,
  MonitorSmartphone,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
  Workflow,
  Zap,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Circle,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Quote,
  Send,
  Star,
  X,
};

export default Icons;
