import  { useState }  from "react"
import Cookies from 'js-cookie'
import './index.css'
import  { useHistory }  from "react-router-dom";

const LoginForm =()=>{
    const [name, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setSubmitError] = useState(false);

    const onChangeUsername = (event) => {
      setUsername(event.target.value);
      setSubmitError(false)
    }

    const onChangeRole = (event) => {
      setRole(event.target.value);
      setSubmitError(false)
    }

    const history = useHistory()
    
    const onNavToSignUp=()=>{
      history.push('/sign-up')
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
            const details={name,role}
            const url = `https://property-selling-marketplace-backend.onrender.com/login`
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
              <p>LogIn Form</p>
              <div className="card">
                  <form className="form" onSubmit={onSubmitForm}>
                    <div>
                    <label htmlFor="name" className="text-sm label">Name</label>
                      <input id="name"type="text" className="form-control" value={name} onChange={onChangeUsername}/>
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
              <div >
                    <p>Does'nt have an account?</p>
                    <button type="button" className="btn btn-warning" onClick={onNavToSignUp}>Sign up</button>
                  </div>
            </div>
        )
    }

export default LoginForm;