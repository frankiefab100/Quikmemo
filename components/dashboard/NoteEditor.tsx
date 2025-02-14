import {
  CalendarDays,
  Clock,
  Download,
  Expand,
  FileCode,
  FileImage,
  Laugh,
  ListOrdered,
  MapPin,
  Paperclip,
  Settings,
  Tag,
} from "lucide-react";
import Button from "../ui/Button";
// import { NoteEditorProps } from "@/types/types";

const NoteEditor: React.FC = () =>
  //   {
  //   // title,
  //   // content,
  //   // tags,
  //   // lastEdited,
  //   // onArchive,
  //   // onDelete,
  //   onSave,
  //   onCancel,
  // }: NoteEditorProps
  {
    return (
      <div className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 bg-white border-gray-200 text-white pt-16 flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex-1">
            <input
              className="text-gray-900 dark:text-white w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground"
              placeholder="Note title"
              //   value={title}
            />

            <div className="mt-2 block">
              <div className="flex items-center gap-14">
                <span className="flex justify-center items-center text-sm text-muted-foreground">
                  <span className="pr-2">
                    <Tag className="w-3 h-3" />
                  </span>
                  Tags
                </span>
                <div className="flex flex-wrap gap-2">Dev, React</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex justify-center items-center text-sm text-muted-foreground">
                  <span className="pr-2">
                    <Clock className="w-3 h-3" />
                  </span>
                  Last edited
                </span>
                <span className="text-sm">30 Aug 2024</span>
              </div>
            </div>
          </div>
        </div>

        <form className="flex-1 p-4">
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="sr-only">Attach file</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="sr-only">Embed map</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <FileImage className="w-4 h-4" />
                    <span className="sr-only">Upload image</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <FileCode className="w-4 h-4" />
                    <span className="sr-only">Format code</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <Laugh className="w-4 h-4" />
                    <span className="sr-only">Add emoji</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <ListOrdered className="w-4 h-4" />
                    <span className="sr-only">Add list</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="sr-only">Settings</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span className="sr-only">Timeline</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <Download className="w-4 h-4" />
                    <span className="sr-only">Download</span>
                  </button>
                </div>
              </div>
              <button
                type="button"
                data-tooltip-target="tooltip-fullscreen"
                className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <Expand className="w-4 h-4" />
                <span className="sr-only">Full screen</span>
              </button>
              <div
                id="tooltip-fullscreen"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Show full screen
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="px-4 bg-white rounded-b-lg dark:bg-gray-800">
              <textarea
                id="editor"
                className="block w-full h-[45vh] resize-none px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a note..."
                required
              ></textarea>
            </div>
          </div>
        </form>
        <div className="mb-5 flex items-center justify-start gap-2 border-t p-2">
          <Button
          // onClick={onSave}
          >
            Save Note
          </Button>
          <Button
            variant="outline"
            // onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

export default NoteEditor;
