$(function () {

    let minutes = "00";
    let seconds;
    let divSec;
    let mainSet;
    let modalSet;

    let newGamgeArr = []
    let secGameArr = []
    let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    let imgId = []
    let imgArr = ['img/image_part_001.jpg', 'img/image_part_002.jpg', 'img/image_part_003.jpg', 'img/image_part_004.jpg', 'img/image_part_005.jpg',
        'img/image_part_006.jpg', 'img/image_part_007.jpg', 'img/image_part_008.jpg', 'img/image_part_009.jpg', 'img/image_part_010.jpg',
        'img/image_part_011.jpg', 'img/image_part_012.jpg', 'img/image_part_013.jpg', 'img/image_part_014.jpg', 'img/image_part_015.jpg',
        'img/image_part_016.jpg'
    ]
    let check = true;
    let timer = true;

    let count = 0;

                    /*  start func generate
                        Функція generate генерує нам блоки з картинками всередині(як шахматну дошку) */
    function generate() {
        count = 0;
            /* цикл генерування правого контейнеру */
        for (let q = 0; q < 16; q++) {
            let createDiv = document.createElement('div')
            createDiv.classList.add('partOfImage')
            $(createDiv).css('border', 'none')
            $('.rightBlock').append(createDiv)
            secGameArr.push(createDiv)
        }

            /* цикл генерування лівого контейнеру */
        for (let i = 0; i < 16; i++) {
            count++
            let createDiv = document.createElement('div')
            let createImg = document.createElement('img')
            createDiv.classList.add('partOfImage')
            createDiv.classList.add('child')
            $(createDiv).css('border', 'none')
            createImg.src = `${imgArr[i]}`
            createImg.setAttribute('id',count)
            createDiv.append(createImg)
            $('.leftBlock').append(createDiv)
            newGamgeArr.push(createDiv)
            imgId.push(createImg.id)
        }
        $('img').width(70)
        $('img').height(70)
            /* Функція draggable для картинки,щоб можна було її переміщати між блоками і в межах div.conteiner*/
        $('img').draggable({
            containment: $('.conteiner'),
            revert: 'invalid',
        })

            /* Функція droppable для блоків div.partOfImage(тобто усіх наших кліточок) ,щоб вони могли приймати картинки img
                Працює так,щоб при пересуванні елементів була перевірка на те, що наш блок пустий,якщо у ньому немає елементів,
                тоді додаємо туди img,в інших випадках img повертається на те місце, звідки ми починали його draggable*/
        $('.partOfImage').droppable({
            drop: function (ev, ui) {
                let dropped = ui.draggable;
                let droppedOn = $(this)
                $(droppedOn).droppable('disable');
                $(dropped).parent().droppable('enable')
                $(dropped).detach().css({
                    top: 0,
                    left: 0
                }).appendTo(droppedOn)

                /* bulean змінна сheck ,яка по дефолту є true, створена для того ,щоб при пересуванні елемента,запускалася функія
                таймеру ,а також рандомний генератор блоків + переведення цієї змінною в false,щоб при наступних натисканнях на елементи
                та їх пересування, не дублювалися інші функції,а саме : таймер , генератор */
                if (check) {
                    $(".start").css("opacity", 0.5);
                    $(".start").prop("disabled", true);
                    $(".check").prop("disabled", false);
                    $(".check").css("opacity", 1);
                    seconds = 60;
                    mainSet = setInterval(function () {
                        check = false;
                        if (seconds <= 60 && seconds > 0) {
                            seconds--;
                            $(".min").text(minutes);
                            if (seconds < 10) {
                                $(".sec").text(`0${seconds}`);
                            } else {
                                $(".sec").text(seconds);
                            }
                        }
                        divSec = $(".sec").text();
                        if (seconds == 0) {
                            clearInterval(mainSet);
                            $(".obolochka").css({
                                backgroundColor: "gray",
                                zIndex: 1,
                                opacity: 0.8,
                            });
                            $(".modalDiv").slideDown(1000);
                            $(".modalText").text(`It's a pity, but you lost`);
                            $(".modalCheck").hide();
                            $(".check").prop("disabled", true);
                            $(".check").css("opacity", 0.5);
                        }
                        $(".modalCheck").show();
                    }, 1000);
                    let parent = $('.leftBlock')
                    let child = parent.children()
                    while (child.length) {
                        parent.append(child.splice(Math.floor(Math.random() * child.length), 1)[0])
                    }

                }

            }

        })
        $('.partOfImage').not('.partOfImage:empty').droppable('disable')
    }
    generate()

    /*  END func generate
                Функція generate генерує нам блоки з картинками всередині(як шахматну дошку) */




        /* start Кнопка Start,яка запускає таймер,а також рандомно генерує місце положення блоків в контейнері */

    $(".start").on("click", function () {
        check = false;
        $(".start").css("opacity", 0.5);
        $(".start").prop("disabled", true);
        $(".check").prop("disabled", false);
        $(".check").css("opacity", 1);
        seconds = 60;
        mainSet = setInterval(function () {
            if (seconds <= 60 && seconds > 0) {
                seconds--;
                $(".min").text(minutes);
                if (seconds < 10) {
                    $(".sec").text(`0${seconds}`);
                } else {
                    $(".sec").text(seconds);
                }
            }
            divSec = $(".sec").text();
            if (seconds == 0) {
                clearInterval(mainSet);
                $(".obolochka").css({
                    backgroundColor: "gray",
                    zIndex: 1,
                    opacity: 0.8,
                });
                $(".modalDiv").slideDown(1000);
                $(".modalText").text(`It's a pity, but you lost`);
                $(".modalCheck").hide();
                $(".check").prop("disabled", true);
                $(".check").css("opacity", 0.5);
            }
            $(".modalCheck").show();
        }, 1000);
        let parent = $('.leftBlock')
        let child = parent.children()
        while (child.length) {
            parent.append(child.splice(Math.floor(Math.random() * child.length), 1)[0])
        }
    });
        /* END Кнопка Start,яка запускає таймер,а також рандомно генерує місце положення блоків в контейнері */



    /*  Кнопка Check ,яка викликає оболочку(приховуючи основний контейнер з елементами) і здійнсює виклик модального вікна*/
    $(".check").on("click", function () {
        $(".obolochka").css({
            backgroundColor: "gray",
            zIndex: 1,
            opacity: 0.8,
        });
        $(".modalDiv").slideDown(1000);
        if(timer){
            modalSet = setInterval(function () {
            divSec;
            if (divSec && divSec > 0) {
                divSec--;
                if (divSec < 10) {
                    $(".modalText").text(
                        `You still have time,you sure?${minutes}:0${divSec}`
                    );
                } else {
                    $(".modalText").text(
                        `You still have time,you sure?${minutes}:${divSec}`
                    );
                }
            }
        }, 1000);
        timer = false;
    }

    });




    /* Кнопка модального вікна Close ,яка при кліку скриває оболочку,приховує модальне вікно та показує основний контейнер з елементами */
    $(".modalClose").on("click", function () {
        $(".obolochka").css({
            backgroundColor: "white",
            zIndex: -1,
            opacity: 1,
        });
        $(".modalDiv").slideUp(1000);
    });



    /* START Кнопка модального вікна Check ,яка при кліку отримує img ,які знаходяться в div.rightBlock,та запушує їх в массив srcImg,при цьому,
            в першу чергу, обнуляючи його,якщо там були елементи до цього. Після чого здійснюється перевірка на правильне співпадіння усіх
            елементів у двох массивах srcImg / imgArr,якщо їх довжина та послідовність елементів збігається,видає повідомлення з привітанням,
            про успішне завершення гри, в іншому випадку видає повідомлення про невдачу. В обох випадках зупиняє таймер,закриває доступ до кнопок
            start/check ,залишаючи користувачу лише змогу розпочати нову гру. */
            let a
    $(".modalCheck").on("click", function () {
         for (let s = 0; s < $('.rightBlock  img').length; s++) {
            console.log($('.rightBlock img')[s].id)
            if ($('.rightBlock img')[s].id == numbers[s] && $('.rightBlock  img').length==16) {
                $(".modalText").text(`Woohoo, well done, you did it!`);
                

            } else if(a!=numbers[s]){
                $(".modalText").text(`It's a pity, but you lost`);

            }
        }
        $(this).hide();
        $(".start").css("opacity", 0.5);
        $(".start").prop("disabled", true);
        $(".check").prop("disabled", true);
        $(".check").css("opacity", 0.5);
        clearInterval(modalSet);
        clearInterval(mainSet);

    });

    /* END Кнопка модального вікна Check*/




    /*Кнопка New Game ,яка при кліку обнуляє увесь вміст обох блоків ,зупиняє таймер,закриває доступ до кнопки сheck ,відкриває доступ
        до кнопки start,запускає функції generate ,а також рандомно генерує місце положення блоків з картинками у лівому блоці*/

    $(".newG").on("click", function () {
        timer = true;
        check = true;
        clearInterval(modalSet);
        clearInterval(mainSet);
        $(".sec").text(`00`);
        $(".min").text(`01`);
        $(".start").css("opacity", 1);
        $(".check").css("opacity", 0.5);
        $(".start").prop("disabled", false);
        $(".check").prop("disabled", true);
        $('.leftBlock').html('')
        $('.rightBlock').html('')
        generate()
        let parent = $('.leftBlock')
        let child = parent.children()
        while (child.length) {
            parent.append(child.splice(Math.floor(Math.random() * child.length), 1)[0])
        }
    });

});