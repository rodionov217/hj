'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.srcObject = video;
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}
 
function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    navigator.mediaDevices
      .getUserMedia(app.config)
      .then(stream => done(stream));
    done = function (stream) {
      console.log('yay!', stream);
      app.mode = 'recording';
      app.preview.srcObject = stream;
      let chunks = [];
      app.preview.addEventListener('dataavailable', (e) => chunks
        .push(e.data));
      setTimeout(() => {
        app.mode = 'sending';
        stream.getTracks().forEach(track => track.stop())
        app.preview.srcObject = null;
      }, app.limit + 2000);
      return {
        video: new Blob(chunks),
        frame: createThumbnail(app.preview.srcObject)
          .then()
      }
    }

    //done();
  })
}
/*     fail = function (e) { console.log(e)}
    
    setTimeout(() => {
      fail('Не удалось записать видео');
    }, app.limit); */
document.addEventListener('DOMContentLoaded', () => { 
  record(app)
  .then(e => console.log(e))
  .then()
  .catch(e => console.log(e))
})

