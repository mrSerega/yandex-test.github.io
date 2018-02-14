var input = document.getElementsByClassName('manager__input_number')[0];
var animate_inpt = document.getElementById('round_inpt');
var hide_inpt = document.getElementById('hide_inpt');

var myNewProgress = new Progress('scene__progress');

input.onchange = function(){
    myNewProgress.setValue(this.value);
}

animate_inpt.onchange = function(){
    if (this.checked){
        myNewProgress.setMode('animated','yes')
    }
    else{
        myNewProgress.setMode('animated','')
    }
}

hide_inpt.onchange = function(){
    if (this.checked){
        myNewProgress.setMode('hide','yes');
    }
    else{
        myNewProgress.setMode('hide','');
    }
}