import React, {useState} from "react";

export default function Devtask(){

    const [addtask, setaddtask] = useState([
        {
              id: 1,
              ten: "Hoc React",
              trangthai: "chualam",
              uutien: "tatca",
              han: "2026-10-19"
        }
    ])
    const [inputchange, setinputchange] = useState(
        {
              id: "",
              ten: "",
              trangthai: "chualam",
              uutien: "tatca",
              han: ""
        }
    );

const [isOpenModal, setIsOpenModal] = useState(false);
const [isEditing, setisEditing] = useState(false);
const [editId, setEditId] = useState(null);
const [keysearch, setkeysearch] = useState("");
const [filtertrangthai, setfiltertrangthai] = useState("tatca");
const [filteruutien, setfilteruutien] = useState("tatca");

    function layinput(event){
        const {name , value} = event.target;
        setinputchange(pre => ({...pre, [name]:value}));
    }

    function Addtask(){
        if(!inputchange.ten.trim()){
            alert("vui long nhap cong viec !");
            return
        }

     if (editId !== null) {
    setaddtask(
        addtask.map((task) => (task.id === editId ? { ...inputchange } : task))
    );
}
     else{
        const newtask = {
            ...inputchange, id: inputchange.id ? Number(inputchange.id) : Date.now()
        }
        setaddtask([...addtask, newtask]);
}
    
        setinputchange({
            id: "",
            ten: "",
            trangthai: "chualam",
            uutien: "thap",
            han: ""
        })
        setIsOpenModal(false);
          setEditId(null); 
    }

  function Removetask(id) {
    setaddtask((rv) => rv.filter((task) => task.id !== id));
}

   function Editing(id) {
    const taskToEdit = addtask.find((task) => task.id === id);
    if (taskToEdit) {
        setinputchange(taskToEdit);
        setEditId(id);
        setIsOpenModal(true);
    }
}

   

    return(
         <div className="devtask">
      <h2>Project Management App</h2>
      <div className="status">
        <div>
          <h3>Tổng Số Dự Án: {addtask.length > 0 ? 1 : 0}</h3>
        </div>

        <div>
          <h3>Tổng Task: {addtask.length}</h3>
        </div>

        <div>
          <h3>Tổng Task Đã Hoàn Thành: {addtask.filter((task) => task.trangthai === "hoanthanh").length}</h3>
        </div>

        <div>
          <h3>Tổng Task Đang Thực Hiện: {addtask.filter((task) => task.trangthai === "danglam").length}</h3>
        </div>
      </div>

        <div className="search">
             <input type="text" placeholder="enter your task find..." value={keysearch} onChange={(e) => setkeysearch(e.target.value)}></input>
            <button >SEARCH</button>
        </div>

        <div className="button">

            <select value={filtertrangthai} onChange={(e) => setfiltertrangthai(e.target.value)}>
                <option value="tatca">Tất cả</option>
                <option value="chualam">Chưa làm</option>
                <option value="danglam">Đang làm</option>
                <option value="hoanthanh">Đã hoàn thành</option>
            </select>

            <select>
                <option value="conlau">Còn Lâu</option>
                <option value="sapdenhang">Sắp Đến Hạn</option>
                <option value="gap">Gấp</option>
            </select>

            <select value={filteruutien} onChange={(e) => setfilteruutien(e.target.value)}>
               <option value="tatca">Tất cả</option>
                <option value="thap">Thấp</option>
                <option value="trungbinh">Trung Bình</option>
                <option value="cao">Cao</option>
            </select>
        
        <button onClick={() => setIsOpenModal(true)}>ADD TASK</button>
        
        {isOpenModal && (
            <>
        <input type="text" onChange={layinput} name="ten" placeholder="nhap cong viec..." value={inputchange.ten}/>
        <label for="id">ID:</label>
        <input type="number" name="id" onChange={layinput} value={inputchange.id}></input>

          <select name="trangthai" onChange={layinput} value={inputchange.trangthai}>
                <option value="chualam">Chưa làm</option>
                <option value="danglam">Đang làm</option>
                <option value="hoanthanh">Đã hoàn thành</option>
            </select>

            <select name="uutien" onChange={layinput} value={inputchange.uutien}>
               <option value="tatca">Tất cả</option>
                <option value="thap">Thấp</option>
                <option value="trungbinh">Trung Bình</option>
                <option value="cao">Cao</option>
            </select>

          

            <label for="han">Hạn hoàn Thành:</label>
            <input type="date" onChange={layinput} name="han" value={inputchange.han}/>
        <button onClick={Addtask}>ADD TASK</button>
</>
)}

        </div>
         

         <ol>
           {addtask.filter((element) => {
             const matchKey = element.ten.toLowerCase().includes(keysearch.toLowerCase());
             const matchTrangThai = filtertrangthai === "tatca" || element.trangthai === filtertrangthai;
             const matchUuTien = filteruutien === "tatca" || element.uutien === filteruutien;

             return matchKey && matchTrangThai && matchUuTien;
})
            .map((element, index) => {
            return(
            <li key={element.id}>Cong Viec : {element.ten} | Trang Thai: {element.trangthai} | Uu Tien: {element.uutien} |Han Hoan Thanh : {element.han} <button onClick={() => Removetask(element.id)}>remove</button>
            <button onClick={() => Editing(element.id)}>edit</button></li>
            )
           })}
         </ol>
       
        </div>
    )
}
