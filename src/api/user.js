import { __post } from './interceptor'
const prefix = '/user-api/'
export const POST_APIlogin = args => __post(`${prefix}/account/login`, args) // 登录
export const POST_APIregister = args => __post(`${prefix}/account/register`, args) // 注册
export const POST_APIlogout = args => __post(`${prefix}/account/logout`, args) // 登出
export const POST_APIchangepwd = args => __post(`${prefix}/account/changepwd`, args) // 修改密码

export const POST_APIroleAdd = args => __post(`${prefix}/role/add`, args) // 新增权限
export const POST_APIroleQuery = args => __post(`${prefix}/role/query`, args) // 查询权限
export const POST_APIroleDelete = args => __post(`${prefix}/role/delete`, args) // 删除权限
export const POST_APIroleUpdate = args => __post(`${prefix}/role/update`, args) // 更新权限

export const POST_APIuserInfoQuery = args => __post(`${prefix}/userInfo/query`, args) // 查询个人信息
export const POST_APIuserInfoUpdate = args => __post(`${prefix}/userInfo/update`, args) // 修改个人信息
export const POST_APIbandIDcard = args => __post(`${prefix}/userInfo/idcard`, args) // 绑定身份证
export const POST_APIbandIDcardCheck = args => __post(`${prefix}/userInfo/idcardCheck`, args) // 身份证信息审核
