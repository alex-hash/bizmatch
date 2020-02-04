import React from "react";
import Sidebar from "react-sidebar";
 
const mql = window.matchMedia(`(min-width: 1024px)`);
 
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
 
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  changeStyle(button) {
    const childs = document.getElementsByClassName(button)[0].children;
    if(childs[0].classList.contains('hidden')){
      for(let element of childs){
        element.classList.replace('hidden', 'nothing');
        element.classList.replace('absolute', 'nothing1');
      }
    }else{
      for(let element of childs){
        element.classList.replace('nothing', 'hidden');
        element.classList.replace('nothing1', 'absolute');
        element.classList.add('text-black')
      }
    }
    
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
 
  render() {
    return (
      <Sidebar
        sidebar={
          <div className="mt-5 flex flex-row flex-wrap justify-center">
            <button class="block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
              <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" alt="Your avatar"/>
            </button>
            <div className="w-screen">
              <div class="mt-2 py-2">
                <button href="#" class="w-full px-4 py-2 text-center text-white hover:bg-orange-800">Proyectos</button>
                <hr className="style1"/>
                <button onClick={() => this.changeStyle('forum')} class="forum w-full px-4 py-2 text-white hover:bg-orange-800">Foro ▼
                  <a href="#" class="hidden absolute identifier block px-4 py-2 text-center text-white hover:text-black ">Start-ups</a>
                  <a href="#" class="hidden absolute identifier block px-4 py-2 text-center text-white hover:text-black ">Diseño Ux</a>
                  <a href="#" class="hidden absolute identifier block px-4 py-2 text-center text-white hover:text-black ">Redes móviles</a>
                  <a href="#" class="hidden absolute identifier block px-4 py-2 text-center text-white hover:text-black ">Robótica</a>
                </button>
                <hr className="style1"/>
                <button onClick={() => this.changeStyle('configuration')} class="configuration w-full px-4 py-2 text-white hover:bg-orange-800">Configuración ▼
                  <a href="#" class="hidden absolute identifier block px-4 py-2 text-center text-white hover:text-black ">Perfil</a>
                  <a href="#" class="hidden absolute identifier block px-4 py-2 text-center text-white hover:text-black ">Cerrar sesión</a>
                </button>
                <hr className="style1"/>
              </div>
            </div>
          </div>
        }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "#276749", width: '200px' } }}
      >
      <nav class="lg:hidden xl:hidden flex items-center justify-between flex-wrap bg-green-800 p-4" >
        <div class="block lg:hidden">
          <button onClick={() => this.onSetSidebarOpen(true)} class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
      </nav>
      </Sidebar>
    );
  }
}
 
export default App;