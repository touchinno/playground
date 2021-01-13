export default {
  items: [
    {
      name: 'Playground',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'Play',
      },
      roles: [],
    },
    {
      title: true,
      name: 'vocabulary',
      roles: [],
    },
    {
      name: '단어',
      icon: 'icon-organization',
      attributes: { disabled: true },
      children: [
        {
          name: '영어단어',
          url: '/word',
          icon: 'icon-badge',
          badge: {
            variant: 'success',
            text: 'word'
          }
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/disabled',
      icon: 'icon-layers',
      roles: [],
    },
    {
      divider: true,
    },
    {
      name: 'Disabled',
      url: '/disabled',
      icon: 'icon-ban',
      attributes: { disabled: true },
      children: [
        {
          name: 'TO-BE',
          url: '/tobe',
          icon: 'icon-clock',
          badge: {
            variant: 'warning',
            text: 'NEW'
          }
        }
      ]
    },
    {
      name: 'Download Touch App',
      url: 'https://touch.io/download',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
  ],
};
