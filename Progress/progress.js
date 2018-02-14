/**
 * Создает экземпляр Progress
 * @class
 * @classdesc элемент progress отображает состнояние какого-либо процесса в процентах(от 0 до 100). Для использования блока необходимо на html странице создать div c некоторым className. Этот  className будет использоваться как уникальный идентифкатор для создания соответсвующего ему js объекта. Управление объекотм осуществляется по средством api. подробнее функции api описанны ниже. Так же неободимо подключить соответсвующиее css (Progress/progress.css; Progress/circle/circle.css; Progress/round/round.css)
 * @constructor
 * @this Progress
 * @param {string} id - className объекта div, который должен стать progress
 */
function Progress(id){
    //запминает последнее значение прогресса
    this.lastValue = 0;
    
    //получаем элемент, в который будет помещен progress (рабочий контейнер)
    this.progress = document.getElementsByClassName(id)[0];
        
    //Создает svg графику (фоновый круг и loadBar)
    let svgContent = '<svg ';
    svgContent+='class=\'progress__round progress__round_mode_inactive\'';
    svgContent+='version=\''+this.svgVersion;
    svgContent+='\'viewbox=\''+this.svgViewbox;
    svgContent+='\'><circle ';
    svgContent+='class=\'progress__circle progress__circle_back\' ';
    svgContent+='cx=\''+this.svgCircleCX
    svgContent+='\'cy=\''+this.svgCircleCY;
    svgContent+='\'r=\''+this.svgCircleR;
    svgContent+='\'transform=\''+this.svgCircleTransform;
    svgContent+='\'/><circle ';
    svgContent+='class=\'progress__circle progress__circle_bar progress__circle_bar-mode_animate\' ';
    svgContent+='cx=\''+this.svgCircleCX;
    svgContent+='\'cy=\''+this.svgCircleCY;
    svgContent+='\'r=\''+this.svgCircleR;
    svgContent+='\'transform=\''+this.svgCircleTransform;
    svgContent+='\'/></svg>';
            
    //помещаем графику в рабочий контейниер
    this.progress.innerHTML = svgContent;
    
    //объект, который будет вращатся
    this.progress__round = this.progress.getElementsByClassName('progress__round')[0];
    
    //объект loadBar
    this.progress__circle_bar = this.progress.getElementsByClassName('progress__circle_bar')[0];
}

//константы для отрисовки графики
Progress.prototype.svgVersion = 1.1;
Progress.prototype.svgViewbox = '0 0 110 110';

Progress.prototype.svgCircleCX = 55;
Progress.prototype.svgCircleCY = 55;
Progress.prototype.svgCircleR = 50;
Progress.prototype.svgCircleTransform = 'rotate(-90,55,55)';


/**
 * Задает режим работы progress 
 * @param {string} modeType  -- допустимы значения: 'animated' -- вращается ли элемент, 'hide' --скрыт ли элемент.
 * @param {string} modeValue -- допустимые значения 'yes',''
 */
Progress.prototype.setMode = function(modeType,modeValue){
    switch(modeType){
        //управляем варщением объекта
        case 'animated':
            switch(modeValue){
                case 'yes':
                    this.progress__round.classList.toggle('progress__round_mode_active',true);
                    this.progress__round.classList.toggle('progress__round_mode_inactive',false);
                    break;
                
                case '':
                    this.progress__round.classList.toggle('progress__round_mode_active',false);
                    this.progress__round.classList.toggle('progress__round_mode_inactive',true);
                    break;
            }
            break;
        //управляем видимостью объекта    
        case 'hide':
            switch(modeValue){
                case 'yes':
                    this.progress.classList.toggle('progress_hide',true);
                    break;
                case '':
                    this.progress.classList.toggle('progress_hide',false);
                    break;
            }
            break;
    }
}

/**
 * задает начение отображаемого прогресса 
 * @param {number} value -- процентное отображение прогресса отображаемого процесса (0-100)
 */
Progress.prototype.setValue = function(value){
    
    let bar =  this.progress__circle_bar;
    let last = this.lastValue;
    
    //обрабатываем значения выходящие за рамки 0 и 100
    if(value > 100) value = 100;
    if(value < 0) value = 0;
    
    //приводим значения процентов к абсолютному (315 -- длина окружности)
    value = value / 100 * 315;
    
    //отключаем анимацию и замораживаем пргресс
    bar.classList.toggle('progress__circle_bar-mode_animate');
    bar.classList.toggle('progress__circle_bar-mode_const');
    
    //выставляеем параметры для новой анимации, включаем анимацию, убераем заморозку
    var timeout1 = setTimeout(function(){
        bar.style.setProperty('--from',last);
        bar.style.setProperty('--to',value);
        bar.classList.toggle('progress__circle_bar-mode_animate');
        bar.classList.toggle('progress__circle_bar-mode_const');
    },10);

    //выставляем новое значение для "памаяти" пргресса
    this.lastValue = value;    
}