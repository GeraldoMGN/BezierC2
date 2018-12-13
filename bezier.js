function bezier(){
    var canvas = document.getElementById("app");
    var context = canvas.getContext("2d");
    window.requestAnimationFrame(main);

    function main(){
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'rgb(255, 255, 255)';
		context.font = "12px Courier";
        context.fillText(canvas.width, 8, canvas.height - 10);
        context.fillText(canvas.height, 8, canvas.height - 24);

        window.requestAnimationFrame(main);
    }
}
