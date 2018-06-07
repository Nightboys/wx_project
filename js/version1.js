/**
 * Created by lch on 2018/3/21 0021.
 */

$(document).ready(function () {

    initMenu(data); //数据初始化


    $('.content_menu input[type="radio"]').click(function () {
        $('.content_menu_box .item').eq($(this).index()).addClass('current').siblings('.item').removeClass('current');
    });


    /**
     * 删除菜单
     * */
    $('#delete_menu').click(function () {
        addMenuBtn();
    });

    /**
     * 保存并发布
     * */
    $('#save_btn').click(function () {
        saveMenu();
    })
});

/**
 * 页面初始化
 * */
var data = {
    "button": [{
        "name": "物联平台",
        "sub_button": [{
            "type": "view",
            "name": "IOT测试",
            "url": "http://iot.morefly.com.cn/iot-wxapp/wxAuthor.do?url=http://iot.morefly.com.cn/iot-wxapp/userInfo/toLogin.do&authz=1"
        }, {
            "type": "view",
            "name": "第一期",
            "url": "http://iot.morefly.com.cn/iot-wxapp/wxAuthor.do?url=http://iot.morefly.com.cn/iot-wxapp/userInfo/toLogin.do&authz=2"
        }]
    }, {
        "name": "微营销",
        "sub_button": [{
            "type": "view",
            "name": "扫一扫，送礼包",
            "url": "http://iot.morefly.com.cn/iot-wxapp/wxAuthor.do?url=http://iot.morefly.com.cn/iot-wxapp/active/giftApply.do&authz=1"
        }, {
            "type": "view",
            "name": "好友砍价0元购",
            "url": "http://iot.morefly.com.cn/iot-wxapp/wxAuthor.do?url=http://iot.morefly.com.cn/iot-wxapp/active/sharePage.do&authz=2"
        }]
    }, {
        "name": "推米",
        "sub_button": [{
            "type": "view",
            "name": "呼呼城市圈",
            "url": "http://${appid}.tm.morefly.com.cn/busi_wxapp/index/index"
        }, {
            "type": "view",
            "name": "支付",
            "url": "http://${appid}.tm.morefly.com.cn/tm_wxpay/pay/payorder"
        }]
    }]
};
function initMenu(data){

    var content='';
    var obj = data.button;
    for(var i=0;i<obj.length;i++){
        var obj_sub = obj[i].sub_button;
        var sub_str='';
        for(var j=0;j<obj_sub.length;j++){
            sub_str += '<li class="sub_menu"><span data-type="'+obj_sub[j].type+'" data-link="'+obj_sub[j].url+'">'+obj_sub[j].name+'</span></li>';
        }
        if(obj_sub.length<5){
            sub_str += '<li class="add_child_btn">+</li>';
        }

        var str= '<li class="main_menu"><span>'+obj[i].name+'</span><ul>'+sub_str+'</ul></li>';

        content += str;
    }
    $('.menu_button').empty().append(content);
    if(obj.length<3){
        $('.menu_button').append('<li id="add_btn">+</li>');
    }


    menuWidth();    //初始化菜单宽度
    creatMainMenu();  //创建一级菜单
    creatSubMenu();    //创建二级菜单
    selectMenu();   //菜单选中事件
}

/**
 * 动态修改菜单项的宽度
 * */
function menuWidth() {
    var len = $('.menu_button>li').length;  //获取子菜单个数，用于动态设置宽度
    var menu_button_width = $('.menu_button').width();
    $('.menu_button li').css("width", Math.floor(menu_button_width / len));
}

/**
 *添加一级子菜单
 * */
function creatMainMenu(){
    $('#add_btn').click(function () {
        var len = $('.menu_button>li:not("#add_btn")').length;
        if (len < 3) {      //最多只能添加三个菜单
            var str = '<li class="main_menu"><span>菜单名称</span><ul><li class="add_child_btn">+</li></ul></li>';
            $('#add_btn').before(str);
            len++;
            if (len >= 3) {
                $('#add_btn').remove();
            }
            menuWidth();
            creatSubMenu();
            selectMenu();
        }
    });

}

