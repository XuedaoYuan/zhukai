module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', ['@babel/preset-env', { modules: false }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
   /*  [
      'import',
      {
        libraryName: 'element-ui',
        // name /element-ui/lib/button
        style: (name) => {
          // console.log(name, 'color: red');
          const names = name.split('/').filter((_) => _);
          let end = names.pop();
          names.push('theme-chalk');
          names.push(end);
          return `${names.join('/')}.css`;
        }
        //  camel2DashComponentName: false, // 是否需要驼峰转短线
        //  camel2UnderlineComponentName: false // 是否需要驼峰转下划线
      }
    ] */
  ]
};
