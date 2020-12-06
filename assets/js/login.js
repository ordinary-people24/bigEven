$(function () {
  $('#reg_box').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
  })
  $('#login_box').on('click', function () {
    $('.reg_box').show()
    $('.login_box').hide()
  })
  // 注册表单验证
  var form = layui.form
  var layer=layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须在6-12位'
    ],
    repwd: function (value) {
      if (value !== $(".layui-form [name=password]").val())
        return '两次密码输入不一致'
    }
  })

  // 监听注册表单的提交事件

  $('#enroll').on('submit', function (e) {
    e.preventDefault()
    var data={ username: $('#enroll [name=username]').val(), password: $('#enroll [name=password]').val() }
    $.post('http://ajax.frontend.itheima.net/api/reguser',data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      $('#reg_box').click()
    })

  })

  // 监听登录表单的事件
  $('#loginID').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      url:'http://ajax.frontend.itheima.net/api/login',
      method:'post',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        localStorage.setItem('token',res.token)
        location.href='../index.html'
      }
    })
  })























})