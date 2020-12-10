$(function () {
    const goodsID = getCookie('goodsID')
    console.log(goodsID)

    let info = null

    getgoodsinfo()


    async function getgoodsinfo() {

        const goodsinfo = await $.get('./php/getGoodsInfo.php', {
            goods_id: goodsID
        }, null, 'json')

        
        info = goodsinfo.info
        
        // console.log(info)
        bindhtml(goodsinfo.info)
        
        
    }
    // console.log(info)

    function bindhtml(info) {

        let str = `

            <ul>
                <li class="list"><img src="${info.goods_small_logo}" alt=""></li>
            </ul>
        
            <div class="goods-big show"><span class="mask"></span><img src="${info.goods_big_logo}" alt=""></div>

        `
        const img = info.goods_small_logo

        $('.goods-img').html(str)
        $('.body-header > .langer ').css('background-image', `url('${img}')`)



        $('.goods-info').html(`

               <div class="info-header">
                   <div class="info-h-left">
                    <h1>${info.cat_id}</h1>
                    <h2>${info.cat_one_id}</h2>
                    <p>￥${info.goods_price} <br>
                        <span>原价:￥${info.goods_number}.00</span>
                    </p>
                   </div>
               </div>
               <div class="info-body info1">
                   <h4>促销活动</h4>
                   <ol class="info1-right">
                       <li><mark>新人礼</mark>下载 App 领新人大礼包，首单优惠购最低只要 ¥ 9.9 <a href="#">查看详情</a></li>
                       <li><mark>直降</mark>双十二抢购</li>
                   </ol>
               </div>

               <div class="info-body info2">
                    <h4>尺寸选择</h4>
                    <ul class="info1-right">
                        <li>20寸</li>
                    </ul>
                </div>

                <div class="info-body info3">
                    <h4>颜色选择</h4>
                    <ul class="info1-right">
                        <li>银色</li>
                        <li>黑色</li>
                        <li>玫瑰金</li>
                        <li>蓝色</li>
                    </ul>
                </div>

                <div class="info-body info4">
                    <h4>数量选择</h4>
                    <div class="info1-right">
                        <p class="clc">-</p> 
                        <input type="text" value="1" class="number">
                        <p class="add">+</p> 
                    </div>
                </div>

                <div class="info-body info5">
                    <h4>服务说明</h4>
                    <div class="info1-right">
                        <p>*满99包邮</p>
                    </div>
                </div>

        `)

        $('.car').html(`
        
            <div>
            <b>你已选择了</b>
            <p>
                <strong>${info.cat_id}<br>
                ${info.cat_one_id}
                </strong>

            </p>
            </div>

            <mark>￥${info.goods_price}</mark>
            <p>现在购买</p>
            <button>加入购物车</button>
        
        
        `)
        

        $('.ccc').html(`${info.goods_introduce}`)

        $('.info1-right').on('click','li',function(e) {

            $(this).addClass('active').siblings().removeClass('active')
            
        })

        $('.car').on('click','p',function() {
            window.location.href = './car.html'
        })


        // 保存购物信息
        const cookie = getCookie('name')
        console.log(cookie)

        $('.car').on('click','button',function() {

            if(cookie === undefined){
                window.location.href = "./login.html"
            }else{
                
                const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    
                const flag = cart.some(item => item.goods_id === goodsID)
    
                if(flag) {
    
                    const cart_goods = cart.filter(item => item.goods_id === goodsID)[0]
                    cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.number').val() - 0)
                }else{
                    info.cart_number = 1
                    cart.push(info)
                }
    
                window.localStorage.setItem('cart', JSON.stringify(cart))
            }

            
        })

         
          
       

        // 点击事件 让数量 增加 减少

        $('.info4')
            .on('click','.clc',function() {
                let num = $('.number').val() - 0

                if(num === 1) return
                $('.number').val(num - 1)
            })
            .on('click','.add',function() {
                let num = $('.number').val() - 0
                $('.number').val(num + 1)
            })
    }

    // 放大镜

    // $('.goods-img').on('mouseover','.show',function() {
    //     $('.mask').css('display', 'block')
    //     $('.enlarge').css('display','block')
    // })
    // $('.goods-img').on('mouseout','.show',function() {
    //     $('.mask').css('display', 'none')
    //     $('.enlarge').css('display','none')
    // })

    // async function Enlarge(ele){
    //     this.ele = document.querySelector(ele) 
    //     this.show = this.ele.querySelector('.show')
    //     this.mask = this.ele.querySelector('.mask')
    //     this.enlarge = this.ele.querySelector('.enlarge')
    //     this.init()
    // }

    // Enlarge.prototype.init = function(){
    //     console.log(this.mask)
    // }


    // const con = new Enlarge('.body-header')

})