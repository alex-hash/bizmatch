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
      users: null,
      theme: localStorage.getItem('theme'),
    };
    if(this.state.theme === 'theme-dark'){
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    }
    
  }

  logout() {
    localStorage.removeItem('currentUser');
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
        localStorage.removeItem('currentUser');
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

  role(user){
    if(user.type==="E"){
      return(
        <div className="block h-10 w-10 rounded-full overflow-hidden mx-4 my-2">
          <img className="h-full w-full object-cover" src={user.avatar_url} alt="Your avatar" />
        </div>
      );
    }else{
      return(
        <div className="block h-10 w-10 rounded-full overflow-hidden mx-4 my-2 border-2 border-gold">
          <img className="h-full w-full object-cover" src={user.avatar_url} alt="Your avatar" />
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
            <h1 className="italic px-4 py-2">No hay coincidencias</h1>
          </div>
        );
      }else{
        return(
          <div>
            <h1 className="font-semibold px-4 py-2">Proyectos</h1>
            {this.state.projects.map((project) => (
              <a href={"/project/"+project.id} className="hover:bg-indigo-500 hover:text-white">
                <p className="block px-4 py-2 text-copy-primary">{project.title}</p>
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
          <div className="border-t-2 border-gray-200">
            <h1 className="font-semibold px-4 py-2">Usuarios</h1>
            <h1 className="italic px-4 py-2 text-copy-primary">No hay coincidencias</h1>
          </div>
        );
      }else{
        return(
          <div className="border-t-2 border-gray-200">
            <h1 className="font-semibold px-4 py-2">Usuarios</h1>
            {this.state.users.map((user) => (
              <a href={"/user/"+user.identify} className="flex hover:bg-indigo-500 hover:text-white">
                {this.role(user)}
                <p className="block py-2 self-center text-copy-primary">{user.name + " " + user.first_name}</p>
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
        <div className="flex-1">
            <div className="">
              <input
                type="text"
                id="inputsearch"
                onKeyUp={() => this.handleKeyPress()}
                className="z-10 block w-full bg-background-secondary text-copy-primary border-background-borderf border-2 rounded form-input"
                placeholder="Buscar"
              >
              </input>
              {this.renderButtonDropSearch()}
              <div
                id="dropdown2"
                className="z-20 hidden absolute mt-2 py-2 w-5/6 md:w-2/3 bg-background-secondary text-copy-primary border-background-borderf rounded-lg shadow-xl"
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
        <div className="flex flex-wrap">
          <Link className="self-center  text-copy-primary font-bold py-2 px-4 border-b-0 rounded link" onClick={() => this.changeTheme()}>
              {this.changeMode()}
          </Link>
          <Link to="/login" className="self-center mr-2 text-copy-primary font-bold py-2 px-4 border-b-0 rounded link">
            Login
          </Link>
          <Link to="/register" className="self-center  text-copy-primary font-bold py-2 px-4 border-b-0 rounded link">
            Registro
          </Link>
        </div>
      );
    } else if (this.state.user.role === 'E') {
      return (
        <div className="flex flex-wrap items-center">
          <div className="flex flex-wrap">
            <button id="mode" className="self-end py-2 px-4 hidden sm:inline" onClick={() => this.changeTheme()}>
              {this.changeMode()}
            </button>
            <Link
              to="/projects"
              className="hidden sm:inline relative mr-4 text-copy-primary font-bold py-2 px-4 border-b-0 rounded"
            >
              Proyectos
            </Link>
            <Link
              to="/create-project"
              className="hidden sm:inline relative mr-4 text-copy-primary font-bold py-2 px-4 border-b-0 rounded"
            >
              Crea tú proyecto
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => this.enableDrop(true)}
              className="relative z-10 block h-10 w-10 rounded-full overflow-hidden ml-4"
            >
              <img className="h-full w-full object-cover" src={this.state.user.avatar_url} alt="Your avatar" />
            </button>
            {this.renderButtonDrop()}
            <div
              id="dropdown"
              className="z-20 hidden absolute right-0 mt-2 py-2 w-48 bg-background-primary rounded-lg py-2 shadow-xl"
            >
              <a href="/user" className="block px-4 py-2 text-copy-primary hover:bg-indigo-500 hover:text-white">
                Perfil
              </a>
              <a
                href="/projects"
                className="block sm:hidden px-4 py-2 text-copy-primary hover:bg-indigo-500 hover:text-white"
              >
                Proyectos
              </a>
              <a
                href="/create-project"
                className="block sm:hidden px-4 py-2 text-copy-primary text hover:bg-indigo-500 hover:text-white"
              >
                Crea tú proyecto
              </a>
              <a className="block px-4 py-2 sm:hidden hover:bg-indigo-500 hover:text-white flex flex-wrap justify-between" onClick={() => this.changeTheme()}>
                  <p className="text-copy-primary">Cambiar modo</p>
                  {this.changeMode()}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-copy-primary hover:bg-indigo-500 hover:text-white"
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
            <button id="mode" className="self-end py-2 px-4 hidden sm:inline" onClick={() => this.changeTheme()}>
              {this.changeMode()}
            </button>
            <Link
              to="/projects"
              className="hidden sm:inline relative mr-4 text-copy-primary font-bold py-2 px-4 border-b-0 rounded"
            >
              Proyectos
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => this.enableDrop(true)}
              className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-gold "
            >
              <img className="h-full w-full object-cover" src={this.state.user.avatar_url} alt="Your avatar" />
            </button>
            {this.renderButtonDrop()}
            <div
              id="dropdown"
              className="z-20 hidden absolute right-0 mt-2 py-2 w-48 bg-background-primary rounded-lg py-2 shadow-xl"
            >
              <a href="/user" className="block px-4 py-2 text-copy-primary hover:bg-indigo-500 hover:text-white">
                Perfil
              </a>
              <a
                href="/projects"
                className="block sm:hidden px-4 py-2 text-copy-primary hover:bg-indigo-500 hover:text-white"
              >
                Proyectos
              </a>
              <a className="block px-4 py-2 sm:hidden hover:bg-indigo-500 hover:text-white flex flex-wrap justify-between" onClick={() => this.changeTheme()}>
                  <p className="text-copy-primary">Cambiar modo</p>
                  {this.changeMode()}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-copy-primary hover:bg-indigo-500 hover:text-white"
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

  renderLink(){
    if(this.state.user === null){
      return(
        <div className="inline sm:inline xl:hidden lg:hidden md:hidden ">
        <Link to="/" className="relative flex flex-wrap">
            <button>
              {this.changeIcons()}
            </button>
            <h1 className="hidden md:inline font-semibold text-copy-primary self-center pl-2 pr-4">Bizmatch</h1>
          </Link>
        </div>
      );
    }
  }

  changeTheme(){
    if(this.state.theme === 'theme-light'){
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      this.setState({ theme: 'theme-dark' });
      localStorage.setItem('theme', 'theme-dark');
    }else{
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      this.setState({ theme: 'theme-light' });
      localStorage.setItem('theme', 'theme-light');
    }
  }

  changeIcons(){
    if(document.body.classList.contains('theme-light')){
      return(
        <img src="https://img.icons8.com/ios/40/000000/business-network.png" />
      );
    }else{
      return(
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAD80lEQVRYhc2Yz29VRRTHv6dFahFtEA0xGgKNhUQEmvCrGlyYGBcuMKKAbqQbCSsXmjRaQjAGTFiqrNDgRgn+BdhK7MJIUNFEakxURIIINlZIUXxA6/u4mPPS4fa+d1/fva/0JDf3vZlzvt8zd87MOTPSLBcrCgjokPSY//3czMaKws4twAbgApPyO7DuVvslSQIMOA1cBJ4FngP+AH4CCpuhPA4+7F/ttajtdW9bkRe/JYdjbUCfpC+8qSvqXubv40Af0NYoT6PObfZpBfgaGPDfnwLH/Pcn3ofrbp4Jx7qBISe9APQCLcA84F1g1J93gHbv640W0BDQndeJOcCyeFqARcBB4D+gBOwD5k8Dc77blBzjILAo6m8DuoA5WUDPA5d8tNeAfo+hMaAMfAwsaWTgjr/EMcqO2Qfsci6ce1s149XADeA74JUorgBOAhsbdSyFa6NjVuSoc55yH1amGb3hykv9/1zCfvYV0PBqr+Fki2NfBG7ztk73YU9FLyauNv+jZlbOIFsJHHGyv6kjizjmqEK6rWzolfdUX4BVwAQwDLxK2DIAXsxwrseDfwL4BhgH/gU+AO7MsN3uHIPO+b3jrKpmsA0YcaOrwG4y0hXwGXAZ3z6Ax4H9vhAOZdiac1x1zhFgay0bAetceWdNxUn9MeDDlPZjwNk6MXY655TQSAv+cuKdJeOS7khpH5NUb4qrylnE6rwi6b6U9sWS/skLXoSDCyURb0VAq8LXWJAXvAgH35bUI+mJqO1JSeslHSgA/2YB1njA7qhTv52Qon4D7vbnPKFouL1OjB3OuSbZl/sLmllJ0j5JD0ha6s/9kt4ys2t58XM7SKian1aIucv+lCU9wy2uqDuAw5KGJT0qqd/MzpjZGUm7JD0iaRj4CLgrr6MxceZG7RlgyPUOA10pOg+6c7hu1YxUa6O2hOILCqvyXkklSfslvWlmJPQ2SDoh6aSk92oPWS9JWiupx8y+TA5U0h5JfZLaJf0p6WUzO5I2itWEaveUJ+5BH9X2FN1NTF82peD0et+Acw6TKBYsUt6rEDudZvYrMFfSOUnfmtlTKeAP+ajrkZKZ/ZCCcVRSt6TFZjYOdEr6RdJeM9st3Vx3TVQBvwdoSdaEaYTTEULmWaj0enCqL4R68AaT9eBgND3NLvnjKb5OWsnvhluBv9zoOuGGoNmHpn7ngpB9tmSBtALLCbdVlbZmHzs7nLO1oZFHQLUO7gcIOfkS4RA/j2Yc3Ot0tNrVx2AUuwPM9NVHwsm2KD4B3o/6DnlbJc5m9vIo4WhTr99yCyEv/0w45G/xZwT4kdlwgSlJwHqmXgGvLQK7GZfoKFyiXykKe1bL/3u1gNKY1SZ9AAAAAElFTkSuQmCC"/>
      );
    }
  }

  changeMode(){
    if(document.body.classList.contains('theme-light')){
      return(
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABkElEQVRIibXVvUuVcRQH8E9hQTQoDVo46J4uQrTU0FCQQktugQpiq/9BL4sEbVF7L7TV1lRL0GoWjYUuCpVB+QalXr0Nv3NJ4vfUfX7WgcuB5/uc7/fc85wX/rMdqPn+IZzFSXSjgSXM4c1+EunBXXxDs+K3gJES8jGsB8kmnuM6rmIan/eI3K5LfjMCG/EPevZgh/E48GVMoaMO+WQEr+JiBn8Q+CxO1ExcP35gG+cz+GiQv0dXXXJ4FAQzGewIPmEHp0rIu7CFFXRm8IkQf9IO2cHMs2Gp359J9f/dLoV/WCowGP5lRcxQ+FelAr3hlypijmNDGroigd3wVWuk+QesLYGP4XszGGlyj+JYqcC78OcqYl6HP9OOQM46pZ2zIj9E41KZnpYKkFqwiVsZrDVouzhdKtCH79KquJDBL0cCH7T5LXI24deyG87g9wOfU90Qf7VrUikauKd6XX+R7kOtdd2yK1gLoi28wA3/6OC0rBt38FX1yZyXOZl1j36H1P8DUrm2sSgd/Ldlue/TfgL+BmlukUhkUwAAAABJRU5ErkJggg=="></img>
      );
    }else{
      return(
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABNUlEQVRIidWVQUoDQRBFf+sQA3oCTTToHZSZCxgEceMtIugiuMkBou69i0sV3OsNXHiCGFy48LmpkDAzPT2dUdAPBU1X1f+/6Olp6S8BWAVWYnqiiiVdWNRGEinQjqwvTgAkwE4sEbALrAUFJG1KegKyktyzRZ48k/RovbXcZMCbR2Tp2nxjCgxtvQ3cAA8W10DXckMgjSLPCR0BU4p4B/pLEy84LyNfFOlUcYTuwZmk9Yr8htV4kZjTtqSB5vfixTl3J2k/YECSDozjVNKe7X1IunXOfc0moAbRz8O+lhDGTQS6dpA+TICtplP0PSIT4LAJcQpc2roDXAH3FuOZc+Cc2IvGb/4qgJ6vATgBjitEenUEWr5CYASMKoy18vuFB8c59ynpNeik2FfaE/uiTWOF/z++AeW6eTUXfMOVAAAAAElFTkSuQmCC"/>
      );
    }
  }

  render() {
    return (
      <nav className="bg-background-primary md:bg-transparent lg:bg-transparent xl:bg-transparent flex flex-wrap justify-between items-center p-4 h-16 md:h-20 lg:mx-16">
        {this.renderLink()}
        <div className="block hidden xl:inline lg:inline md:inline">
          <Link to="/" className="relative flex flex-wrap">
            <button>
              {this.changeIcons()}
            </button>
            <h1 className="hidden md:inline text-copy-primary font-semibold self-center pl-2 pr-4">Bizmatch</h1>
          </Link>
        </div>
        {this.renderSearch()}
        {this.renderButtons()}
      </nav>
    );
  }
}

export default App;
