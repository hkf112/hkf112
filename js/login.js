$(function () {
    $('#login').validate({
        // 表单规则
        rules: {
            username: {
                required: true,
                minlength: 5,
                maxlength: 10,
            },

            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            }
        },

        // messages  表单验证失败自创文本
        // 可以创建多个, 用  对象  类型  表示
        messages: {
            username: {
                required: "必填内容,不填请圆润的走开",
            },
            password: {
                required: "必填内容,不想填,别过来",
            }
        },
        // 验证成功 执行的 函数
        submitHandler(form) {
            // form 是获取 form标签 里 所有带 name 的参数
            // const info = $(form).serialize()    

            const info = $(form).serialize()

            // 2-2. 发送请求到后端, 准备接受结果
            $.get('./php/login.php', info, null, 'json').then(res => {

                console.log(res)


                if (res.code === 0) {
                    console.log($('.error-title'))
                    $('.error-title').css('display', 'block');

                } else if (res.code === 1) {
                    setCookie('name', res.data)
                    window.location.href = './index1.html'
                }
            })

        }




    })

})