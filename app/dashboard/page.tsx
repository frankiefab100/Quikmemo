import RegisterPage from "../register/page";
import MenuBar from "@/components/dashboard/MenuBar";
import Sidebar from "@/components/dashboard/Sidebar";
import NoteEditor from "@/components/dashboard/NoteEditor";
import NoteList from "@/components/dashboard/NoteList";
import DeleteArchive from "@/components/dashboard/DeleteArchive";
import { getSession } from "@/lib/getSession";

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;

  // const [notes, setNotes] = useState([]);
  // const [currentNote, setCurrentNote] = useState();

  //   function createNewNote() {}

  //   function findCurrentNote() {}

  //   function updateNote(text) {}

  //   function deleteNote(text) {}

  //   function archiveNote(text) {}

  return (
    <>
      {!user ? (
        <RegisterPage />
      ) : (
        <div className="flex">
          <MenuBar />
          <Sidebar />
          {/* <section className="pt-24 grid grid-cols-3 gap-4 mb-4 h-screen overflow-y-auto bg-white"> */}
          <section className="ml-[20%] grid grid-cols-[1fr_2fr_1fr] overflow-y-auto bg-white">
            <NoteList />
            <NoteEditor />
            <DeleteArchive />
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
