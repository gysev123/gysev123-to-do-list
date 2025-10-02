const List = document.getElementById("list");
const newList = document.createElement("li");
const button = document.getElementById("agree");
const editbtn = document.getElementById("edit");
const notes = [];

button.onclick = function () {
  addNote();
};

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
  return `
          <li>
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
      editbtn.innerHTML = "";
      notes.splice(index, 1);
    } else if (type == "edit") {
      editNote(index);
      document.getElementById("text").value = notes[index].title;
    }

    render();
  }
};

function editNote(index) {
  editbtn.innerHTML = `<button data-index="${index}" data-type="editBtn" class="btnEdit">отредактировать</button>`;
}

editbtn.onclick = function (event) {
  const textPole = document.getElementById("text").value;
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type == "editBtn") {
      notes[index].title = textPole;
      editbtn.innerHTML = "";
      document.getElementById("text").value = "";
    }
  }
  render();
};

render();
