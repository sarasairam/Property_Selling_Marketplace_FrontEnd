import { Component } from "react";
import Cookies from "js-cookie";
import {Grid} from 'react-loader-spinner'
import './index.css'
import PropertyItem from "../PropertyItem";

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component{
  state={data:[],apiStatus:apiStatusConstants.initial,search:''}

  componentDidMount(){
    this.getData()
  }

  getData=async()=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
    const name = urlParams.get('name')
    this.setState({apiStatus:apiStatusConstants.inProgress})
    if(role==="buyer"){
     const url ="https://property-selling-marketplace-backend.onrender.com/all-property"
     const response = await fetch(url)
     if(response.ok){
      const responseData = await response.json()
      this.setState({data:responseData,apiStatus:apiStatusConstants.success})
     }else{
      this.setState({apiStatus:apiStatusConstants.failure})
     }  
    }else if(role==="owner"){
      const url = `https://property-selling-marketplace-backend.onrender.com/property/${name}`
      const response = await fetch(url)
      if(response.ok){
        const responseData = await response.json()
        this.setState({data:responseData,apiStatus:apiStatusConstants.success})
      }else{
        this.setState({apiStatus:apiStatusConstants.failure})
       }  
      }
    }

  editProperty = async(data)=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
    const {id} = data
    const {history} = this.props
    history.push(`/edit-property?propertyId=${id}&role=${role}`)
  }

  removeProperty=async(propertyId)=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
        const url = 'https://property-selling-marketplace-backend.onrender.com/remove'
        const details = {role,propertyId}
        const options = {
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(details)}
        const response = await fetch(url,options)
        if(response.ok){
          const responseData = await response.json()
          if(responseData===true){
            console.log(responseData)
          }
        }else{
          console.log(response)
        }
    this.getData()}

    addNewProperty=()=>{
      const urlParams = new URLSearchParams(this.props.location.search)
      const role = urlParams.get('role')
      const {history} = this.props
      history.push(`/add-property?role=${role}`)
  }

  onLogout=()=>{
    Cookies.remove("cookie");
    const {history} = this.props
    history.replace('/login')
  }

  onChangeSearch=(event)=>{
    this.setState({search:event.target.value})
  }

  refreshSearch=()=>{
    this.setState({search:''},this.getData)
  }

  searchData= async()=>{
    const {search} = this.state
    const url = `https://property-selling-marketplace-backend.onrender.com/search/`;
    const details = {search}
    const options={
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(details)
      }
    const response = await fetch(url,options)
    if(response.ok){
      const responseData = await response.json()
      this.setState({data:responseData})
    }else{
      console.log(response.statusText)
    }
    }


  renderLoadingView = () => (
    <div className="main-container-loader">
       <div className="products-loader-container">
        <Grid  color="#0b69ff" height="50" width="50" />
       </div>
    </div>
  )

  renderFailureView=()=>(
    <div className="main-container">
      <img
      src="https://res.cloudinary.com/dpglcx4ft/image/upload/v1711465678/No_data-pana_gezvxt.png"
      alt="FailureView"
      className="failure-view"
    />
    <button type="button" onClick={this.getData} className="btn btn-primary">Try Again</button>
    </div>
  )

  noDataView=()=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
    const name = urlParams.get('name')
    return(
      <div className="main-container">
      <h1 className="heading-no-data">No Properties are present</h1>
      <div className="name-role">
          <p>Name: {name}</p>
          <p>Role: {role}</p>
        </div>
      <img src="https://res.cloudinary.com/dpglcx4ft/image/upload/v1711466618/3582365_jfh9co.jpg"
        alt="No Data Found"
        className="No-data-view"/>
      <button className="btn btn-warning m-3" type="button" onClick={this.addNewProperty}> + Add new Property</button>
      <button type="button" onClick={this.onLogout} className="btn btn-primary mt-5">Log Out</button>
    </div>
    )
  }
   

  dataOwnerView=()=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
    const name = urlParams.get('name')
    const {data} = this.state
    const length = data.length
    return(
      <div className="main-container"> 
        <h1>Property List</h1>
        <p>Property Count:{length}</p>
        <div className="name-role">
          <p>Name: {name}</p>
          <p>Role: {role}</p>
        </div>
      <div className="main-buttons">
        <button className="btn btn-warning m-3" type="button" onClick={this.addNewProperty}> + Add new Propety</button>
      </div>
      <div className="card">
        <div className="main-card">
        {data.map((each,index)=>(
          <PropertyItem key = {index} data={each} removeProperty={this.removeProperty} editProperty={this.editProperty}/>
        ))}
        </div>
    </div>
    <button type="button" onClick={this.onLogout} className="btn btn-primary mt-5">Log Out</button>
    </div>
    )
  }


  dataView=()=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
    const name = urlParams.get('name')
    const {data,search} = this.state
    const length = data.length
    
    return(
      <div className="main-container"> 
        <h1>Property List</h1>
        <p>Property Count:{length}</p>
        <div className="name-role">
          <p>Name: {name}</p>
          <p>Role: {role}</p>
        </div>
        <div className="bg-secondary p-3 m-3">
          <p>Search...</p>
          <div className="d-flex flex-row">
            <label htmlFor="location">Location Based</label>  
            <input id="location" className="form-control input" type="text" value={search} onChange={this.onChangeSearch}/>
            <button type="button" className="btn btn-primary m-3" onClick={this.searchData}>Send</button>
            <button type="button" className="btn btn-primary m-3" onClick={this.refreshSearch}>Refresh search</button>
          </div>
        </div>
      <div className="card">
        <div className="main-card">
        {data.map(each=>(
          <ul key={each.id} className="student-card">
            <li>Location: {each.location}</li>
            <li>Owner Name: {each.owner}</li>
            <li>No of Rooms: {each.no_of_rooms}</li>
            <li>Status: {each.property_status}</li>
          </ul>
        ))}
        </div>
    </div>
    <button type="button" onClick={this.onLogout} className="btn btn-primary mt-5">Log Out</button>
    </div>
    )
  }
    

  renderSuccessView=()=>{
    const urlParams = new URLSearchParams(this.props.location.search)
    const role = urlParams.get('role')
    const {data} = this.state
    const length = data.length
    return(<>
    {role==="owner" && <>
      {length===0? <>{this.noDataView()}</>:<>{this.dataOwnerView()}</>}
    </> }
    {role==="buyer" && <>
      {length===0? <>{this.noDataView()}</>:<>{this.dataView()}</>}
    </>}
    </>
    )
  }

  render(){
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }

    }

  }
export default Home;