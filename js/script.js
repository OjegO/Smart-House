const   btns = document.querySelectorAll('.read-more');

const change = e => {
    let id = (e.target.id);
    const btn = document.getElementById(id);
    const str = btn.lastElementChild;
    str.src = 'img/sm-yellowStr.svg';
};
const changeOff = e => {
    let id = (e.target.id);
    const btn = document.getElementById(id);
    const str = btn.lastElementChild;
    str.src = 'img/sm-srt.svg';
};

for (let btn of btns) {
    btn.addEventListener('mouseenter', change);
    btn.addEventListener('mouseleave', changeOff);
}