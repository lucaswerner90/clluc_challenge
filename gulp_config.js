// I decide to create a gulp file configuration to set global vars on it
const CONFIG={
  src_folder:'./src',
  compiled_folder:'./dist',
  compatible_browsers:[
    'ie >= 8',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ],
  src_files:{
    style:'/scss/**/*.{scss,css}',
    images:'/img/**/*.{jpg,png}',
    code_entry_point:'/js/main.js',
    code:'/js/**/*.js',
    libs:'/js/libs/**/*',
    html:'/index.html',
    data:'/data/**/*'
  },
  compiled_files:{
    style:'/css',
    images:'/img',
    code:'/js',
    libs:'/js/libs',
    data:'/data',
  }
}

module.exports=CONFIG;
