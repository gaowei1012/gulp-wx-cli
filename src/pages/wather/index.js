/*
 * @Description: 
 * @Author: your name
 * @Date: 2019-08-27 12:26:34
 * @LastEditTime: 2019-08-27 18:48:58
 * @LastEditors: Please set LastEditors
 */
import { gecoder } from '../../lib/api'

Page({
  data: {
    statusBarHeight: 32,
    backgroundImage: '../../images/cloud.jpg',
    backgroundColor: '#62aadc',
    current: {
      temp: '0',
      weather: '数据获取中',
      humidity: '1',
      icon: 'xiaolian'
    },
    today: {
      temp: 'N/A',
      weather: '暂无'
    },
    tomorrow: {
      temp: 'N/A',
      weather: '暂无'
    },
    // hourlyData
    hourlyData: [],
    city: '上海',
    weeklyData: [],
    width: 375,
    scale: 1,
    address: '定位中',
    lat: 40.056974,
    lon: 116.307689
  },
  onLoad: function() {

    // 计算头部定位地址距离顶部的位置
    wx.getSystemInfo({
      success: (result)=>{
        const width = result.windowWidth;
        const scale = width / 375;

        this.setData({
          scale,
          paddingTop: result.statusBarHeight + 12
        })
      },
      fail: ()=>{
        console.log()
      },
      complete: ()=>{}
    });

    this.getLocation()
  },
  // 逆向坐标处理
  getAddress(lat, lng, name) {
    wx.showLoading({
      title: '定位中...',
      mask: true,
    })
    let fail = (e) => {
      this.setData({
        address: name || '上海市徐汇区淮海中路118号'
      })

      wx.hideLoading()

      this.getWeatherData()
    }

    gecoder(lat, lng, (res) => {
      wx.hideLoading()// loading true
      let result = (res.data || {}).result
      // 请求是否成功
      if (result.statusCode === 200 && result && result.address) {
        let { address, formatted_addresses, address_component } = result;
        if (formatted_addresses && (formatted_addresses.recommend || formatted_addresses.rough)) {
          address = formatted_addresses.recommend || formatted_addresses.rough
        }
        let { province, city, district: county } = address_component
        // 更新数据
        this.setData({
          province,
          city,
          county,
          address: name || address
        })
        this.getWeatherData()// 调用getWeatherData请求天气接口数据
      } else {
        fail()// error
      }
      fail
    })
  },
  // 获取天气预报数据
  getWeatherData() {

  },
  // 获取位置信息
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.updateLocation,
      fail: this.openLocation,
    })
  },
  // 更新address
  updateLocation(res) {
    let {latitude: lat, longitude: lng, name} = res
    let data = {lat, lng}
    if (name) data.address = name
    this.setData(data)
    this.getAddress(lat, lng, name)
  },
  // 位置获取错误是调用
  openLocation() {
    wx.showToast({
      title: '您没有权限， 请开启权限',
      icon: 'none',
      duration: 3000
    })
  }
})