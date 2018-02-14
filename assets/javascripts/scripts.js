window.odometerOptions = {
  animation: 'count'
}

$(function() {
  //Animation when scroll
  var $body = $('body'),
       win_height_padded = $body.height() * 1.3,
       isTouch = false;
   if (isTouch) { $('.revealOnScroll').addClass('animated'); }
   $body.on('scroll', revealOnScroll);

   function revealOnScroll() {
     var scrolled = $body.scrollTop(),
         win_height_padded = $body.height() * 1.1;

     // Showed...
     $(".revealOnScroll:not(.animated)").each(function () {
       var $this = $(this),
           offsetTop = $this.offset().top;
       if (win_height_padded > offsetTop) {
          const $value = $(this).siblings('.value')
          $value.countup({ startVal: 0, endVal: +$value.data('value'), decimals: 1})
         if ($this.data('timeout')) {
           window.setTimeout(function(){
             $this.addClass('animated ' + $this.data('animation'));
           }, parseInt($this.data('timeout'),10));
         } else {
           $this.addClass('animated ' + $this.data('animation'));
         }
       }
     });
     // Hidden...
    $(".revealOnScroll.animated").each(function (index) {
       var $this     = $(this),
           offsetTop = $this.offset().top;
       if (scrolled + win_height_padded < offsetTop) {
         $(this).removeClass('animated fadeInUp flipInX lightSpeedIn')
       }
     });
   }
   revealOnScroll();

  // Mobile menu icon in header animation
	$('.menu-icon .icon-hamburger-cross').on('click', function() {
		$(this).toggleClass(
			'is-active'
		), $(this).closest('.menu-icon').next('.main-menu').toggleClass('is-shown')
	})

  // Job detail

  function getImageOffets(box, selector) {
    var originalImage = $(box).find('img.job-img')
    var originalImageRect = originalImage.get(0).getBoundingClientRect()
    var targetImage = $(selector).find('img.job-img')
    var targetImageRect = targetImage.get(0).getBoundingClientRect()

    var offsetX = originalImageRect.x - targetImageRect.x - (originalImageRect.width / 2) + 5
    var offsetY = originalImageRect.y - targetImageRect.y - (originalImageRect.height / 2) + 5
    var scale = originalImageRect.width / targetImageRect.width
    console.log('scale', scale, originalImageRect.width, targetImageRect.width)

    return { x: offsetX, y: offsetY, scale: scale, target: targetImage }
  }

  $('.jobs .job-box').on('click', function() {
    var selector = "#" + $(this).data("target");
    $(selector).addClass('is-shown')
    setTimeout(function() { $(selector).addClass('active') }, 0)

    const offset = getImageOffets(this, selector)
    // show the overlay
    $(selector).addClass('is-shown')
    // animate image position
    anime({
      targets: offset.target.get(0),
      translateX: [offset.x, 0],
      translateY: [offset.y, 0],
      scale: [offset.scale, 1]
    })

    console.log('offset', offset)

    $(selector).find('.button-close').one('click', function() {
      // animate image position
      const $jobDetail = $(this).closest('.job-detail')
      $jobDetail.removeClass('active')
      $jobDetail.addClass('out')
      anime({
        targets: offset.target.get(0),
        translateX: [offset.x, 0],
        translateY: [offset.y, 0],
        scale: [offset.scale, 1],
        duration: 150,
        easing: 'easeInSine',
        direction: 'reverse',
        complete: function () {
          $jobDetail.removeClass('is-shown')
          $jobDetail.removeClass('out')
          offset.target.get(0).style = ''
        }
      })
    })
  })
})
