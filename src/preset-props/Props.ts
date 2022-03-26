type presetProps = {
  name: string,
  type: string,
  desc: string,
}[];

export const globalProps: presetProps = [
  { name: '$sdk', type: 'string', desc: 'sdk 类别' },
  { name: '$sdk_v', type: 'string', desc: 'sdk 版本' },
  { name: '$lang', type: 'string', desc: '浏览器语言' },
  { name: '$os', type: 'string', desc: '系统' },
  { name: '$os_v', type: 'string', desc: '系统版本' },
  { name: '$br', type: 'string', desc: '浏览器品牌' },
  { name: '$br_v', type: 'string', desc: '浏览器版本' },
  { name: '$eng', type: 'string', desc: '浏览器引擎' },
  { name: '$eng_v', type: 'string', desc: '浏览器引擎版本' },
  { name: '$tt', type: 'string', desc: '页面 title' },
  { name: '$url', type: 'string', desc: '页面 href' },
  { name: '$path', type: 'string', desc: '页面 path' },
  { name: '$cs_ts', type: 'number', desc: '客户端侧时间戳' },
  { name: '$scr_w', type: 'number', desc: '屏幕宽度' },
  { name: '$scr_h', type: 'number', desc: '屏幕高度' },
  { name: '$scr_ori', type: 'string', desc: '屏幕方向' },
];

export const clickProps: presetProps = [
  { name: '$el_tag', type: 'string', desc: '元素 tag' },
  { name: '$el_id', type: 'string', desc: '元素 id' },
  { name: '$el_name', type: 'string', desc: '元素 name' },
  { name: '$el_cls', type: 'string', desc: '元素 class' },
  { name: '$el_href', type: 'string', desc: '元素 href' },
  { name: '$el_ct', type: 'string', desc: '元素内容' },
  { name: '$el_sel', type: 'string', desc: '元素选择器' },
  { name: '$page_x', type: 'number', desc: '点击x轴坐标' },
  { name: '$page_y', type: 'number', desc: '点击y轴坐标' },
];

export const pageviewProps: presetProps = [
  { name: '$ref', type: 'string', desc: '来源页面' },
];

export const pagestayProps: presetProps = [
  { name: '$du', type: 'number', desc: '页面停留时间，单位秒' },
];

export default <{[k: string]: presetProps}>{
  globalProps,
  clickProps,
  pageviewProps,
  pagestayProps,
};
