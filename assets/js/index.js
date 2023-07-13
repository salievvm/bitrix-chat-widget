class B24Widget {
  rootContainer; // hidden by default ./assets/css/index.css

  button;
  buttonIconContainer;
  buttonIcon;
  buttonIconPath = './assets/img/сhat_24.svg';
  buttonIconSize = 24;
  buttonIconState = 0;

  checkLoaded = () => {
    this.buttonIconContainer = document.getElementsByClassName("b24-widget-button-icon-animation");
    if (this.buttonIconContainer && this.buttonIconContainer.length) {
      this.buttonIconContainer = this.buttonIconContainer[0];
      return true;
    } else {
      return false;
    }
  }

  createButtonIcon = () => {
    const buttonIcon = document.createElement('img');
    buttonIcon.setAttribute('src', this.buttonIconPath);
    buttonIcon.setAttribute('width', this.buttonIconSize);
    buttonIcon.setAttribute('heigth', this.buttonIconSize);
    
    const buttonChild = this.buttonIconContainer.children[0];
    this.buttonIcon = buttonIcon;
    this.buttonIconContainer.replaceChild(this.buttonIcon, buttonChild);

    // this.buttonIconContainer.click();
    // window.BX.LiveChat.closeLiveChat();
    window.BX.LiveChat.openLiveChat();

    this.rootContainer = document.getElementsByClassName('bx-livechat-wrapper');

    this.button = document.querySelector('a[data-b24-crm-button-widget=openline_livechat]');
  }

  handleClickButtonContainer = (e) => {
    e.preventDefault();

    if (this.buttonIconState) {
      this.buttonIconState = 0;
    } else {
      this.buttonIconState = 1;
    }

  }

  start = () => {
    this.createButtonIcon();

    console.log('root', this.rootContainer);

    this.button.addEventListener('click', this.handleClickButtonContainer);
  }
}

const findWidgetB24 = () => {
  const b24Widget = new B24Widget();
  let countIntervals = 0;

  const interval = setInterval(() => {
    console.group('ИНТЕРВАЛ');
    if (b24Widget.checkLoaded()) {
      console.log('Виджет найден после попытки №' + countIntervals);
      clearInterval(interval);
      console.groupEnd();
      b24Widget.start();
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
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  findWidgetB24();
})