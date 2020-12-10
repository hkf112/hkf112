$(function () {



    const ccc = document.querySelector('.header-foot > ol > li')
    ccc.addEventListener('click',function () {
        window.location.href = './list.html'
    })

    // 获取  保存值
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

    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    if (!cart.length) {

        $('.imgbox').css('display', 'block')

        return

    } else {

        $('.imgbox').css('display', 'none')

        bindhtml()

        function bindhtml() {
            const selectAll = cart.every(item => item.is_select === '1')

            let total = 0
            let totalMoney = 0
            let con = 0
            cart.forEach(item => {
              if (item.is_select === '1') {
                total += item.cart_number - 0
                totalMoney += item.cart_number * item.goods_price
              }
            })

            

            let str = `
            
            <h2>购物清单</h2>
            <div class="body-title">
                <p>商品信息</p>
                <ol>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ol>
            </div>

            `
            cart.forEach(item => {
                con += 1
                str += `
                    <div class="goods">
                    <div class="goods-left">
                        <input type="checkbox" ${ item.is_select === '0' ? '' : 'checked' } data-id="${ item.goods_id }">
                        <img src="${item.goods_small_logo}" alt="" >
                        <div class="goods-info">
                            <h4>${item.cat_id}</h4>
                            <span>${item.cat_one_id}</span>|<b>20寸</b>
                        </div>
                    </div>
    
                        <ol class="goods-right">
                            <li>￥${item.goods_number}.00</li>
                            <li>
                                <span class="clc" data-id="${ item.goods_id }">-</span>
                                <p >${ item.cart_number }</p>
                                <span class="add" data-id="${ item.goods_id }">+</span>
                            </li>
                            <li><b>￥${(item.goods_price * item.cart_number) .toFixed(2) }</b>
                            <mark>该商品有${item.cart_number}件</mark>
                            </li>
                            <li class="del" ><span data-id="${ item.goods_id }">✖</span></li>
                        </ol>
                    </div>
    
                `
            })


            str += `<div class="goods-money">
                <div class="money-left">
                    <input type="checkbox" ${ selectAll ? 'checked' : '' } class="checAll">
                    <p>全选</p>
                    <mark>|</mark>
                    <span class="delAll">删除选中的商品</span>
                </div>
    
                <ol class="money-right">
                    <li>
                        <p>已选<b>${ total }</b>件商品</p>
                        <span>共计<i>${con}</i>款商品</span>
                    </li>
                    <li>
                        <p>应付总额:<b>￥${ totalMoney.toFixed(2) }.00</b></p>

                    </li>
                    <li>
                        <mark>现在结算</mark>
                    </li>
    
                </ol>
            </div>
            
            `
            $('.body').html(str)

            
        }

        // 给标签添加点击事件
        $('.body').on('click','.select', function() {
            const type = this.checked

            

        })
       
    }


    $('.body').on('click', '.goods input', function () {
        // 拿到当前标签的状态
        const type = this.checked
        // 拿到当前标签的 id
        const id = $(this).data('id')
        console.log(id)
        // 去 cart 里面找到 id 对应的数据, 把 is_select 修改一下
        const info = cart.filter(item => item.goods_id == id)[0]
        console.log(info)
        info.is_select = type ? '1' : '0'
        // 从新渲染页面
        bindhtml()
        // 把最新的 cart 存起来
        window.localStorage.setItem('cart', JSON.stringify(cart))
      })



    $('.body').on('click', '.add', function () {
        // 拿到商品 id
        //const id = $(this).data('id')
        const id = $(this).attr('data-id')
        // 找到 cart 中的对应商品

        console.log(id)

        const info = cart.filter(item => item.goods_id == id)[0]
        // 修改信息
        info.cart_number = info.cart_number - 0 + 1
        // 重新渲染页面
        // 从新保存起来
        bindhtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
      })


      $('.body').on('click', '.clc', function () {

        const id = $(this).data('id')

        const info = cart.filter(item => item.goods_id == id)[0]
        if (info.cart_number === 1) return
        info.cart_number = info.cart_number - 0 - 1
        bindhtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
      })
      

      $('.body').on('click', '.del>span', function () {
        const id = $(this).data('id')
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].goods_id == id) {
            cart.splice(i, 1)
            break
          }
        }
    
        bindhtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    
        if (!cart.length) return window.location.reload()
      })



      $('.body').on('click','.delAll',function() {
          console.log($('.body > .goods input'))
      })
      
      $('.body').on('click','.checAll',function() {
            console.log(cart)
            const type = this.checked
            console.log(type)
        
        // $('.goods input').each((index,item) => {
        //     item.checked = type
        // })
        
        cart.forEach(item => item.is_select = type? '1' : '0')

        bindhtml()
        // window.localStorage.setItem('cart', JSON.stringify(cart))

        // const info = cart.filter(item => item.goods_id == id)[0]
        // console.log(info)
        // info.is_select = type ? '1' : '0'
        // // 从新渲染页面
        // bindhtml()
        // // 把最新的 cart 存起来
        // window.localStorage.setItem('cart', JSON.stringify(cart))

      })

      
    
})