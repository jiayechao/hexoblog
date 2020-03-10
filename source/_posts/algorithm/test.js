/**
 * 题目1：编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）
 */
class People {
  constructor(name) {
    this.name = name
    this.eventSet = {}
  }

  on(eventName, callback) {
    if(!this.eventSet[eventName]) {
      this.eventSet[eventName] = []
    }
    this.eventSet[eventName].push(callback)
  }

  emit(eventName, ...rest) {
    if(!this.eventSet[eventName]) {
      console.log(`没有注册事件${eventName}`)
      return
    }
    this.eventSet[eventName].forEach(callback => {
      callback.apply(null,rest)
    });
  }

  off(eventName, callback) {
    // 移除所有事件
    if(eventName === undefined) {
      this.eventSet = {}
      return
    }
    // 移除命名事件
    if(eventName) {
      if(typeof callback === 'function'){
        let eventArr = this.eventSet[eventName]
        let len = eventArr.length
        for(let i = 0; i < len; i++) {
          if(eventArr[i] === callback) {
            eventArr.splice(i, 1)
            break
          }
        }
      } else {
        this.eventSet[eventName] = []
      }
    }
  }
  // TODO: 请在此处完善代码

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}


/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`)
}

const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`)
}

const jerry = new People('Jerry')
jerry.sayHi()
// => 输出：'Hi, I am Jerry'

jerry.on('greeting', say1)
jerry.on('greeting', say2)

jerry.emit('greeting', 'Hi')
// => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

jerry.off('greeting', say1)
jerry.emit('greeting', 'Hi')
// => 只输出：'Hi, nice meeting you, too'

/**
 * 完成 sleep 函数，可以达到下面的效果：
*/
const sleep = (duration) => {
  // TODO
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  })
}

const anyFunc = async () => {
  console.log("123") // 输出 123
  await sleep(300) // 暂停 300 毫秒
  console.log("456") // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}

/**
 * 题目3：找出下面代码的规律并且编写一个函数，转换特定的整数到对应的字符串。
 * 
 * 1 => A
 * 2 => B
 * 3 => C
 * ...
 * 26 => Z
 * 27 => AA
 * 28 => AB
 * 29 => AC
 * ...
 * 52 => AZ
 * 53 => BA
 * ...
 */

const convert = (num) => {
  // TODO: 请在此处完善代码
  // ASCII A-Z 65-90
  // local A-Z 1-26
  // 先求出个位，然后依次往上进位
  if(num < 1) {
    return null
  }
  if(num < 27) {
    return String.fromCharCode(num+64)
  }
  let arr = []
  // 只要num还能被26除
  while(num > 1) {
    // 先找出个位, 若果满位置Z
    let m = num % 26 
    if(m === 0) {
      arr.unshift('Z')
      num = Math.floor(num/26)
    } else {
      arr.push(String.fromCharCode(num % 26 + 64))
      num = Math.floor(num/26)
    }
  }
  return arr.join('')
}

/**
 * 完成 combo 函数。它接受任意多个单参函数（只接受一个参数的函数）作为参数，
 * 并且返回一个函数。它的作为用：使得类似 f(g(h(a))) 这样的函数调用可以简写为 combo(f, g, h)(a)。
 */
const combo = (...rest) => {
  let args = rest
  let result
  let _inside = function(...rest) {
    // 跳出
    if(!args.length) {
      return result 
    }
    // 从最后一个函数开始递归
    let lastFn = args.pop()
    result = lastFn.apply(null,rest)
    _inside(result)
    return result
  }
  // 返回这个函数
  return _inside
}

/* 以下为测试代码 */
const addOne = (a) => a + 1
const multiTwo = (a) => a * 2
const divThree = (a) => a / 3
const toString = (a) => a + ''
const split = (a) => a.split('')

split(toString(addOne(multiTwo(divThree(666)))))
// => ["4", "4", "5"]

const testForCombo = combo(split, toString, addOne, multiTwo, divThree)
testForCombo(666)
// => ["4", "4", "5"]

/**
 * 题目5：有两个盘子分别放有 5 个和 7 个小球，两个朋友玩游戏：每个人轮流从两个盘子中拿小球，
 * 每人每次只能从其中一个盘子中拿，每次可以拿 1 个或者多个（不能一个都不拿），
 * 拿到最后一个小球的人算输。问开局先手和后手是否有必胜策略？如果有，请描述必胜策略。
*/

/**
 * 我们记A盘里有5个小球，B盘有7个小球
 *
 * 先手必胜
 * 从B中取2个，此后不管后手怎么拿，先手都保证两个盘子剩余的一样数量即可
 * 
 * 后手必胜
 * 不管先手怎么拿，后手只要保证两个盘子剩余的一样数量即可
 * 
 */
