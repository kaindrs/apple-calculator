$(function () {

    'use strict';

    let $numberInput = $('#numberInput');

    function measureText(txt, font) {
        $numberInput.css({font: font}).html(txt);
        return {
            width: $numberInput.width(),
            height: $numberInput.height()
        }
    }

    function shrinkToFill(input, fontSize, fontWeight, fontFamily) {
        let $input = $(input),
            txt = $input.val(),
            maxWidth = $input.width() + 5, // add some padding
            font = fontWeight + " " + fontSize + "px " + fontFamily;
        // see how big the text is at the default size
        let textWidth = measureText(txt, font).width;
        if (textWidth > maxWidth) {
            // if it's too big, calculate a new font size
            // the extra .9 here makes up for some over-measures
            fontSize = fontSize * maxWidth / textWidth * .9;
            font = fontWeight + " " + fontSize + "px " + fontFamily;
            // and set the style on the input
            $input.css({font: font});
        } else {
            // in case the font size has been set small and
            // the text was then deleted
            $input.css({font: font});
        }
    }

    $('.top-function').on('click', function () {
        let input = $(this).find('span').html();
        let inputVal = $numberInput.val();
        switch (input) {
            case 'C': {
                $numberInput.val('');
                $('.main-function').removeClass('selected');
                window.selectedValue = null;
                break;
            }
            case '+/-': {
                if ('' !== inputVal) {
                    if (parseInt(inputVal) > 0) {
                        $numberInput.val('-' + parseFloat(inputVal).toString().replace('.', ','));
                    } else {
                        $numberInput.val(String(parseFloat(parseFloat(inputVal) * -1)).replace('.', ','));
                    }
                }
                break;
            }
            case '%': {
                if ('' !== inputVal) {
                    $numberInput.val(parseFloat(inputVal) / 100);
                }
                break;
            }
        }
    });

    $('.main-function').on('click', function () {
        if (!$(this).hasClass('selected')) {
            let input = $(this).find('span').html();
            if ('=' === input) {
                let $selectedFunction = $('.main-function.selected');
                if ($selectedFunction.length) {
                    let funcInput = $selectedFunction.find('span').html();
                    switch (funcInput) {
                        case '⌹': {
                            $numberInput.val(String(window.selectedValue / parseFloat($numberInput.val().replace(',', '.'))).replace('.', ','));
                            break;
                        }
                        case 'x': {
                            $numberInput.val(String(window.selectedValue * parseFloat($numberInput.val().replace(',', '.'))).replace('.', ','));
                            break;
                        }
                        case '-': {
                            $numberInput.val(String(window.selectedValue - parseFloat($numberInput.val().replace(',', '.'))).replace('.', ','));
                            break;
                        }
                        case '+': {
                            $numberInput.val(String(window.selectedValue + parseFloat($numberInput.val().replace(',', '.'))).replace('.', ','));
                            break;
                        }
                    }
                    $selectedFunction.removeClass('selected');
                }
            } else {
                $('.main-function').removeClass('selected');
                $(this).addClass('selected');
                window.selectedValue = parseFloat($numberInput.val().replace(',', '.'));
                window.newInput = true;
            }
        }
    });

    $('.digit-function').on('click', function () {
        let input = $(this).find('span').html();
        let number = parseInt(input);
        let currentVal = $numberInput.val();

        if (window.newInput) {
            if (',' === input) {
                $numberInput.val('0,');
            } else {
                $numberInput.val(number.toString());
            }
            window.newInput = false;
        } else {
            if (',' === input) {
                if ('' === currentVal) {
                    $numberInput.val('0,');
                } else if (parseInt(currentVal).toString() === currentVal) {
                    $numberInput.val(currentVal + ',');
                }
            } else {
                $numberInput.val(($numberInput.val() + number.toString()).replace('.', ','));
                shrinkToFill($numberInput, 45, '300', 'Helvetica Neue');
            }
        }
    });

    $numberInput.on('input', function () {
        $numberInput.val($numberInput.val().replace('.', ','));
        shrinkToFill(this, 45, '300', 'Helvetica Neue');
    });
});