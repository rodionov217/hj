'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

//сообщения с номером сессии от сервера не приходят, вне зависимости от того, указан binaryType или нет, это событие просто не срабатывает. Не пойму, почему 
connection.binaryType = 'arraybuffer';
connection.addEventListener('message', event => {
  console.log(event.data.bytesLength);
});

editor.addEventListener('update', updateCanvas)
function updateCanvas(event) { 
  //пришлось использовать метод toBlob, т.к. ни отправка в виде ArrayBuffer, ни метод отправки файлов, представленный в лекции (даже если дополнить его toDataURL) не сработали.
  //данный метод является лучшей или худшей альтернативой тем, что были приведены в лекции?
  canvas.toBlob(blob => connection.send(blob));
 
  //let ctx = canvas.getContext('2d');
  //let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //let binary = Uint8Array.from(img.data);
  //connection.send(binary.buffer);
}
  

//следующие две функции переписываю затем, чтобы отправлять измененное состояние холста на сервер сразу, не дожидаясь повторного нажатия на соответствующие кнопки или внесения следующего изменения на холст. 
//событие update на очистку или изменение фона холста не реагирует
function eraseCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //добавляю отправку текущего состояния сразу после очистки
  canvas.toBlob(blob => connection.send(blob));
}

function changeBackgroundColor() {
  context.save();
  context.fillStyle = document.getElementById('backgroundColor').value;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();

//добавляю отправку текущего состояния сразу после изменения фона
  canvas.toBlob(blob => connection.send(blob));

}
