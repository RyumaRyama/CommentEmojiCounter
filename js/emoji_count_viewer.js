class EmojiCountViewer {
  constructor() {
    this.createEmojiCountViewerContainer();

    const emoji_count_viewer_window_size = JSON.parse(localStorage.getItem('emoji_count_viewer_window_size'));
    this.emoji_count_viewer_window_height = emoji_count_viewer_window_size?.height ? parseInt(emoji_count_viewer_window_size?.height) : 540;
    this.emoji_count_viewer_window_width = emoji_count_viewer_window_size?.width ? parseInt(emoji_count_viewer_window_size?.width) : 960;
    this.setEmojiCountViewerWindow();
  }

  element = () => {
    return this.emoji_count_viewer_container;
  };

  createEmojiCountViewerContainer = () => {
    this.emoji_count_viewer_container = document.createElement('div');
    this.emoji_count_viewer_container.id = 'emoji-count-viewer-container';
    this.emoji_count_viewer_container.innerHTML = 0;
  };

  setEmojiCountViewerWindow = () => {
    this.emoji_count_viewer_window = window.open('', 'emoji_count-viewer-window', 'fullscreen=no,width='+this.emoji_count_viewer_window_width+',height='+this.emoji_count_viewer_window_height);
    const style = document.createElement('style');
    style.innerHTML = css_data;
    this.emoji_count_viewer_window.document.head.innerHTML = '';
    this.emoji_count_viewer_window.document.title = 'EmojiCountViewer';
    this.emoji_count_viewer_window.document.head.appendChild(style);
    this.emoji_count_viewer_window.document.body.innerHTML = '';
    this.emoji_count_viewer_window.document.body.appendChild(this.element());
    this.emoji_count_viewer_window.onresize = this.inputEmojiCountWindowSizeToLocalStorage;
    this.timer = 0;

    window.onbeforeunload = () => {
      this.emoji_count_viewer_window.close();
    };
  };

  inputEmojiCountWindowSizeToLocalStorage = () => {
    const height = this.emoji_count_viewer_window.innerHeight;
    const width = this.emoji_count_viewer_window.innerWidth;
    localStorage.setItem(
      'emoji_count_viewer_window_size',
      JSON.stringify({
        height: height,
        width: width,
      })
    );
  };

  countUp = () => {
    const emoji_count = this.emoji_count_viewer_container.textContent;
    const add_count_num = parseInt(emoji_count.replace(/,/g, '')) + 50
    this.emoji_count_viewer_container.innerHTML = add_count_num.toLocaleString();
  };
}
