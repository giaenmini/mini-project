import React, {useState} from "react";

function ToDoList(){
    const [task, setTask] = useState(["Eat a breakfast", "Take a shower", "Walk the dog"]);
    const [newtask, setNewTask] = useState("");

    function inputchange(event){
        setNewTask(event.target.value);
    }
    

    function addstack(){
        if(newtask.trim() !== ""){
        setTask(t => [...t, newtask]);
        setNewTask("");
        }
    }


    function deletetask(index){
        const updatetask = task.filter((_, i) => i !== index);
        setTask(updatetask);
        }

    
    function movetaskup(index){
        const updateT = [...task];
        if(index > 0){
            [updateT[index] , updateT[index-1]] = [updateT[index-1], updateT[index]];
            setTask(updateT);
        }
    }


    function movetaskdown(index){
        const updateT = [...task];
        if(index < task.length -1){
            [updateT[index], updateT[index+1]] = [updateT[index+1], updateT[index]];
            setTask(updateT);
        }
    }


    return(
        <div className="todolist">
            <h1>To-Do-List</h1>

            <div className="cn">
            <input type="text" value={newtask} placeholder="Enter a task..." onChange={inputchange} id="di"/>
            <button className="bt" onClick={addstack}>ADD</button>
            </div>
            <ol>
                {task.map((element, index) => 
                <li key={index}>
                    <span className="text">{element}</span>
                    <button className="dt" onClick={() => deletetask(index)}>Delete</button>
                    <button className="da" onClick={()=> movetaskup(index)}>UP</button>
                    <button className="db" onClick={()=> movetaskdown(index)}>DOWN</button>
                </li>)}
            </ol>


        </div>

        
    )
}

export default ToDoList