class LiveChat {
  rootContainer; // hidden by default ./assets/css/index.css

  button;
  buttonIcon;
  buttonIconPath = './assets/img/сhat_24.svg';
  buttonIconSize = 24;
  buttonIconClose;

  header;
  headerClose;
  headerCloseButton;

  noMessagesTitle;
  noMessagesSubtitle;

  isMobile = navigator.userAgentData.mobile;

  state = 0;

  constructor (BXLiveChat) {
    this.BXLiveChat = BXLiveChat;
  }

  checkLoadedRootContainer = () => {
    this.BXLiveChat.openLiveChat();
    this.rootContainer = document.getElementsByClassName("bx-livechat-wrapper");
    if (this.rootContainer && this.rootContainer.length) {
      this.rootContainer = this.rootContainer[0];
      if (!this.isMobile) {
        this.rootContainer.style.height = 'calc(100vh - 150px)';
      }
      return true;
    } else {
      return false;
    }
  }

  createHeader = () => {
    const commandPhoto = document.createElement('img');
    commandPhoto.setAttribute('src', './assets/img/command.png');
    commandPhoto.setAttribute('height', 40);

    console.log(this.header);

    this.header.prepend(commandPhoto);

    const outworkText = document.createElement('div');
    outworkText.innerText = 'Сейчас нас здесь нет. Мы отвечаем Пн-Пт с 8:00 до 19:00 по Московскому времени';
    outworkText.classList.add('kp-widget-header__subtitle');

    this.header.append(outworkText);
  }

  createHeaderCloseButton = () => {
    const button = document.createElement('button');
    button.classList.add('kp-widget-close-button');

    this.headerCloseButton = button;
    this.headerClose.appendChild(this.headerCloseButton);

    this.headerCloseButton.addEventListener('click', this.toggleOpen);
  }

  renameBody = () => {
    if (this.noMessagesTitle)
      this.noMessagesTitle.innerText = 'Мы с вами еще не общались';
    if (this.noMessagesSubtitle)
      this.noMessagesSubtitle.innerText = 'Здесь будет история ваших диалогов';

    this.noMessagesTitle.appendChild(this.noMessagesSubtitle);
  }

  createButtonIconClose = () => {
    this.buttonIconClose = this.headerCloseButton.cloneNode(true);
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
    this.buttonIcon = buttonIcon;

    document.body.appendChild(this.button);
  }

  toggleOpen = () => {
    if (this.state) {
      console.log('CLOSE');
      this.rootContainer.classList.add('kp-widget-hidden');
      this.rootContainer.classList.remove('kp-widget-show');
      this.state = 0;
    } else {
      console.log('OPEN');
      this.rootContainer.classList.add('kp-widget-show');
      this.rootContainer.classList.remove('kp-widget-hidden');
      this.state = 1;
    }
  }

  start = () => {
    if (this.BXLiveChat) {
      console.log('Соединение с виджетом Битрикс24 установлено!', this.BXLiveChat);
      this.headerClose = document.getElementsByClassName('bx-livechat-control-box')[0];
      this.header = document.getElementsByClassName('bx-livechat-head')[0];

      this.noMessagesTitle = document.getElementsByClassName('bx-livechat-help-title')[0];
      this.noMessagesSubtitle = document.getElementsByClassName('bx-livechat-help-subtitle')[0];

      this.createHeader();
      this.createButton();
      this.createHeaderCloseButton();

      this.renameBody();

      this.button.addEventListener('click', this.toggleOpen);
    }
  }
}

const findWidgetB24 = (BXLiveChat) => {
  const liveChat = new LiveChat(BXLiveChat);
  let countIntervals = 0;

  const interval = setInterval(() => {
    console.group('ИНТЕРВАЛ');
    if (liveChat.checkLoadedRootContainer()) {
      console.log('Виджет найден после попытки №' + countIntervals);
      clearInterval(interval);
      console.groupEnd();
      liveChat.start();
      return;
    }

    countIntervals++;

    if (countIntervals >= 10) {
      console.log('Не нашли виджет после попыток - ' + countIntervals);
      clearInterval(interval);
      console.groupEnd();
      return;
    }

    console.log('Попытка достучаться до виджета №' + countIntervals);

    console.groupEnd();
  }, 200);
}

window.onload = () => {
  window.BX.ready(function() {
    findWidgetB24(window.BX.LiveChat);
  }); 
}