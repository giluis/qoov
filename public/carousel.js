const state = {};
const carouselList = document.querySelector(".carousel__list");

const carouselItems = document.querySelectorAll(".carousel__item");
const elems = Array.from(carouselItems);



carouselList.addEventListener('click', function (event) {
    let boundingrect = carouselList.getBoundingClientRect();
    const rect_len = Math.abs(boundingrect.right - boundingrect.left);
    if (event.clientX < rect_len*0.30) {
        moveAll(1)
    } else if (event.clientX > rect_len * 0.70) {
        moveAll(-1)
    } else {

    }
});

/**
 * 
 * @param {number} direction 
 */
function moveAll(direction) {
    carouselList.dataset.offset = parseInt(carouselList.dataset.offset) + direction;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);

    [current, prev, next/*, first, last*/].forEach(item => {
        let itemPos = parseInt(item.dataset.pos);

        // console.log(`getPos(${item.dataset.pos}, ${sign})=>${getPos(item.dataset.pos, sign)}`)
        item.dataset.pos = getPos(itemPos, Math.sign(direction))
        // console.log(itemPos, item.dataset.pos);
    });
}

document.querySelectorAll(".carousel button").forEach(b => {
    b.addEventListener("click", _ => {
        moveAll(parseInt(b.dataset.direction))
    })
})


const update = function (newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);

    current.classList.remove('carousel__item_active');

    const sign = Math.sign(current.dataset.pos - newActivePos);
    [current, prev, next/*, first, last*/].forEach(item => {
        let itemPos = parseInt(item.dataset.pos);

        item.dataset.pos = getPos(itemPos, sign)
    });
};

function getPos(current, active) {
    return ((current + active + 4) % 3) - 1;

    // const diff = current - active;

    // if (Math.abs(current - active) > 2) {
    //     return -current
    // }

    // return diff;
}