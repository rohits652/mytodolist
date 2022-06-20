import './App.css';
import Task from './Task/Task';

function App() {
  return (
    <div className='container'>
    <h1 className='text-center mt-2'>Todo App<i className="fa-solid fa-check-double"></i></h1>
    <Task />
    </div>
  );
}

export default App;
