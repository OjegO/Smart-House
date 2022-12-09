const   room = document.querySelector('#room-img').lastElementChild,
        btns = document.querySelector('.rooms').children,
        grafic = document.querySelector('#grafic'),
        form = document.querySelector('#form'),
        taskInput = document.querySelector('#taskInput'),
        addBtn = document.querySelector('#addBtn'),
        gadgetsList = document.querySelector('.list'),
        h = document.querySelector('h1'),
        p = h.nextElementSibling;


//Data Base for devices
const deviceDB = {
    livingRoom: [],
    kitchen: [],
    bathRoom: [],
    bedRoom: [],
};
//HTML for Empty List
const empty = `
    <li class="emptyList">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список пристроїв пустий</div>
    </li>
`;

//Event Listeners
for(let i = 0; i < btns.length-1; i++) {
    btns[i].addEventListener('mouseenter', change);
    btns[i].addEventListener('mouseleave', changeOff);
    btns[i].addEventListener('click', menuOpen);
}
form.addEventListener('submit', addDevice);
addBtn.addEventListener('click', addDevice);
gadgetsList.addEventListener('click', cleanItems);
btns[4].addEventListener('click', downloadDB);

//Get ID
function getID(e) {
    let id = (e.target.id);  // Get ID of Element
    return id;
}

//Changing hose img
function change(e) {
    room.src = `img/rooms/${getID(e)}.webp`;    
}
function changeOff() {
    room.src = 'img/rooms/house.webp';
}

//Open Menu
let i = 1;
function menuOpen(e) {
    e.preventDefault();
    i++;
    grafic.lastElementChild.classList.toggle('none'); //Hide house img
    //Open menu
    if (i % 2 == 0) {
       grafic.firstElementChild.classList.remove('none'); //Show menu
       document.getElementById(getID(e)).classList.add('selected'); //Adding class to room buton
       changeText(e); //Change 'h1, p' text
       hideButton(); //Hide room button
       
    } else {
        saveDevice(e); //Save data to DB
        showButton(); //Show button
        h.textContent = 'Продовжимо';
        p.textContent = 'Виберіть кімнату, щоб встановити розумні прилади.';
        grafic.firstElementChild.classList.add('none'); //Hide menu
        gadgetsList.innerHTML = ""; //Clear gadgets list in menu
        gadgetsList.insertAdjacentHTML('beforeend', empty); //Add empty icon to menu
    } 

    if(i > 4 && i < 6){
        showDownload();
    } 
}



function addDevice(event) {
    event.preventDefault();

    const device = taskInput.value;
    const newHTML = `
        <li style="display: flex; justify-content: space-between;">
            <div class="text">${device}</div>
            <img src="img/cross.svg" id="clean" alt="Done" width="18" height="18">
        </li>
    `;
    gadgetsList.insertAdjacentHTML('beforeend', newHTML); 
    cleanEmpty(); 
    cleanInput();
}

function cleanEmpty() {
    if (gadgetsList.children.length > 1){
        gadgetsList.firstElementChild.classList.add('none');
    } else {
        gadgetsList.firstElementChild.classList.remove('none');

    }
}

function cleanInput() {
    taskInput.value = "";
    taskInput.focus();
}

function cleanItems(e) {
    if(e.target.id === 'clean'){
        e.target.parentElement.remove();
        cleanEmpty();
        taskInput.focus();
    }
}


function saveDevice(e) {
    const btn =  getID(e);
    const text = document.querySelectorAll('.text');
    let i = 0;
    for (let element of text) {
        deviceDB[btn][i] = element.outerText;
        i++;
        
    }
}

function changeText(e) {
    if (getID(e) == 'livingRoom') {
        h.textContent = 'Вітальня';
        p.textContent = 'Введіть назву розумного приладу';
    } else if (getID(e) == 'kitchen') {
        h.textContent = 'Кухня';
        p.textContent = 'Введіть назву розумного приладу';
    } else if (getID(e) == 'bathRoom') {
        h.textContent = 'Ванна кімната';
        p.textContent = 'Введіть назву розумного приладу';
    } else if (getID(e) == 'bedRoom') {
        h.textContent = 'Спальня';
        p.textContent = 'Введіть назву розумного приладу';
    }
}

function hideButton () {
    for (let button of btns) {
        if (button.classList[0] === 'selected') {
            continue;
        } else {
            //button.removeEventListener('click');
            button.classList.add('hide');
        }
        
    }
}

function showButton (e) {
    for (let button of btns) {
        if (button.classList[0] === 'selected') {
            button.classList.remove('selected');
        } else {
            button.classList.remove('hide');
        }  
    } 
}

function showDownload() {
    btns[4].classList.remove('none');
}

function convert() {
    let arr = [];
    let i = 0;
    for(let e of deviceDB.livingRoom) {
        arr[i] = e;
        i++;
    }
    for(let e of deviceDB.kitchen) {
        arr[i] = e;
        i++;
    }
    for(let e of deviceDB.bathRoom) {
        arr[i] = e;
        i++;
    }
    for(let e of deviceDB.bedRoom) {
        arr[i] = e;
        i++;
    }

    return arr;
}

function downloadDB() {
    const btn = btns[4].firstElementChild;
    btn.download = 'List.txt';
    
    let blob = new Blob([convert()], {type: 'octet-stream'});
    btn.href = URL.createObjectURL(blob);

    btn.click();
    
    setTimeout( function() {
        URL.revokeObjectURL(btn.href);
    }, 2000);
    console.log(btn);
}
    

    
