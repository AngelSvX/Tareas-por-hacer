import TaskList from "./components/TaskList";
import { MyContext } from "./provider/TaskProvider";

function App() {
  return (
    <MyContext>
      <div className="bg-slate-900 w-full h-screen">
        <TaskList />
      </div>
    </MyContext>
  );
}

export default App;
