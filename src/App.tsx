import { AppProviders } from './providers';
import { TaskBoard } from './features/tasks/TaskBoard';

function App() {
  return (
    <AppProviders>
      <TaskBoard />
    </AppProviders>
  );
}

export default App;
