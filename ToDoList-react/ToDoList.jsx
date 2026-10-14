import { element } from "prop-types";
import React, {useEffect, useState} from "react";

export default function ToDoList(){
    
    const [inputvalue, setinputvalue] = useState("");
    const [addtask, setaddtask] = useState([]);
    const [checked, setchecked] = useState(false);
    const [temp, settemp] = useState("all");

    function Inputchange(event){
        setinputvalue(event.target.value);
    }
    function Addstack(){
        if(inputvalue != ""){
            setaddtask([...addtask , {text: inputvalue, iscompleted: false}]);
            setinputvalue("");
        }
    }
    function Removetask(index){
       const updatetask = addtask.filter((_, i) => i !== index);
       setaddtask(updatetask);
    }
    
    function Checkbox(index){
        const updatechange = addtask.map((task, i)=>{
            if(i === index){
                return{...task, iscompleted: !task.iscompleted};
            }
            return task;
        });
        setaddtask(updatechange);
    }
    function Completedtask(){
        settemp("Completed")
    }
     function Activetask(){
        settemp("Active")
    }
    function Alltask(){
        settemp("All")
    }

    const filtertask = addtask.filter((task) =>{
        if(temp === "Active") return task.iscompleted === false;
        if(temp === "Completed") return task.iscompleted === true;
            return true;
    });


    return(
        <div>
            <h2>To Do List</h2>

            <div>
                <input type="text" value={inputvalue} onChange={Inputchange} placeholder="enter your task..."/>
                <button onClick={Addstack}>Add</button>
            </div>

            <div>
                <button onClick={Alltask}>All</button>
                <button onClick={Activetask}>Active</button>
                <button onClick={Completedtask}>Completed</button>
            </div>

           <ol>
             {filtertask.map((element, index) =>{
                return  <li key={index}><input type="checkbox" id="mycheck" onChange={() => Checkbox(index)} checked={element.iscompleted}/>{element.text}
                <button onClick={()=> Removetask(index)}>remove</button></li>
             })}
           </ol>

           <p>Task: {filtertask.length}</p>
               
        </div>
    )
}
