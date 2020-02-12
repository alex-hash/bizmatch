import React from 'react';
import Sidebar from 'react-sidebar';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
 
const mql = window.matchMedia(`(min-width: 8000px)`);
const _isMounted  = false;

if (document.getElementById('sidebar') !== null) {
  window.onload = () => (document.getElementById('sidebar').style.position = 'fixed');
}

function logout(){
  window.localStorage.clear();
}
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    if (_isMounted === false) {
      mql.addListener(this.mediaQueryChanged);
    }
  }

  changeStyle(button) {
    const childs = document.getElementsByClassName(button)[0].children;
    if (childs[0].classList.contains('hidden')) {
      for (let element of childs) {
        element.classList.replace('hidden', 'nothing');
        element.classList.replace('absolute', 'nothing1');
      }
    } else {
      for (let element of childs) {
        element.classList.replace('nothing', 'hidden');
        element.classList.replace('nothing1', 'absolute');
        element.classList.add('text-black');
      }
    }
  }

  enableScrolling() {
    document.getElementById('sidebar').style.position = 'fixed';
  }

  componentWillUnmount() {
    if (this._isMounted === true) {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
    this.enableScrolling();
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <div className="mt-5 flex flex-row flex-wrap justify-center">
            <Link to="/user">
              <button className="block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-600">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                  alt="Your avatar"
                />
              </button>
            </Link>
            <div className="w-screen">
              <div className="mt-2 py-2">
                <hr className="style1" />
                <button
                  onClick={() => this.changeStyle('project')}
                  className="project w-full px-4 py-2 text-white hover:bg-orange-800"
                >
                  Projectos ▼
                  <a
                    href="/projects"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Todos los temas
                  </a>
                  <a
                    href="/projects/arte"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Arte
                  </a>
                  <a
                    href="/projects/artesanías"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Artesanías
                  </a>
                  <a
                    href="/projects/cine"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Cine
                  </a>
                  <a
                    href="/projects/cómics"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Cómics
                  </a>
                  <a
                    href="/projects/danza"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Danza
                  </a>
                  <a
                    href="/projects/diseño"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Diseño
                  </a>
                  <a
                    href="/projects/fotografía"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Fotografía
                  </a>
                  <a
                    href="/projects/juegos"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Juegos
                  </a>
                  <a
                    href="/projects/moda"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Moda
                  </a>
                  <a
                    href="/projects/música"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Música
                  </a>
                  <a
                    href="/projects/periodismo"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Periodismo
                  </a>
                  <a
                    href="/projects/publicaciones"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Publicaciones
                  </a>
                  <a
                    href="/projects/teatro"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Teatro
                  </a>
                  <a
                    href="/projects/tecnología"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Tecnología
                  </a>
                </button>
                <hr className="style1"/>
                <button onClick={() => this.changeStyle('configuration')} className="configuration w-full px-4 py-2 text-white hover:bg-orange-800">Configuración ▼
                  <a href="/user" className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black ">Perfil</a>
                  <Link to="/login" onClick={() => logout()} className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black ">Cerrar sesión</Link>
                </button>
                <hr className="style1" />
              </div>
            </div>
          </div>
        }
        open={this.state.sidebarOpen}
        sidebarId="sidebar"
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: '#276749', width: '200px', position: 'fixed' } }}
      >
      <nav onClick={() => this.enableScrolling()} className="bg-white md:bg-transparent lg:bg-transparent xl:bg-transparent flex items-center justify-between flex-wrap p-4 h-16" >
        <div className="block xl:hidden lg:hidden md:hidden">
          <button onClick={() => this.onSetSidebarOpen(true)}>
          <img className src="https://img.icons8.com/ios/40/000000/business-network.png"/>
          </button>
        </div>
        <div className="block hidden xl:inline lg:inline md:inline">
          <button>
          <img className src="https://img.icons8.com/ios/40/000000/business-network.png"/>
          </button>
        </div>
        <div>
          <Link to="/login" className="relative mr-4 text-black font-bold py-2 px-4 border-b-0 rounded link">Login</Link>
          <Link to="/register" className="relative text-black font-bold py-2 px-4 border-b-0 rounded link">Registro</Link>
        </div>
       
      </nav>
      </Sidebar>
    );
  }
}

export default App;
