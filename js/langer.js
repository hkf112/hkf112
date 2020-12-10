function Enlarge(ele) {
    this.ele = document.querySelector(ele)
    this.show = this.ele.querySelector('.show')
    this.mask = this.ele.querySelector('.mask')
    this.enlarge = this.ele.querySelector('.enlarge')
    this.list = this.ele.querySelector('.list')
    //         bg_width   获取的是一个字符串  split 空格进行切割 返回的是一个数组 
    this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
    // this.enlarge_width = this.enlarge.clientWidth
    this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
    this.show_width = parseInt(window.getComputedStyle(this.show).width)
    this.show_height = parseInt(window.getComputedStyle(this.show).height)
    this.inti()
}
Enlarge.prototype.inti = function () {
    this.Chagesize()
    this.Moveover()
    this.setpoint()
    this.change()
}

//      调整   色块        尺寸
Enlarge.prototype.Chagesize = function () {
    this.mask_width = this.show_width * this.enlarge_width / this.bg_width
    this.mask_height = this.show_height * this.enlarge_height / this.bg_height
    this.mask.style.width = this.mask_width + 'px'
    this.mask.style.height = this.mask_height + 'px'
}
//       移入   移出
Enlarge.prototype.Moveover = function () {
    this.show.addEventListener('mouseover', () => {
        this.mask.style.display = 'block'
        this.enlarge.style.display = 'block'
    })
    this.show.addEventListener('mouseout', () => {
        this.mask.style.display = 'none'
        this.enlarge.style.display = 'none'
    })
}

//  获取      坐标点

Enlarge.prototype.setpoint = function () {
    this.show.addEventListener('mousemove', (e) => {
        e = e || window.event
        let maskX = e.offsetX - this.mask_width / 2
        let maskY = e.offsetY - this.mask_height / 2

        if (maskX <= 0) maskX = 0
        if (maskX >= this.show_width - this.mask_width) maskX = this.show_width - this.mask_width
        if (maskY <= 0) maskY = 0
        if (maskY >= this.show_height - this.mask_height) maskY = this.show_height - this.mask_height
        this.mask.style.left = maskX + 'px'
        this.mask.style.top = maskY + 'px'
        const x = this.enlarge_width * maskX / this.mask_width
        const y = this.enlarge_height * maskY / this.mask_height
        
        this.enlarge.style.backgroundPosition = `-${x}px -${y}px`
    })
}

//     绑定     事件
Enlarge.prototype.change = function () {
   this.list.addEventListener('click', e => {
       e = e || window.event
       const target = e.target || e.srcElement
       if(target.nodeName === 'IMG'){
           const show_url = target.getAttribute('show')
           const enlarge_url = target.getAttribute('enlarge')
            this.show.firstElementChild.src = show_url
            this.enlarge.style.backgroundImage = `url('${enlarge_url}')`
            // this.enlarge.style.backgroundImage = `url(${ enlarge_url })`

            console.log(this.enlarge.backgroundImage)
            // console.log(enlarge_url)Image
            // this.enlarge.background = `url(${enlarge_url})`
            for(let i = 0; i < this.list.children.length; i++){
                this.list.children[i].classList.remove('color')
            }
            target.parentElement.classList.add('color')
       }
   })
}