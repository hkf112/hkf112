   

var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    // loop: true, // 循环模式选项
    
    direction : 'horizontal',

    slidesPerView : 4,
    slidesPerGroup : 4,

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  })        


  var mySwiper = new Swiper ('.banner-img', {
    direction: 'horizontal', // 垂直切换选项
    // 如果需要分页器
    // loop: true,
    pagination: {
      el: '.swiper-pagination',
 
      clickable :true,
      type: 'bullets',
      
    },
    
    // virtualTranslate : true,

    autoplay:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    allowTouchMove:false, 
    // grabCursor : true,
    // freeMode : true,
    freeModeMomentumBounce : false,

  })   