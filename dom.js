/* dom.js */

let output1 = document.getElementById("q1")

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModifyBtn();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advancedAddBtn');
    element.addEventListener('click', ()=>{
        advancedAdd()
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });
}

function walk() {
   let el;

   output1.value = ''

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);

}

function advancedWalk(){
    const root = document.documentElement;
    const DOMtree = traverseFrom(root, 0);
    output1.value = DOMtree; 
}

function traverseFrom(el, level) {
    let prefix = '';
    for (let i = 0; i < level; i++) {
      prefix += '---|';
    }

    const nodeName = el.nodeName;
    let DOMtree = `${prefix}${nodeName}`;

    for (const childNode of el.childNodes) {
      DOMtree += `\n${traverseFrom(childNode, level + 1)}`;
    }

    return DOMtree;
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    output1.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`
    // alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModifyBtn(){
    let h1 = document.querySelector("h1");
    h1.innerHTML = "DOM Manipulation is Fun!"

    let i = Math.floor(Math.random() * 6) + 1;
    h1.style.color = `var(--darkcolor${i})`

    const ps = document.querySelectorAll("p");
    for (const p of ps){
        p.classList.toggle("shmancy")
    }
}



function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advancedAdd(){
    const timestamp = new Date().toLocaleString();
    const output = document.getElementById("output3")
    output.textContent = ''
    const type = document.getElementById("type").value; 
    const tag = document.getElementById("tag").value.toLowerCase(); 
    const content = document.getElementById("content").value; 
    // console.log(tag)
    let newElement;
    if (type == "Text Node"){
        newElement = document.createTextNode("New Text Node " + timestamp);
    } else if (type == "Comment"){
        newElement = document.createComment("New Comment " + timestamp);
    } else if (type == "Element"){
        if (tag){
            newElement = document.createElement(tag);
            newElement.textContent = "New Element "  + timestamp;
        }
    }

    if (newElement){
        output.appendChild(newElement);
        newElement.textContent = content + " " + timestamp;
    } else{
        output.innerText = "Invalid input"
    }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete(){
    let toDelete = document.body.lastChild;
    let democontrol = document.getElementById("controls");
    while (toDelete != null){
       
        console.log(toDelete)
        let previousSibling = toDelete.previousSibling
        if (toDelete !== democontrol){
            document.body.removeChild(toDelete)
        }
        toDelete = previousSibling;
    }
}

window.addEventListener('DOMContentLoaded', init);