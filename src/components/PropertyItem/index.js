
const PropertyItem = (props)=>{
  const{data,removeProperty,editProperty}=props
  const removePropertyHere=()=>(
    removeProperty(data.id)
  )

  const editPropertyHere=()=>{
    editProperty(data)
  }

  return(
    <>
      <ul className="student-card">
            <li>Location: {data.location}</li>
            <li>Owner Name: {data.owner}</li>
            <li>No of Rooms: {data.no_of_rooms}</li>
            <li>Status: {data.property_status}</li>
            <li>
              <button type="button" className="btn btn-danger" onClick={removePropertyHere}>
                Delete
              </button></li>
              <li>
              <button type="button" className="btn btn-danger" onClick={editPropertyHere}>
                Edit
              </button></li>
      </ul>
    </>

    
  )
}
export default PropertyItem;