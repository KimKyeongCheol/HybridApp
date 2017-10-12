var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.member.onCreate();
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        /*   var listeningElement = parentElement.querySelector('.listening');
           var receivedElement = parentElement.querySelector('.received');

           listeningElement.setAttribute('style', 'display:none;');
           receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};
app.member = (function(){
    var onCreate  = function(){
        setContentView();
        $('#signin-btn').click(e=>{
            e.preventDefault();
            var id = $('#id').val();
            var pass= $('#password').val();
            console.log('입력된 id,password:    ' + id +','+pass );
            $.ajax({
                async : false,
                url:'json/member.json',
                type: 'post',
                data: {id:id,pass:pass},
                dataType:'json',
                success:d=>{
                    $.each(d,(i,o)=>{
                        if(o.id===id && o.pass === pass){
                            checkval = true;
                            return false;
                        }else{
                            checkval = false;
                        }
                    });
                    if(checkval==true){
                        alert('SUCCESS!');
                        app.destination.onCreate();
                    }else{
                        alert('FAIL');
                        $('#id').val('');
                        $('#password').val('');
                    }
                },
                error:e=>{
                    alert('error');
                }
            });

        });
        $('#signup-btn').click(e=>{
            e.preventDefault();
        });
    };
    var setContentView = function(){
        $('body').empty();
        $('body').html(app.compUI.div('wrapper'));
        $('#wrapper').css({'width':'100%','height':'100%','background-color':'white'}).html(app.compUI.div('container'));
        $('#container').css({'width':'100%','height':'100%','background-color':'white'});
        $('#container').html(app.compUI.div('content'));
        $('#content').css({'width':'100%','height':'100%'});
        $('#content').html(app.compUI.input('id','text'));
        $('#id').attr('placeholder','ID를 입력하세요').css({'width':'100%', 'height':'50px','margin':'30px 0px 5px 0px'});
        $('#content').append(app.compUI.input('password','text'));
        $('#password').attr('placeholder','비밀번호를 입력하세요').css({'width':'100%', 'height':'50px','margin':'5px 0px 10px 0px'});
        $('#content').append(app.compUI.btn('signin-btn'));
        $('#content').append(app.compUI.btn('signup-btn'));
        $('#signin-btn').text('로그인');
        $('#signup-btn').text('회원가입');
    };
    return{onCreate:onCreate};
})();
app.destination=(function(){
    var onCreate = function() {
        setContentView();
    };
    var setContentView = function () {
        $('#content').html(app.compUI.ul('dest-list','list-group'));
        var arr = ['la','tokyo','seoul','paris','london'];
        var list = '';
        $.each(arr,(i,y)=>{
            list +='<li class="list-group-item" id="'+ arr[i] +'"><a onclick="app.destination.select('+arr[i]+')">'+ arr[i]+'</a></li>';
        });
        $('#dest-list').html(list);
    };
    var select=x=>{
        alert('선택한 도시는 ' + x +'입니다.');
        /*        var city =x.text().substring(0,1).toUpperCase() + x.text().substring(1);*/
        app.cookie.setCoockie('dest',x);
        app.reservation.onCreate();
    };
    return {onCreate:onCreate,select:select};
})();
app.reservation =(function(){
    var onCreate = function(){
        setContentView();
        var id = '';
    };
    var setContentView =function(){
        $('#content').html(app.compUI.table('seat-table'));
        $('#seat-table').css({'border-collapse': 'collapse','width':'100%'})
        var arr = ['A','B','C','D','E'];
        var tr ='';
        $.each(arr,(i,v)=>{
            tr += '<tr>'
            $.each(arr,(index,value)=>{
                tr +='<td id="'+arr[i] +(index+1)+'"><a onclick="app.reservation.select('+ arr[i] +(index+1)+')">'+arr[i] +(index+1)+'</a></td>'
            });
            tr +='</tr>';
        });
        $('#seat-table').html(tr);
        $('tr').css({'border':'1px solid black','height':'50px','width':'100%'});
        $('td').css({'border':'1px solid black','height':'50px','width':'20%','text-align':'center'});
    };
    var select=x=>{
        alert('예매된 도시는'+app.cookie.getCookie('dest')+'이고 좌석번호는 '+x+'입니다.');
    };

    return{onCreate:onCreate,select:select};
})();
app.cookie={
    setCoockie:(k,v)=>{
        document.cookie = k+"=" +v;
    },
    getCookie:k=>{
        var x = k+ "=";
        var i = 0;
        var arr= document.cookie.split(';');
        for(i=0;i<arr.length;i++){
            var j = arr[i];
            while(j.charAt(0)==''){
                j=j.substring(1,j.length)
            }
            if(j.indexOf(x)==0){
                return j.substring(x.length,j.length);
            }
            return null;
        }

    },
    removeCookie: k=>{

    }
};
app.compUI = {
    br    :()=>{return $('<br/>');},
    div   : x=>{return $('<div/>',{id:x});},
    h1    : x=>{return $('<h1/>',{id:x});},
    span  : x=>{return $('<span/>',{id:x});},
    iTxt  : x=>{return $('<input/>',{id:x,type:'text'});},
    aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
    iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
    image : (x,y)=>{return $('<img/>',{id:x,src:y});},
    table : x=>{return $('<table/>',{id:x})},
    tr :()=>{return $('<tr/>')},
    td :()=>{return $('<td/>')},
    input : (x,y)=>{return $('<input/>',{id:x,type:y});},
    btn : x=>{return $('<button>',{id:x})},
    nav: x=>{return $('<nav/>',{id: x});},
    ul : (x,y)=>{return $('<ul/>',{id:x,class:y})},
    li : (x,y)=>{return $('<li/>',{id:x,class:y})},
    a : ()=>{return $('<a/>',{href:'#'})}
};
$(function(){
    app.initialize();
});
app.initialize();