// import { useState } from "react";
import MenuBar from "@/components/dashboard/MenuBar";
import Sidebar from "@/components/dashboard/Sidebar";
import NoteEditor from "@/components/dashboard/NoteEditor";
import NoteList from "@/components/dashboard/NoteList";
import DeleteArchive from "@/components/dashboard/DeleteArchive";

const DashboardClient = () => {
  //   const [notes, setNotes] = useState([]);
  //   const [currentNote, setCurrentNote] = useState(null);

  //   const handleCreateNote = () => {
  //     // Implement create note logic
  //     console.log("Creating new note");
  //   };

  //   const handleSaveNote = (note) => {
  //     // Implement save note logic
  //     console.log("Saving note", note);
  //   };

  //   const handleCancelEdit = () => {
  //     // Implement cancel edit logic
  //     console.log("Cancelling edit");
  //   };

  return (
    <div className="flex">
      <MenuBar />
      <Sidebar />
      <section className="ml-[20%] grid grid-cols-[1fr_2fr_1fr] overflow-y-auto bg-white">
        <NoteList
        // notes={notes} onCreateNote={handleCreateNote}
        />
        <NoteEditor
        //   currentNote={currentNote}
        //   onSave={handleSaveNote}
        //   onCancel={handleCancelEdit}
        />
        <DeleteArchive />
      </section>
    </div>
  );
};

export default DashboardClient;
