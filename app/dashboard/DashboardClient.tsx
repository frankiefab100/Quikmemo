import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import NoteEditor from "@/components/dashboard/NoteEditor";
import NoteList from "@/components/dashboard/NoteList";
import { NotesProvider } from "@/context/NotesContext";

const DashboardClient = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <main
        //  className={`transition-all duration-300 ${
        //   isSidebarOpen
        //     ? "ml-0 md:ml-40 lg:ml-[16%]"
        //     : "ml-[15%] md:ml-[5.8%] lg:ml-[4.8%]"
        // }`}
        className="ml-0 md:ml-40 lg:ml-[16%]"
      >
        <div
          className="
        lg:max-w-[100%] grid lg:grid-cols-[300px_minmax(600px,_1fr)] md:grid-cols-[200px_minmax(300px,_1fr)] grid-cols-1 overflow-hidden "
        >
          <NotesProvider>
            <NoteList />
            <NoteEditor />
          </NotesProvider>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;
