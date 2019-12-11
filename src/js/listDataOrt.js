const listWrapperOrt = document.getElementById("listWrapperOrt");

////// show data base2 ///////////
function showDataBaseOrt(user) {
  if (user) {
    firebase
      .database()
      .ref("expediente-ortodoncia")
      .once("value")
      .then(snap => {
        console.log(snap.val());

        var datos = Object.values(snap.val());

        datos.forEach(element => {
          const div = document.createElement("div");
          const name = document.createElement("h3");
          const number = document.createElement("p");
          const mail = document.createElement("p");
          const id = document.createElement("p");
          const direction = document.createElement("p");
          const type = document.createElement("p");
          const iconEdit = document.createElement("li");
          const iconDelete = document.createElement("li");

          iconDelete.className = "fas fa-trash-alt or";
          iconEdit.className = "far fa-edit or";
          name.innerHTML = `${element.name} ${element.lastName}`;
          number.innerHTML = `<b>Número de telefono: </b> ${element.number}`;
          mail.innerHTML = `<b> Correo electrónico: </b> ${element.mail}`;
          id.innerHTML = `<b> Número de cedula:</b> ${element.id}`;
          direction.innerHTML = `<b> Dirección: </b> ${element.direction}`;
          type.innerHTML = ` ${element.type.toUpperCase()}`;
          div.className = "item";
          listWrapperOrt.appendChild(div);
          div.appendChild(name);
          div.appendChild(number);
          div.appendChild(mail);
          div.appendChild(id);
          div.appendChild(direction);
          div.appendChild(type);
          div.appendChild(iconEdit);
          div.appendChild(iconDelete);

          // console.log(element.name, element.lastName, element.id);
        });
        const deletee = document.querySelectorAll(".fa-trash-alt.or");
        deletee.forEach(node => {
          node.addEventListener("click", () => {});
        });
      });
  }
}
