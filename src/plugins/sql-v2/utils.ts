/**
 * 转换下划线命名
 */
export const toUnderscoreCase = (name: string) => {
  return (
    name
      // 先转换第一个字母
      .replace(/^[A-Z]/, name[0].toLocaleLowerCase())
      // 加下划线
      .replace(/[A-Z]/g, (letter) => {
        return `_${letter.toLocaleLowerCase()}`
      })
  )
}

/**
 * 转换驼峰命名
 */
export const toCamelCase = (name: string, capitalizeFirstLetter = false) => {
  // 去下划线
  let res = name.replace(/_[a-z]/g, (letter) => {
    return letter.replace('_', '').toUpperCase()
  })
  // 首字母大写
  if (capitalizeFirstLetter) {
    res = res.replace(/^[a-z]/, (letter) => {
      return letter.toUpperCase()
    })
  }
  return res
}

/**
 * 扁平化对象
 */
export const objToSql = (data: object) => {
  const converObj = (obj: object) => {
    const res: { [key: string]: any } = {}
    Object.entries(obj).forEach(([k, v]) => {
      // 处理类名
      const key = toUnderscoreCase(k)
      if (v.constructor == Object) {
        // 自调用 分解对象
        Object.entries(converObj(v)).forEach(([k, v]) => {
          const key2 = toUnderscoreCase(k)
          res[`${key}__${key2}`] = v
        })
      } else {
        // 数组和普通值 直接插入
        res[key] = v
      }
    })
    return res
  }
  return converObj(data)
}

/**
 * 格式化对象
 */
export const sqlToObj = (data: object) => {
  const res: { [key: string]: any } = {}
  Object.entries(data).forEach(([k, v]) => {
    // 索引
    const keys = k.split('__')
    // 保存上一个，遍历下一个时访问上一个中的属性
    let last = res
    keys.forEach((e, i) => {
      // 最后一次循环时赋值
      if (keys.length - 1 == i) {
        return (last[toCamelCase(e)] = v)
      }
      // 有就用，没有就设置空对象
      last[e] || (last[e] = {})
      last = last[e]
    })
  })
  return res
}
