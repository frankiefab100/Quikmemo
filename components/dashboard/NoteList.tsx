import { NOTES_DATA } from "@/app/data/data";
import Button from "../ui/Button";
// import { NoteListProps } from "@/types/types";
import { Plus } from "lucide-react";

const NoteList = () =>
  //   {
  //   //   notes,
  //   //   selectedNoteId,
  //   //   onNoteSelect,
  //   onCreateNote,
  // }: NoteListProps

  {
    return (
      <div className="text-gray-900 dark:text-white dark:bg-gray-800  bg-white  border-gray-200  pt-16 flex h-screen flex-col border-r">
        <div className="flex items-center gap-2 p-4 border-b">
          <h1 className="text-xl font-semibold">All Notes</h1>
        </div>
        <div className="p-4 w-full">
          <Button
            variant="primary"
            // onClick={onCreateNote}
          >
            <span className="pr-2">
              <Plus className="w-4 h-4" />
            </span>
            Create New Note
          </Button>
        </div>

        <div className="flex-1">
          <div className="space-y-4 p-4">
            {NOTES_DATA.map((note) => (
              <div
                key={note.id}
                className="w-full rounded-lg border p-4 text-left transition-colors dark:hover:bg-gray-700 dark:hover:border-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                //   onClick={() => onNoteSelect(note.id)}
                //   className={`w-full rounded-lg border p-4 text-left transition-colors hover:bg-muted/50 ${
                //     selectedNoteId === note.id ? "border-primary bg-muted/50" : ""
                //   }`}
              >
                <h2 className="text-gray-900 dark:text-white font-semibold text-[1.2rem] leading-6 mb-1">
                  {note.title}
                </h2>

                <div className="flex">
                  {note.tags.map((tag) => (
                    <button
                      key={tag}
                      className=" dark:bg-gray-600 dark:text-gray-400 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm mr-2"
                      // onClick={onCreateNote}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
                  {note.lastEdited}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default NoteList;
