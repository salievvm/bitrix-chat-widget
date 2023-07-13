class LiveChat {
  rootContainer; // hidden by default ./assets/css/index.css

  button;
  buttonIconPath = './assets/img/сhat_24.svg';
  buttonIconSize = 24;

  header;
  headerCloseButton;

  state = 0;

  constructor (BXLiveChat) {
    this.BXLiveChat = BXLiveChat;
  }

  createCloseButton = () => {
    const button = document.createElement('button');
    button.classList.add('kp-widget-close-button');

    this.header = document.getElementsByClassName('bx-livechat-control-box')[0];

    console.log(this.header);

    this.headerCloseButton = button;
    this.header.appendChild(this.headerCloseButton);

    this.headerCloseButton.addEventListener('click', this.toggleOpen);
  }

  defineRootContainer = () => {
    this.rootContainer = document.getElementsByClassName('bx-livechat-wrapper')[0];
    console.log('this.rootContainer', this.rootContainer);
    this.createCloseButton();
  }

  initLiveChat = () => {
    console.log('Соединение с виджетом Битрикс24 установлено!', this.BXLiveChat);
    this.BXLiveChat.openLiveChat();
    this.BXLiveChat.addEventListener(window, 'show', () => console.log('closed'));
    this.defineRootContainer();
    // setTimeout(this.defineRootContainer, 200);
  }

  createButton = () => {
    const button = document.createElement('div');
    button.classList.add('kp-widget-button');
    
    const buttonInner = document.createElement('div');
    buttonInner.classList.add('kp-widget-button-inner');
    
    button.appendChild(buttonInner);

    const buttonIcon = document.createElement('img');
    buttonIcon.setAttribute('src', this.buttonIconPath);
    buttonIcon.setAttribute('width', this.buttonIconSize);
    buttonIcon.setAttribute('heigth', this.buttonIconSize);
    
    buttonInner.appendChild(buttonIcon);

    this.button = button;

    document.body.appendChild(this.button);
  }

  toggleOpen = () => {
    if (this.state) {
      console.log('CLOSE this.rootContainer', this.rootContainer);
      this.rootContainer.classList.add('kp-widget-hidden');
      this.rootContainer.classList.remove('kp-widget-show');
      this.state = 0;
    } else {
      console.log('OPEN this.rootContainer', this.rootContainer);
      this.rootContainer.classList.add('kp-widget-show');
      this.rootContainer.classList.remove('kp-widget-hidden');
      this.state = 1;
    }
  }

  start = () => {
    if (this.BXLiveChat) {
      this.initLiveChat();
      this.createButton();

      this.button.addEventListener('click', this.toggleOpen);
    }
  }
}

window.onload = () => {
  window.BX.ready(function() {
    const liveChat = new LiveChat(window.BX.LiveChat);
    liveChat.start();
  }); 
}