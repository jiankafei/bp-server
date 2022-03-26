export const globalScheme = {
  // $id: 'globalPreset',
  type: 'object',
  properties: {
    $sdk: {
      type: 'string',
    },
    $sdk_v: {
      type: 'string',
    },
    $lang: {
      type: 'string',
    },
    $os: {
      type: 'string',
    },
    $os_v: {
      type: 'string',
    },
    $br: {
      type: 'string',
    },
    $br_v: {
      type: 'string',
    },
    $eng: {
      type: 'string',
    },
    $eng_v: {
      type: 'string',
    },
    $tt: {
      type: 'string',
    },
    $url: {
      type: 'string',
    },
    $path: {
      type: 'string',
    },
    $cs_ts: {
      type: 'string',
    },
    $scr_w: {
      type: 'string',
    },
    $scr_h: {
      type: 'string',
    },
    $scr_ori: {
      type: 'string',
    },
  },
};

export const clickScheme = {
  // $id: 'clickPreset',
  type: 'object',
  properties: {
    ...globalScheme.properties,
    $el_tag: {
      type: 'string',
    },
    $el_id: {
      type: 'string',
    },
    $el_name: {
      type: 'string',
    },
    $el_cls: {
      type: 'string',
    },
    $el_href: {
      type: 'string',
    },
    $el_ct: {
      type: 'string',
    },
    $el_sel: {
      type: 'string',
    },
    $page_x: {
      type: 'string',
    },
    $page_y: {
      type: 'string',
    },
  },
};

export const pageviewScheme = {
  // $id: 'pageviewPreset',
  type: 'object',
  properties: {
    ...globalScheme.properties,
    $ref: {
      type: 'string',
    },
  },
};

export const pagestayScheme = {
  // $id: 'pagestayScheme',
  type: 'object',
  properties: {
    ...globalScheme.properties,
    $du: {
      type: 'string',
    },
  },
};
