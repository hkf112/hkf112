// 入口函数

$(function (){
    // 获取 cookie
    var cookie = getCookie('name')
    console.log(cookie)

    if(cookie){
        $('.cookie-text').text(cookie + ',您好!')
        $('.header .header-top .header-right span').css('color', 'skyblue')
        $('.header .header-top .header-right > strong').css('display','block')
       
    }else{
        // $('.cookie-text').text(cookie + ',您好!')
        $('.header .header-top .header-right span').css('color', 'white')
        $('.header .header-top .header-right > strong').css('display','none')
        $('.myself').click(function(){
            window.location.href = './login.html'
        })
    }

    $('.list-city').click(function(){
        console.log(1111)
        window.location.href = './list.html'
        
    })

    $('.header-right').on('mouseover','.myself',() => {
        $('.car').addClass('none')
    })
    $('.header-right').on('mouseout','.myself',() => {
        $('.car').removeClass('none')
    })

     

   

})
