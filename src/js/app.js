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
      this.sendEmail.on('click', $.proxy(this.mailer, this));
    },
    setApp: function() {
      if (this.borderSizePosition == "no") {
        this.borderSizePosition = 1;
        console.log( "hello" );
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
    radiusPosition: "no",
    borderSizePosition: "no",
    bRadius: $('#slider1'),
    bSize: $('#slider2'),
    settingText: function() {
      var text = this.textbox.val();
      this.button.text( text );
      if(text == "") {
        this.button.text('Hello!');
        // this.textbox.val('Hello!');
        text = "Hello!";
      }
      this.codeHTML.val( '<button type="submit" class="my-btn">' + text + '</button>' );
    },
    settingRadius: function(event, ui) {
      this.button.css('border-radius', ui.value + 'px');
      this.radiusPosition = ui.value;
      this.settingCodeCSS();
    },
    settingBorderSize: function(event, ui) {
      this.button.css('border', ui.value + 'px solid #3181b4');
      this.borderSizePosition = ui.value;
      this.settingCodeCSS();
    },
    settingCodeCSS: function() {
      this.codeCSS.val( '.my-btn {\n border-radius: ' + this.radiusPosition + 'px;\n border: ' + this.borderSizePosition +'px solid #3181b4;\n}' );
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