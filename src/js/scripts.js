const mainShow = document.querySelector(".mainShow");
const form = document.forms["Form"];
const formLogin = document.forms["loginForm"];
const buttonOut = document.getElementById("signOut");
const loginWrapper = document.querySelector(".loginWrapper");
const formWrapper = document.querySelector(".formSection");
const listOperatoriaSideBarButton = document.getElementById("operatoria");
const listOrthoSideBarButton = document.getElementById("ortho");
const formButtonSidebar = document.getElementById("formButton");

buttonOut.addEventListener("click", signOut);
listOperatoriaSideBarButton.addEventListener("click", changePageListOpe);
listOrthoSideBarButton.addEventListener("click", changePageListOrtho);
formButtonSidebar.addEventListener("click", changePageForm);

formLogin.addEventListener("submit", function handleFormSubmit(event) {
  event.preventDefault();

  const mail = formLogin["mail"].value;
  const password = formLogin["password"].value;
  return loginUser(mail, password);
});

////////// Valid data /////////////////////////
function stateUser() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      mainShow.style.display = "block";
      listWrapper.style.display = "none";
      listWrapperOrt.style.display = "none";
      loginWrapper.style.display = "none";
      buttonOut.style.display = "block";
      showDataBase(user);
      showDataBaseOrt(user);
    } else {
      mainShow.style.display = "none";
      loginWrapper.style.display = "flex";
      buttonOut.style.display = "none";

      console.log("no hay usuario");
    }
  });
}
///////////login user login out /////////////////
function loginUser(mail, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(mail, password)
    .then(function(user) {
      return showForm(user);
    })
    .catch(function(error) {
      console.log(error);
      swal({
        title: "Error al entrar, constraseña invalida😭",
        icon: "error",
        button: "listo"
      });
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Signed Out");
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}

//////// show form /////////
function showForm(user) {
  console.log(user);

  if (form) {
    form.addEventListener("submit", formulario);
  }

  function formulario(event) {
    event.preventDefault();
    const name = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const number = document.getElementById("number");
    const mail = document.getElementById("mail");
    const direction = document.getElementById("direction");
    const type = document.getElementById("type");

    const data = {
      name: name.value,
      lastName: lastName.value,
      number: number.value,
      mail: mail.value,
      id: id.value,
      direction: direction.value,
      type: type.value
    };
    saveFormulario(data, user);
    form.reset();
  }
  ///////// save data  /////
  function saveFormulario(data, user) {
    let type = "";
    if (data.type === "paciente de Ortodoncia") {
      type = "expediente-ortodoncia";
    } else {
      type = "expediente";
    }
    firebase
      .database()
      .ref(type)
      .push(data)
      .then(function() {
        showDataBase(user);
        showDataBaseOrt(user);
        swal({
          title: "Contacto guardado 😎",
          icon: "success",
          button: "listo"
        });
      })
      .catch(function() {
        swal({
          title: "Error, contacte al chino negro 👲🏼",
          icon: "error",
          button: "listo"
        });
      });
  }
}
stateUser();

////////// side bar /////////

function changePageListOpe() {
  formWrapper.style.display = "none";
  listWrapper.style.display = "block";
  listWrapperOrt.style.display = "none";
}
function changePageListOrtho() {
  formWrapper.style.display = "none";
  listWrapper.style.display = "none";
  listWrapperOrt.style.display = "block";
}
function changePageForm() {
  formWrapper.style.display = "flex";
  listWrapper.style.display = "none";
  listWrapperOrt.style.display = "none";
}
