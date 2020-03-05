import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
import { updateProfile, updateAvatar } from '../http/userService';
import Swal from 'sweetalert2';

export function UserRender({ user, edit, dispatch, projects, comments, avg }) {
  const { role } = useAuth();

  const [estado, setState] = useState({
    company_name: user.company_name,
    company_role: user.company_role,
    page_url: user.page_url,
    description: user.description,
    avatar_url: user.avatar_url === null ? '' : user.avatar_url
  });

  function eOrM(type, edit) {
    if (type === 'M' && edit === 0) {
      return (
        <div>
          <div>
            
            <img
              className="h-24 w-24 rounded-full mx-auto border-4 object-cover border-gold top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
          <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADW0lEQVRIic2WQWhcVRSGv3PvG7KICzdWY6UKDSgUdNOkDRW0CIKCIm7cVFLzJneG4BSNIEV3IjZQsLWpZXInsUrsKqLEqhG1NKK11qaCSAXFuFCa0lUELTOTeXOPi8yUscy8CSLi2Z1z/nf++9977rkP/gOTtGQulyuo6n4AEZmYmpqa/FdJnHP3AjPAw43QgjHmqWKxeKYDfouqTovIkKqeFZGs9/5XAJOygB3ASe/9svd+WVVPhhAGU/AzxphT5XL5FuC0qk43E2kk54BH4zjuj+O4X0QeAb5KwQ9Za1+fnZ29Wq/Xj4rIzq4k3vsvgSPW2s+ttRdVdcl7fy6F5LtarVYYGxu7IYqigqp+3UykHnzTstns3caYReBnYFsjfBF4u6enZ6pWqw2FEOaAn4B7gDPAaPNMupKMjIzcGkXRu8BlVT1cqVSWAHp7ewdCCM8CW4GbjDFPFIvFxXY1ojSCQqHQU6lU3gPe8d4fBMjlctsBGgUXnXP7gT2ZTOZspzppB0+1Wt0rIitNgnw+f0cI4RVVPZDP5zcDeO8ngF+q1eroPyIBhlX1cNMJIRwTkXlgPoRwpAV3CNjTqUjqdgF3ZTKZCy3+n6p6p6rOWWt/bAaTJFmKomhbm++B7kq01QkhTALLxpiXVfXJ67CVTkUi+NtI2AUsGWOGa7WaAr+HELYDiwDGmONRFO1OkuQE8O21lRozAPzQTUlzJGxS1Y9DCN9ba8+LyKVGm67LUh1PkuQU8AXwXAvJuKoe70ayo3UkANHq6mqfqj4A3NZoU0ql0vsikmX9os01duFF4CERudCWgcZlHB0d/QQ4nclkJpMk2aeq95dKpQcBstnszdbaD1V1BTgURdF5gLW1tUFjzDiwSVVPiMgLIjJcr9evWmsHVPWbxmhaV9JY3e4kSS4D9zV8AKanp6/09fXtFJGPgGNJkvyRJMmKiLwkIh8Au0ql0msi8piqvmWMmQkhbAbecM493UldR8vlcgedc893yjvnrjjntgLEcdzvnLt0TUk3i+P4dufcZ6r6DPC4c25LB2jSLrghEmvtjIh8Wi6Xb1TVeeDNdjgRmQAWnHOvWmsXgAMbJgEGr+u+gXagxj/ACPCbMWav9/4obPA9Seu+jdiGlKR13//G/gLauY4L/Z6uKAAAAABJRU5ErkJggg=="/>
            <p className="text-sm text-copy-primary mb-2 ml-2 mt-2">Mentor</p>
          </div>
        </div>
      );
    } else if (type === 'E' && edit === 0) {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full object-cover mx-auto top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACpklEQVRIib1TzUtUURT/nZsLmTbiQJsWETFJhS1mNPoYG+g/KHUhYS1699wZSGyX7aaVLsegmPcemtAicoKKoDaRuAhBcigIlNRFqyCqUVw56D0tUphm3psPCH+7d87v49zz7gVaBDPfbFWjWhUAmDmIkJZRE5JOp48yczxMICJDYT3HcRKO4xxvGLKzsxMF8FZrnaoyOGuMYaXUMWMMM3N3ZV9rnVJKvQHQWe1JQRNprVNE5Hqed4qZLxFRTkQ6iOi9tfa3UqpTRK4AKInIqO/7C8y8LCLG9/35pkL2YYy5ISITRHTbdd0XAKRSa4zpF5EHInLX9/0nYT6hIcycBPBsd3c3NTU1tVZnkJiIzBNRv+u6C0Gc0NtFRDkiGqkXAACu664CGLXW5urxasDM3cy8igbrrJyJmde11meCmoEnIaILRDSHf/9BPYiIzAG4GNRsAwCt9SgR5fYCBq21UaXUzyYD/k6r1A8RiVZ7ua77vA0AfN+fBDC5L2BmB0DNo6oHa+0RAGu+709XegHh6/okIoFHDwMRnReRz61owMzLxpjLzXAdx+lj5pWwfr0rPCYij4aHhw83GCailHoIYKzlENd1XwH40N7ePpPNZgN5e/VpEVn0PO9lmNehoKLWOtXT0/O6VCpdjUQiemtr6/TS0tK7al4sFhsnopMbGxtDyWTyYzweXykWi98ankRr3UtEsyIyUigUytvb2/0ABjKZTFclL5PJdBHRYLlcvlYoFMoicoeIZrXWvdWeNS+amU8opaL5fH6xojaO4J1PeJ53b/8jnU6fs9b+8jxvPYBbH8ycZeZso1oY2lrIGmDm7wDyFbX7/y1ERFaJyBJRB/bWJiLXAXxtRh94u6pRLBa/JBKJTQB9AG4B2ATw2PO8p83oDwR/AGGZFHSh0S2UAAAAAElFTkSuQmCC"/>
            <p className="text-sm text-copy-primary mb-2 ml-2 mt-2">Emprendedor</p>
          </div>
        </div>
      );
    } else if (type === 'E' && edit === 1) {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full object-cover mx-auto top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
            <h1 className="mt-4 text-copy-primary float-left font-semibold">Cambiar foto perfil</h1>
            <input
              type="file"
              name="avatar"
              className="shadow appearance-none bg-background-secondary border border-background-borderf rounded py-2 px-3 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACpklEQVRIib1TzUtUURT/nZsLmTbiQJsWETFJhS1mNPoYG+g/KHUhYS1699wZSGyX7aaVLsegmPcemtAicoKKoDaRuAhBcigIlNRFqyCqUVw56D0tUphm3psPCH+7d87v49zz7gVaBDPfbFWjWhUAmDmIkJZRE5JOp48yczxMICJDYT3HcRKO4xxvGLKzsxMF8FZrnaoyOGuMYaXUMWMMM3N3ZV9rnVJKvQHQWe1JQRNprVNE5Hqed4qZLxFRTkQ6iOi9tfa3UqpTRK4AKInIqO/7C8y8LCLG9/35pkL2YYy5ISITRHTbdd0XAKRSa4zpF5EHInLX9/0nYT6hIcycBPBsd3c3NTU1tVZnkJiIzBNRv+u6C0Gc0NtFRDkiGqkXAACu664CGLXW5urxasDM3cy8igbrrJyJmde11meCmoEnIaILRDSHf/9BPYiIzAG4GNRsAwCt9SgR5fYCBq21UaXUzyYD/k6r1A8RiVZ7ua77vA0AfN+fBDC5L2BmB0DNo6oHa+0RAGu+709XegHh6/okIoFHDwMRnReRz61owMzLxpjLzXAdx+lj5pWwfr0rPCYij4aHhw83GCailHoIYKzlENd1XwH40N7ePpPNZgN5e/VpEVn0PO9lmNehoKLWOtXT0/O6VCpdjUQiemtr6/TS0tK7al4sFhsnopMbGxtDyWTyYzweXykWi98ankRr3UtEsyIyUigUytvb2/0ABjKZTFclL5PJdBHRYLlcvlYoFMoicoeIZrXWvdWeNS+amU8opaL5fH6xojaO4J1PeJ53b/8jnU6fs9b+8jxvPYBbH8ycZeZso1oY2lrIGmDm7wDyFbX7/y1ERFaJyBJRB/bWJiLXAXxtRh94u6pRLBa/JBKJTQB9AG4B2ATw2PO8p83oDwR/AGGZFHSh0S2UAAAAAElFTkSuQmCC"/>
            <p className="text-sm mb-2 text-copy-primary ml-2 mt-2">Emprendedor</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full object-cover mx-auto border-4 border-gold top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
            <h1 className="mt-4 float-left text-copy-primary font-semibold">Cambiar foto perfil</h1>
            <input
              type="file"
              name="avatar"
              className="shadow appearance-none bg-background-secondary border border-background-borderf rounded py-2 px-3 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADW0lEQVRIic2WQWhcVRSGv3PvG7KICzdWY6UKDSgUdNOkDRW0CIKCIm7cVFLzJneG4BSNIEV3IjZQsLWpZXInsUrsKqLEqhG1NKK11qaCSAXFuFCa0lUELTOTeXOPi8yUscy8CSLi2Z1z/nf++9977rkP/gOTtGQulyuo6n4AEZmYmpqa/FdJnHP3AjPAw43QgjHmqWKxeKYDfouqTovIkKqeFZGs9/5XAJOygB3ASe/9svd+WVVPhhAGU/AzxphT5XL5FuC0qk43E2kk54BH4zjuj+O4X0QeAb5KwQ9Za1+fnZ29Wq/Xj4rIzq4k3vsvgSPW2s+ttRdVdcl7fy6F5LtarVYYGxu7IYqigqp+3UykHnzTstns3caYReBnYFsjfBF4u6enZ6pWqw2FEOaAn4B7gDPAaPNMupKMjIzcGkXRu8BlVT1cqVSWAHp7ewdCCM8CW4GbjDFPFIvFxXY1ojSCQqHQU6lU3gPe8d4fBMjlctsBGgUXnXP7gT2ZTOZspzppB0+1Wt0rIitNgnw+f0cI4RVVPZDP5zcDeO8ngF+q1eroPyIBhlX1cNMJIRwTkXlgPoRwpAV3CNjTqUjqdgF3ZTKZCy3+n6p6p6rOWWt/bAaTJFmKomhbm++B7kq01QkhTALLxpiXVfXJ67CVTkUi+NtI2AUsGWOGa7WaAr+HELYDiwDGmONRFO1OkuQE8O21lRozAPzQTUlzJGxS1Y9DCN9ba8+LyKVGm67LUh1PkuQU8AXwXAvJuKoe70ayo3UkANHq6mqfqj4A3NZoU0ql0vsikmX9os01duFF4CERudCWgcZlHB0d/QQ4nclkJpMk2aeq95dKpQcBstnszdbaD1V1BTgURdF5gLW1tUFjzDiwSVVPiMgLIjJcr9evWmsHVPWbxmhaV9JY3e4kSS4D9zV8AKanp6/09fXtFJGPgGNJkvyRJMmKiLwkIh8Au0ql0msi8piqvmWMmQkhbAbecM493UldR8vlcgedc893yjvnrjjntgLEcdzvnLt0TUk3i+P4dufcZ6r6DPC4c25LB2jSLrghEmvtjIh8Wi6Xb1TVeeDNdjgRmQAWnHOvWmsXgAMbJgEGr+u+gXagxj/ACPCbMWav9/4obPA9Seu+jdiGlKR13//G/gLauY4L/Z6uKAAAAABJRU5ErkJggg=="/>
            <p className="text-sm mb-2 text-copy-primary ml-2 mt-2">Mentor</p>
          </div>
        </div>
      );
    }
  }

  function roleE(role) {
    if (role !== null) {
      return (
        <div className="flex flex-wrap">
          <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACyUlEQVRIid3VS2gUWRSA4f9UlR0IBg2KqNGViIIPhBZFDC4cEQfBxyKoZNd23e6JK8GNyDglKIqoIA2dVHVCmBnEF4pbRfGxEF9BUTS4mRlGTMSRCaLOUHaqjptWmthlJ8GNnu0593x1bt26Bd9LSL0CY8wMYAuwGHinqvdF5FwQBK+/CmKM+Qk4AjQCb4EGYALwDjgGHAqC4L96iJWUcF03AxRFpN+yrOVBEDQNDQ1NFJFNqvoY+Bm4n81m0+OaxBgzCfgLeN7Q0JAuFAphdd7zPGtwcHCHqh4AJohIxvf9k2OdZD0wWUR2jQQqSOz7fsG27SXAn6p6wnXdvWNF5gKEYXgraSFAZ2fnH7ZtrwTuiMg+Y8wvo0ZE5A1AY2Nj05cQgDiOW4EFwGvLsi7XqnESkNuqyvDw8DbgcK0az/OcgYGBXaq6H/gb2NjV1fWoZr+kJzTG3AIWq+qaUql0szqXz+eXxXHsA0tU9ZqItAVB8CqpVyKSy+Xmqup1YJqqloDLlmVNVtXNwI/A/6q6p6WlpeB5XpzUBxK2CyAMw2epVOoUsFNE8kBeVatLjowGSJzEGDMHuAAsBO6p6nnLsp4ClqouBLYC84AbURRt7unp+XdMSCaTmek4zl2gSURc3/dPj6yp+hiPAv3Aii9dL58dYcdxeoEpqrquFlBBYt/3C0A7sKiCfYq2trZUIpLL5VYBa4GDI09UrQiC4Kyq/i4i2zs6OmYDuK7b3tzc/DCbzc6qiajqVmA4iqJCPaBqzVHgRRiGluu67SLyK/A+iqJP19HI7VoKPKj3Io0xO40xywG6u7sfAq22ba+sAE/K5fIPvb29/yRNckZEinWAqcBu4OJHCGgFfqsFwCj+jAnQIuAKkBKR46q6JwkYN1KB5gNXgelAv+M4q4vF4otatfZ4kb6+vlfpdPoSMKdcLm8olUovx9vr24kPssEzSfXSrkQAAAAASUVORK5CYII="/>
          <p className="text-left text-copy-primary text-sm mb-2 ml-2 mt-2">{user.company_role}</p>
        </div>
      );
    }
  }

  function companyWork(work) {
    if (work !== null) {
      return (
        <div className="flex flex-wrap">
          <img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png" />
          <p className="text-left text-copy-primary text-sm mb-2 ml-2 mt-2">{user.company_name}</p>
        </div>
      );
    }
  }

  function urlDefinided(url) {
    if (url !== null) {
      return (
        <div className="flex flex-no-wrap">
          <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAB8UlEQVRIie1Tv4sTQRh9b91NbAXFO+HAHykUA9Yi6BWCxeFpYaMIZovZBNZUWoiihbZeFbfJNKkOCwsNWBxanMWBf0ACwhUKJ+QK0ydsdj6bnXVuUU/Lg7xm5+3Mfu/N2+8D5pjjQIMuaTQah4MguEPyMskFETlk90Sko7XuW66UWiXZLgqRmYjskvxUqVTWO53O1O75dtFqterGmHcATudF97oh35b4EoCrjgn7vDedTp8opW5orYeFSBiGx4wxGwBOABiR7AH45hY1xmy5XEQ2Pc9rlpI5KSIhgDMkN+I4vpAkydgHgCAIHuYC20EQXEySZIx9kLsclt/HcbyWpulnALXZbPYAwGMb1/U8gqeugFKqAeDsfoIAvmitewCQJMm42Ww+E5F1EVl1RRZykT3OSN4CsPIPIu8B9CwRkUG+XAR+/fhdAEeyLKsDGDiH37j8bzcpmavnjTAqRESkT/IcyRdxHH+wkdkI/gdRFB0Vkee5WL8QIfkSwF0AtTRNB1EU9Uh+dT82xmzZlgQApdR5z/MuuWdE5BSAEMBxAN99318rRLrd7g+l1LV8FmoAHv1mTu7D6SaSyyLy6g8X2iZ50yZSDKPWethut+uTyeS253lXACyWJn6n5HqH5EdHNAMwEpHNarX62p34OeY44PgJZoPTRvmbtm8AAAAASUVORK5CYII="></img>
          <a href={"https://"+user.page_url} className="text-left text-copy-primary text-sm mb-2 ml-2 mt-2">
            {user.page_url}
          </a>
        </div>
      );
    }
  }

  function descriptionNote(text) {
    if (text !== null) {
      return (
        <div className="">
          <img
            className="mt-4 sm:px-1"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="
          />
          <p
            dangerouslySetInnerHTML={{ __html: text.replace(/<br\s*\\?>/g, '\r\n') }}
            className="break-words sm:px-2 text-copy-primary"
          ></p>
        </div>
      );
    }
  }

  function buttonEdit() {
    if (role.email === user.email) {
      return (
        <span>
          -{' '}
          <button className="text-blue-500" onClick={() => dispatch({ type: 'EDIT', edit: 1 })}>
            Editar Perfil
          </button>
        </span>
      );
    }
  }

  function getTops() {
    if (user.type === 'E') {
      if (projects.length === 0) {
        return (
          <h1 class="font-semibold text-copy-primary text-xl mt-4 mb-2 sm:px-2">
            Proyectos destacados - <span className="text-base font-normal">No hay proyectos</span>
          </h1>
        );
      } else {
        return (
          <div>
            <h1 class="font-semibold text-copy-primary text-xl mt-4 mb-2 sm:px-2">
              Proyectos destacados -{' '}
              <a href={'/projects/' + user.identify} className="text-blue-500 text-base font-normal">
                Ver todos los proyectos
              </a>
            </h1>
            <div className="flex flex-wrap self-end">
              {projects.map((project, index) => (
                <div class="mb-4 w-full sm:w-1/2 sm:px-2 lg:w-full xl:w-1/2">
                  <div class="bg-background-secondary h-full rounded-lg overflow-hidden shadow">
                    <img class="h-32 w-full object-cover object-center" src={project.image_url} alt="" />
                    <div class="p-4 h-full">
                      <a
                        href={'/project/' + project.id}
                        class="block text-copy-primary hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                      >
                        {project.title}
                      </a>
                      <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm break-all">
                        {project.subtitle}
                      </div>
                      <div class="mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else {
      if (comments.length === 0) {
        return (
          <h1 class="font-semibold text-copy-primary text-xl mt-4 mb-2 sm:px-2">
            Comentarios destacados - <span className=" text-base font-normal">No hay comentarios</span>
          </h1>
        );
      } else {
        return (
          <div>
            <h1 class="font-semibold text-copy-primary text-xl mt-4 mb-2 sm:px-2">
              Comentarios destacados - <a className="text-blue-500 text-base font-normal">Ver todos los comentarios</a>
            </h1>
            <div className="flex flex-wrap self-end">
              {comments.map((comment, index) => (
                <div class="mb-4 w-full sm:w-1/2 sm:px-2 lg:w-full xl:w-1/2">
                  <div class="bg-background-secondary h-full rounded-lg overflow-hidden shadow ">
                    <div class="p-4 h-full flex flex-col justify-between">
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.text.replace(/<br\s*\\?>/g, '\r\n') }}
                        class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm break-all"
                      ></div>
                      <div className="mt-2 text-sm leading-relaxed block md:text-xs lg:text-sm break-all self-start">
                        <a className="text-copy-primary" href={'/project/' + comment.project}>
                          En el proyecto: <span className="text-blue-500">{comment.title}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  }

  function onChange(e) {
    setState({ ...estado, [e.target.name]: e.target.value });
  }

  function onChangeHandler(e) {
    setState({ ...estado, [e.target.name]: e.target.files[0] });
  }

  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', estado.avatar);
    let { company_role, company_name, page_url, description } = estado;
    company_role = company_role === '' ? null : company_role;
    company_name = company_name === '' ? null : company_name;
    page_url = page_url === '' ? null : page_url;
    description = description === null ? null : description.replace(/\n/g, '<br />');

    const { email, name, first_name, last_name, type } = user;
    let { birthday } = user;
    birthday = birthday.substring(0, 10);
    let country = 'Tupu';
    let city = 'sadsad';
    let promise1 = updateProfile({
      email,
      name,
      first_name,
      last_name,
      birthday,
      country,
      city,
      company_name,
      company_role,
      page_url,
      type,
      description
    });
    if (typeof data.get('avatar') === 'string') {
      promise1.then(() => (window.location.href = '/user')).catch((error) => {
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
      });;
    } else {
      Promise.all([
        promise1,
        updateAvatar(data).then((response) => localStorage.setItem('currentUser', JSON.stringify(response.data)))
      ]).then(() => (window.location.href = '/user')).catch((error) => {
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
  }

  function something(edit) {
    if (edit === 0) {
      return (
        <div className="min-h-screen">
          <div>
            <Navbar role={role} />
          </div>
          <div className="mt-pefil mt-16 bg-background-primary flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
            <div className="xl:w-1/5 lg:w-1/5"></div>
            <div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
              {eOrM(user.type, 0)}
              <div className="flex flex-wrap">
                <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADDUlEQVRIibWUTWhjVRTHf+e+l34kLXYhKK2gdqeIixkXfmARou7cuPALq6F9uS8piCiKA8KQpd0IUij43muJFqRYF+6GwSmOM4zObBS7FBR0IYJDM2M/SElyjwujhJhk3gM9u3fu/39/95x3z4WMYa19NavHZBFXKpXHgHq5XH70f4M455aAH0RkOYtP0gpXVlam2u32L865J4wxF8fHx+9ZW1v7I403dSWtVutF4MskSfZE5OLJyclzab2pISKyLCIbAKq6kaVlqSCVSuUBYG5/f/88wOzs7DlVnQuC4MH/DOKcW1bV+s7OTgegVqs54GNjTCmN3x+ULJVKM77vT+VyuYJzblpVX/J9/5Fejed5m51O55swDD8xxhy0Wq2jdrt9WK/Xb/TvJ9ba88A8MAUUgGngBnAEHIrIoapeiqLozX6ztfZ9EVlQ1ake/wxw0OP/Ucrl8gsiEqnqmU6ns7W5uXmQpgWjYmlpadrzvEUReU9VrYnjeFtVF0Tkbc/z3q3VapkGdEBILpdbEZEzqlqM43j7n2G01t4OfKaqvzebzdLW1tZR1t0XFxcLExMTdRGZ833/2fX19d+g53ZFUXS90Wg8DdycnJz8OgiCe7MAgiC4K5/Pf2WMOSkUCsW/ATDkWSmXy6+LyDvOueeTJLl8K0AYhguquq2qq3Ecf9C/PrD/XeFZY8xqykJWgbODADBkTgBE5E7gShqCql4B7hi2PvQmOeeKwG5KyC5QzASx1uZF5PTx8fHl/nwYhi9ba/O9+WazeQl4qD8/EqKqjwPf9l7jMAyLwJ6qvgHsdb8B6Oq+6/rSQYwxT4rIBfjrHbPWfqiqHwFvRVF0WlVfU9UNa+2n3flCVXdFZGDLhlVSBHbDMHxmbGxsD6Ddbt8XRdHnAHEcnwPuV9WfgO/DMHwFuMCQ//KvOeme7FdV/UJE7nbOBUmSXB1kBgiC4GFjTKKqP4vIU8BsFEXXR1YiIguAA641Go1TowAASZJcbTQap4BrgOv6R0epVJqpVqvztxQOiGq1Om+tva0//ydodk8SKJ9tPwAAAABJRU5ErkJggg=="/>
                <p className="text-left flex-1 w-full break-normal text-copy-primary text-sm mb-2 ml-2 mt-2">Valoración media: {' '}
                              {(avg.avg === null ? '' : Math.round(avg.avg * 100) / 100) +
                              (avg.avg === null ? 'Sin valoración todavía' : ' / ') +
                              (avg.avg === null ? '' : avg.counter + ' opiniones')}</p>
              </div>
              {roleE(user.company_role)}
              <div className="border-t-2 mt-4 text-left">
                <h1 className="font-bold text-copy-primary text-lg pt-4 pb-2">Más información</h1>
                {companyWork(user.company_name)}
                <div className="flex flex-wrap">
                <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADfElEQVRIid2VQWhcRRjHf/Oem2aTSMmampBNVMQeRCRKoJqUKhaUXryIAaUEY9x9mzQE2UuNqHXRi+m5TXcnGwwKRSl4EqkiJahVaxMptlVC60FsNy2tKaVJDElmPg+Zl75ko7bkpN/l/eeb75vfN+99bwb+L6ZuJaizs7M6Ho9vV0o1A3UisiAiV4Efh4eHz24IkkqlHvd9/w0ReRrY9DdhUyKSt9YeGBkZmb5lSFdXV2VFRcVBoDvivgJMuGc1cA/wKOC7+UvW2t3FYvHYv0Ky2Wx8dnb2S6Ddub4SkX3JZPLrXC5no7G9vb21xpg9wABQAywppZ4tFApH/xGSTqcPK6VedMN3tdZvA7LejiM5DymlvgAagRue5z2Yz+cvhvN3RINTqdTOCOCg1npfWEwQBNuUUs0iMqm1Pp3NZuPz8/OVAPX19ZOlUuk54Dhwp7X2HeCVcF1v1baUesvJy8BeB64PguA74HsROQL8lMlk3p+bmxswxkwbY6anpqae1FqfAD52+S9ks9l4GaSvr+8updQONzyktZ4D8H3/MPBYtBgR6RKRl9e+NqXUR05WzczMPFEGWVxc3MHNTjkKkE6nHxGRnZFFBjzPe1hEPgCa10KMMT9EYu8rg4hIY6gXFhYmnQw7DOB0oVAYzOfzZ2KxWB/w51pIU1PTFcC69RJlEKVUrZN2dHT0OoDneYnI/PlQDw0NzQAr3RNaqVSqDNdUSt1YbyfXQl93d3eN09fDeWvt3aHu6OjwgS1rIUqprRH9SxkEmApFLBa7H8AYczKS1BYEwVMAiUTiVWBzpIAtrtCXnOtaVVXVtyu5oQiCoI7l1vWA17TW+wGVyWROikhrpJhZlo+Vy0C9810CTgHPuPzXtdbvle1Ea31VKXXcDfv6+/s3AeJ53m7g9wikGihZa9uAn52vAdjlij7U2Ni4PxK/0rIAtLa2XgQ6gc3GmJqJiYnPx8fH/2hvbx8xxvwGnAc+sdbuKRaLF1paWj70ff9X4BzwGbBXa10cGxtbdQytd3YdUUo9DyAig8lk8s1cLre0Nu52rAwSBEEVcIybf/kpERmMxWKfutbdOARWjvsDrL5PloAzLHfhnFKqVkQesNZuLxaLF24bElpPT882ERkQkV1AfL0Ya23zhiChuZuyTUTuBeo8z/OttdO+759raGj4ZqPf7L9jfwEdwGEWvKgsCQAAAABJRU5ErkJggg=="/>
                  <p className="text-left text-copy-primary text-sm mb-2 ml-2 mt-2">{user.email}</p>
                </div>
                {urlDefinided(user.page_url)}
              </div>
            </div>
            <div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20 w-full">
              <h1 class="font-bold text-copy-primary text-5xl sm:px-2 break-all mr-0 mr-48-t md:mr-48 lg:mr-0">
                {user.name + ' ' + user.first_name}
              </h1>
              <p className="text-gray-700 sm:px-2">
                Se registró el {user.created_at !== undefined ? user.created_at.substring(8, 10) + "-" + user.created_at.substring(5, 8) + user.created_at.substring(0, 4) : ''} {buttonEdit()}
              </p>
              {descriptionNote(user.description)}
              {getTops()}
            </div>
            <div className="xl:w-1/5 lg:w-1/5"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen">
          <div>
            <Navbar role={role} />
          </div>
          <form onSubmit={onSubmit} noValidate>
            <div className="mt-pefil mt-16 bg-background-primary flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
              <div className="xl:w-1/5 lg:w-1/5"></div>
              <div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
                {eOrM(user.type, 1)}
                <div className="flex flex-wrap">
                  <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADDUlEQVRIibWUTWhjVRTHf+e+l34kLXYhKK2gdqeIixkXfmARou7cuPALq6F9uS8piCiKA8KQpd0IUij43muJFqRYF+6GwSmOM4zObBS7FBR0IYJDM2M/SElyjwujhJhk3gM9u3fu/39/95x3z4WMYa19NavHZBFXKpXHgHq5XH70f4M455aAH0RkOYtP0gpXVlam2u32L865J4wxF8fHx+9ZW1v7I403dSWtVutF4MskSfZE5OLJyclzab2pISKyLCIbAKq6kaVlqSCVSuUBYG5/f/88wOzs7DlVnQuC4MH/DOKcW1bV+s7OTgegVqs54GNjTCmN3x+ULJVKM77vT+VyuYJzblpVX/J9/5Fejed5m51O55swDD8xxhy0Wq2jdrt9WK/Xb/TvJ9ba88A8MAUUgGngBnAEHIrIoapeiqLozX6ztfZ9EVlQ1ake/wxw0OP/Ucrl8gsiEqnqmU6ns7W5uXmQpgWjYmlpadrzvEUReU9VrYnjeFtVF0Tkbc/z3q3VapkGdEBILpdbEZEzqlqM43j7n2G01t4OfKaqvzebzdLW1tZR1t0XFxcLExMTdRGZ833/2fX19d+g53ZFUXS90Wg8DdycnJz8OgiCe7MAgiC4K5/Pf2WMOSkUCsW/ATDkWSmXy6+LyDvOueeTJLl8K0AYhguquq2qq3Ecf9C/PrD/XeFZY8xqykJWgbODADBkTgBE5E7gShqCql4B7hi2PvQmOeeKwG5KyC5QzASx1uZF5PTx8fHl/nwYhi9ba/O9+WazeQl4qD8/EqKqjwPf9l7jMAyLwJ6qvgHsdb8B6Oq+6/rSQYwxT4rIBfjrHbPWfqiqHwFvRVF0WlVfU9UNa+2n3flCVXdFZGDLhlVSBHbDMHxmbGxsD6Ddbt8XRdHnAHEcnwPuV9WfgO/DMHwFuMCQ//KvOeme7FdV/UJE7nbOBUmSXB1kBgiC4GFjTKKqP4vIU8BsFEXXR1YiIguAA641Go1TowAASZJcbTQap4BrgOv6R0epVJqpVqvztxQOiGq1Om+tva0//ydodk8SKJ9tPwAAAABJRU5ErkJggg=="/>
                  <p className="text-left flex-1 w-full break-normal text-copy-primary text-sm mb-2 ml-2 mt-2">Valoración media: {' '}
                                {(avg.avg === null ? '' : Math.round(avg.avg * 100) / 100) +
                                (avg.avg === null ? 'Sin valoración todavía' : ' / ') +
                                (avg.avg === null ? '' : avg.counter + ' opiniones')}</p>
                </div>
                <div className="flex flex-wrap">
                  <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACyUlEQVRIid3VS2gUWRSA4f9UlR0IBg2KqNGViIIPhBZFDC4cEQfBxyKoZNd23e6JK8GNyDglKIqoIA2dVHVCmBnEF4pbRfGxEF9BUTS4mRlGTMSRCaLOUHaqjptWmthlJ8GNnu0593x1bt26Bd9LSL0CY8wMYAuwGHinqvdF5FwQBK+/CmKM+Qk4AjQCb4EGYALwDjgGHAqC4L96iJWUcF03AxRFpN+yrOVBEDQNDQ1NFJFNqvoY+Bm4n81m0+OaxBgzCfgLeN7Q0JAuFAphdd7zPGtwcHCHqh4AJohIxvf9k2OdZD0wWUR2jQQqSOz7fsG27SXAn6p6wnXdvWNF5gKEYXgraSFAZ2fnH7ZtrwTuiMg+Y8wvo0ZE5A1AY2Nj05cQgDiOW4EFwGvLsi7XqnESkNuqyvDw8DbgcK0az/OcgYGBXaq6H/gb2NjV1fWoZr+kJzTG3AIWq+qaUql0szqXz+eXxXHsA0tU9ZqItAVB8CqpVyKSy+Xmqup1YJqqloDLlmVNVtXNwI/A/6q6p6WlpeB5XpzUBxK2CyAMw2epVOoUsFNE8kBeVatLjowGSJzEGDMHuAAsBO6p6nnLsp4ClqouBLYC84AbURRt7unp+XdMSCaTmek4zl2gSURc3/dPj6yp+hiPAv3Aii9dL58dYcdxeoEpqrquFlBBYt/3C0A7sKiCfYq2trZUIpLL5VYBa4GDI09UrQiC4Kyq/i4i2zs6OmYDuK7b3tzc/DCbzc6qiajqVmA4iqJCPaBqzVHgRRiGluu67SLyK/A+iqJP19HI7VoKPKj3Io0xO40xywG6u7sfAq22ba+sAE/K5fIPvb29/yRNckZEinWAqcBu4OJHCGgFfqsFwCj+jAnQIuAKkBKR46q6JwkYN1KB5gNXgelAv+M4q4vF4otatfZ4kb6+vlfpdPoSMKdcLm8olUovx9vr24kPssEzSfXSrkQAAAAASUVORK5CYII="/>
                  <input
                    defaultValue={user.company_role}
                    name="company_role"
                    type="text"
                    className="shadow flex-1 w-full appearance-none bg-background-secondary border border-background-borderf rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Cargo en tú empresa"
                    onChange={onChange}
                  ></input>
                </div>
                <div className="border-t-2 mt-4 text-left">
                  <h1 className="font-bold text-copy-primary text-lg pt-4 pb-2">Más información</h1>
                  <div className="flex flex-wrap">
                    <img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png" />
                    <input
                      defaultValue={user.company_name}
                      name="company_name"
                      type="text"
                      className="shadow flex-1 w-full appearance-none bg-background-secondary border border-background-borderf rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="La empresa en la que trabajas"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="flex flex-wrap">
                    <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADfElEQVRIid2VQWhcRRjHf/Oem2aTSMmampBNVMQeRCRKoJqUKhaUXryIAaUEY9x9mzQE2UuNqHXRi+m5TXcnGwwKRSl4EqkiJahVaxMptlVC60FsNy2tKaVJDElmPg+Zl75ko7bkpN/l/eeb75vfN+99bwb+L6ZuJaizs7M6Ho9vV0o1A3UisiAiV4Efh4eHz24IkkqlHvd9/w0ReRrY9DdhUyKSt9YeGBkZmb5lSFdXV2VFRcVBoDvivgJMuGc1cA/wKOC7+UvW2t3FYvHYv0Ky2Wx8dnb2S6Ddub4SkX3JZPLrXC5no7G9vb21xpg9wABQAywppZ4tFApH/xGSTqcPK6VedMN3tdZvA7LejiM5DymlvgAagRue5z2Yz+cvhvN3RINTqdTOCOCg1npfWEwQBNuUUs0iMqm1Pp3NZuPz8/OVAPX19ZOlUuk54Dhwp7X2HeCVcF1v1baUesvJy8BeB64PguA74HsROQL8lMlk3p+bmxswxkwbY6anpqae1FqfAD52+S9ks9l4GaSvr+8updQONzyktZ4D8H3/MPBYtBgR6RKRl9e+NqXUR05WzczMPFEGWVxc3MHNTjkKkE6nHxGRnZFFBjzPe1hEPgCa10KMMT9EYu8rg4hIY6gXFhYmnQw7DOB0oVAYzOfzZ2KxWB/w51pIU1PTFcC69RJlEKVUrZN2dHT0OoDneYnI/PlQDw0NzQAr3RNaqVSqDNdUSt1YbyfXQl93d3eN09fDeWvt3aHu6OjwgS1rIUqprRH9SxkEmApFLBa7H8AYczKS1BYEwVMAiUTiVWBzpIAtrtCXnOtaVVXVtyu5oQiCoI7l1vWA17TW+wGVyWROikhrpJhZlo+Vy0C9810CTgHPuPzXtdbvle1Ea31VKXXcDfv6+/s3AeJ53m7g9wikGihZa9uAn52vAdjlij7U2Ni4PxK/0rIAtLa2XgQ6gc3GmJqJiYnPx8fH/2hvbx8xxvwGnAc+sdbuKRaLF1paWj70ff9X4BzwGbBXa10cGxtbdQytd3YdUUo9DyAig8lk8s1cLre0Nu52rAwSBEEVcIybf/kpERmMxWKfutbdOARWjvsDrL5PloAzLHfhnFKqVkQesNZuLxaLF24bElpPT882ERkQkV1AfL0Ya23zhiChuZuyTUTuBeo8z/OttdO+759raGj4ZqPf7L9jfwEdwGEWvKgsCQAAAABJRU5ErkJggg=="/>
                    <p className="text-left text-copy-primary text-sm mb-2 ml-2 mt-2">{user.email}</p>
                  </div>
                  <div className="flex flex-no-wrap">
                  <img className="self-center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAB8UlEQVRIie1Tv4sTQRh9b91NbAXFO+HAHykUA9Yi6BWCxeFpYaMIZovZBNZUWoiihbZeFbfJNKkOCwsNWBxanMWBf0ACwhUKJ+QK0ydsdj6bnXVuUU/Lg7xm5+3Mfu/N2+8D5pjjQIMuaTQah4MguEPyMskFETlk90Sko7XuW66UWiXZLgqRmYjskvxUqVTWO53O1O75dtFqterGmHcATudF97oh35b4EoCrjgn7vDedTp8opW5orYeFSBiGx4wxGwBOABiR7AH45hY1xmy5XEQ2Pc9rlpI5KSIhgDMkN+I4vpAkydgHgCAIHuYC20EQXEySZIx9kLsclt/HcbyWpulnALXZbPYAwGMb1/U8gqeugFKqAeDsfoIAvmitewCQJMm42Ww+E5F1EVl1RRZykT3OSN4CsPIPIu8B9CwRkUG+XAR+/fhdAEeyLKsDGDiH37j8bzcpmavnjTAqRESkT/IcyRdxHH+wkdkI/gdRFB0Vkee5WL8QIfkSwF0AtTRNB1EU9Uh+dT82xmzZlgQApdR5z/MuuWdE5BSAEMBxAN99318rRLrd7g+l1LV8FmoAHv1mTu7D6SaSyyLy6g8X2iZ50yZSDKPWethut+uTyeS253lXACyWJn6n5HqH5EdHNAMwEpHNarX62p34OeY44PgJZoPTRvmbtm8AAAAASUVORK5CYII="/>
                    <input
                      defaultValue={user.page_url}
                      name="page_url"
                      type="text"
                      className="shadow flex-1 w-full appearance-none bg-background-secondary border border-background-borderf rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Web url de la empresa"
                      onChange={onChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20 w-full">
                <h1 class="font-bold text-copy-primary text-5xl break-all mr-0 mr-48-t md:mr-48 lg:mr-0">
                  {user.name + ' ' + user.first_name}
                </h1>
                <p className="text-gray-700">
                  Se registró en {user.created_at !== undefined ? user.created_at.substring(8, 10) + "-" + user.created_at.substring(5, 8) + user.created_at.substring(0, 4) : ''}
                </p>
                <img
                  className="mt-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="
                />
                <h1 className="font-semibold text-copy-primary mb-2">Acerca de</h1>
                <textarea
                  defaultValue={user.description === null ? '' : user.description.replace(/<br\s*\/?>/gm, '\n')}
                  className="resize-none shadow appearance-none bg-background-secondary text-copy-primary border border-background-borderf rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="text"
                  rows="6"
                  type="text"
                  name="description"
                  placeholder=""
                  onChange={onChange}
                ></textarea>
                <div className="mt-2">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 mr-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="text-blue-500 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => dispatch({ type: 'EDIT', edit: 0 })}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              <div className="xl:w-1/5 lg:w-1/5"></div>
            </div>
          </form>
        </div>
      );
    }
  }

  return <div>{something(edit)}</div>;
}
