const prop = ( data, name ) => data.map( item => item[ name ]  ),
  summ = data => data.reduce(( total, value ) => total + value, 0 );
class   SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );
    this.uploadButton.accept = 'image/png';
    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' );
    this.imageElement = container.querySelector( '.sprite-generator__result-image' );
    this.images = [];
    this.imagesCount = 0;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.registerEvents();
  }    

  registerEvents() {
    this.uploadButton.addEventListener('change', () => this.loadFiles());
    this.submitButton.addEventListener('click', () => this.generate());
  }

  loadFiles() {
    Array.from(this.uploadButton.files).forEach(file => {
      let img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      
      img.addEventListener('load', () => {
        this.images.push(img);
        this.imagesCount = this.images.length;
        this.imagesCountContainer.textContent = this.imagesCount;

        this.canvas.width = this.images.reduce((sum, cur) => sum + cur.width, 0)
        let x = 0;
        this.images.forEach((img) => {
          if (img.height > this.canvas.height) {this.canvas.height = img.height};
          this.ctx.drawImage(img, x, this.canvas.height - img.height);
          x = x + img.width;
        });
      })
    });
  }
    
  generate() {
    this.imageElement.src = this.canvas.toDataURL();
    this.imageElement.style.width = window.innerWidth * 2 / 3 + 'px';
    this.imageElement.alt = 'sprite.png';
    
    let init = `.icon {
      background-image: url('sprite.png');
      display: inline-block;
    }\n`;
    this.codeContainer.value = this.images.reduce(function(prev, cur, i) {
    cur = `.icon.icon_${i} { 
        width: ${cur.width}px;
        height: ${cur.height}px;
        background-position: 0px 0px;
      }\n`
      return  prev + cur;
    }, init);
  }
}

new SpriteGenerator( document.getElementById( 'generator' ));
