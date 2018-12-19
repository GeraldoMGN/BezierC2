function bezier(){
    var canvas = document.getElementById("app");
    var context = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    var controlPoints = [];
    controlPoints.push({x: canvas.width/3, y: canvas.height/3});
    controlPoints.push({x: canvas.width*2/3, y: canvas.height/3});
    controlPoints.push({x: canvas.width/3, y: canvas.height*2/3});
    controlPoints.push({x: canvas.width*2/3, y: canvas.height*2/3});
    window.requestAnimationFrame(main);
    console.log(controlPoints);

    function main(){
        background();

        //Desenha a curva
        var previousPos = controlPoints[0];             //ponto anterior
        var pos;                                        //ponto atual
        context.beginPath();
        context.strokeStyle = "green";
        context.lineWidth = 3;
        context.moveTo(previousPos.x, previousPos.y);
        
        for(var t = 0;t <= 1;t += (1/200)){
            pos = BSpline(controlPoints, t);
            context.lineTo(pos[0], pos[1]);
            context.stroke();
            previousPos = pos;
        }

        //desenha a poligonal de controle
        var previousPos = controlPoints[0];             //ponto anterior
        context.beginPath();
        context.strokeStyle = "blue";
        context.lineWidth = 2;
        context.moveTo(previousPos.x, previousPos.y);
        for(var i = 1; i < controlPoints.length; i++){
            context.lineTo(controlPoints[i].x, controlPoints[i].y);
            context.strokeStyle = "blue";
            context.stroke();
            previousPos = controlPoints[i + 1];
        }

        //Desenha os pontos de controle
        for(var i = 0; i < controlPoints.length; i++){
            context.beginPath();
            context.arc(controlPoints[i].x, controlPoints[i].y, 10, 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
        }

        window.requestAnimationFrame(main);
    }
//============================================================================================================================
    function seqAt (dim){
        var margin = 4;
        return function(n){
            if(n < margin){
                if(dim == 0){
                    return controlPoints[0].x;
                } else {
                    return controlPoints[0].y;
                }
            }else if(controlPoints.length + margin <= n){
                if(dim == 0){
                    return controlPoints[controlPoints.length-1].x;
                } else {
                    return controlPoints[controlPoints.length-1].y;
                }
            }else{
                if(dim == 0){
                    return controlPoints[n-margin].x;
                } else {
                return controlPoints[n-margin].y;
                }
            }
        };
    };

    function grauBase3 (x){
        if(-1 <= x && x < 0){
            return 2.0/3.0 + (-1.0 - x/2.0)*x*x;
        }else if(1 <= x && x <= 2){
            return 4.0/3.0 + x*(-2.0 + (1.0 - x/6.0)*x);
        }else if(-2 <= x && x < -1){
            return 4.0/3.0 + x*(2.0 + (1.0 + x/6.0)*x);
        }else if(0 <= x && x < 1){
            return 2.0/3.0 + (-1.0 + x/2.0)*x*x;
        }else{
            return 0;
        }
    };

    function getInterpol (seq,t){
        var tInt = Math.floor(t);
        var result = 0;
        for(var i = tInt - 2;i <= tInt + 2;i++){
            result += seq(i)*grauBase3(t-i);
        }
        return result;
    };

    function BSpline(controlPoints, t){                 //Função para começar a chamar a recursão do algoritmo de Boor
        var t = t*4*2 + controlPoints.length;               //
        return [getInterpol(seqAt(0),t),getInterpol(seqAt(1),t)];
    }
//============================================================================================================================
    function background(){
        context.fillStyle = "#333";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'rgb(255, 255, 255)';
        context.font = "12px Courier";
        context.fillText(canvas.width, 8, canvas.height - 10);
        context.fillText(canvas.height, 8, canvas.height - 24);
    }
}
