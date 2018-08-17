const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className ); 
class iLayout {
  constructor( container ) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: document.querySelector('.layout__item_left'),
      top: document.querySelector('.layout__item_top'),
      bottom: document.querySelector('.layout__item_bottom')
    };
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.positionsContainer.getBoundingClientRect().width;
    this.canvas.height = this.positionsContainer.getBoundingClientRect().height;
    this.ctx = this.canvas.getContext('2d');
    this.files = [];
    this.registerEvents();
  }

  load(event) {
      event.preventDefault();
      event.target.innerHTML = '';
      const file = event.dataTransfer.files[0];
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.classList.add('layout__image'); 
      event.target.appendChild(img);
      event.target.classList.remove('layout__item_active'); 
  
      const dwidth = event.target.clientWidth;
      const dheight = event.target.clientHeight;
      let dx = event.target.offsetLeft, dy = 0;
      if (event.target === this.layout.bottom) {
        dy = event.target.clientHeight - 1;
      }

      img.addEventListener('load', () => {
        this.ctx.drawImage(img, 0, 0, dwidth, dheight, dx, dy, dwidth, dheight);
        URL.revokeObjectURL(img.src);
      }) 
    }
    
    generateImg(event) {
      event.preventDefault();
      this.result.value = `<img src="${this.canvas.toDataURL()}">`;

      //test
/*    let img = document.createElement('div');
      img.innerHTML = `<img src="${this.canvas.toDataURL()}">`;
      document.querySelector('#layout').appendChild(img); */
    }

  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => {
      event.preventDefault();
      event.target.classList.add('layout__item_active');
    });
    this.positionsContainer.addEventListener('dragleave', () => event.target.classList.remove('layout__item_active'));
    this.positionsContainer.addEventListener('drop', event => this.load(event));
    this.actionButton.addEventListener('click', event => this.generateImg(event))
  }
}

new iLayout( document.getElementById( 'layout' ));
