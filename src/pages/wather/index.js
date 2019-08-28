/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:26:34
 * @LastEditTime: 2019-08-28 17:00:12
 * @LastEditors: Please set LastEditors
 */
// import {fixChart, getChartConfig, drawEffect} from '../../lib/utils'
// import Chart from '../../lib/chartjs/chart'
/*<remove trigger="prod">*/
import {getEmotionByOpenidAndDate, getMood, geocoder} from '../../lib/api'
import {getWeather ,getAir} from '../../lib/api-mock'
/*</remove>*/

/*<jdists trigger="prod">
import {getEmotionByOpenidAndDate, getMood, geocoder, getWeather, getAir} from '../../lib/api'
</jdists>*/

// const app = getApp()
// let prefetchTimer

// let can = false
// let effectInstance
// const EFFECT_CANVAS_HEIGHT = 768 / 2
// const CHART_CANVAS_HEIGHT = 272 / 2
// let isUpdate = false
Page({
  data: {
    // 页面数据
    statusBarHeight: 32,
    backgroundImage: '../../images/cloud.jpg',
    backgroundColor: '#62aadc',
    today_temp: '0',
    today_temp_max: '0',
    today_temp_min: '0',
    today_weather: '',
    today_humidity: '1',
    today_icon: 'xiaolian',
    today_humidity: '',
    today_wind: '',
    today_windLevel: '',
    tomorrow_temp_max: '0',
    tomorrow_temp_min: '0',
    tomorrow_weather: '',
    tomorrow_icon: '',
    lifeStyle: [],
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
    city: '北京',
    weeklyData: [],
    width: 375,
    scale: 1,
    address: '定位中',
    lat: 31.230939719080258,
    lon: 121.4849025683968
  },
  getWeatherData(cb) {
    wx.showLoading({
      title: '获取数据中',
      mask: true
    })
    const fail = (e) => {
      wx.hideLoading()
      if (typeof cb === 'function') {
        cb()
      }
      // console.log(e.message, e)
      wx.showToast({
        title: '加载失败，请稍后再试',
        icon: 'none',
        duration: 3000
      })
    }
    const {lat, lon, province, city, county} = this.data
    getWeather(lat, lon)
      .then((res) => {
        wx.hideLoading()
        if (typeof cb === 'function') {
          cb()
        }
        if (res.result) {
          // this.render(res.result)
          // console.log(res.result.now.hum)
          this.setData({
            today_temp: res.result.now.tmp, // 温度
            today_weather: res.result.daily_forecast[0].cond_txt_d, // 天气描述
            today_humidity: res.result.now.hum, // 湿度
            today_wind: res.result.now.wind_dir, // 风向
            today_windLevel: res.result.now.wind_sc, // 风力
            today_temp_min: res.result.daily_forecast[0].tmp_min,
            today_temp_max: res.result.daily_forecast[0].tmp_max,
            today_icon: 'yintian', // icon
            tomorrow_temp_max: res.result.daily_forecast[1].tmp_max,
            tomorrow_temp_min: res.result.daily_forecast[1].tmp_min,
            tomorrow_weather: res.result.daily_forecast[1].cond_txt_d,// 白天天气情况
            tomorrow_icon: '',
            // 生活指数
            lifyStyle: res.result.lifestyle,

          })
        } else {
          fail()
        }
      })
      .catch(fail)

    // 获取空气质量
    getAir(city)
      .then((res) => {
        if (res && res.result) {
          this.setData({
            air: res.result
          })
        }
      })
      .catch((e) => {})
  },
  
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        let width = res.windowWidth
        let scale = width / 375
        // console.log(scale * res.statusBarHeight*2+24)
        this.setData({
          width,
          scale,
          paddingTop: res.statusBarHeight + 12
        })
      }
    })
    this.getWeatherData()
    this.getAddress()
    // 定位获取用户当前位置
    wx.getLocation({
      type: 'gcj02',
      altitude: false,
      success: (result)=>{
        let lat = result.latitude
        let lon = result.longitude

        // this.getAddress(lat, lon)
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 获取处理坐标位置
  getAddress() {
    wx.showLoading({
      title: '定位中...',
      mask: true
    })

    let fail = (e) => {
      this.setData({
        address: '上海市嘉定区华江公路90弄'
      })
      wx.hideLoading()

      this.getWeatherData()// 获取数据
    }

    geocoder(
      31.230939719080258,
      121.4849025683968,
      (res) => {
        wx.hideLoading()
        let result = (res.data || {}).result
        // console.log(1, res, result)
        console.log(res)

        if (res.statusCode === 200 && result && result.address) {
          let {address, formatted_addresses, address_component} = result
          if (formatted_addresses && (formatted_addresses.recommend || formatted_addresses.rough)) {
            address = formatted_addresses.recommend || formatted_addresses.rough
          }
          let {province, city, district: county} = address_component
          this.setData({
            province,
            county,
            city,
            address: address
          })
          this.getWeatherData()
        } else {
          //失败
          fail()
        }
      },
      fail
    )

  }

  /*
  render(data) {
    isUpdate = true
    // console.log(data)
    const {width, scale} = this.data
    const {hourly, daily, current, lifeStyle, oneWord = '', effect} = data
    const {backgroundColor, backgroundImage} = current

    const _today = daily[0],
      _tomorrow = daily[1]
    const today = {
      temp: `${_today.minTemp}/${_today.maxTemp}°`,
      icon: _today.dayIcon,
      weather: _today.day
    }
    const tomorrow = {
      temp: `${_tomorrow.minTemp}/${_tomorrow.maxTemp}°`,
      icon: _tomorrow.dayIcon,
      weather: _tomorrow.day
    }

    // daily.forEach((v) => {
    //   v.time = v.time + 24 * 60 * 60 * 1000
    // })
    // console.log(hourly)
    this.setData({
      hourlyData: hourly,
      weeklyData: daily,
      current,
      backgroundImage,
      backgroundColor,
      today,
      tomorrow,
      oneWord,
      lifeStyle
    })
    this.stopEffect()

    if (effect && effect.name) {
      effectInstance = drawEffect('effect', effect.name, width, EFFECT_CANVAS_HEIGHT * scale, effect.amount)
    }
    // 延时画图
    this.drawChart()
    // 启动预取定时器
    this._setPrefetchTimer(1e3)
    // 缓存数据
    this.dataCache()
  },
  dataCache() {
    const {current, backgroundColor, backgroundImage, today, tomorrow, address, tips, hourlyData} = this.data
    wx.setStorage({
      key: 'defaultData',
      data: {
        current,
        backgroundColor,
        backgroundImage,
        today,
        tomorrow,
        address,
        tips,
        hourlyData
      }
    })
  },
  setDataFromCache() {
    wx.getStorage({
      key: 'defaultData',
      success: ({data}) => {
        if (data && !isUpdate) {
          // 存在并且没有获取数据成功，那么可以给首屏赋值上次数据
          const {current, backgroundColor, backgroundImage, today, tomorrow, address, tips, hourlyData} = data
          this.setData({
            current,
            backgroundColor,
            backgroundImage,
            today,
            tomorrow,
            address,
            tips,
            hourlyData
          })
        }
      }
    })
  },
  onHide() {
    clearTimeout(prefetchTimer)
  },
  onShow() {
    this._setPrefetchTimer()
  },
  _setPrefetchTimer(delay = 10e3) {
    // 10s预取
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const data = app.globalData[`diary-${year}-${month}`] || []
    if (!data.length && isUpdate) {
      prefetchTimer = setTimeout(() => {
        this.prefetch()
      }, delay)
    }
  },
  prefetch() {
    let openid = wx.getStorageSync('openid')
    if (openid) {
      // 存在则预取当前时间的心情
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      getEmotionByOpenidAndDate(openid, year, month)
        .then((r) => {
          const data = r.data || []
          app.globalData[`diary-${year}-${month}`] = data
        })
        .catch((e) => {})
    }
  },
  stopEffect() {
    if (effectInstance && effectInstance.clear) {
      effectInstance.clear()
    }
  },
  drawChart() {
    const {width, scale, weeklyData} = this.data
    let height = CHART_CANVAS_HEIGHT * scale
    let ctx = wx.createCanvasContext('chart')
    fixChart(ctx, width, height)

    // 添加温度
    Chart.pluginService.register({
      afterDatasetsDraw(e, t) {
        ctx.setTextAlign('center')
        ctx.setTextBaseline('middle')
        ctx.setFontSize(16)

        e.data.datasets.forEach((t, a) => {
          let r = e.getDatasetMeta(a)
          r.hidden ||
            r.data.forEach((e, r) => {
              // 昨天数据发灰
              ctx.setFillStyle(r === 0 ? '#e0e0e0' : '#ffffff')

              let i = t.data[r].toString() + '\xb0'
              let o = e.tooltipPosition()
              0 == a ? ctx.fillText(i, o.x + 2, o.y - 8 - 10) : 1 == a && ctx.fillText(i, o.x + 2, o.y + 8 + 10)
            })
        })
      }
    })

    return new Chart(ctx, getChartConfig(weeklyData))
  }
  */
})