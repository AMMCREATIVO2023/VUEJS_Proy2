import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import App from '@/App.vue'
import SeguidorGitHub from '@/components/SeguidorGitHub.vue'

// Importar paquete fetch para Node: fetch no está incluido en Node.
// Dado que el test se ejecuta en Node y no en el navegador,
// si no se importa no funcionará.
import {fetch, Headers} from 'cross-fetch';

// Se añaden las funciones 'fetch' y 'Headers' para que funcione la aplicación
// (que utiliza ambas funciones) en el entorno de test en Node.
if (!global.fetch) {
  global.fetch = fetch;
  global.Headers = Headers;
}

// Función auxiliar para crear un temporizador de espera
function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('App', () => {
  it('Comprueba que muestra cuadro de alerta (.alert) con usuario incorrecto (1 punto)', async () => {
    // Usuario para comprobar
    var testuser = 'notexists9873184';
    var wrapper = shallowMount(App);

    // Control de selección de usuario
    expect(wrapper.contains('input'), 'Debe aparecer un campo input para introducir el usuario a buscar.').to.be.true;
    var userInput = wrapper.get('input');

    // Comprobar usuario incorrecto
    userInput.setValue(testuser);
    // Pulsar la tecla ENTER
    userInput.trigger('keydown.enter');
    await timeout(2000); //Esperar un segundo para que se complete la petición

    // Comprobar que aparece etiqueta de error
    expect(wrapper.contains('.alert'), 'Debe aparecer etiqueta de error (.alert) si el usuario no existe en GitHub.').to.be.true;

    // Comprobar que NO aparece componente GitHubRepo
    expect(wrapper.contains(SeguidorGitHub), 'No debe aparecer el componente SeguidorGitHub si el usuario no existe en GitHub.').to.be.false;

  })

  it('Comprueba que muestra lista de seguidores con usuario correcto (2 puntos)', async () => {
    // Usuario para comprobar
    var testuser = 'vuejs';
    var wrapper = shallowMount(App);

    // Control de selección de usuario
    var userInput = wrapper.get('input');

    // Comprobar usuario correcto
    userInput.setValue(testuser);
    userInput.trigger('keydown.enter');
    await timeout(2000); //Esperar un segundo para que se complete la petición

    // Comprobar que NO aparece etiqueta de error
    expect(wrapper.contains('.alert'),'No debe aparecer mensaje de error con usuario correcto.').to.be.false;

    // Comprobar que aparece componente GitHubRepo
    expect(wrapper.contains(SeguidorGitHub), 'Debe aparecer un componente SeguidorGitHub si el usuario existe en GitHub.').to.be.true;

  })
})

describe('Componente SeguidorGitHub', () => {
  it('Comprueba que se muestran los datos de un seguidor de test (4 puntos)', async () => {
    // Seguidor fake
    var seguidorTest = {
      login: "loginTest",
      avatar_url: "url_imagen",
      html_url: "urlGitHubTest"
    };

    // Montar componente estableciendo su prop
    var wrapper = mount(SeguidorGitHub, {
      propsData: {
        seguidor: seguidorTest
      }
    });

    // Comprobar que aparece el componente 'card'
    expect(wrapper.contains('.card'), 'Debe aparecer un componente card de Bootstrap para mostrar los datos del seguidor.').to.be.true;

    // Comprobar que aparece el título de la 'card'
    expect(wrapper.contains('.card .card-body h5.card-title'), 'Debe aparecer el título del componente card.').to.be.true;
    expect(wrapper.get('.card .card-body h5.card-title').text(), 'El título de la tarjeta debe mostrar el login del seguidor.').to.equal(seguidorTest.login);

    // Comprobar que aparece la imagen del avatar
    expect(wrapper.contains('.card img.card-img-top'), 'Debe aparecer una imagen en la tarjeta.').to.be.true;
    expect(wrapper.get('.card img.card-img-top').attributes('src')).to.equal(seguidorTest.avatar_url, 'La imagen debe mostrar el avatar del seguidor.');

    // Comprobar que aparece el enlace para visitar la URL del seguidor en GitHub
    expect(wrapper.contains('.card .card-body a.btn.btn-primary'), 'Debe aparecer un enlace para acceder a la URL del usuario a través de la API de GitHub.').to.be.true;
    expect(wrapper.get('.card .card-body a.btn.btn-primary').attributes('href')).to.equal(seguidorTest.html_url, 'El enlace debe apuntar a la URL de GitHub del seguidor.');

  })
})
