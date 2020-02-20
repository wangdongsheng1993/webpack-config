require('./assets/index.css') 
import './assets/index.scss' 
// require('@babel/polyfill')

console.log("你好");
setTimeout(()=> {
  console.log(1)
},1000)
new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve()
  },1000)
}).then(()=> {
  console.log('resolve')
})

[1,2,3,4].includes(1);