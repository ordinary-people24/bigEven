$(function(){

  getUserInfo()
  $('#btnloginout').on('click',function(){
    layui.layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
      localStorage.removeItem('token')
      location.href='../../code/login.html'
      
      layer.close(index);
    });
  })
})
function getUserInfo(){
  $.ajax({
    method:'get',
    url:'/my/userinfo',
    // headers:{
    //   Authorization:localStorage.getItem('token')||''
    // },
    success:function(res){
      
      if(res.status!==0){
        console.log(res.message)
        return layui.layer.msg(res.message)
      }
      renderuser(res.data)
    }
  })
}
function renderuser(user){
  var name=user.nickname||user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
  var first=name[0]
  if(user.user_pic!==''){
    $('.layui-nav-img').attr('src',user.user_pic).hide();
    $('.span').html(first.toUpperCase()).show()
  }else{
    $('.span').hide()
    $('.layui-nav-img').attr('src',user.user_pic).show();

  }

}