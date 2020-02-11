import React from 'react';
import Sidebar from 'react-sidebar';
import { Link, useHistory } from 'react-router-dom';

const mql = window.matchMedia(`(min-width: 1024px)`);
const _isMounted = false;

if (document.getElementById('sidebar') !== null) {
  window.onload = () => (document.getElementById('sidebar').style.position = 'fixed');
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
                <hr className="style1" />
                <button
                  onClick={() => this.changeStyle('forum')}
                  className="forum w-full px-4 py-2 text-white hover:bg-orange-800"
                >
                  Foro ▼
                  <a
                    href="/"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Todos los temas
                  </a>
                  <a
                    href="/forums/arte"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Arte
                  </a>
                  <a
                    href="/forums/artesanías"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Artesanías
                  </a>
                  <a
                    href="/forums/cine"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Cine
                  </a>
                  <a
                    href="/forums/cómics"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Cómics
                  </a>
                  <a
                    href="/forums/danza"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Danza
                  </a>
                  <a
                    href="/forums/diseño"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Diseño
                  </a>
                  <a
                    href="/forums/fotografía"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Fotografía
                  </a>
                  <a
                    href="/forums/juegos"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Juegos
                  </a>
                  <a
                    href="/forums/moda"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Moda
                  </a>
                  <a
                    href="/forums/música"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Música
                  </a>
                  <a
                    href="/forums/periodismo"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Periodismo
                  </a>
                  <a
                    href="/forums/publicaciones"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Publicaciones
                  </a>
                  <a
                    href="/forums/teatro"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Teatro
                  </a>
                  <a
                    href="/forums/tecnología"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Tecnología
                  </a>
                </button>
                <hr className="style1" />
                <button
                  onClick={() => this.changeStyle('configuration')}
                  className="configuration w-full px-4 py-2 text-white hover:bg-orange-800"
                >
                  Configuración ▼
                  <a
                    href="#"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Perfil
                  </a>
                  <a
                    href="#"
                    className="hidden relative identifier block px-4 py-2 text-center text-white hover:text-black "
                  >
                    Cerrar sesión
                  </a>
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
        <nav
          onClick={() => this.enableScrolling()}
          className="lg:hidden xl:hidden flex items-center justify-between flex-wrap bg-green-800 p-4"
        >
          <div className="block lg:hidden">
            <button
              onClick={() => this.onSetSidebarOpen(true)}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </nav>
      </Sidebar>
    );
  }
}

export default App;
