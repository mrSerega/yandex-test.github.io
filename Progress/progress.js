function Progress(id){
    this.lastValue = 0;
    
    this.progress = document.getElementsByClassName(id)[0];
        
    let svgContent = '<svg ';
    svgContent+='class=\'progress__round progress__round_mode_inactive\'';
    svgContent+='version=\''+this.svgVersion;
    //svgContent+='\'x=\''+this.svgX;
    //svgContent+='\'y=\''+this.svgY;
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
            
    this.progress.innerHTML = svgContent;
    
    this.progress__round = this.progress.getElementsByClassName('progress__round')[0];
    this.progress__circle_bar = this.progress.getElementsByClassName('progress__circle_bar')[0];
}

Progress.prototype.svgVersion = 1.1;
//Progress.prototype.svgX = '0px';
//Progress.prototype.svgY = '0px';
Progress.prototype.svgViewbox = '0 0 110 110';

Progress.prototype.svgCircleCX = 55;
Progress.prototype.svgCircleCY = 55;
Progress.prototype.svgCircleR = 50;
Progress.prototype.svgCircleTransform = 'rotate(-90,55,55)';

Progress.prototype.setMode = function(modeType,modeValue){
    switch(modeType){
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

Progress.prototype.setValue = function(value){
    
    let bar =  this.progress__circle_bar;
    let last = this.lastValue;
    
    if(value > 100) value = 100;
    if(value < 0) value = 0;
    
    value = value / 100 * 315;
    
    bar.classList.toggle('progress__circle_bar-mode_animate');
    bar.classList.toggle('progress__circle_bar-mode_const');
    
    var timeout1 = setTimeout(function(){
        bar.style.setProperty('--from',last);
        bar.style.setProperty('--to',value);
        bar.classList.toggle('progress__circle_bar-mode_animate');
        bar.classList.toggle('progress__circle_bar-mode_const');
    },10);


    this.lastValue = value;    
}