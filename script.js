

let sliderInner = document.querySelector('.slider_inner');
let sliderItems = document.querySelectorAll('.slider_item');

let leftArrow = document.querySelector('.left_arrow');
let rightArrow = document.querySelector('.right_arrow');

let sliderPointsBlock = document.querySelector('.points')


//--items_margin
let firstItem = sliderInner.firstElementChild;
let lastItem = sliderInner.lastElementChild;
let margin = (sliderInner.offsetWidth - firstItem.offsetWidth) / 2;
firstItem.style.marginLeft = margin + 'px';
lastItem.style.marginRight = margin + 'px';
sliderItems.forEach(el => {
    el.style.marginTop = (sliderInner.offsetHeight - el.offsetHeight) / 2 + 'px';
})


//--arrows
document.querySelector('.left_arrow_block').onclick = function(event) {
    sliderInner.scrollBy({
        top: 0,
        left: -sliderInner.offsetWidth / 2,
        behavior: 'smooth',
    });
}

document.querySelector('.right_arrow_block').onclick = function(event) {
    sliderInner.scrollBy({
        top: 0,
        left: sliderInner.offsetWidth / 2,
        behavior: 'smooth',
    });
}


//--points
sliderItems.forEach(() => {
    let newPoint = document.createElement('div');
    newPoint.className = 'point';
    sliderPointsBlock.append(newPoint);
})


//--scrolling
sliderPointsBlock.childNodes[0].classList.add('active');
sliderInner.onscroll = function(event) {
    let xCoords = window.innerWidth / 2;
    let yCoords = window.pageYOffset + sliderInner.offsetHeight / 2;
    let centeredItem = document.elementFromPoint(xCoords, yCoords).parentNode;

    if (centeredItem.classList.contains('slider_item')) {
        sliderItems.forEach(itm => itm.classList.remove('active'));
        centeredItem.classList.add('active');

        let activeItemIndex = Array.from(sliderItems).indexOf(centeredItem);
        sliderPointsBlock.childNodes.forEach(el => el.classList.remove('active'));
        sliderPointsBlock.childNodes[activeItemIndex].classList.add('active');
    };
}


//points
sliderPointsBlock.childNodes.forEach(pnt => pnt.onclick = function(event) {
    let pntIndex = Array.from(sliderPointsBlock.childNodes).indexOf(pnt);
    let coordsToScroll = sliderInner.scrollWidth / sliderItems.length;

    sliderInner.scrollTo({
        top: 0,
        left: pntIndex * coordsToScroll,
        behavior: 'smooth',
    });
})