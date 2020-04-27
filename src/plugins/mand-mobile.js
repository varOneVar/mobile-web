import Vue from 'vue'
// Doc https://mand-mobile.gitee.io/docs/index.gitee.html#/zh-CN/docs/components/basic/tab-bar
import {
  Button,
  Toast,
  Icon,
  ActivityIndicator,
  CellItem,
  DetailItem,
  Skeleton, // 骨架屏
  Swiper, SwiperItem, // 轮播图
  TabBar, // 导航栏
  Landscape,
  Dialog, NoticeBar,
  Check, CheckBox, CheckGroup, CheckList,
  Radio, RadioBox, RadioGroup, RadioList,
  ScrollView, ScrollViewRefresh, ScrollViewMore
} from 'mand-mobile'

const components = [
  Button,
  Toast, // 消息提示
  Icon,
  ActivityIndicator,
  CellItem,
  DetailItem,
  Skeleton,
  Swiper, SwiperItem,
  TabBar,
  Landscape,
  Dialog, NoticeBar,
  Check, CheckBox, CheckGroup, CheckList,
  Radio, RadioBox, RadioGroup, RadioList,
  ScrollView, ScrollViewRefresh, ScrollViewMore
]
components.forEach(component => {
  Vue.component(component.name, component)
})
