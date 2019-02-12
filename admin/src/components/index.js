import Vue from 'vue'
import {
  Button,
  Icon,
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Form,
  Input,
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
  Button,
  Icon,
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Form,
  Input,
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
