
function customizer_render_img(mnt, clr, shape) {

    var canvas = document.getElementById('customizer-image');
    var context = canvas.getContext('2d');

    var img = document.createElement('IMG');
    context.save();
    img.onload = function() {
        context.save();
        context.beginPath();

        if (shape == 'o') {
            var centerX = 0;
            var centerY = 0;
            var radius = canvas.height * .475;

// draw circle which will be stretched into an oval

            context.moveTo(canvas.width/2, 1);
            context.quadraticCurveTo(canvas.width, 1, canvas.width-1, canvas.height/2);
            context.quadraticCurveTo(canvas.width, canvas.height, canvas.width/2, canvas.height-1);
            context.quadraticCurveTo(1, canvas.height, 1, canvas.height/2);
            context.quadraticCurveTo(1, 1, canvas.width/2, 1);
// restore to original state
//context.restore();

        }

        else if (shape == 's') {

            context.moveTo(1, 1);
            context.lineTo(canvas.width-1, 1);
            context.lineTo(canvas.width-1, canvas.height-1);
            context.lineTo(1, canvas.height-1);
            context.lineTo(1, 1);
        }

        else if (shape == 'r') {
            var cornerRadius = 10;

            context.moveTo(1+cornerRadius, 1);
            context.lineTo(canvas.width-1-cornerRadius, 1);
            context.quadraticCurveTo(canvas.width-1, 1, canvas.width - 1, 1 + cornerRadius);
            context.lineTo(canvas.width - 1, canvas.height - cornerRadius);
            context.quadraticCurveTo(canvas.width-1, canvas.height-1, canvas.width - 1 - cornerRadius, canvas.height-1);
            context.lineTo(1 + cornerRadius, canvas.height - 1);
            context.quadraticCurveTo(1, canvas.height-1, 1 , canvas.height - 1 - cornerRadius);
            context.lineTo(1, 1+cornerRadius);
            context.quadraticCurveTo(1, 1, +1+cornerRadius , 1);

        }
//context.rect(400, 0, -400, 400)
//context.lineWidth = 1;
//context.fillStyle = '#FFF';
//context.fill();
//context.strokeStyle = '#FFF';
//context.stroke();
        context.closePath();
        context.clip();
        context.drawImage(img, 0, 0);
        context.restore();
        var radius = 6;
        var screws = [];

        if (mnt == '2s') {
            var screws = [[radius * 2, canvas.height / 2],[canvas.width - (radius * 2), canvas.height / 2] ];
        }
        else if (mnt == '4s') {
            var multiplier = 2;
            if (shape == 'o') {
                multiplier = 5

                ;
            }
            var screws = [
                [radius * 2, radius * multiplier],
                [radius * 2, canvas.height - (radius * multiplier)],
                [canvas.width - (radius * 2), canvas.height - (radius * multiplier)],
                [canvas.width - (radius * 2), radius * multiplier]];
        }
        console.log(screws);
        screws.forEach ( function(corner)  {
            context.beginPath();
            context.arc(corner[0], corner[1], radius, 0, 2 * Math.PI, false);
            context.fillStyle = '#FFF';
            context.fill();
            context.strokeStyle = '#FFF';
            context.stroke();
        });

    }
    //img.src = "http://localhost:8888/bootstrap/img/brs.png";
  img.src = "img/" + clr +".png";
    context.clearRect(0,0,canvas.width, canvas.height);

}