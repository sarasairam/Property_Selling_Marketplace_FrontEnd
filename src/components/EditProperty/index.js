import { Component } from "react";


class EditProperty extends Component{
    state={location:"",noOfRooms:"",cost:"",owner:"",propertyStatus:"",errorMsg:"",showSubmitError:false,responseData:"",propertyId:"",role:""}

    componentDidMount(){
        const urlParams = new URLSearchParams(this.props.location.search)
        const propertyId = urlParams.get('propertyId')
        const role = urlParams.get('role')
        this.setState({propertyId,role})
        this.getData()
    }

    getData=async()=>{
        const urlParams = new URLSearchParams(this.props.location.search)
        const propertyId = urlParams.get('propertyId')
        const url = `https://property-selling-marketplace-backend.onrender.com/single-property/${propertyId}`
        const response = await fetch(url)
        if(response.ok){
            console.log("hi")
            const responseData = await response.json()
            const {location,no_of_rooms,cost,owner,property_status} = responseData
            this.setState({location,noOfRooms:no_of_rooms,cost,owner,propertyStatus:property_status})
        }else{
            console.log(response.statusText)
        }
    }

    onSubmitForm = async (event) => {
        event.preventDefault();
        const {location,noOfRooms,cost,owner,propertyStatus} = this.state
        const urlParams = new URLSearchParams(this.props.location.search)
        const propertyId = urlParams.get('propertyId')
        const role = urlParams.get('role')
        if(location!==""&&noOfRooms!==""&&cost!==""&&owner!==""&&propertyStatus!==""){
          const details ={location,noOfRooms,cost,owner,propertyStatus,role}
          const url = `https://property-selling-marketplace-backend.onrender.com/update/${propertyId}`
          const options = {
            method: 'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(details)}
          const response = await fetch(url, options)
          if (response.ok === true) {
            const responseData = await response.json()
            this.setState({responseData,location:'',noOfRooms:'',cost:'',owner:'',propertyStatus:'',errorMsg:''})
          }else{
            console.log("Error in post")
          }
        }else{
            this.setState({errorMsg:"Please enter ValidS details",showSubmitError:true})
        }
      };


     onChangeLocation = (event) =>{
        this.setState({location:event.target.value})
     } 

     onChangeNoOfRooms = (event) =>{
        this.setState({noOfRooms:event.target.value})
     } 

     onChangeCost = (event) =>{
        this.setState({cost:event.target.value})
     } 

     onChangeOwner = (event) =>{
        this.setState({owner:event.target.value})
     } 

     onChangePropertyStatus = (event) =>{
        this.setState({propertyStatus:event.target.value})
     } 

     goToHomePage=()=>{
        const {history} = this.props
        const {goBack} = history
        goBack()
     }

    render(){
        const {location,noOfRooms,cost,owner,propertyStatus,errorMsg,showSubmitError,responseData}= this.state
        
        return(
            <div>
                {responseData===""? 
                <div className="Main-container">
                <form className="card shadow-lg p-5 d-flex flex-column form-style" onSubmit={this.onSubmitForm}>
                    <div className="pb-3">
                      <label htmlFor="location" className="text-sm label">Location</label>
                      <input id="location"type="text" required className="form-control" value={location} onChange={this.onChangeLocation}/>
                    </div>
                    <div className="pb-3">
                      <label htmlFor="noofrooms" className="text-sm label">Number of Rooms</label>
                      <input id="noofrooms"type="text" required className="form-control" value={noOfRooms} onChange={this.onChangeNoOfRooms}/>
                    </div>
                    <div className="pb-3">
                      <label htmlFor="cost" className="text-sm label">Cost</label>
                      <input id="cost"type="text" required className="form-control" value={cost} onChange={this.onChangeCost}/>
                    </div>
                    <div className="pb-3">
                      <label htmlFor="owner" className="text-sm label">Owner</label>
                      <input id="owner"type="text" required className="form-control" value={owner} onChange={this.onChangeOwner}/>
                    </div>
                      <div>
                      <label htmlFor="status" className="text-sm label">Property Status</label>
                      <input type="status" className="form-control" required value={propertyStatus} onChange={this.onChangePropertyStatus}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary submit-button">Submit</button>
                    {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                </form>
                <button type="button" className="btn btn-primary mt-5" onClick={this.goToHomePage}>Go to Home Page</button>
                
                </div>:
                <div className="Main-container">
                    {responseData===true && <h1>Data has been updated</h1>}
                    <button type="button" className="btn btn-primary mt-5" onClick={this.goToHomePage}>Go to Home Page</button>
                </div>
                }
                  
            </div>
        )
    }
}
export default EditProperty;