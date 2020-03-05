import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.role === undefined ? null : this.props.role,
      navOpen: false
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
            <button className="flex">
              <img src="https://img.icons8.com/ios/40/000000/business-network.png" />
            </button>
          </Link>
        </div>
        <div className="block hidden xl:inline lg:inline md:inline ">
          <Link to="/" className="flex relative">
            <button className="flex">
              <img src="https://img.icons8.com/ios/40/000000/business-network.png" />
            </button>
            <p className="text-2xl pl-4 p-1">Bizmatch</p>
          </Link>
        </div>
        {this.renderButtons()}
      </nav>
    );
  }
}

export default App;
