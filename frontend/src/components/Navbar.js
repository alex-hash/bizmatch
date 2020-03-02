import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectsSearch } from '../http/projectService';
import { getSearchUsers } from '../http/userService';
import Swal from 'sweetalert2';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.role === undefined ? null : this.props.role,
      navOpen: false,
      navOpenSearch: false,
      projects: null,
      users: null
    };
  }

  logout() {
    window.localStorage.clear();
    window.location.href = '/login';
  }

  enableScrolling() {
    document.getElementById('sidebar').style.position = 'fixed';
  }

  enableDrop(param) {
    if (param) {
      document.getElementById('dropdown').classList.remove('hidden');
      document.getElementById('dropdown').classList.add('block');
      this.setState({ navOpen: true });
    } else {
      document.getElementById('dropdown').classList.remove('block');
      document.getElementById('dropdown').classList.add('hidden');
      this.setState({ navOpen: false });
    }
  }

  enableDropSearch(param) {
    if (param) {
      document.getElementById('dropdown2').classList.remove('hidden');
      document.getElementById('dropdown2').classList.add('block');
      this.setState({ navOpenSearch: true });
    } else {
      document.getElementById('dropdown2').classList.remove('block');
      document.getElementById('dropdown2').classList.add('hidden');
      this.setState({ navOpenSearch: false });
    }
  }

  renderButtonDrop() {
    if (this.state.navOpen === true) {
      return (
        <button
          onClick={() => this.enableDrop(false)}
          tabIndex="-1"
          className="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default"
        ></button>
      );
    }
  }

  renderButtonDropSearch() {
    if (this.state.navOpenSearch === true) {
      return (
        <button
          onClick={() => this.enableDropSearch(false)}
          tabIndex="-1"
          className="fixed inset-0 w-full h-full bg-transparent cursor-default"
        ></button>
      );
    }
  }

  handleKeyPress(){
    this.enableDropSearch(true);
    const patron = document.getElementById("inputsearch").value;
    let users = getSearchUsers(patron);
    let projects = getProjectsSearch(patron);
    Promise.all([users, projects])
    .then((response) => this.setState({ projects: response[1].data, users: response[0].data}))
    .catch((error) => {
      if (error.response.status === 401) {
        window.localStorage.clear();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tú token de sesión ha expirado'
        }).then(() => {
          window.location.href = '/';
        });
      } else if (error.response.status === 400) {
        window.location.href = '/404';
      }
    });
  }

  role(type){
    if(type==="E"){
      return(
        <div className="block h-10 w-10 rounded-full overflow-hidden mx-4 my-2">
          <img className="h-full w-full object-cover" src={this.state.user.avatar_url} alt="Your avatar" />
        </div>
      );
    }else{
      return(
        <div className="block h-10 w-10 rounded-full overflow-hidden mx-4 my-2 border-2 border-gold">
          <img className="h-full w-full object-cover" src={this.state.user.avatar_url} alt="Your avatar" />
        </div>
      );
    }
  }

  handleProjects(){
    if(this.state.projects === null){
      
    }else{
      if(this.state.projects.length === 0){
        return(
          <div>
            <h1 className="font-semibold px-4 py-2">Proyectos</h1>
            <hr className="border-1"/>
            <h1 className="italic px-4 py-2">No hay coincidencias</h1>
          </div>
        );
      }else{
        return(
          <div>
            <h1 className="font-semibold px-4 py-2">Proyectos</h1>
            <hr className="border-1"/>
            {this.state.projects.map((project) => (
              <a href={"/project/"+project.id} className="flex flex-wrap hover:bg-indigo-500 hover:text-white">
                <p className="block px-4 py-2 text-gray-800">{project.title}</p>
                <p className="self-center text-gray-800">{project.avg}</p>
              </a>
            ))}
          </div>
        );
      }
    }
  }

  handleUsers(){
    if(this.state.users === null){
    }else{
      if(this.state.users.length === 0){
        return(
          <div className="border-t-2 border-gray-700">
            <h1 className="font-semibold px-4 py-2">Usuarios</h1>
            <hr className="border-1"/>
            <h1 className="italic px-4 py-2">No hay coincidencias</h1>
          </div>
        );
      }else{
        return(
          <div className="border-t-2 border-gray-700">
            <h1 className="font-semibold px-4 py-2">Usuarios</h1>
            <hr className="border-1"/>
            {this.state.users.map((user) => (
              <a href={"/user/"+user.identify} className="flex hover:bg-indigo-500 hover:text-white">
                {this.role(user.type)}
                <p  className="block py-2 self-center text-gray-800">{user.name + " " + user.first_name}</p>
              </a>
            ))}
          </div>
        );
      }
    }
  }

  renderSearch() {
    if(this.state.user !== null){
      return (
        <div>
            <div className="">
              <input
                type="text"
                id="inputsearch"
                onKeyUp={() => this.handleKeyPress()}
                className="z-10 block overflow-hidden w-128 border-gray-400 border-2 rounded form-input"
                placeholder="Buscar"
              >
              </input>
              {this.renderButtonDropSearch()}
              <div
                id="dropdown2"
                className="z-20 hidden absolute mt-2 py-2 w-128 bg-white rounded-lg shadow-xl"
              >
              {this.handleProjects()}
              {this.handleUsers()}
              </div>
            </div>
        </div>
      )
    }
  }

  renderButtons() {
    if (this.state.user === null) {
      return (
        <div>
          <Link to="/login" className="relative mr-4 text-black font-bold py-2 px-4 border-b-0 rounded link">
            Login
          </Link>
          <Link to="/register" className="relative text-black font-bold py-2 px-4 border-b-0 rounded link">
            Registro
          </Link>
        </div>
      );
    } else if (this.state.user.role === 'E') {
      return (
        <div className="flex flex-wrap items-center">
          <div className="flex flex-wrap">
            <Link
              to="/projects"
              className="hidden sm:inline relative mr-4 text-black font-bold py-2 px-4 border-b-0 rounded"
            >
              Proyectos
            </Link>
            <Link
              to="/create-project"
              className="hidden sm:inline relative mr-4 text-black font-bold py-2 px-4 border-b-0 rounded"
            >
              Crea tú proyecto
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => this.enableDrop(true)}
              className="relative z-10 block h-10 w-10 rounded-full overflow-hidden"
            >
              <img className="h-full w-full object-cover" src={this.state.user.avatar_url} alt="Your avatar" />
            </button>
            {this.renderButtonDrop()}
            <div
              id="dropdown"
              className="z-20 hidden absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg py-2 shadow-xl"
            >
              <a href="/user" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                Perfil
              </a>
              <a
                href="/projects"
                className="block sm:hidden px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Proyectos
              </a>
              <a
                href="/create-project"
                className="block sm:hidden px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Crea tú proyecto
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                onClick={() => this.logout()}
              >
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      );
    } else if (this.state.user.role === 'M') {
      return (
        <div className="flex flex-wrap items-center">
          <div className="flex flex-wrap">
            <Link
              to="/projects"
              className="hidden sm:inline relative mr-4 text-black font-bold py-2 px-4 border-b-0 rounded"
            >
              Proyectos
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => this.enableDrop(true)}
              className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-gold"
            >
              <img className="h-full w-full object-cover" src={this.state.user.avatar_url} alt="Your avatar" />
            </button>
            {this.renderButtonDrop()}
            <div
              id="dropdown"
              className="z-20 hidden absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg py-2 shadow-xl"
            >
              <a href="/user" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                Perfil
              </a>
              <a
                href="/projects"
                className="block sm:hidden px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Proyectos
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                onClick={() => this.logout()}
              >
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="bg-white md:bg-transparent lg:bg-transparent xl:bg-transparent flex flex-wrap justify-between items-center p-4 h-16 md:h-20">
        <div className="block xl:hidden lg:hidden md:hidden">
          <Link to="/" className="relative">
            <button>
              <img src="https://img.icons8.com/ios/40/000000/business-network.png" />
            </button>
          </Link>
        </div>
        <div className="block hidden xl:inline lg:inline md:inline">
          <Link to="/" className="relative">
            <button>
              <img src="https://img.icons8.com/ios/40/000000/business-network.png" />
            </button>
          </Link>
        </div>
        {this.renderSearch()}
        {this.renderButtons()}
      </nav>
    );
  }
}

export default App;
