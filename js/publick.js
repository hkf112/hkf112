$(function () {
    // 获取 cookie
    var cookie = getCookie('name')
    console.log(cookie)

    if (cookie) {
        $('.cookie-text').text(cookie + ',您好!')
        $('.header .header-top .header-right span').css('color', 'skyblue')
        $('.header .header-top .header-right > strong').css('display', 'block')

    } else {
        // $('.cookie-text').text(cookie + ',您好!')
        $('.header .header-top .header-right span').css('color', 'white')
        $('.header .header-top .header-right > strong').css('display', 'none')
        $('.myself').click(function () {
            window.location.href = './login.html'
        })
    }

    // 获得 储存  购买信息
    setcar()

    function setcar() {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        if (!cart.length) {
            $('.shopping').html('0')
            return
        }

        let count = 0
        cart.forEach(item => count += item.cart_number - 0)
        $('.shopping').html(count)
        console.log(count)
    }

    const span = document.querySelector('.header .header-top > span')

    span.addEventListener('click', () => {
        window.location.href = './index1.html'
    })


    

})

const li = document.querySelectorAll('.header-foot > ol > li')

const div = document.querySelectorAll('.header-none > div')

for(let i = 0; i < li.length; i++){
    li[i].addEventListener('clcik', () => {

        // console.log($(this))

        for(let j = 0; j < div.length; j++){

            $('.header > .nav-container > .header-none').css('display', 'block')
           
            console.log(th)
            if(i % 2 === 0 || i !== 12) {
                $('.header .nav-goods1').addClass("none").siblings().removeClass("none")
            }else if(i === 12) {
                $('.header .nav-serve').addClass("none").siblings().removeClass("none")
            }else{
                $('.header .nav-add').addClass("none").siblings().removeClass("none")

            }
        }
    })
}





//  搜索 引擎  渲染

const inp = document.querySelector('.right > form > input')
const ol = document.querySelector('.search-info')
console.log(ol)

inp.addEventListener('input', (e) => {
    const script = document.createElement('script')

    const value = inp.value
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
    script.src = url
    document.body.appendChild(script)
    script.remove()
})

    

function bindHtml(res) {
   
    console.log(res.g)
    if (!res.g) {
        ol.classList.remove('act')
        return
    }

    let str = ''

    for (let i = 0; i < res.g.length; i++) {
        str += `
        <li>${ res.g[i].q }</li>
      `
    }

    ol.innerHTML = str
    
    ol.classList.add('act')



    // $('div .one :nth-child(even)')

   

  
}