import { useState } from "react";


export default function Form({onAddItem,lastItemID}){
    const [description,setDescription] = useState("");
    const [quantity,SetQuantity] = useState(1);
  
    function handleSubmit(e){
      e.preventDefault();
  
      if(!description) return;
  
      const newItem = {description,quantity,packed:false,id: lastItemID? lastItemID + 1 : 1 };
      onAddItem(newItem);  
      setDescription("");
      SetQuantity(1);
    }
  
    return (
      <form onSubmit={handleSubmit} className="add-form">
        <h3>What do you need for your trip ❤️</h3>
        <select value={quantity} onChange={(e)=>{SetQuantity(Number(e.target.value))}}>
          {Array.from({length:20},(_,i)=> i+1).map(
            (num)=>(
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
        <input 
          type="text" 
          placeholder="Item..." 
          value={description} 
          onChange={(e)=>setDescription(e.target.value)}
        />
        <button>ADD</button>
      </form>
    )
  }