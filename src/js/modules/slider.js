import Swiper, { Navigation } from "swiper";


function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
    if(sliders){
        sliders.forEach(slider=>{
            slider.parentElement.classList.add('swiper');
            slider.classList.add('swiper-wrapper');
            for(const slide of slider.children){
                slide.classList.add('swiper-slide'); 
            }
        })
    }
}

function initSliders() {
    bildSliders();
    if(document.querySelector('.case-studies__slider')){
        new Swiper('.case-studies__slider',{

            //modules: [Navigation, Pagination],

            observer: true,
            observeParents: true,
            slidesPerView: 2.5,
            spaceBetween: 48,
            loop: true,
            //autoHeight: true,
            speed: 800,
            // breakpoints: {

            // }
           
            // on: {
            //     init: function(swiper){
            //     },
            //     slideChange: function(swiper){
            //     },
            // }
        })
    }
}

//Скролл из слайдера
function initSlidersScroll() {
    bildSliders();
    let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
    if(sliderScrollItems.length > 0){
        for(let index=0; index < sliderScrollItems.length; index++){
            const sliderScrollItem = sliderScrollItems[index];
            const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
            const sliderScroll = new Swiper('.swiper',{
                observer: true,
                observeParents: true,
                direction: 'vertical',
                slidersPerView: 'auto',
                freeMode: {
                    enabled: true,
                },
                scrollbar: {
                    el: sliderScrollBar,
                    draggable: true,
                    snapOnRelease: false
                },
                mousewheel: {
                    releaseOnEdges: true,
                },
            });
            sliderScroll.scrollbar.updateSize();
        }
        
    }
}

window.addEventListener("load", function(e){
    initSliders()
    //initSlidersScroll()
})