/**
 *添加二级子菜单
 * */
function creatSubMenu(){
    $('.menu_button li.add_child_btn').click(function () {
        var len = $(this).parent('ul').find('li.sub_menu').length;
        if (len < 5) {  //最多只能添加五个子菜单
            var str = '<li class="sub_menu"><span>子菜单</span></li>';
            $(this).before(str);
            len++;
            if (len >= 5) {
                $(this).remove();
            }
        }
        menuWidth();
        selectMenu();
    });
}

/**
 * 菜单选中事件处理
 * */
function selectMenu(){

    /*选中一级子菜单*/
    $('.menu_button>li>span').click(function () {
        $(this).parents().find('.check').removeClass('check');
        $(this).addClass('check');
        $(this).siblings('ul').slideDown();
        $(this).parent().siblings().find('ul').slideUp();

        $('.rightnr .form_menu .group_menu input').val($(this).html());
        $('.rightnr .form_menu .sub_menu').hide();
    });

    /*选中二级子菜单*/
    $('.menu_button li ul li span').click(function () {
        $(this).parents().find('.check').removeClass('check');
        $(this).addClass('check');
        $('.rightnr .form_menu .sub_menu').show();
        $('.rightnr .form_menu .group_menu input').val($(this).html());
        $('.rightnr .content_menu_box .current input').val($(this).attr('data-link'));
        console.log($(this).attr('data-link'));
    });
    
    /*键盘事件监听*/
    $('.rightnr .form_menu .group_menu input').keyup(function () {
        $('.menu_button .check').html($(this).val());

       /* if($(this).val().length>8){
            alert('字数不超过4个汉字或8个字母')
        }

        var patter = /^[\u4e00-\u9fa5]{2,4}$/;
        if(!patter.test($(this).val())){
            alert('字数不超过4个汉字或8个字母')
        }
      */
    });

    $('.rightnr .content_menu_box .current input').keyup(function () {
        $('.menu_button .check').attr('data-link',$(this).val());
    })
}


/**
 * 删除菜单后追加+按钮
 * */
function addMenuBtn(){
    var that = $('.mobile_menu .menu_button .check');   //span
    var current = that.parent();   // li
    var flag = current.is(".sub_menu"); //判断选中菜单是否为子菜单
    if(flag){   //选中子菜单
        var len = current.parent().find('li').size(); //判断当前子菜单数量
        if(len<=5){
            if(!current.siblings('.add_child_btn').length){
                current.parent().append('<li class="add_child_btn">+</li>');
                creatSubMenu();
            }
            current.remove();
        }
    }else{  //选中主菜单
        var num = that.siblings('ul').find('li.sub_menu').size();
        console.log(num);
        if(num){    //当前主菜单下面存在子菜单
            alert("该菜单下存在子菜单，不容许删除，请先删除子菜单后再试！");
        }else{
            if(!current.siblings('#add_btn').length){
                current.parent().append('<li id="add_btn">+</li>');
                creatMainMenu();
            }
            current.remove();
            menuWidth();    //删除主菜单后重新设置菜单宽度
        }
    }
}


/**
 * 保存并发布
 * */
function saveMenu(){
    var mainMenu = $('.menu_button .main_menu');    //主菜单
    var button = [];

    for(var i=0;i<mainMenu.length;i++){
        var obj = {};
        var sub_button = [];
        obj.name = $('.menu_button .main_menu:eq('+i+')>span').html();

        var subMenu = $('.menu_button .main_menu:eq('+i+')>ul').find('span');

        //type类型默认为view，此处可修改
        subMenu.each(function () {
            var sub = {"type":"view","name":$(this).html(),"url":$(this).attr('data-link')};
            sub_button.push(sub);
        });

        obj.sub_button = sub_button;
        button.push(obj);

        console.log(obj);
    }

    var data = {"button":button};
    console.log(data);
}



