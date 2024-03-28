export default function Stats({items}){
    const numItems = items.length;
  
    if(!numItems){
      return(
        <footer className="stats">
          <em>
              Start adding some items to your trip 🚀
          </em>
        </footer>
      )
    }
  
    const numPacked = items.filter(item=>item.packed).length;
    const packedPercentage = Math.round((numPacked/numItems)*100);
    return(
      <footer className="stats">
        <em>
          {packedPercentage!==100?`💼 You have ${numItems} items on your list and you already packed ${numPacked} (${packedPercentage}%)`
          :`You got everything! Ready to go ✈️`}
        </em>
      </footer>
    )
  }