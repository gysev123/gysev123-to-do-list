const List = document.getElementById("list");
const newList = document.createElement("li");
const button = document.getElementById("agree");
const editbtn = document.getElementById("edit");
const data = localStorage.getItem("note");
const notes = data ? JSON.parse(data) : [];

button.onclick = function () {
  addNote();
};

function clear() {
  localStorage.clear();
}

function addNote() {
  const textPole = document.getElementById("text").value;
  if (textPole.length == 0) {
    return;
  }

  notes.push({
    title: textPole,
    completed: false,
  });

  document.getElementById("text").value = "";
  editbtn.innerHTML = "";
  render();
}

function render() {
  localStorage.setItem("note", JSON.stringify(notes));
  List.innerHTML = "";
  if (notes.length == 0) {
    List.innerHTML = `<p class="warning">пусто</p>`;
  }
  for (let i = 0; i < notes.length; i++) {
    List.insertAdjacentHTML("afterbegin", createList(notes[i], i));
  }
}

function createList(notes, index) {
  let spanClass = notes.completed ? "valueListC" : "valueList";
  let item = notes.completed ? "itemtrue" : "itemfalse";
  return `
          <li class="${item}">
            <span class="${spanClass}">${notes.title}</span>
              <span class="buttonList">
                <span class="editList" data-index="${index}" data-type="edit">1</span>
                <span class="succesList" data-index="${index}" data-type="toggle">2</span>
                <span class="deleteList" data-index="${index}"  data-type="remove">3</span>
            </span>
          </li>`;
}

List.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type == "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type == "remove") {
      button.style.display = "block";
      editbtn.innerHTML = "";
      notes.splice(index, 1);
      document.getElementById("text").value = "";
    } else if (type == "edit") {
      button.style.display = "none";
      editNote(index);
      document.getElementById("text").value = notes[index].title;
    }

    render();
  }
};

function editNote(index) {
  editbtn.innerHTML = `<button data-index="${index}" data-type="editBtn" class="btnEdit">отредактировать</button>
  <button data-index="${index}" data-type="editBtnClose" class="btnEditClose">Х</button>`;
}

editbtn.onclick = function (event) {
  const textPole = document.getElementById("text").value;
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type == "editBtn") {
      notes[index].title = textPole;
      editbtn.innerHTML = "";
      button.style.display = "block";
      document.getElementById("text").value = "";
    } else if (type == "editBtnClose") {
      editbtn.innerHTML = "";
      document.getElementById("text").value = "";
      button.style.display = "block";
    }
  }
  render();
};

render();
