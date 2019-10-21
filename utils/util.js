const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

const checkPhone = phone => {
  const pnReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return pnReg.test(phone)
}

const toast = (title, icon, duration) => {
  if(!icon) icon = 'none'
  if (!duration) duration = 2000
  wx.showToast({
    title: title,
    icon: icon,
    duration: duration
  })
}

module.exports = {
  formatTime: formatTime,
  trim,
  checkPhone,
  toast
}
