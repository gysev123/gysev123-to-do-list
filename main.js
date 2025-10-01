const List = document.getElementById("list");
const newList = document.createElement("li");
const button = document.getElementById("agree");
const notes = [
  { title: "1234", completed: false },
  { title: "1234", completed: false },
];

button.onclick = function () {
  addList();
};

function addList() {
  const textPole = document.getElementById("text").value;
  if (textPole.length === 0) {
    return;
  }

  const newNote = {
    title: textPole,
    completed: false,
  };
  notes.push(newNote);
  render();
}

function render() {
  List.innerHTML = "";
  if (notes.length == 0) {
    List.innerHTML = `<p>пусто</p>`;
  }
  for (let i = 0; i <= notes.length; i++) {
    List.insertAdjacentHTML("afterbegin", createList(notes[i], i));
  }
}

function createList(notes, index) {
  console.log(notes.completed);
  return `
          <li>
            <span class="${notes.completed ? "valueListC" : "valueList"}">${
    notes.title
  }</span>
              <span class="buttonList">
                <span class="editList">1</span>
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
      notes.splice(index, 1);
    }

    render();
  }
};

render();
