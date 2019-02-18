import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'

import {
  LocaleProvider,
  Button,
  Icon,
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Avatar,
  Table,
  Tooltip,
  Drawer,
  Modal,
  Skeleton,
  Spin,
  Divider,
  Layout,
  message
} from 'ant-design-vue'

const components = {
  LocaleProvider,
  Button,
  Icon,
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Avatar,
  Table,
  Tooltip,
  Drawer,
  Modal,
  Skeleton,
  Spin,
  Divider,
  Layout
}

Object.keys(components).forEach(key => {
  Vue.use(components[key])
})

Vue.prototype.$message = message

moment.locale('zh-cn')
