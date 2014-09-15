(function() {

  var app = {
    initialize: function() {
      this.setApp();
      this.setUpListeners();
      this.settingText();
    },
    setUpListeners: function() {
      this.textbox.on('keyup', $.proxy(this.settingText, this));
      this.bRadius.bind('slide', $.proxy(this.settingRadius, this));
      this.bSize.bind('slide', $.proxy(this.settingBorderSize, this));
      this.borderColor.on('change', $.proxy(this.settingBorderColor, this));
      this.backColor.on('change', $.proxy(this.settingBackColor, this));
      this.sendEmail.on('click', $.proxy(this.mailer, this));
    },
    setApp: function() {
      if (this.borderSizePosition == "no") {
        this.borderSizePosition = 1;
      };
      if (this.radiusPosition == "no") {
        this.radiusPosition = 4;
      };
      this.settingCodeCSS();
      this.bRadius.slider({
        range: "min",
        value: 13,
        max: 26,
        main: 0,
        step: 1
      });
      this.bSize.slider({
        range: "min",
        value: 8,
        max: 16,
        main: 0,
        step: 1
      });
    },
    button: $('.result-btn button'),
    codeHTML: $('.main-html textarea'),
    codeCSS: $('.main-css textarea'),
    email: $('.main-email input'),
    textbox: $('.setting-text-input input'),
    sendEmail: $('.main-send button'),
    borderColor: $('.setting-borderColor-input input'),
    backColor: $('.setting-backColor-input input'),
    radiusPosition: "no",
    borderSizePosition: "no",
    bRadius: $('#slider1'),
    bSize: $('#slider2'),
    settingText: function() {
      var text = this.textbox.val();
      this.button.text( text );
      if(text == "") {
        this.button.text('Hello!');
        text = "Hello!";
      }
      this.codeHTML.val( '<button type="submit" class="my-btn">' + text + '</button>' );
    },
    settingBorderColor: function() {
      var brColor = '#' + borderColor.value;
      this.button.css('border-color', brColor);
      this.settingCodeCSS();

    },
      settingBackColor: function() {
      var bgColor = '#' + backColor.value;
      this.button.css('background', bgColor);
      this.settingCodeCSS();
        console.log(bgColor);

    },
    settingRadius: function(event, ui) {
      this.button.css('border-radius', ui.value + 'px');
      this.radiusPosition = ui.value;
      this.settingCodeCSS();
    },
    settingBorderSize: function(event, ui) {
      this.button.css('border', ui.value + 'px solid #' + borderColor.value);
      this.borderSizePosition = ui.value;
      this.settingCodeCSS();
    },
    settingCodeCSS: function() {
      this.codeCSS.val( '.my-btn {\n border-radius: ' + this.radiusPosition + 'px;\n border: ' + this.borderSizePosition +'px solid #' + borderColor.value + ';\n background: #' + backColor.value + '; }' );
    },
    mailer: function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/dest/php/mailer.php",
        data: {
          codeHTML: this.codeHTML.val(),
          codeCSS: this.codeCSS.val(),
          email: this.email.val()
        },
        success: function(data) {
          alert( data );
        }
      });
    }
  };

  app.initialize();


})();