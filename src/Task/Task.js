import React, { useEffect, useState } from 'react'
import "../Task/Task.css"

function Task() {
  const[task,setTask] = useState('');
  const[desc,setDesc] = useState('');
  const[type,setType] = useState('🏫');
  const[tasks,setTasks] = useState([]);

  const addTodo = (e)=>{
    if(task===''){
      alert('Enter Task');
    }else{
      setTasks([...tasks,{'title':task,'desc':desc,'type':type}]);
      setTask('');
      setDesc('');
      setType('');
    }
    e.preventDefault();
  }

  const clearTodo = ()=>{
    setTasks([]);
  }

  const deleteTask = (task)=>{
    const temp = [...tasks].filter((todo)=>todo !==task);

    setTasks(temp);
  }
  
  const updateTask = (task,desc,type,index)=>{
    setTask(task.title);
    setDesc(task.desc);
    setType(task.type);
  }

  useEffect(()=>{
    if(localStorage.getItem('tasks')){
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks])

  return (
    <>
    <div className='row'>
      <div className='col-md-6 task-add-cont'>
        <h1 className='text-center'>Add To Do</h1>
        <form>
        <div className="input-group mb-3">
          <input type="text" className="form-control todo-input" value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder='Add Todo here'/>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control todo-input mt-2" value={desc} onChange={(e)=>{setDesc(e.target.value)}} placeholder='Add Description'/>
        </div>
        <select class="form-select mb-3" value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="🏫" selected>Education 🏫</option>
          <option value="🏠">Home 🏠</option>
          <option value="🎚️">Other 🎚️</option>
        </select>
          <button type='submit' className='btn btn-warning' onClick={addTodo} >Add Todo</button>
          <button type='button' className='btn btn-danger mx-2' onClick={clearTodo} >Clear Todo</button>
        </form>
      </div>
      <div className='col-md-6 task-items-cont' >
        <h1 className='text-center'>Your Todo's</h1>
        {
        tasks.map((task,index)=>{
          return <div className={(index%2)?"alert alert-dark task-items":"alert alert-danger task-items" } key={index}>
            <div className='d-flex justify-content-between'>
              <div>
                  <span role="alert"><h3>{index+1}{". "}{task.title}{ task.type}</h3></span><br />
                  <h5>Description:</h5><span role="alert">{task.desc}</span>
              </div>
              <div>
                <button className='btn btn-danger' type='button' onClick={()=>{deleteTask(task)}}>Delete</button><br />
                <button className='btn btn-warning mt-2' type='button' onClick={()=>{updateTask(task,desc,type,index)}}>update</button>
              </div>
          </div>
          </div>
        })
        }
      </div>
    </div>
    </>
  )
}

export default Task