// 入口函数

$(function (){

    
    // 获取 cookie
    var cookie = getCookie('name')

    let info = null

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

    // 渲染分类列表
   
    let list = null

    const list_info = {
        cat_one:'all',
        cat_two:'all',
        cat_three:'all',
        sort_method:'综合',
        sort_type:'ASC',
        current:1,
        pagesize:25
    }

     // 渲染 一级 列表
    getone()
    async function getone(){

        const cat_one_list = await $.get('./php/getOne.php',null,null,'json')

        let str = `<li data-type="all" class="active">全部</li>`

        cat_one_list.list.forEach(item => {
            str += 
            `<li data-type="${item.cat_one_id}">${item.cat_one_id}</li>`
        })

        $('.goods-one > .goods-left').html(str)

        
    }

    // 渲染 二级 列表
    // gettwo()
    async function gettwo(){
        const cat_two_list = await $.get('./php/getTwo.php',list_info,null,'json')

        let str = `<li data-type="all" class="active">全部</li>`

        cat_two_list.list.forEach(item => {
            str += 
            `<li data-type="${item.cat_two_id}">${item.cat_two_id}</li>`
        })

        $('.goods-two > .goods-left').html(str)
    }
   
    // 渲染 三级 列表
    // getthree()
    async function getthree(){
        const cat_three_list = await $.get('./php/getThree.php',list_info,null,'json')

        let str = `<li data-type="all" class="active">全部</li>`

        cat_three_list.list.forEach(item => {
            str += 
            `<li data-type="${item.cat_three_id}">${item.cat_three_id}</li>`
        })

        $('.goods-three >.goods-left').html(str)
    }


    //  商品列表 数据渲染

    

        // 分页器

        getTotalPage()
        async function getTotalPage() {
          const totalInfo = await $.get('./php/getTotalPage.php', list_info, null, 'json')
        // console.log(totalInfo.total)
          $('.pagination').pagination({ 
            prevContent:'上一页',
            prevCls: 'prevBox', 
            nextContent: '下一页', 
            coping: true,
            jump:'true',
            homePage: '首页', 
            endPage: '末页',
            pageCount: totalInfo.total,
            jumpIptCls:'jump-ipt',
            jumpBtnCls:'jump-btn',

            callback (index) {
                list_info.current = index.getCurrent()
                getgoodslist()
                console.log(list_info.current);

              }
            
          })
        }


        // 一级分类 点击事件
        $('.goods-one').on('click','li',function(){
            $(this).addClass('active').siblings().removeClass('active')

            // 获得点击内容文本
            const type = $(this).data('type')

            list_info.cat_two = 'all'
            list_info.cat_there = 'all'

            list_info.cat_one = type

            // 重新 渲染 列表信息

            list_info.current = 1

            getgoodslist()

            if(type === 'all') {
                $('.goods-two > .goods-left').html(`<li data-type="all" class="active">全部</li>`)
            }else{
                gettwo()
            }

            $('.goods-three > .goods-left').html(`<li data-type="all" class="active">全部</li>`)

        })

        // 二级 点击事件
        $('.goods-two').on('click','li',function(){
            $(this).addClass('active').siblings().removeClass('active')

            const type = $(this).data('type')

            list_info.cat_two = type

            list_info.current = 1

            getgoodslist()
        })


        // 排序方式点击事件
        $('.goods-four').on('click','li',function(){
            const method = $(this).data('method')
            const type = $(this).data('type')

            $(this).addClass('active').siblings().removeClass('active')

            list_info.sort_method = method
            list_info.sort_type = type

            getgoodslist()
        })

       
    getgoodslist()

    async function getgoodslist(){
        const goodslist = await $.get('./php/getGoodsList.php',list_info,null,'json')

        list = goodslist.list

        

        let str = ``

        goodslist.list.forEach(item => {

            // console.log(item)

            str += `
            <li>
                <img src="${ item.goods_big_logo }" alt="">
                <h3 >${item.goods_name}</h3>
                <h4>双十二抢购</h4>
                <p>${item.goods_price} <span> ${ item.goods_number }.00 </span></p>
                <p class="checkbox">
                    <span class="chec-info" data-id="${item.goods_id}">查看详情</span>
                    <mark class="chec-car" data-id="${item.goods_id}">加入购物车</mark>
                </p>
            </li>
            `
            $('.list-goods > ul').html(str)

        }) 

    }

    
    
   
    $('.list-goods').on('click','.chec-info',function(){
        window.location.href = './detail.html'
        console.log(1111)
        id = $(this).data('id')
        setCookie('goodsID',id)
        
    })

  

    

    // 加购物车

    

    $('.list-goods').on('click','mark',function() {

        console.log(list)

        const goodsID = $(this).data('id')

        console.log(goodsID)

        if(cookie === undefined){
            window.location.href = "./login.html"
        }else{
            
            const cart = JSON.parse(window.localStorage.getItem('cart')) || []

            const flag = cart.some(item => item.goods_id == goodsID)

            if(flag) {

                const cart_goods = cart.filter(item => item.goods_id == goodsID)[0]
                cart_goods.cart_number = cart_goods.cart_number - 0 + 1
            }else{
                const info = list.filter(item => item.goods_id == goodsID)[0]

                info.cart_number = 1

                cart.push(info)
            }

            window.localStorage.setItem('cart', JSON.stringify(cart))
        }

        
    })
    
}) 

