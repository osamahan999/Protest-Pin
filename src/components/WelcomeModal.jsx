import '../style/modal.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom/Route';
import Map from './Map'


export default function WelcomeModal(props){

        return (


            <>


{ (localStorage.getItem("loggedIn") == "false") ?
    <>
        <Map />
            {/* {console.log(localStorage.getItem("loggedIn"))} */}
            {/* { !localStorage.getItem("loggedIn") ?  */}
            {/* < Redirect from="/welcome" to="/"/> */}
            <div className='overlay'>

            <div id='modal' className='modal'>
                <img src="pexels-markus-spiske-protest.jpg" ></img>
                <header id="modal-header">Welcome to Protest Pin</header>
                <p id="desc">To get started, login or sign up.</p>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
            </div>
            </div>
        </>
            
    


            : <Redirect from="/welcome" to="/" /> }

    
           
        </>
        );

}

