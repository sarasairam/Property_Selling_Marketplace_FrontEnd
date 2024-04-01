import  { useState }  from "react"
import Cookies from 'js-cookie'
import './index.css'
import  { useHistory }  from "react-router-dom";

const SignUpForm =()=>{
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setSubmitError] = useState(false);

    const onChangeUsername = (event) => {
      setUsername(event.target.value);
      setSubmitError(false)
    }
    const onChangePhoneNumber = (event) => {
      setphoneNumber(event.target.value);
    }

    const onChangeEmail = (event) => {
      setEmail(event.target.value);
    }

    const onChangeRole = (event) => {
      setRole(event.target.value);
      setSubmitError(false)
    }
  

    const history = useHistory()
    
    const onNavToLogin=()=>{
      history.push('/login')
    }

    const onSubmitSuccess = () => {
      const token = "habdbvjhbecbjbjcbb"
      Cookies.set("cookie", token, {
        expires: 30,
        path: "/",
      });
        history.push(`/?role=${role}&name=${name}`)
      };
    
      const onSubmitFailure = (errorMsg) => {
        setSubmitError(true)
        setErrorMsg(errorMsg)
      };

    const onSubmitForm = async (event) => {
            event.preventDefault();
            const details={name,phoneNumber,email,role}
            const url = `https://property-selling-marketplace-backend.onrender.com/sign-up`
            const options = {
              method: 'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify(details)}
            const response = await fetch(url,options)
            if(response.ok){
              const responseData = await response.json()  
              if(responseData===true){
                onSubmitSuccess()
              }else{
                onSubmitFailure(responseData)
              }
            }else{
              onSubmitFailure('Please try again')
            }
          };
    

        return(
            <div className="Main-container">
              <p>SignUp Form</p>
              <div className="card">
                  <form className="form" onSubmit={onSubmitForm}>
                    <div>
                    <label htmlFor="name" className="text-sm label">Name</label>
                      <input id="name"type="text" className="form-control" value={name} onChange={onChangeUsername}/>
                    </div>
                    <div>
                    <label htmlFor="phone" className="text-sm label">Phone Number</label>
                      <input id="phone"type="text" className="form-control" value={phoneNumber} onChange={onChangePhoneNumber}/>
                    </div>
                    <div>
                    <label htmlFor="email" className="text-sm label">Email</label>
                      <input id="email"type="email" className="form-control" value={email} onChange={onChangeEmail}/>
                    </div>
                    <div>
                    <label className="text-sm label">Select Role:</label>
                    <div className="radio-arrange">
                    <div>
                      <label htmlFor="owner" className="text-sm label-role">Owner</label>
                      <input id="owner" className="role-input" name = "role" type="radio" value="owner" onChange={onChangeRole}/>
                    </div>
                    <div>
                      <label htmlFor="buyerwner" className="text-sm label-role">Buyer</label>
                      <input id="buyer" className="role-input" name="role" type="radio" value="buyer" onChange={onChangeRole}/>
                    </div>  
                    </div>       
                    </div>
                    <button type="submit" className="m-3 btn btn-primary submit-button">Submit</button>
                    {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                  </form>
              </div>
              <div>
                    <p>Already have an account?</p>
                    <button type="button" className="btn btn-warning" onClick={onNavToLogin}>Login</button>
                  </div>
            </div>
        )
    }

export default SignUpForm;