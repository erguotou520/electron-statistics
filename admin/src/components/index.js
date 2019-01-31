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
  Divider
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
  Divider
}

Object.keys(components).forEach(key => {
  Vue.use(components[key])
})
