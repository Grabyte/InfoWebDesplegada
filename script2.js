
let video=document.querySelector('video');
let playButton = document.getElementById("play");
let pauseButton= document.getElementById("pause");

let transformarTiempoActual=(tiempo)=>{
    if(tiempo<60){
        if(tiempo.toFixed(0)<10){
            return `00:0${tiempo.toFixed(0)}`
        }
        return `00:${tiempo.toFixed(0)}`
        //metodo toFixed(cant. decimales)
    }else{
        console.log(tiempo/60 )
        let minutos = parseInt(tiempo/60)
        let segundos = (tiempo/60 - minutos)*60
        if(segundos<10){
            return `${minutos}:0${segundos.toFixed(0)}`
        }
        return `${minutos}:${segundos.toFixed(0)}`
    }
    //
}
let timeProgression;

setTimeout(()=>{
    document.getElementById('showTime').innerHTML=` Duracion video  04:41`},100);

    playButton.addEventListener('click',()=>{
        video.play()
        timeProgression=setInterval(()=>{
        document.getElementById('showTime').innerHTML=`${transformarTiempoActual(video.currentTime)}`
        },1000)
    });

    pauseButton.addEventListener('click',()=>{
        video.pause();
        flag=false;
        clearInterval(timeProgression)
});