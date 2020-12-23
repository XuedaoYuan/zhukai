import Vue from 'vue';

Vue.directive('xzlDialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    let minTop = parseInt(binding.value);
    if (!minTop) {
      minTop = 0;
    }
    const dialogHeaderEl = el.querySelector('.xzl-dialog-header');
    el.dialogHeaderEl = dialogHeaderEl;
    const dragDom = el.querySelector('.xzl-dialog__container');
    dialogHeaderEl.style.cursor = 'move';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        let top = t + styT;
        if (top < minTop) {
          top = minTop;
        }
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${top}px`;

        // 将此时的位置传出去
        // binding.value({ x: e.pageX, y: e.pageY })
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
  unbind(el) {
    el.dialogHeaderEl.onmousedown = null;
    document.onmousemove = null;
  }
});
