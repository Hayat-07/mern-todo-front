import React from 'react';
import './page1.scss';

const EditModal = ({editeFun,deleteFun,setModal,setRefetch,refetch ,setInd}) => {

    return (
        <div>
            <form  onSubmit={editeFun} className="editeModal">
                <input type="date" name="date" style={{margin: "auto"}}/>

                <input name="task" type="text"/>
                <input name="cost" className="input2" type="text"/>
                <button type="submit" onClick={()=>setRefetch(!refetch)}>SAVE</button>
                <button onClick={()=>{setModal(false)}} >Cancel</button>
            </form>
        </div>
    )
};

export default EditModal;