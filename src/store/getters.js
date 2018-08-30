const getters = {
  equipmentList: state => state.gather.equipmentList,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  token: state => state.user.token
}
export default getters
