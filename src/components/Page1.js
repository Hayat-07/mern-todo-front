import React, {useEffect, useState} from 'react';
import './page1.scss';
import EditModal from "./EditModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page1 = () => {
    const [tasks, setTasks]= useState([]);
   const [modal, setModal]= useState(false);
   const [refetch, setRefetch]= useState(false);
   const [ind, setInd]= useState(0);
   ////////////////////////////////////////////////////////////
console.log(tasks);
    const addFun =(e)=>{

           e.preventDefault();
           const date=e.target.date.value;
           const task =e.target.task.value;
           const cost =e.target.cost.value;
           const taskP = {date,task,cost};
           if(date==="" || task==="" || cost===""){

toast.error('Please Fill-Up all the information', {autoClose: 5000});  
      }else{
            // console.log(task);
            setTasks([...tasks,taskP]);
            console.log(taskP);
    
            fetch('http://localhost:5000/postT',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body: JSON.stringify(taskP)
            })
                .then(res=>res.json())
                .then(data=> {
                    // console.log(data)
                    if (data.acknowledged){
                        alert('Task added Successfully');
                    }
                })
           e.target.reset();
      }
       
        setRefetch(!refetch);
    }


    const editeFun = async (e)=>{
           e.preventDefault();
          let b = ind;
        let item = tasks.find((x)=>tasks.indexOf(x) === b);
        console.log("EditeFun is called");
           const date=e.target.date.value;
           const task =e.target.task.value;





           const cost =e.target.cost.value;
           let newTasks =[...tasks];
                 newTasks[ind] = {...newTasks[ind],date,task,cost};
                 item = newTasks[ind];
                 console.log(item)
           setTasks(newTasks);
        setModal(false);

      fetch(`http://localhost:5000/put/${item._id}`,{
          method:"PUT",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(item)
      })
          .then(res =>res.json())
          .then(data=>{
              if (data.acknowledged){
                  toast.success('Task Updated Successfully',{autoClose: 3000});
              }
          })
          .catch(err =>console.log(err))
    }
    // console.log(tasks);



    const deleteFun =(b)=>{
        console.log(typeof (tasks));
        console.log(`page1 == ${b}`);
         const item = tasks.find((x)=>tasks.indexOf(x) === b);

         console.log(item);
         const newList = tasks.filter((x)=>tasks.indexOf(x) !== b);
         setTasks(newList);
         const id =item._id;
        console.log(id);
         const newId= JSON.parse(id);
         console.log(newId);
         fetch(`http://localhost:5000/deleteT/${item._id}`,{
             method:'DELETE',

         })
             .then(res => res.json())
             .then(data => {
                 console.log(data);
                 if(data.deletedCount > 0){
                     alert(" Task successfully deleted ");
                 }
             })
             .catch(err=> console.log(err))
    }
///////////////////////////////////////////////////////////////////




    useEffect(()=>{
        fetch('http://localhost:5000/getT')
            .then(res=>res.json())
            .then(data=>setTasks(data))
            .catch(err=>console.log(err))
    },[]);

// console.log(tasks);


    return (
        <div className="page1">
            <ToastContainer />
            
                <div style={{margin : "10px"}}>
                    <h1 >TODO APP</h1>
                </div>
                <form onSubmit={addFun} className="inputDiv">
                    <input  name="date" type="date" className="dateInput"/>
                    <input name="task" type="text" placeholder='Please type your task details'/>
                    <input name="cost" className="input2" type="number" placeholder='number'/>
                    <button type="submit">Add</button>
                </form>
            <div >
                {
                    modal ?<EditModal setModal={setModal} editeFun={editeFun} refetch={refetch} setRefetch={setRefetch}  deleteFun={deleteFun} ></EditModal>:null
                }
            </div>

            <div >
                    {
                        tasks.map((x,i)=>{
                            const b =i;
                          return <div className="todoList" key={b}>

                              <div className="todo">
                                  <h6 >{x.date}</h6>
                                  <h4>{x.task}</h4>
                                  <div>
                                      <h2>{x.cost}</h2>
                                  </div>
                                  <button onClick={()=>{setModal(true); setInd(b); }} className="edite">Edite</button>
                                  <button onClick={()=>{deleteFun(b)}} className="delete">Delete</button>
                              </div>
                          </div>
                        })
                    }

            </div>
        </div>
    );
};

export default Page1;