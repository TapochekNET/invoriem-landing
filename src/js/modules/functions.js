export function isWebp() {
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {

        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}

export function spoilers() { // Обязательно ставить transition: none на список
    const spoilersArray = document.querySelectorAll('[data-spoilers]');
    if (spoilersArray.length > 0) {
        const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
            return !item.dataset.spoilers.split(",")[0];
        });
        if (spoilersRegular.length > 0) {
            initSpoilers(spoilersRegular);
        }

        const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
            return item.dataset.spoilers.split(",")[0];
        });


        if (spoilersMedia.length > 0) {
            const breakPointArray = [];
            spoilersMedia.forEach(item => {
                const params = item.dataset.spoilers;
                const breakPoint = {};
                const paramsArray = params.split(",");
                breakPoint.value = paramsArray[0];
                breakPoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakPoint.item = item;
                breakPointArray.push(breakPoint);
            });

            let mediaQueries = breakPointArray.map(function (item) {
                return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
            });
            mediaQueries = mediaQueries.filter(function (item, index, self) {
                return self.indexOf(item) === index;
            });

            //debugger

            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakPoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);

                const spoilersArray = breakPointArray.filter(item => {
                    if (item.value === mediaBreakPoint && item.type === mediaType) {
                        return true;
                    }
                });
                matchMedia.addEventListener('change', function () {
                    initSpoilers(spoilersArray, matchMedia);
                });
                initSpoilers(spoilersArray, matchMedia);
            });
        }

        function initSpoilers(spoilersArray, matchMedia = false) {
            spoilersArray.forEach(spoilersBlock => {
                spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spoilersBlock.classList.add('_init');
                    initSpoilerBody(spoilersBlock);
                    spoilersBlock.addEventListener("click", setSpoilerAction);
                }
                else {
                    spoilersBlock.classList.remove('_init');
                    initSpoilerBody(spoilersBlock, false);
                    spoilersBlock.removeEventListener("click", setSpoilerAction);
                }
            });
        }

        function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
            const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
            if (spoilerTitles.length > 0) {
                spoilerTitles.forEach(spoilerTitle => {
                    if (hideSpoilerBody) {
                        spoilerTitle.removeAttribute('tabindex');
                        if (!spoilerTitle.classList.contains('_active')) {
                            spoilerTitle.nextElementSibling.hidden = true;
                        }
                    }
                    else {
                        spoilerTitle.setAttribute('tabindex', '-1');
                        spoilerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }
        function setSpoilerAction(e) {
            const el = e.target;
            if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
                const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
                const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
                const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
                if (!spoilersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoiler && !spoilerTitle.classList.contains('._active')) {
                        hideSpoilerBody(spoilersBlock);
                    }
                    spoilerTitle.classList.toggle('_active');
                    _slideToggle(spoilerTitle.nextElementSibling, 500);
                }
                e.preventDefault();
            }
        }
        function hideSpoilerBody(spoilersBlock) {
            const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
            if (spoilerActiveTitle) {
                spoilerActiveTitle.classList.remove('_active');
                _slideUp(spoilerActiveTitle.nextElementSibling, 500);
            }
        }
    }

    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.overflow = 'hidden';
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.marginTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.classList.remove('_slide');
            }, duration);

        }
    }

    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false;
            }
            target.style.overflow = 'hidden';
            let height = target.offsetHeight;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.style.height = 0;
            target.offsetHeight;
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);

        }
    }

    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        }
        else {
            return _slideUp(target, duration);
        }
    }
}

export function burgerMenu() {
    let iconMenu = document.querySelector('.icon-menu')
    iconMenu.addEventListener('click', () => {
        iconMenu.classList.toggle('_active');
        document.querySelector('.menu__body').classList.toggle('_active');
        document.querySelector('body').classList.toggle('lock');
        document.querySelector('body').classList.toggle('menu-open');
        if(document.documentElement.classList.contains('catalog-open'))
        document.documentElement.classList.remove('catalog-open')
        if(document.documentElement.classList.contains('sub-menu-open'))
        document.documentElement.classList.remove('sub-menu-open')
        
    })
}