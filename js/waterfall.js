/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
 {
      demo_link: '/2017/06/03/tooth-repair-two-sides/',
      img_link: '/images/demos/tooth_repair2.gif',
      title: '牙齿侧面修复',
      core_tech: '3D Mesh Repair',
      description: '基于meshlab实现最经典网格 <a href ="https://drive.google.com/file/d/0Bz89KcgZMI0RUlhnc3NkZWV0TnM/view"target="_blank">补洞算法</a>，并对其进行改进，加入bridge分割洞的功能，从而实现网格的局部修复。',
      more_content: '/2017/06/03/tooth-repair-two-sides/'
    },{
      demo_link: '/2017/06/03/template-based-reconstruction/',
      img_link: '/images/demos/template_based_reconstruction2.gif',
      title: '基于模板的牙根重建',
      core_tech: 'Template-based 3D Mesh Reconstruction',
      description: '基于模板的牙根重建，可以修复牙齿和重建牙根的效果',
      more_content: '/2017/06/03/template-based-reconstruction/'
    }, {
      demo_link: '/2017/06/04/virtual-gum-construction',
      img_link: '/images/demos/virtual_gum_construction2.gif',
      title: '虚拟牙龈构造',
      core_tech: '3D Mesh Construction and Processing',
      description: '基于meshlab根据牙齿上的控制点构造虚牙龈，并对其编辑修改。',
      more_content: '/2017/06/04/virtual-gum-construction'
    }, {
      demo_link: '/2017/06/05/virtual-gum-deformation/',
      img_link: '/images/demos/virtual_gum_deformation2.gif',
      title: '牙龈形变',
      core_tech: '3D Mesh Real-time Construction',
      description: '通过更新控制点实时构造虚拟牙龈实现牙龈实时形变的效果。',
      more_content: '/2017/06/05/virtual-gum-deformation/'
    },{
      demo_link: '/2017/06/01/error-map/',
      img_link: '/images/demos/error_map2.gif',
      title: '误差分析',
      core_tech: '3D Mesh Error Map',
      description: '通过基于Qt实现的Color Bar对修复好的模型进行误差评估',
      more_content: '/2017/06/01/error-map/'
    },{
      demo_link: '/pointcloud/works/test3.html',
      img_link: 'http://i4.piimg.com/599048/36dc99eed90a1a85.gif',
      title: '点云物体展示',
      core_tech: 'Point Cloud',
      description: '基于WebGL实现简单点云展示功能',
      more_content: '/pointcloud/welcome'
    },{
      demo_link: '/pointcloud/works/test28.html',
      img_link: '/pointcloud/css/images/test28.png',
      title: '高逼真度彩色点云场景',
      core_tech: 'Point Cloud',
      description: '基于WebGL实现高逼真度彩色点云场景预览及交互',
      more_content: '/pointcloud/welcome'
    }
    ,{
      demo_link: '/pointcloud/works/test34.html',
      img_link: 'http://i1.buimg.com/599048/3f1fe5f905e72e27.png',
      title: '简化街景预览',
      core_tech: 'PointsCloud Line Extraction',
      description: '基于WebGL实现简化街道的自动预览',
      more_content: '/pointcloud/welcome'
    },{
      demo_link: '/webGLExample/index_threejs_render.html',
      img_link: 'http://i1.buimg.com/599048/da5a8ca65d0f3ab3.gif',
      title: '牙齿渲染',
      core_tech: 'Teeth Rendering, Shader, Parameterization',
      description: '基于WebGL实现牙齿渲染效果',
      more_content: 'https://github.com/solesonglei/webGLExample'
    }
 /*   , {
      demo_link: 'http://gaohaoyang.github.io/test/headerTransition/',
      img_link: 'https://ooo.0o0.ooo/2016/06/20/5768c1597d1fe.png',
      code_link: 'https://github.com/Gaohaoyang/test/tree/master/headerTransition',
      title: '虚拟牙龈构造',
      core_tech: '3D Mesh Construction and Processing',
      description: '基于meshlab根据牙齿上的控制点构造虚牙龈，并对其编辑修改。'
    }
*/
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].more_content + '">...更多内容 </a>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
