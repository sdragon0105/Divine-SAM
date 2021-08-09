window.popmypet = window.popmypet || {};

popmypet.Accordion = (function() {
  function initAccordion() {
    $('.accordion').each(function() {
      let $accordion = $(this);

      $accordion.on('click', '.header', function() {
        let $this = $(this).parents('.panel');
        if ($this.hasClass('active')) {
          $this.removeClass('active');
          $this.find('.body').slideUp();
        }
        else {
          $accordion.find('.panel .body').slideUp();
          $accordion.find('.panel').removeClass('active');
          $this.find('.body').slideDown();
          $this.addClass('active');
        }
      });

      $accordion.find('.panel:first-child').addClass('active');
      $accordion.find('.panel:first-child .body').slideDown();
    });
  }

  return {
    init: function() {
      initAccordion();
    }
  }
})();

popmypet.HomeTyped = (function() {
  function initTyped() {
    $('.typed').each(function() {
      var $this = $(this);
      var keywords = $this.data('keywords');
      if (keywords) {
        var typed = new Typed(this, {
          strings: keywords.split(','),
          typeSpeed: 100,
          backSpeed: 100
        });
      }
    });
  }

  return {
    init: function() {
      initTyped();
    }
  }
})();

popmypet.BackgroundsPage = (function() {
  function init() {
    if ($('#colorpicker').length === 0) return;
    $('#colorpicker').farbtastic(function(color){
      $('#colorApply').css('background-color', color);
      $('#color').val(color);
    })
    $.farbtastic('#colorpicker').setColor($('#color').val());
    $('#color').on('keyup', function(){
      $.farbtastic('#colorpicker').setColor($(this).val());
      $('#colorpicker').trigger("click");
    })
  }

  return {
    init: init
  }
})();

popmypet.ProductPage = (function() {
  function init() {
    if ($('.template-product').length === 0) return;

    // Customer & product images trigger
    $(document).on('click', '.js-images-trigger', changeImagesSlider);

    // Set uploaded file in a image container
    $(document).on('change', '.product-form__file input[type=file]', onFileUpload)
    $(document).on('click', '.product-form__file .js-remove-file', onRemoveFile)
  }

  function changeImagesSlider(e) {
    if ($(this).hasClass('active')) return;
    $('.js-images-trigger').removeClass('active');
    $(this).addClass('active');
    var type = $(this).data('type');
    if (type === 'customer') {
      $('.product-single__photos--customer').removeClass('hide');
      $('.product-single__photos--product').addClass('hide');
      $('.product-single__photos--customer').find('.slick-initialized').slick('refresh');
    }
    else {
      $('.product-single__photos--customer').addClass('hide');
      $('.product-single__photos--product').removeClass('hide');
      $('.product-single__photos--product').find('.slick-initialized').slick('refresh');
    }
  }
// control.replaceWith( control.val('').clone( true )
  function onFileUpload(e) {
    var $parent = $(this).parents('.product-form__file');
    var $imageWrapper = $parent.find('.uploaded-image');

    if (this.files && this.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $imageWrapper.find('img')
          .attr('src', e.target.result);
      };

      reader.readAsDataURL(this.files[0]);
    }

    $imageWrapper.addClass('file-uploaded');
  }

  function onRemoveFile() {
    var $parent = $(this).parents('.product-form__file');
    var $imageWrapper = $parent.find('.uploaded-image');
    var $file = $parent.find('input[type=file]');

    $imageWrapper.removeClass('file-uploaded');
    $imageWrapper.find('img').attr('src', 'http://placehold.it/360');
    $file.replaceWith( $file.val('').clone( true ));
  }

  return {
    init: init
  }
})();

$(document).ready(function() {
  popmypet.Accordion.init();
  popmypet.HomeTyped.init();
  popmypet.BackgroundsPage.init();
  popmypet.ProductPage.init();

  jQuery(".menu-lv-1.item.dropdown").click(function(){
    var $this = jQuery(this);
     $this.toggleClass( "is-open-custom");
  });
});

$(document).ready(function(){
	if (window.matchMedia("(max-width: 768px)").matches) {
        $("footer .desktop_custom").addClass("hide_mobile");
    }
  	jQuery(".header-mobile__item.text-left").click(function(){
        jQuery("div#navigation-mobile").show();
      });
  	jQuery("#navigation-mobile .close_menu").click(function(){
        jQuery("div#navigation-mobile").hide();
      });
});

