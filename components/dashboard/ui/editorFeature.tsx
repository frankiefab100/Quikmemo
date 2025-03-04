import { LucideIcon } from "lucide-react";
import {
  Download,
  FileCode,
  FileImage,
  Laugh,
  ListOrdered,
  MapPin,
  Paperclip,
} from "lucide-react";

interface EditorProps {
  label: string;
  Icon: LucideIcon;
}

export const featureItems = [
  { label: "Attach file", Icon: Paperclip },
  { label: "Embed map", Icon: MapPin },
  { label: "Upload image", Icon: FileImage },
  { label: "Format code", Icon: FileCode },
  { label: "Add emoji", Icon: Laugh },
  { label: "Add list", Icon: ListOrdered },
  { label: "Download", Icon: Download },
];

const EditorFeature: React.FC<EditorProps> = ({ label, Icon }) => {
  return (
    <button
      type="button"
      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
    >
      <Icon className="w-4 h-4" />
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default EditorFeature;
