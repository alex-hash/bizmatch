import React from 'react';
import Sidebar from 'react-sidebar';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import jwt_decode from 'jwt-decode';

function logout(){
  window.localStorage.clear();
}
 
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: (this.props.role === undefined ? null : this.props.role)
    };
  }

  enableScrolling() {
    document.getElementById('sidebar').style.position = 'fixed';
  }


  renderButtons(){
    if(this.state.user === null){
      return(
        <div>
          <Link to="/login" className="relative mr-4 text-black font-bold py-2 px-4 border-b-0 rounded link">Login</Link>
          <Link to="/register" className="relative text-black font-bold py-2 px-4 border-b-0 rounded link">Registro</Link>
        </div>
      );
    }else{
      return(
        <div>
          <Link to="/user">
            <button className="block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                alt="Your avatar"
              />
            </button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="bg-white md:bg-transparent lg:bg-transparent xl:bg-transparent flex flex-wrap justify-between items-center p-4 h-16" >
        <div className="block xl:hidden lg:hidden md:hidden">
          <Link to="/" className="relative">
            <button>
              <img className src="https://img.icons8.com/ios/40/000000/business-network.png"/>
            </button>
          </Link>
        </div>
        <div className="block hidden xl:inline lg:inline md:inline">
          <Link to="/" className="relative">
            <button>
              <img className src="https://img.icons8.com/ios/40/000000/business-network.png"/>
            </button>
          </Link>
        </div>
        {this.renderButtons()}
       
      </nav>
    );
  }
}

export default App;
