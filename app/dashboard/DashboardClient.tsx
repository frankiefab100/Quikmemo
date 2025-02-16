import MenuBar from "@/components/dashboard/MenuBar";
import Sidebar from "@/components/dashboard/Sidebar";
import NoteEditor from "@/components/dashboard/NoteEditor";
import NoteList from "@/components/dashboard/NoteList";
import DeleteArchive from "@/components/dashboard/DeleteArchive";
import { NotesProvider } from "@/context/NotesContext";

const DashboardClient = () => {
  return (
    <div className="flex">
      <MenuBar />
      <Sidebar />
      <section className="ml-[20%] grid grid-cols-[1fr_2fr_1fr] overflow-y-auto bg-white">
        <NotesProvider>
          <NoteList />
          <NoteEditor />
          <DeleteArchive />
        </NotesProvider>
      </section>
    </div>
  );
};

export default DashboardClient;
