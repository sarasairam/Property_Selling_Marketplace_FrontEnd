import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './index.css'

const NotFound = () => {
  const history = useHistory();
  const onClickHome = ()=>{
    history.replace("/login")
  }
 return(
 <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <p>Use below button to navigate to Login Page</p>
    <button type="button" className="btn btn-primary" onClick={onClickHome}>Login Page</button>
  </div>
)}

export default NotFound